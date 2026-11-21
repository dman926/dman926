import * as THREE from "three";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const loader = new STLLoader();
const palette = [
  "--terminal-blue",
  "--terminal-green",
  "--terminal-purple",
  "--terminal-amber",
];
const mounted = new Map(); // host -> dispose()
const recolors = new Set(); // per-viewer recolor callbacks

// Custom properties holding light-dark() come back as raw text, so let the
// browser resolve the color through a real `color` property instead.
function cssColor(token, fallback = "#888") {
  const probe = document.createElement("i");
  probe.style.cssText =
    "position:absolute;visibility:hidden;pointer-events:none";
  probe.style.color = `var(${token}, ${fallback})`;
  document.documentElement.appendChild(probe); // inherits <html>'s color-scheme
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  return resolved; // e.g. "rgb(21, 128, 61)"
}

const makeMaterial = (i) => {
  const token = palette[i % palette.length];
  const mat = new THREE.MeshStandardMaterial({
    roughness: 0.6,
    metalness: 0.1,
  });
  mat.userData.token = token;
  mat.color.set(cssColor(token));
  return mat;
};

async function mount(host) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    host.textContent = "3D preview isn't supported on this device.";
    return () => {
      host.textContent = "";
    };
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  host.append(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 10000);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.4));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(1, 2, 3);
  scene.add(key);

  const group = new THREE.Group();
  group.rotation.x = -Math.PI / 2; // STL is Z-up, three.js is Y-up
  scene.add(group);

  const controls = new OrbitControls(camera, renderer.domElement);
  const render = () => renderer.render(scene, camera);
  controls.addEventListener("change", render);

  const urls = host.dataset.src.split("|");
  const geometries = await Promise.all(urls.map((u) => loader.loadAsync(u)));
  geometries.forEach((g) => g.computeBoundingBox());
  const dims = geometries.map((g) =>
    g.boundingBox.getSize(new THREE.Vector3()),
  );
  const gap = Math.max(...dims.map((s) => Math.max(s.x, s.y, s.z))) * 0.15;

  let x = 0;
  geometries.forEach((geo, i) => {
    const mesh = new THREE.Mesh(geo, makeMaterial(i));
    const b = geo.boundingBox;
    // Local space is still Z-up here, because the group handles the rotation
    mesh.position.set(
      x - b.min.x, // start at the current x offset
      -(b.min.y + b.max.y) / 2, // center on y
      -b.min.z, // sit on z = 0
    );
    x += dims[i].x + gap;
    group.add(mesh);
  });

  // Re-resolve colors when the theme changes while this viewer is open
  const recolor = () => {
    group.children.forEach((m) =>
      m.material.color.set(cssColor(m.material.userData.token)),
    );
    render();
  };
  recolors.add(recolor);

  // Center the model and fit the camera to it
  group.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(group);
  const size = box.getSize(new THREE.Vector3()).length();
  group.position.sub(box.getCenter(new THREE.Vector3()));
  camera.position.set(size * 0.9, size * 0.7, size * 0.9);
  camera.near = size / 100;
  camera.far = size * 20;
  camera.updateProjectionMatrix();
  controls.update();

  const ro = new ResizeObserver(() => {
    const { clientWidth: w, clientHeight: h } = host;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    render();
  });
  ro.observe(host);

  return () => {
    recolors.delete(recolor);
    ro.disconnect();
    controls.dispose();
    geometries.forEach((g) => g.dispose());
    group.children.forEach((m) => m.material.dispose());
    renderer.dispose();
    host.replaceChildren();
  };
}

// Theme change: data-theme toggle, or system preference when no explicit theme
const runRecolors = () => recolors.forEach((fn) => fn());
new MutationObserver(runRecolors).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["data-theme"],
});
matchMedia("(prefers-color-scheme: dark)").addEventListener(
  "change",
  runRecolors,
);

document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".model-preview-btn");
  if (!btn) return;
  const host = btn.nextElementSibling;
  if (mounted.has(host)) {
    mounted.get(host)();
    mounted.delete(host);
    host.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    btn.textContent = "Preview 3D";
    return;
  }
  host.hidden = false;
  btn.setAttribute("aria-expanded", "true");
  btn.textContent = "Hide preview";
  host.classList.add("loading");
  mounted.set(host, await mount(host));
  host.classList.remove("loading");
});

// Free the WebGL contexts when an overlay closes
addEventListener("hashchange", () => {
  mounted.forEach((dispose, host) => {
    dispose();
    host.hidden = true;
    const btn = host.previousElementSibling;
    btn.setAttribute("aria-expanded", "false");
    btn.textContent = "Preview 3D";
  });
  mounted.clear();
});

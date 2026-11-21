import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { statSync } from "node:fs";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy({
    "src/_assets/favicon.svg": "favicon.svg",
    "src/_assets/favicon.ico": "favicon.ico",
    "src/_assets/apple-touch-icon.png": "apple-touch-icon.png",
    "src/_assets/robots.txt": "robots.txt",
    "src/_assets/Dennis_James_Stelmach_Resume.pdf":
      "Dennis_James_Stelmach_Resume.pdf",
    "src/_assets/models": "models",
  });

  eleventyConfig.addPassthroughCopy({
    "node_modules/three/build": "vendor/three/build",
    "node_modules/three/examples/jsm/loaders/STLLoader.js":
      "vendor/three/addons/loaders/STLLoader.js",
    "node_modules/three/examples/jsm/controls/OrbitControls.js":
      "vendor/three/addons/controls/OrbitControls.js",
  });
  eleventyConfig.addPassthroughCopy("src/model-viewer.js");

  // Same as title except it handles hyphens in words
  eleventyConfig.addFilter("titleFull", (obj) =>
    obj.replace(/\w[^\s-]*/g, (s) => s.charAt(0).toUpperCase() + s.slice(1)),
  );
  eleventyConfig.addFilter("prepend", (obj, prefix) => `${prefix}${obj}`);
  eleventyConfig.addFilter("jsonSafe", (value) =>
    JSON.stringify(value).replace(/</g, "\\u003c"),
  );
  // Ingests an asset path and outputs the file size in human-readable format
  eleventyConfig.addFilter("fileSize", (url, decimals = 1) => {
    try {
      const bytes = statSync(`src/_assets${url}`).size;
      if (bytes == 0) return "0 Bytes";

      const k = 1024;
      const dm = Math.max(decimals, 0);
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    } catch {
      return "";
    }
  });
}

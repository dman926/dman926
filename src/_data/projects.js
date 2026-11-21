const projects = [
  {
    id: "semiconductor-tracker",
    categories: ["software"],
    title: "Semiconductor Production Tracker",
    subtitle: "Internal Engineering Apps: Takeover & Rebuild",
    description:
      "Took over two internal React apps that track in-progress semiconductor batches and their history, and rebuilt them while the company kept using them.",
    tags: [
      "React",
      "TypeScript",
      "GraphQL",
      "AppSync",
      "DynamoDB",
      "Redshift",
      "Aurora",
    ],
    metrics: [
      { value: "2", label: "Apps Rebuilt" },
      { value: "3", label: "Data Stores" },
      { value: "Sole", label: "Engineer at the End" },
    ],
    details: [
      {
        label: "Overview",
        text: "Contracted to fix two internal React apps for tracking batches and their history. The work replaced so much, including dashboards, charts and reports, that the apps were effectively rebuilt, all while production staff kept using them.",
      },
      {
        label: "Data Layer",
        text: "Batch data lived across DynamoDB, Redshift and Aurora, queried through AppSync and GraphQL.",
      },
      {
        label: "Ownership",
        text: "Became the sole engineer after the rest of the team was let go, covering new features, infrastructure and deployments, and handling client communication in place of a project manager. Covered by Jest/Vitest unit tests and Playwright end-to-end tests.",
      },
    ],
  },
  {
    id: "biomedical-dashboard",
    categories: ["software"],
    title: "Biomedical Customer Portal",
    subtitle: "Multi-Tenant Analytics Rebuild",
    description:
      "Rebuilt a customer portal for exploring experiment results through graphs and tables, serving 100+ corporate customers over a very large combined dataset.",
    tags: [
      "TypeScript",
      "PostgreSQL",
      "AWS Cognito",
      "RxJS",
      "SSR",
      "Playwright",
    ],
    metrics: [
      { value: "100+", label: "Corporate Customers" },
      { value: "10-1,000", label: "Employees per Customer" },
      { value: "Multi-Tenant", label: "Federated Architecture" },
    ],
    details: [
      {
        label: "Overview",
        text: "Lead developer on a rebuild of a messy existing app so it could handle far more users. I designed the database and API layer, managed the engineers on the project, and relayed decisions and requirements between senior leadership and the team.",
      },
      {
        label: "Performance",
        text: "Cursor-based pagination lets graphs and tables load lazily, fetching only the section the user is viewing. State is managed with RxJS streams, so several layers of filtering and calculation can be applied while the source data stays intact.",
      },
      {
        label: "Security",
        text: "Security was a first requirement after problems with the old version: server-side rendering to shrink the attack surface, a direct PostgreSQL connection, and authentication on AWS Cognito with SRP.",
      },
      {
        label: "Multi-Tenancy",
        text: "A federated architecture gives each business customer an isolated portal they can configure and brand themselves. Tested with Jest/Vitest unit tests and Playwright end-to-end tests.",
      },
    ],
  },
  {
    id: "homelab",
    categories: ["infrastructure"],
    title: "Homelab",
    subtitle: "Self-Hosted, Resilient Infrastructure",
    description:
      "A Proxmox-based home server and Ubiquiti network that hosts media, game and web services, and Home Assistant, with UPS-backed graceful shutdown.",
    tags: [
      "Proxmox",
      "ZFS",
      "Dell PowerEdge",
      "UniFi",
      "Home Assistant",
      "Plex",
      "Jellyfin",
      "Linux",
    ],
    metrics: [
      { value: "4× SSD", label: "ZFS Mirrored Pairs" },
      { value: "15 TB", label: "Bulk Media Storage" },
      { value: "Auto", label: "UPS Graceful Shutdown" },
    ],
    details: [
      {
        label: "Overview",
        text: "A second-hand Dell PowerEdge R720 running Proxmox, alongside a full UniFi network, all behind a 2U UPS. Everything is self-hosted and built to ride out a power loss.",
      },
      {
        label: "Compute & Storage",
        text: "Four 1 TB SSDs are arranged as two mirrored pairs in ZFS (for a total of 2 TB at 2x speed) for the boot and main drives. A 3 TB and a 12 TB hard drive hold the NAS and media library. I plan to expand this to four 16 TB drives in ZFS mirrored pairs in the future.",
      },
      {
        label: "Services",
        text: "Plex and Jellyfin each run in their own VM. The server also hosts dynamic DNS, web servers, game servers and Home Assistant, with a PoE-connected SMLight SLZB-MR1 Zigbee/Thread adapter for home automation.",
      },
      {
        label: "Network",
        text: "A UniFi Dream Machine SE, three Wi-Fi 7 access points and multiple UniFi switches, managed as one system.",
      },
      {
        label: "Power Resilience",
        text: "A 2U UPS covers the server, network gear, my desktop and nearby devices. When mains power drops, the PowerEdge shuts itself down safely and alerts other devices to do the same, which keeps the network up as long as possible.",
      },
    ],
  },
  {
    id: "parametric-cad-and-hardware",
    categories: ["hardware"],
    title: "Parametric CAD and Hardware",
    subtitle: "Code-Driven Design",
    description:
      "Functional parts designed in OpenSCAD with BOSL2 and 3D printed: home electronics, vehicle fixes and large-format assemblies.",
    tags: ["OpenSCAD", "3D Printing", "Parametric Design"],
    metrics: [],
    details: [
      {
        label: "Overview",
        text: "Parts I needed and couldn't buy, modeled as code so the dimensions are variables I can change and reprint.",
      },
    ],
    models: [
      {
        name: "NEMA 5-15P outlet AC power monitor",
        description: [
          "A simple board centered around an ESP32C3 microcontroller connected to two 20A AC712 current sensors. Using a known average voltage (120VAC for North America), the power used by the devices connected to each outlet can be individually monitored.",
          'I use this to watch when my washing machine and dryer stop, which will send a push notification to my phone via <a href="https://www.home-assistant.io/" target="_blank" rel="noopener noreferrer">Home Assistant</a>, making my dumb devices "smart" in a way I can control.',
        ].join("\n\n"),
        preview: ["/models/nema_5-15p_ammeter/nema_5-15p_ammeter.stl"],
        files: [
          {
            label: "nema_5-15p_ammeter.stl",
            path: "/models/nema_5-15p_ammeter/nema_5-15p_ammeter.stl",
          },
          {
            label: "nema_5-15p_ammeter_cover.stl",
            path: "/models/nema_5-15p_ammeter/nema_5-15p_ammeter_cover.stl",
          },
          {
            label: "nema_5-15p_ammeter.scad",
            path: "/models/nema_5-15p_ammeter/nema_5-15p_ammeter.scad",
            note: "Source",
          },
        ],
      },
      {
        name: "Miata hood dampers and push pins",
        material: "TPU + Polycarbonate",
        description:
          'Flexible TPU dampers that soften and secure the hood when it closes, with rigid polycarbonate push pins that hold them in place. The pin should be printed horizontally with the "bowl" facing up.',
        preview: [
          "/models/miata_hood_damper/hood_damper.stl",
          "/models/miata_hood_damper/hood_damper_clip.stl",
        ],
        files: [
          {
            label: "hood_damper.stl",
            path: "/models/miata_hood_damper/hood_damper.stl",
            note: "TPU",
          },
          {
            label: "hood_damper_clip.stl",
            path: "/models/miata_hood_damper/hood_damper_clip.stl",
            note: "Polycarbonate",
          },
          {
            label: "hood_damper.scad",
            path: "/models/miata_hood_damper/hood_damper.scad",
            note: "Source",
          },
          {
            label: "hood_damper_clip.scad",
            path: "/models/miata_hood_damper/hood_damper_clip.scad",
            note: "Source",
          },
        ],
      },
      {
        name: "FJ Cruiser e-brake bracket bushing",
        material: "TPU",
        description:
          "The rough metal factory bracket have no bushing, and the e-brake cables were wearing against them. This bushing, printed in two halves and joined with high-temp zip-ties after being put in place, provides a tight but forgiving surface for the cables to slide against.",
        preview: ["/models/fj_ebrake_cable_bushing/fj_ebrake_bushing.stl"],
        files: [
          {
            label: "fj_ebrake_bushing.stl",
            path: "/models/fj_ebrake_cable_bushing/fj_ebrake_bushing.stl",
          },
          {
            label: "fj_ebrake_bushing.scad",
            path: "/models/fj_ebrake_cable_bushing/fj_ebrake_bushing.scad",
            note: "Source",
          },
        ],
      },
    ],
  },
  {
    id: "svelte-md",
    categories: ["software", "open-source"],
    title: "@dman926/svelte-md",
    subtitle: "Markdown for Svelte",
    description:
      "A lightweight markdown renderer and editor for Svelte, published on npm.",
    tags: ["Svelte 5", "TypeScript", "npm"],
    metrics: [],
    details: [
      {
        label: "Why",
        text: "I wanted an inline editor like chat boxes on AI platforms, but all I could find were renderers, tokenizers, or side-by-side editors. I tried to build a solution using them, but they got quickly out of hand needing to adjust tokenization logic to better handle editing, namely with handling where the cursor belongs, and was also not very performant since every keystroke demanded a full re-parsing step. So I decided to build my own solution.",
      },
      {
        label: "Features",
        text: [
          "- Only dependency is Svelte for rendering, leaving the parser portable and simple to use",
          "- Optimized performance through incremental parsing",
          "- Customizable with extensible block and inline parser rules",
        ].join("\n"),
      },
    ],
    externalLink: {
      label: "View on NPM",
      url: "https://www.npmjs.com/package/@dman926/svelte-md",
    },
  },
  {
    id: "better-auth-conjoined-email",
    categories: ["software", "open-source"],
    title: "@dman926/better-auth-conjoined-email",
    subtitle: "Better Auth Plugin",
    description:
      "A Better Auth plugin to combine the functionality of Better Auth's Magic link and Email OTP plugins into a single email, published on npm.",
    tags: ["Better Auth", "TypeScript", "Authentication", "npm"],
    metrics: [],
    details: [
      {
        label: "Why",
        text: `There isn't a clean way to have both the better-auth <a href="https://better-auth.com/docs/plugins/magic-link" target="_blank" rel="noopener noreferrer">magicLink</a> and <a href="https://better-auth.com/docs/plugins/email-otp" target="_blank" rel="noopener noreferrer">emailOTP</a> plugins defined in your auth config and have both fire at the same time, sending a single email with both authentication options, so I made this plugin.`,
      },
      {
        label: "Server Configuration",
        lang: "js",
        code: `// src/server/auth.ts
import { betterAuth } from "better-auth";
import { conjoinedEmailPlugin } from "@dman926/better-auth-conjoined-email";

export const auth = betterAuth({
  // ...
  plugins: [
    conjoinedEmailPlugin({
      sendAuthenticationEmail: ({ email, otp, magicLink, magicLinkToken }) => {
        // Send the email containing both OTP and magic link
      },
    }),
    // magicLink and emailOTP plugins are contained in conjoinedEmailPlugin
    // and do not need to be added
  ],
});`,
      },
      {
        label: "Client Configuration",
        lang: "js",
        code: `// src/client/auth.ts
import { createAuthClient } from "better-auth/svelte";
import { conjoinedEmailClient } from "@dman926/better-auth-conjoined-email/client";

export const authClient = createAuthClient({
  plugins: [
    conjoinedEmailClient(),
    // magicLinkClient and emailOTPClient are contained in conjoinedEmailClient
    // and do not need to be added
  ],
});`,
      },
      {
        label: "Usage",
        lang: "jsx",
        code: `// src/routes/some-page.tsx
import { useCallback, useState } from "react"
import { authClient } from "src/client/auth";

export function SignIn() {
  const [email, setEmail] = useState('');

  const handleSignIn = useCallback((ev) => {
    ev.preventDefault();

    // Send the email containing an OTP code and a magic link
    authClient.signIn.conjoinedEmail({ email });
    // auth.api.sendConjoinedEmail is available on the server auth
  }, [email]);

  return (
    <input
      type="email"
      placeholder="Email"
      value={email}
      onInput={(ev) => { setEmail(ev.target.value) }}
    />
    <button onClick={handleSignIn}>Sign In</button>
  );
}`,
      },
      {
        label: "Options",
        text: [
          '<div class="card-section-wrapper">',
          "<table>",
          "<tr>",
          "<th>Option</th>",
          "<th>Description</th>",
          "<th>Default</th>",
          "</tr>",
          "<tr>",
          "<td>sendAuthenticationEmail</td>",
          "<td>Handler to send the authentication email. `email`, `otp`, `magicLink`, and `magicLinkToken` are provided as the first parameter</td>",
          "<td>*</td>",
          "</tr>",
          "<tr>",
          "<td>otpLength</td>",
          "<td>The length of the OTP code</td>",
          "<td>6</td>",
          "</tr>",
          "<tr>",
          "<td>expiresIn</td>",
          "<td>The time in seconds the magic link and OTP code are valid for. Can also be provided as an object\n`({ magicLink: number; emailOTP: number })`\nto describe each expire time</td>",
          "<td>600\n(10 minutes)</td>",
          "</tr>",
          "<tr>",
          "<td>allowSimultaneousUse</td>",
          "<td>When `true`, users can authenticate through both methods, where-as normally when one method is used, the other is invalidated</td>",
          "<td>false</td>",
          "</tr>",
          "</table>",
          "</div>",
        ].join("\n"),
      },
    ],
    externalLink: {
      label: "View on NPM",
      url: "https://www.npmjs.com/package/@dman926/better-auth-conjoined-email",
    },
  },
];

const deepCopy = (obj, visited = new WeakMap()) => {
  // Handle primitives and null
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // Check if we've already copied this object (handles circular references)
  if (visited.has(obj)) {
    return visited.get(obj);
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    const copy = [];
    visited.set(obj, copy);
    copy.push(...obj.map((item) => deepCopy(item, visited)));
    return copy;
  }

  // Handle objects
  const copy = {};
  visited.set(obj, copy);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCopy(obj[key], visited);
    }
  }

  return copy;
};

export default function () {
  return {
    all: projects,
    terminalProjects: projects.map(({ id, categories, url }) => ({
      id,
      categories,
      url,
    })),
    categories: [
      "all",
      ...Array.from(
        new Set(projects.flatMap(({ categories }) => categories)),
      ).filter(Boolean),
    ],
  };
}

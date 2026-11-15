const projects = [
  {
    id: "semiconductor-tracker",
    categories: ["software"],
    title: "Semiconductor Production Tracker",
    subtitle: "Legacy Codebase Stabilization & Refactoring",
    description: "Rescued and stabilized an internal production tracking system under contract, resolving critical bottlenecks and race conditions.",
    tags: ["TypeScript", "Node.js", "PostgreSQL", "Legacy Debugging"],
    metrics: [
      { value: "100%", label: "Data Integrity" },
      { value: "Zero", label: "Downtime Incidents" },
    ],
    details: [
      {
        label: "Overview",
        text: "Contracted to audit, refactor, and stabilize a production tracking tool for semiconductor manufacturing histories. Streamlined database queries and eliminated race conditions in concurrent data logging.",
      },
      {
        label: "Code Snippet",
        code: "const result = await db.transaction(async (trx) => {\n  return await trx.query(batchInsertSQL, batchValues);\n});",
      },
    ],
  },
  {
    id: "biomedical-dashboard",
    categories: ["software"],
    title: "Biomedical Data Dashboard",
    subtitle: "Tenant-Based Analytics & Report Generator",
    description: "Multi-tenant data dashboard rendering complex medical and drug dosing analytics with automated report generation.",
    tags: ["Full-Stack", "TypeScript", "PostgreSQL", "Data Viz"],
    metrics: [
      { value: "Multi-Tenant", label: "Architecture" },
      { value: "Automated", label: "PDF Reports" },
    ],
    details: [
      {
        label: "Overview",
        text: "Built a secure, tenant-isolated reporting dashboard for biomedical datasets, translating raw tabular metrics into interactive charts and automated downloadable reports.",
      },
      {
        label: "Code Snippet",
        code: "export function verifyTenant(req, res, next) {\n  const tenantId = req.headers['x-tenant-id'];\n  req.db = getTenantConnection(tenantId);\n  next();\n}",
      },
    ],
  },
  {
    id: "homelab",
    categories: ["todo"],
    title: "Homelab",
    subtitle: "",
    description: "",
    tags: [],
    metrics: [
      { value: "", label: "" },
      { value: "", label: "" },
    ],
    details: [
      {
        label: "",
        text: "",
      },
      {
        label: "",
        code: "",
      },
    ],
  },
  {
    id: "parametric-cad-and-hardware",
    categories: ["todo"],
    title: "Parametric CAD and Hardware",
    subtitle: "",
    description: "",
    tags: [],
    metrics: [
      { value: "", label: "" },
      { value: "", label: "" },
    ],
    details: [
      {
        label: "",
        text: "",
      },
      {
        label: "",
        code: "",
      },
    ],
  },
  {
    id: "svelte-md",
    categories: ["todo"],
    title: "@dman926/svelte-md",
    subtitle: "",
    description: "",
    tags: [],
    metrics: [
      { value: "", label: "" },
      { value: "", label: "" },
    ],
    details: [
      {
        label: "",
        text: "",
      },
      {
        label: "",
        code: "",
      },
    ],
  },
  {
    id: "better-auth-conjoined-email",
    categories: ["todo"],
    title: "@dman926/better-auth-conjoined-email",
    subtitle: "",
    description: "",
    tags: [],
    metrics: [
      { value: "", label: "" },
      { value: "", label: "" },
    ],
    details: [
      {
        label: "",
        text: "",
      },
      {
        label: "",
        code: "",
      },
    ],
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

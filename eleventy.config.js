/** @type {import('@11ty/eleventy').Config}  */
export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy({
    "src/_assets/favicon.svg": "favicon.svg",
    "src/_assets/favicon.ico": "favicon.ico",
    "src/_assets/apple-touch-icon.png": "apple-touch-icon.png",
    "src/_assets/robots.txt": "robots.txt",
    "src/_assets/Dennis_James_Stelmach_Resume.pdf": "Dennis_James_Stelmach_Resume.pdf",
  });

  // Same as title except it handles hyphens in words
  eleventyConfig.addFilter("titleFull", (obj) => obj.replace(/\w[^\s-]*/g, (s) => s.charAt(0).toUpperCase() + s.slice(1)));
  eleventyConfig.addFilter("prepend", (obj, prefix) => `${prefix}${obj}`);
  eleventyConfig.addFilter("jsonSafe", (value) =>
    JSON.stringify(value).replace(/</g, "\\u003c"),
  );
}

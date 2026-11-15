/** @type {import('@11ty/eleventy').Config}  */
export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");
  eleventyConfig.addPassthroughCopy("src/styles.css");

  eleventyConfig.addFilter("prepend", (obj, prefix) => `${prefix}${obj}`);
  eleventyConfig.addFilter("jsonSafe", (value) =>
    JSON.stringify(value).replace(/</g, "&lt;"),
  );
}

/** @type {import('@11ty/eleventy').Config}  */
export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy({"src/_assets/favicon.svg": "favicon.svg"});
  eleventyConfig.addPassthroughCopy({"src/_assets/favicon.ico": "favicon.ico"});
  eleventyConfig.addPassthroughCopy({"src/_assets/apple-touch-icon.png": "apple-touch-icon.png"});

  eleventyConfig.addFilter("prepend", (obj, prefix) => `${prefix}${obj}`);
  eleventyConfig.addFilter("jsonSafe", (value) =>
    JSON.stringify(value).replace(/</g, "&lt;"),
  );
}

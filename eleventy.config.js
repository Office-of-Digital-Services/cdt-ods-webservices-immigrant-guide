//@ts-check
import { minify } from "terser";
import { parse } from "csv-parse/sync";
import postcss from "postcss";
import PurgeCSS from "@fullhuman/postcss-purgecss";

/**
 * @typedef {import("./node_modules/@11ty/eleventy/src/defaultConfig.js").defaultConfig} EleventyDefaultConfig
 * @typedef {import("@11ty/eleventy/UserConfig").default} EleventyConfig
 */

export default async function (/** @type {EleventyConfig} **/ eleventyConfig) {
  const domain = "https://www.celebrate.ca.gov";

  eleventyConfig.addGlobalData("layout", "base-layout");

  eleventyConfig.addPassthroughCopy({
    "src/images": "images",
    "src/root": "/",
    "src/fonts": "fonts"
  });

  eleventyConfig.addWatchTarget("./src");

  /**
   * @param {string} content
   */
  const minifyCSS = content =>
    content
      .replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "")
      .replace(/ {2,}/g, " ")
      .replace(/ ([{:}]) /g, "$1")
      .replace(/([{:}]) /g, "$1")
      .replace(/([;,]) /g, "$1")
      .replace(/ !/g, "!");

  // PurgeCSS filter to extract only used CSS
  eleventyConfig.addFilter(
    "purgeCSS",
    async (
      /** @type {string} */ css,
      contentPaths = [
        "./pages/**/*.html",
        "./src/css/**/*.css",
        "./src/js/**/*.mjs",
        "./src/_includes/**/*.html",
        "./node_modules/@cagovweb/state-template/dist/js/cagov.core.min.js"
      ]
    ) => {
      const result = await postcss([
        // @ts-ignore
        PurgeCSS({
          content: contentPaths,
          safelist: [
            ":nth-child",
            ":first-of-type",
            ":first-child",
            ":hover",
            ":focus",
            /focus/,
            "focus-visible",
            "focus-within",
            /^modal-backdrop/
          ],
          defaultExtractor: (/** @type {string} */ content) =>
            content.match(/[\w-/:]+(?<!:)/g) || []
        })
      ]).process(css, { from: undefined });
      // Minify the purged CSS
      return minifyCSS(result.css);
    }
  );

  eleventyConfig.addFilter(
    "sortByDate",
    (items, property, direction = "asc") => {
      if (!Array.isArray(items)) return [];

      const multiplier = direction === "desc" ? -1 : 1;

      return [...items].sort((left, right) => {
        const leftValue = left?.[property];
        const rightValue = right?.[property];
        const leftTime =
          leftValue instanceof Date
            ? leftValue.getTime()
            : new Date(leftValue).getTime();
        const rightTime =
          rightValue instanceof Date
            ? rightValue.getTime()
            : new Date(rightValue).getTime();

        if (Number.isNaN(leftTime) && Number.isNaN(rightTime)) return 0;
        if (Number.isNaN(leftTime)) return 1;
        if (Number.isNaN(rightTime)) return -1;

        return (leftTime - rightTime) * multiplier;
      });
    }
  );

  eleventyConfig.addFilter("sortBy", (items, property, direction = "asc") => {
    if (!Array.isArray(items)) return [];
    if (!property) return [...items];

    const multiplier = direction === "desc" ? -1 : 1;

    return [...items].sort((left, right) => {
      const leftValue = left?.[property];
      const rightValue = right?.[property];

      if (leftValue === undefined && rightValue === undefined) return 0;
      if (leftValue === undefined) return 1;
      if (rightValue === undefined) return -1;

      if (typeof leftValue === "number" && typeof rightValue === "number") {
        return (leftValue - rightValue) * multiplier;
      }

      return String(leftValue).localeCompare(String(rightValue)) * multiplier;
    });
  });

  eleventyConfig.addFilter("groupBy", (items, property) => {
    if (!Array.isArray(items)) return [];

    const groups = [];
    const groupsByKey = new Map();

    for (const item of items) {
      const key = item?.[property] ?? "";

      if (!groupsByKey.has(key)) {
        const group = { key, items: [] };
        groupsByKey.set(key, group);
        groups.push(group);
      }

      groupsByKey.get(key).items.push(item);
    }

    return groups;
  });

  eleventyConfig.addFilter("sortByOrder", (items, property, order = []) => {
    if (!Array.isArray(items)) return [];
    if (!Array.isArray(order) || order.length === 0) return [...items];

    const orderMap = new Map(order.map((value, index) => [value, index]));

    return [...items].sort((left, right) => {
      const leftIndex = orderMap.get(left?.[property]);
      const rightIndex = orderMap.get(right?.[property]);

      if (leftIndex === undefined && rightIndex === undefined) return 0;
      if (leftIndex === undefined) return 1;
      if (rightIndex === undefined) return -1;

      return leftIndex - rightIndex;
    });
  });

  eleventyConfig.addNunjucksAsyncFilter(
    "cssmin",
    /**
     *
     * @param {string} code
     * @param {(arg0: null, arg1: string) => void} callback
     */

    async (code, callback) => {
      callback(null, minifyCSS(code));
    }
  );

  eleventyConfig.addNunjucksAsyncFilter(
    "jsmin",
    /**
     *
     * @param {string} code
     * @param {(arg0: null, arg1: string) => void} callback
     */
    async (code, callback) => {
      const minified = await minify(code);
      callback(null, minified.code || "");
    }
  );

  eleventyConfig.addFilter("allSamples", function (collection) {
    const samples = (collection || []).filter(
      item =>
        item.data?.layout === "sample" ||
        item.data?.tags?.includes("sample") ||
        item.data?.isSample === true
    );
    return samples.length > 0 ? samples : [{ url: "#" }];
  });

  // canonical shortcode
  // Usage <link href="{% canonical %}" rel="canonical" />
  eleventyConfig.addShortcode(
    "canonical",
    /** @type {  (this: { ctx: { page: { url: string } } }) => string} */ function () {
      return domain + this.ctx.page.url;
    }
  );

  eleventyConfig.addDataExtension("csv", (/** @type {string} */ contents) =>
    parse(contents, {
      columns: (/** @type {string[]} */ header) =>
        header.map(col => col.replace(/\W+/g, "_")),
      skip_empty_lines: true,
      cast: value => {
        // Boolean value parsing
        if (["true", "false"].includes(value)) return value === "true";
        // Date value parsing (ISO 8601 or yyyy-mm-dd)
        if (
          typeof value === "string" &&
          /^\d{4}-\d{2}-\d{2}(T.*)?$/.test(value)
        ) {
          const date = new Date(value);
          if (!isNaN(date.getTime())) return date;
        }
        // Support dates like "5/16/26"
        if (
          typeof value === "string" &&
          /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(value)
        ) {
          // Normalize to mm/dd/yyyy
          const parts = value.split("/");
          let year = parts[2];
          if (year.length === 2) {
            year = Number(year) < 50 ? "20" + year : "19" + year;
          }
          const normalized = `${parts[0].padStart(2, "0")}/${parts[1].padStart(2, "0")}/${year}`;
          const date = new Date(normalized);
          if (!isNaN(date.getTime())) return date;
        }
        return value;
      }
    })
  );

  //Start with default config, easier to configure 11ty later
  /** @type {EleventyDefaultConfig} */
  const config = {
    // allow nunjucks templating in .html files
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "11ty.js", "md"],
    keys: {},
    dir: {
      // site content pages
      input: "pages",
      data: "../src/_data"
    }
  };

  return config;
}

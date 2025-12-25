const fs = require("fs");

const redirects = JSON.parse(fs.readFileSync("./redirects.json")).redirects;

const addRedirect = (from, to, statusCode = 301) => {
  if (to.at(-1) !== "/") {
    to += "/";
  }

  return `${from} ${to} 301`;
};

const lines = redirects
  .flatMap((r) => {
    if (typeof r.from === "string") {
      return addRedirect(r.from, r.to);
    }

    return r.from.map((rr) => addRedirect(rr, r.to));
  })
  .sort();

lines.push(
  "/docs/next/* /core/docs/:splat 301",
  "/docs/* /core/docs/:splat 301",
  "/tutorial/* /core/tutorial/:splat",
  "/templates /core/templates/ 301",
  "/templates/* /core/templates/:splat 301",
  "/templates/* /core/templates/:splat 301",
  "/integrations /core/integrations/",
);

fs.writeFileSync("./static/_redirects", lines.join("\n\n"));

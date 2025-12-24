const fs = require("fs");

const redirects = JSON.parse(fs.readFileSync("./redirects.json")).redirects;

console.log(redirects);

const lines = redirects.map((r) => `${r.from} ${r.to} 301`).join("\n\n");

fs.writeFileSync("redirects", lines);

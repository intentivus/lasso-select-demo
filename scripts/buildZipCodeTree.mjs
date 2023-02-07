import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import buildSpatialTree from "./buildSpatialTree.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "data/geography/zip-codes-2020.geojson")
  )
);

const tree = buildSpatialTree(data, {
  idProperty: "GEOID20",
  indexProperty: "GEOID20",
});

// write the tree to a json file using node.js
const treeJson = JSON.stringify(tree.toJSON());
fs.writeFileSync("data/geography/zip-codes-tree.json", treeJson);

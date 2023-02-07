import RBush from "rbush";
import * as turf from "@turf/turf";

export default function buildSpatialTree(data, options) {
  const { idProperty, indexProperty } = options;
  const tree = new RBush();
  const features = data.features.map((feature) => {
    const id = feature.properties[idProperty];
    const index = feature.properties[indexProperty];
    // bbox extent in [minX, minY, maxX, maxY] order
    const bbox = turf.bbox(feature);
    return {
      ...feature,
      id,
      index,
      minX: bbox[0],
      minY: bbox[1],
      maxX: bbox[2],
      maxY: bbox[3],
    };
  });
  tree.load(features);
  return tree;
}

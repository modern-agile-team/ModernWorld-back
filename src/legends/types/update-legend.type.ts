import { UpdateLegendCount } from "../interfaces/update-legend-count.interface";

export type SingleLegendField = {
  [K in keyof UpdateLegendCount]?: UpdateLegendCount[K];
};

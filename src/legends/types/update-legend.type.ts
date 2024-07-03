type LegendField = {
  itemCount: string;
  attendanceCount: string;
  likeCount: string;
  commentCount: string;
  presentCount: string;
};

type UpdateCount<T extends keyof LegendField> = {
  [K in T]: { increment: number };
};

export type UpdateLegendType =
  | UpdateCount<"itemCount">
  | UpdateCount<"attendanceCount">
  | UpdateCount<"likeCount">
  | UpdateCount<"commentCount">
  | UpdateCount<"presentCount">;

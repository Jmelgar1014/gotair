import { responseType } from "@/app/api/submit/route";

export type paginationType = {
  page: responseType[];
  isDone: boolean;
  continueCursor: string;
  splitCursor?: string | null;
  pageStatus?: "SplitRecommended" | "SplitRequired" | null;
};

import { userSubmitType } from "@/app/api/submit/route";

export type paginationType = {
  page: userSubmitType[];
  isDone: boolean;
  continueCursor: string;
  splitCursor?: string | null;
  pageStatus?: "SplitRecommended" | "SplitRequired" | null;
};

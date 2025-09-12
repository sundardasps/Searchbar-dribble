import { type IconType } from "react-icons";

type StatusKey =
  | "activeNow"
  | "active"
  | "unActivated"
  | "inPresentations"
  | "inVideos"
  | "inProjects"
  | "inPhotosOrAssets";

type RowType = "people" | "files" | "images" | "video";

interface RowData {
  title: string;
  status: StatusKey;
  avatar: string | null;
  type: RowType;
  createdAt: string | null;
  updatedAt: string | null;
  link: string | null;
  count?: number;
}

interface RowCardProps {
  data: RowData;
  searchQury: string;
}

interface TabItemTypes {
  title: string;
  icon: IconType | null;
  count: number;
}

export type { RowCardProps, RowData, RowType, StatusKey, TabItemTypes };

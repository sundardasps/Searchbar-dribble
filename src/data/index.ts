import { Icon } from "../assets/icons";
import alex from "../assets/images/alex-mccarthy-RGKdWJOUFH0-unsplash.jpg";
import alexander from "../assets/images/alexander-hipp-iEEBWgY_6lA-unsplash.jpg";
import craig from "../assets/images/craig-mckay-jmURdhtm7Ng-unsplash.jpg";
import darshan from "../assets/images/darshan-patel-QJEVpydulGs-unsplash.jpg";
import jonas from "../assets/images/jonas-kakaroto-mjRwhvqEC0U-unsplash (1).jpg";
import joseph from "../assets/images/joseph-gonzalez-iFgRcqHznqg-unsplash.jpg";
import philip from "../assets/images/philip-martin-5aGUyCW_PJw-unsplash.jpg";
import stefan from "../assets/images/stefan-stefancik-QXevDflbl8A-unsplash.jpg";
import type { RowData, RowType, StatusKey } from "../types";

const tabs = [
  {
    title: "all",
    icon: null,
    count: 0,
  },
  {
    title: "files",
    icon: Icon.paperClip,
    count: 0,
  },
  {
    title: "people",
    icon: Icon.user,
    count: 0,
  },
  {
    title: "chats",
    icon: Icon.chat,
    count: 0,
  },
  {
    title: "list",
    icon: Icon.list,
    count: 0,
  },
];

const statusStates: Record<StatusKey, { color: string | null; text: string }> =
  {
    activeNow: { color: "green", text: "Active Now" },
    active: { color: "orange", text: "Active" },
    unActivated: { color: "red", text: "Unactivated" },
    inPresentations: { color: null, text: "In Presentations" },
    inVideos: { color: null, text: "In Videos" },
    inProjects: { color: null, text: "In Projects" },
    inPhotosOrAssets: { color: null, text: "In Photos/Assets" },
  };

const rowDetails: Record<
  RowType,
  { icon: React.ComponentType<{ className?: string }> | null }
> = {
  people: { icon: null },
  files: { icon: Icon.folder },
  images: { icon: Icon.image },
  video: { icon: Icon.play },
};

const filesTabType = ["files", "images", "videos"];

const data:RowData[] = [
  {
    title: "Alexander Hipp", 
    status: "active",
    avatar: alexander,
    type: "people",
    createdAt: "2025-08-15",
    updatedAt: "2025-09-05",
    link: null,
  },
  {
    title: "logo_vector.ai",
    status: "inPhotosOrAssets",
    avatar: null,
    type: "images",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-15",
    count: 0,
    link: "http://dummy/logo_vector.ai/details",
  },
  {
    title: "Craig Mckay", 
    status: "unActivated",
    avatar: craig,
    type: "people",
    createdAt: "2025-07-21",
    updatedAt: "2025-08-30",
    link: null,
  },
  {
    title: "Darshan Patel", 
    status: "unActivated",
    avatar: darshan,
    type: "people",
    createdAt: "2025-06-12",
    updatedAt: null,
    link: null,
  },
  {
    title: "Alex Mccarthy", 
    status: "activeNow",
    avatar: alex,
    type: "people",
    createdAt: "2025-09-01",
    updatedAt: "2025-09-10",
    link: null,
  },
  {
    title: "wireframe.sketch",
    status: "inProjects",
    avatar: null,
    type: "files",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-25",
    count: 0,
    link: "http://dummy/wireframe.sketch/details",
  },
  {
    title: "Jonas Kakaroto", 
    status: "unActivated",
    avatar: jonas,
    type: "people",
    createdAt: "2025-05-10",
    updatedAt: "2025-06-18",
    link: null,
  },
  {
    title: "presentation_slides.pptx",
    status: "inPresentations",
    avatar: null,
    type: "files",
    createdAt: "2025-04-05",
    updatedAt: "2025-04-10",
    count: 17,
    link: "http://dummy/presentation_slides.pptx/details",
  },
  {
    title: "training_video.mov",
    status: "inVideos",
    avatar: null,
    type: "video",
    createdAt: "2025-02-01",
    updatedAt: null,
    count: 0,
    link: "http://dummy/training_video.mov/details",
  },
  {
    title: "Joseph Gonzalez", 
    status: "activeNow",
    avatar: joseph,
    type: "people",
    createdAt: "2025-09-01",
    updatedAt: "2025-09-11",
    link: null,
  },
  {
    title: "Philip Martin", 
    status: "active",
    avatar: philip,
    type: "people",
    createdAt: "2025-04-22",
    updatedAt: "2025-05-01",
    link: null,
  },
  {
    title: "Stefan Stefancik", 
    status: "active",
    avatar: stefan,
    type: "people",
    createdAt: "2025-03-05",
    updatedAt: "2025-04-11",
    link: null,
  },

  {
    title: "creative_file.jpg",
    status: "inPhotosOrAssets",
    avatar: null,
    type: "images",
    createdAt: "2025-09-01",
    updatedAt: "2025-09-11",
    count: 4,
    link: "http://dummy/creative_file.jpg/details",
  },
  {
    title: "project_notes.pdf",
    status: "inProjects",
    avatar: null,
    type: "files",
    createdAt: "2025-08-20",
    updatedAt: "2025-09-10",
    count: 0,
    link: "http://dummy/project_notes.pdf/details",
  },
  {
    title: "team_meeting.mp4",
    status: "inVideos",
    avatar: null,
    type: "video",
    createdAt: "2025-07-14",
    updatedAt: null,
    count: 0,
    link: "http://dummy/team_meeting.mp4/details",
  },
  {
    title: "holiday_photos.zip",
    status: "inPhotosOrAssets",
    avatar: null,
    type: "files",
    createdAt: "2025-03-12",
    updatedAt: "2025-03-18",
    count: 0,
    link: "http://dummy/holiday_photos.zip/details",
  },
  {
    title: "design_mockup.png",
    status: "inPhotosOrAssets",
    avatar: null,
    type: "images",
    createdAt: "2025-06-01",
    updatedAt: "2025-06-15",
    count: 0,
    link: "http://dummy/design_mockup.png/details",
  },
  {
    title: "company_budget.xlsx",
    status: "inProjects",
    avatar: null,
    type: "files",
    createdAt: "2025-05-10",
    updatedAt: "2025-05-20",
    count: 0,
    link: "http://dummy/company_budget.xlsx/details",
  },
];

export { tabs, data, rowDetails, statusStates, filesTabType };

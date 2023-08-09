export const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export const routes = {
  DEFAULT: "/",
  LOGIN: "/login",
  ANNOUNCEMENT: "/notification",
  ANNOUNCEMENT_CREATE: "/notification/create",
  INTRODUCTION: "/introduction",
  ANNOUNCEMENT_EDIT: "/notification/edit/:id",
  ANNOUNCEMENT_DETAIL: "/notification/:id",
  FACILITY: "/facility",
  CONTENT: "/content",
  CONTENT_CREATE: "/content/create",
  CONTENT_EDIT: "/content/edit/:id",
  LIVING_LAB: "/living-lab",
  LIVING_LAB_DETAIL: "/living-lab/:id",
  LIVING_LAB_CREATE: "/living-lab/create",
  LIVING_LAB_EDIT: "/living-lab/edit/:id",
  USER_MANAGEMENT: "/user-management",
  CAMPAIGN: "/campaign",
  CAMPAIGN_DETAIL: "/campaign/:id",
  CAMPAIGN_CREATE: "/campaign/create",
  CAMPAIGN_EDIT: "/campaign/edit/:id",
  FREE_BOARD: "/free-board",
  FREE_BOARD_DETAIL: "/free-board/:id",
  FREE_BOARD_CREATE: "/free-board/create",
  FREE_BOARD_EDIT: "/free-board/edit/:id",
  REGISTER: "/register",
  NOT_FOUND: "/404",
};

export const DISTRICT = {
  Busan: "부산",
  "Gijang-gun": "기장군",
  "Geumjeong-gu": "금정구",
  "Haeundae-gu": "해운대구",
  "Buk-gu": "북구",
  "Dongnrae-gu": "동래구",
  "Yeonje-gu": " 연제구",
  "Suyeong-gu": "수영구",
  "Busanjin-gu": "부산진구",
  "Sasang-gu": "사상구",
  "Dong-gu": "동구",
  "Nam-gu": "남구",
  "Seo-gu": "서구",
  "Jung-gu": "중구",
  "Yeongdo-gu": "영도구",
  "Saha-gu": "사하구",
  "Gangseo-gu": "강서구",
};

export const PAGE_SIZE = 10;

export const USER_MANAGEMENT_SEARCH_BY_VALUE = ["name", "email"];

export const COMMON_SEARCH_BY_VALUE = ["title", "author"];

import { Routes, Route } from "react-router-dom";
import Introduction from "./page/IntroductionPage/Introduction";
import BaseLayout from "./Layout/BaseLayout";
import FormLayout from "./login/LoginLayout";
import HomePage from "./page/HomePage/HomePage";
import Notification from "./page/NotificationPage/Notification";
import LivingLab from "./page/LivingLabPage/LivingLab";
import Login from "./login/Login";
import RegisterPage from "./components/register/Register";
import NotFound from "./page/NotFoundPage/NotFound";
import NotificationDetail from "./page/NotificationPage/NotificationDetail";
import CampaignDetail from "./page/CampaignPage/CampaignDetail";
import LivingLabDetail from "./page/LivingLabPage/LivingLabDetail";
import NotificationCreate from "./page/NotificationPage/NotificationCreate/NotificationCreate";
import FreeBoard from "./page/FreeBoardPage/FreeBoard";
import FreeBoarDetail from "./page/FreeBoardPage/FreeBoarDetail";
import NotificationEdit from "./page/NotificationPage/NotificationEdit/NotificationEdit";
import { routes } from "./utils/constants";
import { Content } from "./page/ContentsPage/Content";
import LivingLabCreate from "./page/LivingLabPage/LivingLabCreate/LivingLabCreate";
import LivingLabEdit from "./page/LivingLabPage/LivingLabEdit/LivingLabEdit";
import FreeBoardCreate from "./page/FreeBoardPage/FreeBoardCreate/FreeBoardCreate";
import FreeBoardEdit from "./page/FreeBoardPage/FreeBoardEdit/FreeBoardEdit";
import ContentEdit from "./page/ContentsPage/ContentEdit/ContentEdit";
import ContentCreate from "./page/ContentsPage/ContentCreate/ContentCreate";
import { Campaign } from "./page/CampaignPage/Campaign";
import CampaignCreate from "./page/CampaignPage/CampaignCreate/CampaignCreate";
import CampaignEdit from "./page/CampaignPage/CampaignEdit/CampaignEdit";
import { Facility } from "./page/facility";

function App() {
  return (
    <div className=" max-w-[1920px] scroll-smooth">
      <Routes>
        <Route path={routes.DEFAULT} element={<FormLayout />}>
          <Route path={routes.LOGIN} element={<Login />} />
          <Route path={routes.REGISTER} element={<RegisterPage />} />
        </Route>
        <Route path={routes.DEFAULT} element={<BaseLayout />}>
          <Route index path={routes.DEFAULT} element={<HomePage />} />
          <Route path={routes.NOT_FOUND} element={<NotFound />} />

          <Route path={routes.INTRODUCTION} element={<Introduction />} />
          <Route path={routes.ANNOUNCEMENT} element={<Notification />} />
          <Route
            path={routes.ANNOUNCEMENT_DETAIL}
            element={<NotificationDetail />}
          />
          <Route
            path={routes.ANNOUNCEMENT_CREATE}
            element={<NotificationCreate />}
          />
          <Route
            path={routes.ANNOUNCEMENT_EDIT}
            element={<NotificationEdit />}
          />
          <Route index path={routes.FACILITY} element={<Facility />} />
          <Route index path={routes.CONTENT} element={<Content />} />
          <Route
            index
            path={routes.CONTENT_CREATE}
            element={<ContentCreate />}
          />
          <Route index path={routes.CONTENT_EDIT} element={<ContentEdit />} />
          <Route index path={routes.LIVING_LAB} element={<LivingLab />} />
          <Route
            index
            path={routes.LIVING_LAB_DETAIL}
            element={<LivingLabDetail />}
          ></Route>
          <Route
            path={routes.LIVING_LAB_CREATE}
            element={<LivingLabCreate />}
          />
          <Route path={routes.LIVING_LAB_EDIT} element={<LivingLabEdit />} />
          <Route index path={routes.CAMPAIGN} element={<Campaign />} />
          <Route
            index
            path={routes.CAMPAIGN_CREATE}
            element={<CampaignCreate />}
          />
          <Route path={routes.CAMPAIGN_DETAIL} element={<CampaignDetail />} />
          <Route path={routes.CAMPAIGN_EDIT} element={<CampaignEdit />} />
          <Route index path={routes.FREE_BOARD} element={<FreeBoard />} />
          <Route path={routes.FREE_BOARD_DETAIL} element={<FreeBoarDetail />} />
          <Route
            path={routes.FREE_BOARD_CREATE}
            element={<FreeBoardCreate />}
          />
          <Route path={routes.FREE_BOARD_EDIT} element={<FreeBoardEdit />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

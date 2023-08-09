import { useSelector } from "react-redux";
import { UserType } from "@/models/User.model";
import AdminCampaign from "./AdminCampaign";
import NormalCampaign from "./NormalCampaign";

export const Campaign = () => {
  const role = useSelector((state: any) => state.auth.role);
  if (role === UserType.Admin) return <AdminCampaign />;
  return <NormalCampaign />;
};

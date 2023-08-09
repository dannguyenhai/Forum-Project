import { useSelector } from "react-redux";
import NormalContent from "./NormalContent";
import { UserType } from "@/models/User.model";
import AdminContent from "./AdminContent";

export const Content = () => {
  const role = useSelector((state: any) => state.auth.role);
  if (role === UserType.Admin) return <AdminContent />;
  return <NormalContent />;
};

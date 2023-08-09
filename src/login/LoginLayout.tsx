import NavbarLogin from "@/components/Navbar/NavbarLogin";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer/Footer";
const FormLayout = () => {
  return (
    <div className="grid max-h-screen grid-rows-1 ">
      <NavbarLogin />
      <div className="flex flex-col flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default FormLayout;

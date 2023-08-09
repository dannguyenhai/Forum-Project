import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
const BaseLayout = () => {
  return (
    <div className="grid w-full min-h-screen grid-rows-1 ">
      <Navbar />
      <div className="flex flex-col flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default BaseLayout;

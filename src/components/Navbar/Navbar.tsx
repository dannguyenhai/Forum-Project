// import logoLogo from "../img/logo.png";
import logoLogo from "@/assets/images/introduceLogo.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { routes } from "@/utils/constants";

const Navbar = () => {
  const role = useSelector((state: any) => state.auth.role);
  const buttonRef = useRef<HTMLDivElement>(null);
  const showNavbar = () => {
    buttonRef.current?.classList.toggle("responsive-nav");
  };
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const pathName = location.pathname;
  const checkActive = (to: string) => {
    return pathName === to;
  };
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };
  const LinkList = [
    {
      to: routes.DEFAULT,
      title: t("nav.home"),
      id: 1,
    },
    {
      to: routes.INTRODUCTION,
      title: t("nav.introduction"),
      id: 2,
    },
    {
      to: routes.ANNOUNCEMENT,
      title: t("nav.announcement"),
      id: 3,
    },
    {
      to: routes.FACILITY,
      title: t("nav.facilityStatus"),
      id: 4,
    },
    {
      to: routes.CONTENT,
      title: t("nav.content"),
      id: 5,
    },
    {
      to: routes.LIVING_LAB,
      title: t("nav.livingLab"),
      id: 6,
    },
    {
      to: routes.CAMPAIGN,
      title: t("nav.campaign"),
      id: 7,
    },
    {
      to: routes.FREE_BOARD,
      title: t("nav.campaign"),
      id: 8,
    },
  ];
  const [color, setColor] = useState<string>();
  const getBackground = () => {
    if (checkActive(routes.DEFAULT)) {
      return "text-white";
    }
    if (role === "Admin" && !checkActive(routes.DEFAULT)) {
      return " bg-gradient-to-b from-[#0066C1] to-[#009FE5]";
    } else if (role === "Normal" && !checkActive(routes.DEFAULT)) {
      return "bg-gradient-to-b from-[#008DCC] to-[#008E86]";
    }
  };
  const getColorActive = () => {
    if (role === "Admin") {
      return "text-white font-bold";
    } else if (role === "Normal") {
      return "text-white font-bold";
    }
    return "text-primary font-bold";
  };
  // scroll to Top
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  useEffect(() => {
    function onScroll() {
      const currentPosition = window.pageYOffset;
      if (currentPosition > scrollTop) {
        if (currentPosition > 90)
          if (role !== "Admin" && role !== "Normal")
            setColor("bg-white text-black shadow");
        if (role === "Admin")
          setColor(" bg-gradient-to-b from-[#0066C1] to-[#009FE5]");
        if (role === "Normal")
          setColor("bg-gradient-to-b from-[#008DCC] to-[#008E86]");
        else setScrolling(false);
      } else {
        if (currentPosition < 80) setColor("");
        setScrolling(true);
      }
      setScrollTop(currentPosition <= 0 ? 0 : currentPosition);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);
  return (
    <nav
      className={`${getBackground()} ${color} ${
        checkActive(routes.INTRODUCTION) ? "shadow" : ""
      } flex justify-between p-5 pl-5 md:p-8 flex-center gap-x-10  px-[10px] md:pl-[8%] font-semibold fixed z-50 top-0  w-full`}
    >
      <a
        href={routes.DEFAULT}
        className="flex flex-center justify-between items-end gap-x-5 text-white"
      >
        <img src={logoLogo} className="w-[218px] h-[36px]" alt="" />
        {role === "Admin" && <p>[관리자]</p>}
        {role === "Normal" && <p>[ 리빙랩 관리자 ]</p>}
      </a>
      <div
        ref={buttonRef}
        className="flex items-center justify-around navigation flex-center"
      >
        <ul
          className={`flex justify-between items-center text-xl font-light md:-mr-[40%] navbar gap-x-10 text-black`}
        >
          {role !== "Normal" &&
            LinkList.map((item) => (
              <NavLink
                key={item.id}
                to={item.to}
                onClick={handleScrollToTop}
                className={({ isActive }) => {
                  if (role !== "Normal" && role !== "Admin") {
                    return isActive ? getColorActive() : "";
                  } else return isActive ? getColorActive() : "text-white";
                }}
              >
                {item.title}
              </NavLink>
            ))}

          <NavLink
            className={`${
              role === "Normal" ? "absolute right-5" : ""
            } flex flex-center justify-center md:top-[36px] md:right-[180px] ${
              role !== "Admin" && role !== "Normal"
                ? "text-black"
                : "text-white"
            }`}
            to={routes.FREE_BOARD}
            onClick={() => {
              handleLogOut();
            }}
          >
            로그아웃
          </NavLink>
        </ul>
        <button className="nav-btn" onClick={showNavbar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-7 h-7 button sd:w-[50px] sd:h-[50px]  md:right-20 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <button className="nav-btn nav-close-btn" onClick={showNavbar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8 button nav-close-btn sm:w-[50px] sm:h-[50px]  md:right-20"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;

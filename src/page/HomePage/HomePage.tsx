import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Banner1 from "@/assets/images/landing-1.png";
import Banner2 from "@/assets/images/landing-2.png";
import Banner3 from "@/assets/images/landing-3.png";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ContentsData from "@/components/HomePageData/ContentsData";
import LivingLabData from "@/components/HomePageData/LivingLabData";
import CampaignData from "@/components/HomePageData/CampaignData";
import FreeBoardData from "@/components/HomePageData/FreeBoardData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifySuccess } from "@/components/Notify/Notify";
import { useTranslation } from "react-i18next";
import "./style.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const notice = "/notice";
  const apiUrl = "http://qa.forum-bulletin-board.dev.politetech.com/api/v1";
  const searchValue = "title";
  const pageSize = 4;
  const [dataContent, setDataContent] = useState([
    {
      author: "Author",
      content: "Content",
      created_at: "Created At",
      id: "Id",
      title: "Title",
      updated_at: "Updated At",
      user_id: "User Id",
    },
  ]);
  useEffect(() => {
    axios
      .get(
        `${apiUrl}${notice}?search_value=${searchValue}&page_size=${pageSize}`
      )
      .then((response) => {
        setDataContent(response.data.data.list);
        notifySuccess();
      });
  }, []);
  useEffect(() => {
    const noticeEl = document.querySelectorAll(".notice-card");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("slide-in");
        } else {
          entry.target.classList.remove("slide-in");
        }
      });
    });
    for (let i = 0; i < noticeEl.length; i++) {
      const elements = noticeEl[i];
      observer.observe(elements);
    }
    let active = 2;
    const bannerEl = document.querySelectorAll(".landing-banner");
    const classN = bannerEl[1].className;

    setInterval(() => {
      const nextActive = active - 1 >= 0 ? active - 1 : 2;
      bannerEl[nextActive].className = `${classN} only-scale`;
      bannerEl[active].className = `${classN} banner-out`;
      active = nextActive;
    }, 6000);

    return () => observer.disconnect();
  }, []);
  const handleClickDetail = (id: any) => {
    navigate(`/notification/${id}`);
  };
  return (
    <>
      <div className="w-full h-full">
        <div className="landing-bg z-[-10] flex flex-col items-center justify-center w-full max-w-[1920px]">
          <div
            data-aos="fade-up"
            data-aos-delay="500"
            className="intro-text absolute z-20"
          >
            <h1 className=" whitespace-pre text-center text-[36px] font-bold text-white">
              {t("landing.letBeTogetther")}
            </h1>
            <p className="mt-10 px-padding text-center text-[20px] text-primary-lightest">
              {t("landing.provideInformation")}
            </p>
          </div>
          <img
            src={Banner3}
            alt=""
            className=" landing-banner opacity-1 absolute "
          />
          <img
            src={Banner2}
            alt=""
            className=" landing-banner opacity-1 absolute "
          />
          <img
            src={Banner1}
            alt=""
            className=" landing-banner opacity-1 absolute "
          />
        </div>
        {/* <div className='h-screen' /> */}
      </div>
      <section className="mx-[8%] h-full sm:max-h-[1280px] md:max-h-[2000px] lg:max-h-[922px] mt-[136px]">
        <div className="content-1">
          <div className="flex items-center justify-between mb-6">
            <div
              data-aos="fade-up"
              className=" mb-2 text-2xl  text-transparent md:md-0 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text   text-[#000000] font-extrabold"
            >
              공지사항
            </div>
            <span className="w-[40px] h-[40px] flex items-center justify-center text-center bg-[#0066C1]">
              <FontAwesomeIcon
                icon={faPlus}
                className="text-3xl font-extrabold text-white"
              />
            </span>
          </div>
          <div className="grid h-full gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 content">
            {dataContent.map((items, index) => {
              return (
                <div
                  data-aos="fade-up"
                  data-aos-delay="500"
                  key={index}
                  onClick={() => handleClickDetail(items.id)}
                  className="border flex flex-col gap-y-2 border-[#CCCCCC] rounded-lg max-w-[360px] h-[150px] text-box bg-[##FFFFFF] hover:bg-gradient-to-l from-cyan-500 to-blue-500 hover:text-white p-5"
                >
                  <h3
                    className="text-[##3B4650] font-extrabold text-[15px] line-clamp-1"
                    dangerouslySetInnerHTML={{ __html: items.title }}
                  ></h3>
                  <p
                    className="line-clamp-3 min-h-[60px] text-sm  text-[##606A74]"
                    dangerouslySetInnerHTML={{ __html: items.content }}
                  ></p>
                  <span className="text-xs text-[##3B4650]">
                    {dayjs(items.created_at).format("YYYY-MM-DD")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-x-10 mt-[120px] content-2 sm:max-h-[1280px] md:max-h-[2000px] lg:max-h-[922px]">
          <div className="flex flex-col mt-2">
            <div className="flex items-center justify-between mb-5">
              <div className=" mb-2 text-2xl  text-transparent md:md-0 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text   text-[#000000] font-extrabold">
                콘텐츠
              </div>
              <span className="w-[40px] h-[40px] flex items-center justify-center text-center bg-[#0066C1]">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-3xl font-extrabold text-white "
                />
              </span>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="border-t-2  border-b-2 border-[#0066C1]"
            >
              <ContentsData />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <div className="flex items-center justify-between mb-5">
              <div className=" mb-2 text-2xl  text-transparent md:md-0 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text   text-[#000000] font-extrabold">
                리빙랩
              </div>
              <span className="w-[40px] h-[40px] flex items-center justify-center text-center bg-[#0066C1]">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-3xl font-extrabold text-white "
                />
              </span>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="border-t-2  border-b-2 border-[#0066C1]"
            >
              <LivingLabData />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <div className="flex items-center justify-between mb-5">
              <div className=" mb-2 text-2xl  text-transparent md:md-0 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text   text-[#000000] font-extrabold">
                캠페인
              </div>
              <span className="w-[40px] h-[40px] flex items-center justify-center text-center bg-[#0066C1]">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-3xl font-extrabold text-white "
                />
              </span>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="border-t-2  border-b-2 border-[#0066C1]"
            >
              <CampaignData />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <div className="flex items-center justify-between mb-5">
              <div className=" mb-2 text-2xl  text-transparent md:md-0 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text   text-[#000000] font-extrabold">
                자유게시판
              </div>
              <span className="w-[40px] h-[40px] flex items-center justify-center text-center bg-[#0066C1]">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-3xl font-extrabold text-white "
                />
              </span>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="border-t-2  border-b-2 border-[#0066C1]"
            >
              <FreeBoardData />
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default HomePage;

import { RootState } from "@/app/store";
import contentImage from "@/assets/images/contentsImage.png";
import contentImageIcon from "@/assets/images/icon-content.png";
import { Pagination } from "@/components/Pagination";
import { loginStart } from "@/features/auth/authSlice";
import { getApiData } from "@/services/apiService";
import { formatVideoUrl } from "@/utils/convert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NormalContent = () => {
  const [contentData, setContentData] = useState([]);
  const [contentList, setContentsList] = useState([]);
  const PAGE_SIZE = 10;
  const [filter, setFilter] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(loginStart(true));
      try {
        const data = await getApiData("/content");
        dispatch(loginStart(false));
        setContentsList(data.data.list);
        const startIndex = filter.page * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const value = data.data.list.slice(startIndex, endIndex);
        setContentData(value);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const startIndex = filter.page * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const value = contentList.slice(startIndex, endIndex);
    setContentData(value);
  }, [filter, contentList]);
  return (
    <div className="w-full h-full mx-auto">
      <>
        <div className="relative">
          <img
            src={contentImage}
            className="xl:mt-[100px] mt-[76px] w-full h-[300px] xl:h-auto object-cover overflow-hidden"
            alt=""
          />
          <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.3)] text-white">
            <div
              data-aos="fade-up"
              data-aos-delay="500"
              className="flex flex-col items-center justify-center text-center right-0 left-0 mt-16 p-2 md:p-0"
            >
              <img src={contentImageIcon} alt="" className="" />
              <p className="text-xl font-bold">
                깨바부의 다양한 콘텐츠를 확인해보세요.
              </p>
            </div>
          </div>
        </div>
      </>
      <div className="xl:mx-[18%] md:mx-[12%] pl-8 xl:pl-0">
        <h1 className="text-2xl font-bold mt-[61px] mb-[45px] text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">
          콘텐츠
        </h1>
        {isLoading && (
          <div className="absolute top-[50%] inset-0 justify-center w-10 h-10 mx-auto border-4 border-t-4 rounded-full mt- fex flex-center border-primary border-t-transparent animate-spin"></div>
        )}
        {!isLoading &&
          contentData.map((item: any) => <Item item={item} key={item.id} />)}
      </div>
      <Pagination
        className="flex"
        currentPage={filter.page + 1}
        totalCount={contentList.length}
        pageSize={PAGE_SIZE}
        onPageChange={(page) => setFilter({ ...filter, page: page - 1 })}
      />
    </div>
  );
};

export default NormalContent;

const Item = ({ item }: any) => {
  const [expanded, setExpanded] = useState<boolean>();
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const onToggle = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    const element = document.getElementById(item.id);
    console.log(element?.offsetHeight);
    if (element && element?.offsetHeight > 96) {
      setShowBtn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div key={item.id} className="flex flex-col mb-[50px]">
      <div className="xl:flex xl:justify-between xl:flex-center xl:gap-x-5">
        <div className="w-[320px] h-[180px] border border-gray-300">
          <iframe
            height="180px"
            width="320px"
            src={formatVideoUrl(item.video)}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="eager"
          />
        </div>
        <div className="flex items-end flex-1">
          <div className="flex flex-col self-stretch justify-between w-full gap-y-5 xl:gap-y-0">
            <div className="xl:flex xl:items-start xl:justify-between xl:gap-x-5">
              <p className="text-[15px] py-5 xl:py-0 font-bold">{item.title}</p>
              <p className="text-[14px] shrink-0">
                {dayjs(item.updatedAt).format("YYYY-MM-DD")}
              </p>
            </div>
            <div className="flex items-end">
              <div className="flex-1  bg-[#F9F9F9]">
                <div
                  className={`p-5 align-middle min-h-[130px] ${
                    expanded ? "" : "overflow-hidden max-h-[130px]"
                  } `}
                >
                  <p
                    id={item.id}
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onToggle}
            disabled={!showBtn}
            className={`w-[40px] h-[40px] bg-primary ${
              showBtn ? "" : "opacity-0"
            }`}
          >
            {expanded ? (
              <FontAwesomeIcon className="text-white" icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon className="text-white" icon={faChevronDown} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

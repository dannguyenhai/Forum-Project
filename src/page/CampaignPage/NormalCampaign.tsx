import { getApiData } from "@/services/apiService";
import campaign from "@/assets/images/campaign.png";
import campaignIcon from "@/assets/images/icon-campaign.png";
import { useEffect, useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { loginStart } from "@/features/auth/authSlice";
import { Pagination } from "@/components/Pagination";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/app/store";

const NormalCampaign = () => {
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const searchValue = "title";
  const [selectedOption, setSelectedOption] = useState("title");
  const PAGE_SIZE = 12;
  const pageSize = 20;
  const [currentData, setCurrentData] = useState<any[]>([]);
  const handleSearch = async () => {
    const data = await getApiData(
      `campaign?search_by=${selectedOption}&search_value=${search}&page=0&page_size=10`
    );
    setCurrentData(data.data.list);
  };
  const [noticeList, setNoticeList] = useState([
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
  const [filter, setFilter] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });
  const handleClickDetail = (id: any) => {
    navigate(`/campaign/${id}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      dispatch(loginStart(true));
      try {
        const data = await getApiData(
          `campaign?search_value=${searchValue}&page_size=${pageSize}`
        );
        setNoticeList(data.data.list);
        dispatch(loginStart(false));
        const startIndex = filter.page * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const value = data.data.list.slice(startIndex, endIndex);
        setCurrentData(value);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const startIndex = filter.page * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const value = noticeList.slice(startIndex, endIndex);
    setCurrentData(value);
  }, [filter, noticeList]);
  return (
    <div className="w-full h-full mx-auto">
      <>
        <div className="relative">
          <img
            src={campaign}
            className="xl:mt-[100px] mt-[76px] w-full h-[300px] xl:h-auto object-cover overflow-hidden"
            alt=""
          />
          <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.3)] text-white">
            <div
              data-aos="fade-up"
              data-aos-delay="500"
              className="flex flex-col items-center justify-center text-center right-0 left-0 mt-16 p-2 md:p-0"
            >
              <img src={campaignIcon} alt="" className="" />
              <p className="text-xl font-bold">
                깨끗한 바다 산을 위해 각 지역별 쓰레기 수거현황을 전합니다.
              </p>
            </div>
          </div>
        </div>
      </>
      <div className="md:w-[1240px] min-w-[360px] mx-auto p-[24px] md:p-0 mt-[76px] md:mt-[100px]">
        {isLoading && (
          <div className="absolute top-[40%] inset-0 justify-center w-10 h-10 mx-auto border-4 border-t-4 rounded-full mt- fex flex-center border-primary border-t-transparent animate-spin"></div>
        )}
        {!isLoading && (
          <div>
            <div className="mb-[42px] mt-16 md:flex gap-x-2 flex-center justify-between">
              <h1 className="mb-2 text-2xl font-bold text-transparent md:md-0 bg-gradient-to-r from-[#0066C1] to-[#009FE5] bg-clip-text ">
                캠페인
              </h1>
              <div className="md:flex  mb-2 md:mb-0  gap-[10px]">
                <select
                  onChange={(e: any) => setSelectedOption(e.target.value)}
                  className="border p-2 border-[#C0C0C0] w-[100px]"
                >
                  <option value="title">제목</option>
                  <option value="author">작성자</option>
                </select>
                <div className="flex mt-2 md:mt-0">
                  <input
                    className="border w-[200px] p-2 md:w-[360px] border-[#C0C0C0]"
                    onChange={(e: any) => setSearch(e.target.value)}
                    type="text"
                    name=""
                    id=""
                  />
                  <button
                    onClick={handleSearch}
                    type="submit"
                    className="flex text-white bg-gradient-to-r from-[#0066C1] to-[#009FE5] border w-[88px]  items-center justify-center border-[#C0C0C0]"
                  >
                    {" "}
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="p-2" />
                    <span>검색</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="grid- grid w-full grid-cols-[repeat(auto-fit,minmax(270px,1fr))]  gap-[20px]">
              {currentData.map((i) => {
                return (
                  <div
                    onClick={() => handleClickDetail(i.id)}
                    className="cursor-pointer border-[1px] border-[#CCCCC]"
                  >
                    <div className="h-[210px] w-full">
                      <img
                        className="w-full h-full object-cover"
                        src={i.image}
                        alt=""
                      />
                    </div>
                    <div className="h-[60px] hover:bg-gradient-to-r from-[#0066C1] to-[#009FE5] hover:text-white  w-full border-[1px] border-[#CCCC] bg-[#D4E9FC]">
                      <h3 className="h-full text-center text-[15px] leading-[60px] line-clamp-1">
                        {i.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
            <Pagination
              className="flex"
              currentPage={filter.page + 1}
              totalCount={noticeList.length}
              pageSize={PAGE_SIZE}
              onPageChange={(page) => setFilter({ ...filter, page: page - 1 })}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NormalCampaign;

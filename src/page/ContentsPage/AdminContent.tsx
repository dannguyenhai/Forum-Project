import { RootState } from "@/app/store";
import content from "@/assets/images/contentsImage.png";
import ContentIcon from "@/assets/images/icon-content.png";
import { ConfirmModal } from "@/components/ConfirmModal";
import { Pagination } from "@/components/Pagination/Pagination";
import { loginStart } from "@/features/auth/authSlice";
import { deleteData } from "@/services/UserService";
import { getApiData } from "@/services/apiService";
import { faMagnifyingGlass, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
const PAGE_SIZE = 10;
const pageSize = 20;
const searchValue = "title";
const AdminContent = () => {
  const role = useSelector((state: any) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkList, setCheckList] = useState<any[]>([]);
  const check: string = checkList.toString();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [search, setSearch] = useState("");
  const [currentData, setCurrentData] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState("title");
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

  const onCloseModal = () => {
    setShowModalConfirm(false);
  };

  const [filter, setFilter] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });
  // SELECT
  const handleChecked = (id: any, checked: any) => {
    let newList = [...checkList];
    const isExist = checkList.indexOf(id) !== -1;
    if (isExist) {
      newList = checkList.filter((item) => item !== id);
    } else {
      newList.push(id);
    }
    console.log("newList", newList);
    setCheckList(newList);
  };
  // Create
  const handleCreate = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/content/create");
  };
  // Edit
  const handleEdit = () => {
    if (check) navigate(`/content/edit/${check}`);
  };
  // Search
  const handleSearch = async () => {
    const data = await getApiData(
      `content?search_by=${selectedOption}&search_value=${search}&page=0&page_size=10`
    );
    setCurrentData(data.data.list);
  };
  // DELETE
  const onHandleDelete = () => {
    setShowModalConfirm(true);
  };
  const handleDelete = async () => {
    try {
      const res = await deleteData(`/content`, { ids: checkList });
      console.log("res", res);
      if (res.data.success) {
        setCheckList([]);
        location.reload();
      } else {
        throw Error("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      dispatch(loginStart(true));
      try {
        const data = await getApiData(
          `content?search_value=${searchValue}&page_size=${pageSize}`
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
    <div>
      {isLoading && (
        <div className="absolute top-[40%] inset-0 justify-center w-10 h-10 mx-auto border-4 border-t-4 rounded-full mt- fex flex-center border-primary border-t-transparent animate-spin"></div>
      )}
      {!isLoading && (
        <div className="w-full h-full mx-auto">
          <>
            <div className="relative">
              <img
                src={content}
                className="xl:mt-[100px] mt-[76px] w-full h-[300px] xl:h-auto object-cover overflow-hidden"
                alt=""
              />
              <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.3)] text-white">
                <div
                  data-aos="fade-up"
                  data-aos-delay="500"
                  className="flex flex-col items-center justify-center text-center right-0 left-0 mt-16 p-2 md:p-0"
                >
                  <img src={ContentIcon} alt="" className="" />
                  <p className="text-xl font-bold">
                    깨바부의 새로운 소식을 전합니다.
                  </p>
                </div>
              </div>
            </div>
          </>
          <div className="md:w-[1240px] min-w-[360px] mx-auto p-[24px] md:p-0">
            <div className="mb-[42px] mt-16 md:flex gap-x-2 flex-center justify-between">
              <h1 className="mb-2 text-2xl font-bold text-transparent md:md-0 bg-gradient-to-r from-[#0066C1] to-[#009FE5] bg-clip-text ">
                공지사항
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
            <div className="flex items-center justify-center w-full mx-auto flex-center snap-x">
              <table className="w-full h-full">
                <thead>
                  <tr className="bg-[#d4e9fc]">
                    <th className="w-[8%] text-[14px] font-bold">
                      <div className="my-[10px] h-[30px] border-r border-[#7DA7CC] leading-[30px]">
                        번호
                      </div>
                    </th>
                    <th className="text-[14px] w-[64%] font-bold max-md:w-[380px] ">
                      <div className="my-[10px] h-[30px] border-r border-[#7DA7CC] leading-[30px]">
                        제목
                      </div>
                    </th>
                    <th className="text-[14px] w-[14%] font-bold max-md:w-[380px]">
                      <div className="my-[10px] h-[30px] border-r border-[#7DA7CC] leading-[30px]">
                        작성자
                      </div>
                    </th>
                    <th className="w-[14%] text-[14px] font-bold">
                      <div className="my-[10px] h-[30px] leading-[30px]">
                        작성일
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData?.length
                    ? currentData.map((item, index) => {
                        return (
                          <tr
                            key={item.id}
                            className="h-[50px] cursor-pointer border-b"
                          >
                            <td
                              className="flex md:w-[100px] items-center justify-center py-[15px] text-center text-[14px]"
                              key="numerical_order"
                            >
                              <div className="flex w-full p-2 flex-center items-center gap-x-5 justify-between">
                                <div>
                                  {" "}
                                  {role === "Admin" ? (
                                    <input
                                      onChange={(e) =>
                                        handleChecked(item.id, e.target.checked)
                                      }
                                      className="flex items-center h-[20px] w-[20px]"
                                      type="checkbox"
                                      // checked={true}
                                      checked={
                                        checkList.indexOf(item.id) !== -1
                                      } // tìm vị trí của phần tử trong mảng
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div>
                                  {noticeList.length -
                                    (PAGE_SIZE * filter.page + index)}
                                </div>
                              </div>
                            </td>

                            <td className="text-[14px] max-md:w-[380px] md:pl-[3.8%] md:text-left">
                              {item.title}
                            </td>
                            <td className="max-w-[200px] text-center text-[14px] max-md:w-[380px] ">
                              {item.author}
                            </td>
                            <td className="w-[180px] text-center text-[14px]">
                              {dayjs(item.created_at).format("YYYY-MM-DD")}
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
            <div className="xl:relative">
              <Pagination
                className="flex"
                currentPage={filter.page + 1}
                totalCount={noticeList.length}
                pageSize={PAGE_SIZE}
                onPageChange={(page) =>
                  setFilter({ ...filter, page: page - 1 })
                }
              />
              <div className="mt-6 flex items-center justify-center xl:justify-end gap-2.5 self-end xl:absolute bottom-0 right-0">
                {role === "Admin" && (
                  <div className="flex gap-2.5">
                    <button
                      onClick={handleEdit}
                      className="w-[60px] h-[40px] border border-gray-400"
                    >
                      수정
                    </button>
                    <button
                      onClick={onHandleDelete}
                      className="w-[60px] h-[40px] bg-[#D9D9D9] border border-gray-400"
                    >
                      삭제
                    </button>
                    <button
                      onClick={handleCreate}
                      className="w-[105px] h-[40px] border bg-gradient-to-r from-[#0066C1] to-[#009FE5] text-white flex flex-center items-center"
                    >
                      <FontAwesomeIcon icon={faPen} className="p-2" />
                      <span> 다음 글</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <ConfirmModal
        isVisible={showModalConfirm}
        onClose={onCloseModal}
        content={`${checkList.length}건의 게시글을 삭제 하시겠습니까?`}
        onConfirm={handleDelete}
      />
      <ToastContainer />
    </div>
  );
};

export default AdminContent;

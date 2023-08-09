import { RootState } from "@/app/store";
import { loginStart } from "@/features/auth/authSlice";
import { getApiData } from "@/services/apiService";
import dayjs from "dayjs";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const LivingLabDetail = () => {
  const navigate = useNavigate();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const { id } = useParams();
  const [ChangeId, setChangeId] = useState(id);
  const dispatch = useDispatch();
  const [contentDetail, setContentsDetail] = useState<any>([]);
  console.log(contentDetail.next);
  console.log(id);
  useEffect(() => {
    const fetchData = async (ChangeId: string | undefined) => {
      dispatch(loginStart(true));
      try {
        const data = await getApiData(`/living-lab/${ChangeId}`);
        dispatch(loginStart(false));
        setContentsDetail(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(ChangeId);
  }, [ChangeId]);
  const handleBackToTable = () => {
    navigate("/living-lab");
  };
  const handleNextId = () => {
    setChangeId(contentDetail.next);
  };
  const handlePreId = () => {
    setChangeId(contentDetail.previous);
  };
  return !isLoading ? (
    <div className="px-[17.7vw] pb-[124px] pt-[60px] mt-[76px]">
      <h3 className="border-l-2 border-primary pl-[10px] text-[24px] font-bold">
        {t("nav.livingLab")}
      </h3>
      <p className="text-5 mt-10 bg-primary-lighter px-5 py-2.5 font-bold">
        {contentDetail.title}
      </p>
      <div className="flex items-center gap-5 py-4 max-md:flex-col max-md:items-stretch">
        <div className="flex flex-1 items-center ">
          <p className="flex-1 border-r border-grey-lighter px-5 text-[14px] font-bold">
            {t("common.writer")}
          </p>
          <p className="flex-[2.5] px-5 text-[14px]">{contentDetail.author}</p>
        </div>
        <div className="flex flex-1 items-center">
          <p className="flex-1 border-r border-grey-lighter px-5 text-[14px] font-bold">
            {t("common.dateCreated")}
          </p>
          <p className="flex-[2.5] px-5 text-[14px]">
            {dayjs(contentDetail.created_at).format("YYYY-MM-DD")}
          </p>
        </div>
      </div>
      <div className=" overflow-auto border-y">
        <div className="my-[20px] ml-[18px]">
          <p dangerouslySetInnerHTML={{ __html: contentDetail.content }}></p>
        </div>
      </div>
      <div className="mt-5 flex justify-end gap-2.5 self-end">
        <button
          onClick={handlePreId}
          className="w-[88px] h-[40px] border border-gray-400 bg-[#D9D9D9]"
        >
          이전 글
        </button>
        <button
          onClick={handleBackToTable}
          className="w-[88px] h-[40px] bg-gradient-to-r from-[#0066C1] to-[#009FE5] text-white border border-gray-400"
        >
          목록으로
        </button>
        <button
          onClick={handleNextId}
          className="w-[88px] h-[40px] border border-gray-400 bg-[#D9D9D9]"
        >
          다음 글
        </button>
      </div>
    </div>
  ) : (
    isLoading && (
      <div className="absolute top-[40%] inset-0 justify-center w-10 h-10 mx-auto border-4 border-t-4 rounded-full mt- fex flex-center border-primary border-t-transparent animate-spin"></div>
    )
  );
};

export default LivingLabDetail;

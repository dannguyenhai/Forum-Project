import { RootState } from "@/app/store";
import { loginStart } from "@/features/auth/authSlice";
import { getApiData } from "@/services/apiService";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const CampaignDetail = () => {
  const navigate = useNavigate();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const { id } = useParams();
  const [ChangeId, setChangeId] = useState(id);
  const dispatch = useDispatch();
  const [contentDetail, setContentsDetail] = useState<any>([]);
  console.log(contentDetail);
  console.log(id);
  useEffect(() => {
    const fetchData = async (ChangeId: string | undefined) => {
      dispatch(loginStart(true));
      try {
        const data = await getApiData(`/campaign/${ChangeId}`);
        dispatch(loginStart(false));
        setContentsDetail(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(ChangeId);
  }, [ChangeId]);
  const handleBackToTable = () => {
    navigate("/campaign");
  };

  return !isLoading ? (
    <div className="px-[17.7vw] pb-[124px] pt-[60px] mt-[76px]">
      <h3 className="border-l-2 border-primary pl-[10px] text-[24px] font-bold">
        {t("nav.campaign")}
      </h3>
      <div className="flex items-start justify-between mt-[40px] gap-x-10">
        <div>
          <img src={contentDetail.image} className="max-h-[800px]" alt="" />
        </div>
        <div className="flex flex-col w-[600px]">
          <p className="text-5  bg-primary-lighter p-5  font-bold">
            {contentDetail.title}
          </p>
          <div className="flex items-start mt-3  max-md:flex-col max-md:items-stretch">
            <div className="flex flex-1 items-center ">
              <p className="flex-1 border-r border-grey-lighter px-5 text-[14px] font-bold">
                {t("common.writer")}
              </p>
              <p className="flex-[2.5] px-5 text-[14px]">
                {contentDetail.author}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 py-4 max-md:flex-col max-md:items-stretch">
            <div className="flex flex-1 items-center ">
              <p className="flex-1 border-r border-grey-lighter px-5 text-[14px] font-bold">
                {t("content.link")}
              </p>
              <a href={contentDetail.link} className="flex-[2.5] text-blue-400 px-5 text-[14px]">
                {contentDetail.link}
              </a>
            </div>
          </div>
          <div className="max-h-[300px] overflow-auto border-y sm:h-[520px]">
            <div className="my-[20px] text-xl ml-[18px]">
              <p
                dangerouslySetInnerHTML={{ __html: contentDetail.content }}
              ></p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-end gap-2.5 self-end">
        <button
          onClick={handleBackToTable}
          className="w-[88px] h-[40px] bg-gradient-to-r from-[#0066C1] to-[#009FE5] text-white border border-gray-400"
        >
          목록으로
        </button>
      </div>
    </div>
  ) : (
    isLoading && (
      <div className="absolute top-[40%] inset-0 justify-center w-10 h-10 mx-auto border-4 border-t-4 rounded-full mt- fex flex-center border-primary border-t-transparent animate-spin"></div>
    )
  );
};

export default CampaignDetail;

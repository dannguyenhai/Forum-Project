import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { notifyFail } from "@/components/Notify/Notify";
import { EditContentData } from "@/services/UserService";
import { useNavigate, useParams } from "react-router-dom";
import { EditSuccess } from "@/components/Notify/EditSuccess";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginStart } from "@/features/auth/authSlice";
import { getApiData } from "@/services/apiService";
import { routes } from "@/utils/constants";

interface FormData {
  title: string;
  video: string;
  content: string;
}
const ContentEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    video: Yup.string().required("Content is required"),
  });
  const [formData, setFormData] = useState<FormData>({
    title: "",
    video: "",
    content: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(loginStart(true));
      try {
        setLoading(true);
        const data = await getApiData(`/content/${id}`);
        dispatch(loginStart(false));
        console.log(data.data);
        setFormData({
          title: data.data.title,
          video: data.data.video,
          content: data.data.description,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleContentChange = (value: string) => {
    if(!loading) {
      setFormData({
        ...formData,
        content: value,
      });
      console.log(formData);
    }
  };
  const backToPage = () => {
    navigate("/content");
  };
  const handleTitleInput = () => {
    setErrors({});
  };
  const handleContentBlur = () => {
    setErrors({});
  };
  const quillRef = useRef<ReactQuill>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      const content = quillRef.current?.getEditor().getText() || "";
      const response = await EditContentData("/content", {
        id: id || "",
        title: formData.title,
        video: formData.video,
        description: content.trim(),
      });
      console.log("Response data:", response.data);
      if (response.data.success) {
        navigate(routes.CONTENT)
        setTimeout(() => {
          EditSuccess();
        },1000)
      } else {
        return notifyFail();
      }
    } catch (err: any) {
      const newErrors: { [key: string]: string } = {};
      err.inner.forEach((e: Yup.ValidationError) => {
        if (e.path) {
          newErrors[e.path] = e.message;
        }
      });
      setErrors(newErrors);
    }
  };
  return (
    <div className="md:w-[1000px] h-full md:mx-auto px-2 mt-[97px] md:mt-[100px]">
      <div className="mt-10">
        <h1 className="text-2xl bg-gradient-to-r from-[#0066C1] to-[#009FE5] text-transparent bg-clip-text font-black">
          공지사항 작성
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-center mt-10">
          <label
            className="flex flex-center justify-center items-center h-[50px] w-[80px] md:w-[180px] bg-[#d4e9fc] border"
            htmlFor="title"
          >
            제목
          </label>
          <input
            className="flex-1 border p-2"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            onInput={handleTitleInput}
          />
        </div>
        {errors.title && (
          <p className="text-red-500 text-sm block pt-2">This is required</p>
        )}
        <div className="flex flex-center mt-10">
          <label
            className="flex flex-center justify-center items-center h-[50px] w-[80px] md:w-[180px] bg-[#d4e9fc] border"
            htmlFor="title"
          >
            제목
          </label>
          <input
            className="flex-1 border p-2"
            type="text"
            id="video"
            name="video"
            value={formData.video}
            onChange={handleInputChange}
            onInput={handleTitleInput}
          />
        </div>
        {errors.title && (
          <p className="text-red-500 text-sm block pt-2">This is required</p>
        )}
        <div className="my-5">
          <ReactQuill
            ref={quillRef}
            className="h-[360px]"
            value={formData.content}
            onChange={handleContentChange}
            onBlur={handleContentBlur}
          />
        </div>
        {errors.content && (
          <p className="text-red-500 text-sm block pt-2 mt-10">
            This is required
          </p>
        )}
        <div className="flex justify-end gap-x-2 items-end mt-10 pt-2">
          <button
            type="submit"
            className="w-[88px] h-[42px] bg-gradient-to-r from-[#0066C1] to-[#009FE5] text-white border border-gray-400"
          >
            제목
          </button>
        <button
        type="button"
          onClick={backToPage}
          className="w-[88px] h-[42px] border border-gray-400 bg-[#D9D9D9]"
        >
          취소
        </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};
export default ContentEdit;

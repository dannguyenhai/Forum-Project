import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ChangeEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { REGEXP } from "@/utils/regexp";
import { registerUser } from "@/services/UserService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifySuccess } from "@/components/Notify/Notify";
type FormData = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  term?: boolean;
};
const RegisterPage = () => {
  const { t } = useTranslation();
  const validationSchema = yup.object().shape({
    id: yup.string().required(t("register.required")),
    fullName: yup
      .string()
      .required(t("register.required"))
      .max(14, t("register.nameRex")),
    password: yup
      .string()
      .required(t("register.required"))
      .matches(REGEXP.password, t("register.passwordRex")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t("register.confirmPassRex"))
      .required(t("register.required")),
    email: yup
      .string()
      .required(t("register.required"))
      .email(t("register.emailRex")),
    phoneNumber: yup
      .string()
      .required(t("register.required"))
      .matches(REGEXP.phone, t("register.phoneRex")),
    term: yup.boolean().oneOf([true], t("register.required")),
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const onSubmit = async (values: FormData) => {
    try {
      const response = await registerUser({
        username: values.id,
        password: values.password,
        email: values.email,
        full_name: values.fullName,
        phone_number: values.phoneNumber,
      });
      if (response.data.success) {
        notifySuccess()
        setTimeout(() => {
          navigate("/login");
        },2000)
      } else {
        return false;
      }
    } catch (error) {
      return error;
    }
  };


  return (
    <div className="w-[860px] h-[551px] flex flex-col mt-[167px] shadow items-center mx-auto">
      <h2 className="mt-10 text-2xl font-bold">리빙랩 회원가입</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex mt-6 gap-x-5">
          <div className="flex flex-col">
            <label className="p-2">{t("register.id")}</label>
            <input
              className="border border-[#ACACAC] w-[400px] h-[50px] px-3"
              placeholder={t("register.pleaseEnterYourID")}
              type="text"
              {...register("id")}
            />
            {errors.id && (
              <p className="text-red-500">{t("register.required")}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="p-2">{t("register.name")}</label>
            <input
              className="border border-[#ACACAC] w-[400px] h-[50px] px-3"
              placeholder={t("register.pleaseEnterYourName")}
              type="text"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-red-500">This is required</p>
            )}
          </div>
        </div>
        <div className="flex mt-5 gap-x-5">
          <div className="flex flex-col">
            <label className="p-2">{t("register.password")}</label>
            <div className=" relative border border-gray-400  w-[400px] h-[50px] flex flex-center items-center justify-between p-5">
              <input
                className="absolute inset-0 p-5"
                {...register("password")}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder={t("register.pleaseEnterAPassword")}
              />

              <FontAwesomeIcon
                className="absolute cursor-pointer right-5"
                icon={showPassword ? faEyeSlash : faEye}
                onClick={handleShowPassword}
              />
            </div>
            {errors.password && (
              <p className="text-red-500">This is required</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="p-2">{t("register.email")}</label>
            <input
              className="border border-[#ACACAC] w-[400px] h-[50px] px-3"
              placeholder={t("register.pleaseEnterYourEmail")}
              type="email"
              {...register("email")}
            />
            {errors.email && <p className="text-red-500">This is required</p>}
          </div>
        </div>
        <div className="flex mt-5 gap-x-5">
          <div className="flex flex-col">
            <label className="p-2">{t("register.verifyPassword")}</label>
            <div className=" relative border border-gray-400  w-[400px] h-[50px] flex flex-center items-center justify-between p-5">
              <input
                className="absolute inset-0 p-5"
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder={t("register.verifyPassword")}
              />
              <FontAwesomeIcon
                className="absolute cursor-pointer right-5"
                icon={showConfirmPassword ? faEyeSlash : faEye}
                onClick={handleShowConfirmPassword}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500">This is required</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="p-2">{t("register.phoneNumber")}</label>
            <input
              className="border border-[#ACACAC] w-[400px] h-[50px] px-3"
              placeholder={t("register.enterPhoneNumber")}
              type="text"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <p className="text-red-500">This is required</p>
            )}
          </div>
        </div>
        <div className="flex items-center mt-5 gap-x-2">
          <input
            className="h-[30px] w-[30px]"
            type="checkbox"
            {...register("term")}
          />
          <label className="text-sm">{t("register.agreeTerm")}</label>
          {errors.term && <p className="text-red-500">This is required</p>}
        </div>
        <button
          className="flex items-center justify-center px-6 py-3 mt-[35px] bg-[#F6F6F6] border w-[820px] max-h-[60px]"
          type="submit"
          disabled={isLoading}
        >
          {t("register.signUp")}
        </button>
        <ToastContainer/>
      </form>
    </div>
  );
};

export default RegisterPage;

import { ChangeEvent, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";


const InputPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
   const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
    return ( 
      <div className="flex flex-col">
          <label className="p-[10px]">비밀번호</label>
          <div className=" relative border border-gray-400  w-[400px] h-[50px] flex flex-center items-center justify-between p-5">
            <input
              className="absolute inset-0 p-5"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호를 입력하세요."
            />
            <FontAwesomeIcon
              className="absolute cursor-pointer right-5"
              icon={showPassword ? faEyeSlash: faEye}
              onClick={handleShowPassword}
            />
          </div>
        </div>
    );
};

export default InputPasswordForm;
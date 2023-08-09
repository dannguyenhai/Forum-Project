import { api } from "./apiService";

interface ILogin {
  username: string;
  password: string;
}

interface IRegister {
  email: string;
  username: string;
  password: string;
  phone_number: string;
  full_name: string;
}

export const login = (data: ILogin) => {
  return api.post("/user/login", data);
};

export const registerUser = (data: IRegister) => {
  return api.post("/user/register", data);
};
export const postData = (
  path: string,
  data: { title: string; content: string }
) => {
  return api.post(path, data);
};
export const postImageData = (
  path: string,
  data: { name: string}
) => {
  return api.post(path, data);
};
export const postCampaignData = (
  path: string,
  data: { title: string; content: string, link: string, image: string,image_name: string }
) => {
  return api.post(path, data);
};
export const putCampaignData = (
  path: string,
  data: {id: string, title: string; content: string, link: string, image: string,image_name: string }
) => {
  return api.put(path, data);
};
export const postDataContent = (
  path: string,
  data: { title: string, description: string, video: string }
) => {
  return api.post(path, data);
};
export const putData = (
  path: string,
  data: {id: string, title: string; content: string }
) => {
  return api.put(path, data);
};
export const putFreeBoardData = (
  path: string,
  data: {id: string, password:string, title: string; content: string }
) => {
  return api.put(path, data);
};
export const EditContentData = (
  path: string,
  data: {id: string, title: string;video: string, description: string }
) => {
  return api.put(path, data);
};
// export const deleteData = (data: any[]) => {
//     return api.delete('living-lab', data)
//   };
export const deleteData = (path: string, data: { ids: string[] }) => {
  return api.delete(path, { data });
};

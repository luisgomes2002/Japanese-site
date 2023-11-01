import axios from "axios";

const baseUrl = "http://localhost:3001";

export const signup = (data) => {
  delete data.confirmPassword;
  const body = {
    ...data,
    username: generateUserName(data.name),
    avatar: "https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png",
    background:
      "https://i.pinimg.com/originals/09/24/4c/09244c7f7dd4d17b0484370f32db6641.gif",
  };
  const response = axios.post(`${baseUrl}/user/create`, body);
  return response;
};

const generateUserName = (name) => {
  const nameLowerWithoutSpaces = name.replace(/\s/g, "").toLowerCase();
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${nameLowerWithoutSpaces}-${randomNumber}`;
};

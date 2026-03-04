import API from "./index";

export const signupUser = async (data) => {
  const res = await API.post("/users/register", data);
//  await res.save();
  return res.data;
};

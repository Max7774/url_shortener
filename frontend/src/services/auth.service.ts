import { REFRESH_TOKEN } from "@Constants/tokens";
import { BackendUser, LoginUser } from "@store/userSlice/user.types";
import { saveToStorage } from "Components/Providers/AuthProvider/auth.helper";
import { axiosClassic } from "api/api.interceptor";
import Cookies from "js-cookie";

export const AuthService = {
  async login(data: LoginUser) {
    const response = await axiosClassic<BackendUser>({
      url: `/auth/login`,
      method: "POST",
      data,
    });


    if (response.data.accessToken) saveToStorage(response.data);

    return response.data;
  },

  async getNewTokens() {
    const refreshToken = Cookies.get(REFRESH_TOKEN);

    const response = await axiosClassic.post<
      string,
      {
        data: {
          accessToken: string;
        };
      }
    >("/auth/login/access-token", { refreshToken: refreshToken });

    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  },
};

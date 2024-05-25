import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "@services/auth.service";
import { errorCatch } from "api/api.helper";
import { BackendUser, LoginUser } from "./user.types";
import { removeFromStorage } from "Components/Providers/AuthProvider/auth.helper";

/* login */
export const login = createAsyncThunk<BackendUser, LoginUser>(
  "/login",
  async (data, thunkApi) => {
    try {
      const response = await AuthService.login(data);

      //   window.location.href = "/";

      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || "Unknown error"
      );
    }
  }
);

/* logout */
export const logout = createAsyncThunk("/logout", async () => {
  window.location.href = "/front/auth";
  removeFromStorage();
});

/* checkAuth */
export const checkAuth = createAsyncThunk<{
  accessToken: string;
}>("/token/refresh", async (_, thunkApi) => {
  try {
    const response = await AuthService.getNewTokens();

    return response.data;
  } catch (error) {
    if (errorCatch(error) === "jwt expired") {
      thunkApi.dispatch(logout());
    }

    return thunkApi.rejectWithValue(error);
  }
});

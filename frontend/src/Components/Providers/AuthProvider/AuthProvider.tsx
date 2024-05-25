import { FC, PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAccessToken } from "./auth.helper";
import Auth from "@Pages/Auth/Auth";
import { useActions } from "@hooks/useActions";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { checkAuth } = useActions();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken) checkAuth();

    if (!accessToken) {
      navigate("/front/auth");
    } else if (pathname === "/front/auth") {
      navigate("/front/");
    }
  }, [accessToken, checkAuth, navigate, pathname]);

  if (pathname === "/front/auth") return <Auth />;

  return <>{children}</>;
};

export default AuthProvider;

import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { checkToken } from "../api/auth";
import { login } from "../redux/authSlice";

const checkAuth = (WrappedComponent) => {
  const Authenticated = (props) => {
    const user = useSelector((state) => state.auth.user);

    const [cookies, setCookie, removeCookie] = useCookies();

    const dispatch = useDispatch();

    if (!user) {
      if (cookies.AUTH_TOKEN) {
        checkToken(cookies.AUTH_TOKEN).then((response) => {
          if (response?.ok) {
            dispatch(login(response.data));
          } else {
            removeCookie("AUTH_TOKEN");
          }
        });
      }
    }
    return <WrappedComponent {...props} />;
  };
  return Authenticated;
};

export default checkAuth;

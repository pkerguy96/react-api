import axios from "axios";

const isUserLoggedIn = function notLogedin(navigate: Function) {
  var user = localStorage.getItem("user_login");
  if (user) {
    var token = JSON.parse(user).token;
    if (!token) navigate("/");
    axios
      .get("http://127.0.0.1:8000/api/v1/verify-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate("/dashboard");
      })
      .catch(() => {
        localStorage.removeItem("user_token");
        navigate("/");
      });
  } else navigate("/");
};
export default isUserLoggedIn;

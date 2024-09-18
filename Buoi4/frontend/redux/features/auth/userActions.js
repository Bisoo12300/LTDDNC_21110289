import { server } from "../../store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// action login
export const login = (email, password, navigation) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    // Gửi yêu cầu đăng nhập API
    const { data } = await axios.post(
      `${server}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Đăng nhập thành công, lưu token và gửi action loginSuccess
    dispatch({
      type: "loginSuccess",
      payload: data,
    });

    await AsyncStorage.setItem("@auth", data?.token);

    console.log("Login response data:", data); // Kiểm tra phản hồi từ server

    // Chuyển hướng đến màn hình Home sau khi đăng nhập thành công
    navigation.replace("home"); // Sử dụng replace để không quay lại màn hình login
  } catch (error) {
    console.log("Login error message:", error.message); // Hiển thị thông báo lỗi
    console.log("Login error response:", error.response); // Hiển thị chi tiết phản hồi lỗi từ server
    console.log("Login error status:", error.response?.status); // Hiển thị mã lỗi HTTP
    
    dispatch({
      type: "loginFail",
      payload: error.response?.data?.message || "Login failed",
    });
  }
};



// register action
export const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "registerRequest" });

    // API register request
    const { data } = await axios.post(`${server}/user/register`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: "registerSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "registerFail",
      payload: error.response?.data?.message || "Registration failed",
    });
  }
};

// GET USER DATA ACTION
export const getUserData = () => async (dispatch) => {
  try {
    dispatch({ type: "getUserDataRequest" });

    // Hitting node API to get user data
    const { data } = await axios.get(`${server}/user/profile`);

    dispatch({
      type: "getUserDataSuccess",
      payload: data?.user,
    });
  } catch (error) {
    dispatch({
      type: "getUserDataFail",
      payload: error.response?.data?.message || "Failed to fetch user data",
    });
  }
};

// LOGOUT ACTION
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });

    // Hitting node API to log out
    const { data } = await axios.get(`${server}/user/logout`);

    dispatch({
      type: "logoutSuccess",
      payload: data?.message,
    });

    await AsyncStorage.removeItem("@auth");
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response?.data?.message || "Logout failed",
    });
  }
};

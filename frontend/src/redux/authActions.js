import { toast } from "react-toastify";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

// SIGNUP
export const signup = (values) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || data.msg || "Signup failed");

    localStorage.setItem("token", data.token); // Store JWT
    toast.success("User registered successfully!");

    dispatch({ type: SIGNUP_SUCCESS, payload: data.user });

    return true; //
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.message });
    toast.error(error.message);
  }
};

// LOGIN
export const login = (values) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || data.msg || "Login failed");

    localStorage.setItem("token", data.token); // Store JWT

    toast.success("User logged in successfully!");

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });

    return true; //
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    toast.error(error.message);
  }
};

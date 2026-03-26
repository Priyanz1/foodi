import axios from "axios";
import React, { useState } from "react";
import { useUserData } from "../Context/UserDataContext";
import { useNavigate, Link } from "react-router-dom";
import FormField from "../components/FormField";
import { getLoginErrors } from "../utils/validation";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const { setuser } = useUserData();
  const navigate = useNavigate();

  const loginhandle = async (e) => {
    e.preventDefault();

    const validationErrors = getLoginErrors({ email, password });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setApiError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      setuser(res.data.id);
      alert("Login successful!");
      navigate("/reel");
    } catch (err) {
      setApiError(err.response?.data?.msg || err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,#1e293b,#334155,#0f172a)] relative p-5">
      <button
        type="button"
        className="absolute top-[30px] left-[30px] bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.12)] text-white text-[20px] px-[14px] py-[8px] rounded-[10px] cursor-pointer backdrop-blur-[8px] transition-transform transition-colors duration-200 z-[20] hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.16)] max-[480px]:top-[16px] max-[480px]:left-[16px]"
        onClick={() => navigate("/")}
      >
        ←
      </button>

      <div className="w-full max-w-[420px] p-10 rounded-[20px] bg-[rgba(255,255,255,0.08)] backdrop-blur-[14px] shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-[rgba(255,255,255,0.12)] text-white max-[480px]:m-4 max-[480px]:p-[1.8rem]">
        <h1 className="text-[28px] font-bold mb-[0.4rem] max-[480px]:text-[24px]">
          Welcome back
        </h1>
        <p className="text-[#cbd5e1] mb-[1.8rem] text-[15px] leading-[1.5]">
          Sign in to watch the latest food reels.
        </p>

        <form onSubmit={loginhandle} className="flex flex-col gap-4">
          {apiError ? (
            <div className="mt-[6px] text-[13px] text-[#f87171]">{apiError}</div>
          ) : null}

          <FormField
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            error={errors.email}
            type="email"
            required
            autoComplete="email"
          />

          <FormField
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            error={errors.password}
            type="password"
            required
            autoComplete="current-password"
          />

          <button
            type="submit"
            className="p-[12px] rounded-[10px] border-0 text-white text-[16px] font-semibold cursor-pointer transition-transform transition-opacity transition-shadow duration-200 hover:-translate-y-0.5 hover:opacity-95 mt-2 bg-[linear-gradient(135deg,#6366f1,#8b5cf6)] shadow-[0_10px_24px_rgba(99,102,241,0.35)]"
          >
            Login
          </button>

          <Link
            to="/register"
            className="text-center mt-[6px] text-[#a5b4fc] no-underline text-[14px] hover:underline"
          >
            Don’t have an account? Register
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
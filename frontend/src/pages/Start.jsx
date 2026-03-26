import React from "react";
import { useNavigate } from "react-router-dom";

function Start() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,#1e293b,#334155,#0f172a)]">
      <div className="w-full max-w-[420px] p-10 rounded-[20px] bg-[rgba(255,255,255,0.08)] backdrop-blur-[14px] shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-[rgba(255,255,255,0.12)] text-white text-center max-[480px]:m-4 max-[480px]:p-[1.8rem]">
        <h1 className="text-[28px] font-bold mb-[0.4rem] max-[480px]:text-[24px]">
          Welcome to Foodi 🍔
        </h1>
        <p className="text-[#cbd5e1] mb-[1.8rem] text-[15px] leading-[1.5]">
          Choose how you want to continue
        </p>

        <div className="flex flex-col gap-4">
          <button
            className="p-[12px] rounded-[10px] border-0 text-white text-[16px] font-semibold cursor-pointer transition-transform transition-opacity transition-shadow duration-200 hover:-translate-y-0.5 hover:opacity-95 bg-[linear-gradient(135deg,#6366f1,#8b5cf6)] shadow-[0_10px_24px_rgba(99,102,241,0.35)]"
            onClick={() => navigate("/login")}
          >
            Login as User
          </button>

          <button
            className="p-[12px] rounded-[10px] border-0 text-white text-[16px] font-semibold cursor-pointer transition-transform transition-opacity transition-shadow duration-200 hover:-translate-y-0.5 hover:opacity-95 bg-[linear-gradient(135deg,#f97316,#facc15,#22c55e)] shadow-[0_10px_24px_rgba(249,115,22,0.28)]"
            onClick={() => navigate("/foodpartnerlogin")}
          >
            Login as Food Partner
          </button>
        </div>
      </div>
    </div>
  );
}

export default Start;
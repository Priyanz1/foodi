import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateFood() {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [video, setvideo] = useState(null);
  const navigate = useNavigate();

  const createfoodhandle = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);

      if (video) {
        formData.append("video", video);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/food/createfood`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      alert("Create food successful!");
      navigate("/createfood");
    } catch (err) {
      alert("Create food failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,#1e293b,#334155,#0f172a)] p-5">
      <div className="w-full max-w-[420px] p-10 rounded-[20px] bg-[rgba(255,255,255,0.08)] backdrop-blur-[14px] shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-[rgba(255,255,255,0.12)] text-white max-[480px]:m-4 max-[480px]:p-[1.8rem]">
        <h1 className="text-[28px] font-bold mb-[0.4rem] max-[480px]:text-[24px]">
          Create food reel
        </h1>
        <p className="text-[#cbd5e1] mb-[1.8rem] text-[15px] leading-[1.5]">
          Upload a short video of your dish.
        </p>

        <form onSubmit={createfoodhandle} className="flex flex-col gap-4">
          <div className="w-full">
            <label className="block text-[14px] text-[#cbd5e1] mb-[6px]">Name</label>
            <input
              className="w-full px-[14px] py-[12px] rounded-[10px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] text-white text-[15px] outline-none focus:border-[rgba(129,140,248,0.8)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.18)] focus:outline-none placeholder:text-[#cbd5e1]"
              placeholder="Dish name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              type="text"
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-[14px] text-[#cbd5e1] mb-[6px]">Description</label>
            <input
              className="w-full px-[14px] py-[12px] rounded-[10px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] text-white text-[15px] outline-none focus:border-[rgba(129,140,248,0.8)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.18)] focus:outline-none placeholder:text-[#cbd5e1]"
              placeholder="Short description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              type="text"
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-[14px] text-[#cbd5e1] mb-[6px]">Video</label>
            <input
              className="w-full px-[14px] py-[12px] p-[10px] rounded-[10px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] text-white text-[15px] outline-none cursor-pointer focus:border-[rgba(129,140,248,0.8)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.18)] focus:outline-none file:border-0 [&::file-selector-button]:border-0 [&::file-selector-button]:mr-[12px] [&::file-selector-button]:px-[12px] [&::file-selector-button]:py-[8px] [&::file-selector-button]:rounded-[8px] [&::file-selector-button]:cursor-pointer [&::file-selector-button]:bg-[linear-gradient(135deg,#6366f1,#8b5cf6)] [&::file-selector-button]:text-white"
              type="file"
              accept="video/*"
              onChange={(e) => setvideo(e.target.files?.[0] || null)}
              required
            />
          </div>

          <button
            type="submit"
            className="p-[12px] rounded-[10px] border-0 text-white text-[16px] font-semibold cursor-pointer transition-transform transition-opacity transition-shadow duration-200 hover:-translate-y-0.5 hover:opacity-95 mt-2 bg-[linear-gradient(135deg,#6366f1,#8b5cf6)] shadow-[0_10px_24px_rgba(99,102,241,0.35)]"
          >
            Upload reel
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateFood;
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserDataContext } from "../Context/UserDataContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const videoRefs = useRef([]);
  const { saveReels, setsaveReels } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!reels.length) return;
  
    const lastReelId = localStorage.getItem("lastReelId");
    if (!lastReelId) return;
  
    const index = reels.findIndex((item) => item._id === lastReelId);
  
    if (index !== -1 && videoRefs.current[index]) {
      videoRefs.current[index].scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    }
  }, [reels]);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/food/food`,
          {
            withCredentials: true,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

        setReels(res.data?.foodItem || []);
      } catch (err) {
        const message =
          err.response?.data?.msg ||
          err.response?.data?.message ||
          err.message ||
          "Something went wrong";

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  useEffect(() => {
    if (!reels.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentVideo = entry.target;

          if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
            localStorage.setItem("lastReelId", currentVideo.dataset.id);
            videoRefs.current.forEach((video) => {
              if (video && video !== currentVideo) {
                video.pause();
                video.currentTime = 0;
              }
            });

            currentVideo.play().catch(() => { });
          } else {
            currentVideo.pause();
          }
        });
      },
      {
        threshold: [0.8],
      }
    );

    const currentVideos = videoRefs.current.filter(Boolean);
    currentVideos.forEach((video) => observer.observe(video));

    return () => {
      currentVideos.forEach((video) => observer.unobserve(video));
      observer.disconnect();
    };
  }, [reels]);


  const Likehandle = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/food/like`,
        { food: id },
        {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      setReels((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
              ...item,
              count: response.data.count,
              isLiked: response.data.isLiked,
            }
            : item
        )
      );
    } catch (err) {
      const status = err.response?.status;
      const message =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        err.message ||
        "Something went wrong";

      setError(`(${status || "?"}) ${message}`);
    }
  };

  const saveReel = (item, updateSave) => {
    if (updateSave) {
      setsaveReels((prev) => {
        const exists = prev.some((reel) => reel._id === item._id);
        if (exists) return prev;
        return [...prev, { ...item, isSaved: true }];
      });
    } else {
      setsaveReels((prev) => prev.filter((reel) => reel._id !== item._id));
    }
  };


  useEffect(() => {
    const fetchSaveReel = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/food/getsave`,
          {
            withCredentials: true,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        setsaveReels(response.data);

      } catch (err) {
      }
    }
    fetchSaveReel();
  }, []);


  const Savehandle = async (id, item) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/food/save`,
        { food: id },
        {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      const updateSave = response.data.isSaved;
      const updatedItem = { ...item, isSaved: updateSave };

      setReels((prev) =>
        prev.map((reel) =>
          reel._id === id
            ? { ...reel, isSaved: updateSave }
            : reel
        )
      );

      saveReel(updatedItem, updateSave);
    } catch (err) {
      const status = err.response?.status;
      const message =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        err.message ||
        "Something went wrong";

      setError(`(${status || "?"}) ${message}`);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="min-w-[280px] max-w-[360px] px-[1.4rem] py-[1.2rem] rounded-[16px] bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)] backdrop-blur-[12px] text-center text-white text-[16px]">
          Loading reels...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="min-w-[280px] max-w-[360px] px-[1.4rem] py-[1.2rem] rounded-[16px] bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)] backdrop-blur-[12px] text-center text-white text-[16px]">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!reels.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="min-w-[280px] max-w-[360px] px-[1.4rem] py-[1.2rem] rounded-[16px] bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)] backdrop-blur-[12px] text-center text-white text-[16px]">
          No reels available
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="h-screen w-full max-w-[420px] overflow-y-scroll snap-y snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {reels.map((item, index) => (
          <div className="relative h-screen w-full snap-start bg-black" key={item._id || index}>
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              data-id={item._id}
              src={item.video}
              className="w-full h-full object-cover block"
              muted
              loop
              playsInline
            />

            <div className="absolute inset-0 flex justify-between items-end p-[24px_16px] bg-[linear-gradient(to_top,rgba(0,0,0,0.72),rgba(0,0,0,0.24),transparent)]">
              <div className="max-w-[75%]">
                <h3 className="text-[18px] text-white font-bold mb-[8px]">@{item.name}</h3>
                <p className="text-[14px] leading-[1.5] text-[#e2e8f0]">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-col gap-[14px] items-center">
                <button
                  onClick={() => Likehandle(item._id)}
                  className="w-[48px] h-[48px] rounded-full border-0 bg-[rgba(255,255,255,0.14)] text-white text-[20px] cursor-pointer backdrop-blur-[10px] transition-transform transition-colors duration-200 hover:scale-[1.08] hover:bg-[rgba(255,255,255,0.22)]"
                >
                  {item.isLiked ? "❤️" : "🤍"} {item.count || 0}
                </button>
                <button
                  onClick={() => Savehandle(item._id, item)}
                  className="w-[48px] h-[48px] rounded-full border-0 bg-[rgba(255,255,255,0.14)] text-white text-[20px] cursor-pointer backdrop-blur-[10px] transition-transform transition-colors duration-200 hover:scale-[1.08] hover:bg-[rgba(255,255,255,0.22)]"
                >
                  {item.isSaved ? "💾" : "🔖"}
                </button>
                <button
                  className="w-[48px] h-[48px] rounded-full border-0 bg-[rgba(255,255,255,0.14)] text-white text-[20px] cursor-pointer backdrop-blur-[10px] transition-transform transition-colors duration-200 hover:scale-[1.08] hover:bg-[rgba(255,255,255,0.22)]"
                >
                  💬
                </button>
                <button onClick={() => {
                  localStorage.setItem("lastReelId", item._id);
                  navigate("/getsavefood");
                }}
                  className="w-[48px] h-[48px] rounded-full border-0 bg-[rgba(255,255,255,0.14)] text-white text-[20px] cursor-pointer backdrop-blur-[10px] transition-transform transition-colors duration-200 hover:scale-[1.08] hover:bg-[rgba(255,255,255,0.22)]"
                >
                  📤
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;



// onClick={()=>{getSavedReels(item._id)}} 
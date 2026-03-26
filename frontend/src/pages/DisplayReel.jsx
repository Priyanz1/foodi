import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserDataContext } from '../Context/UserDataContext';
import { useNavigate } from 'react-router-dom';

function DisplayReel() {
  const { saveReels, setsaveReels } = useContext(UserDataContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReels = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/food/getsave`,
          {
            withCredentials: true,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        setsaveReels(res.data);
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
  }, [setsaveReels]);

  return (
    <div className="w-full min-h-screen p-5">
      <button onClick={()=>{navigate("/reel")}} className='border-2 px-10 py-2 rounded-full'>Back</button>
      <h1 className="text-2xl font-bold mb-5 py-5 w-full text-center">Saved Reels</h1>

      {loading ? (
        <p>Loading saved reels...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : saveReels.length === 0 ? (
        <p>No saved reels found</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 lg:grid-cols-6 md:w-[80%] mx-auto">
          {saveReels.map((item, index) => (
            <div key={item._id || index} className="border rounded-lg p-3 shadow">
              <video
                src={item.food?.video}
                className="rounded-lg  w-full"
                controls
              />
              <h3 className="mt-2 font-semibold">@{item.food?.name}</h3>
              <p className="text-sm text-gray-600">{item.food?.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DisplayReel;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import coolCat from "../assets/images/cool_cat.webp";
import { useLogin } from "../context/logInContext";
import axios from "axios";

const UserProfile = () => {
  const navigate = useNavigate();
  const { setloginSuccess, profileName } = useLogin();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    profession: "",
    img: coolCat,
  });

  useEffect(() => {
    if (!profileName) {
      setLoading(false); // No need to load if profileName is not available
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/userInfo/${profileName}`);
        setUserData({
          name: response.data.userInfo.name,
          username: response.data.userInfo.username,
          profession: response.data.userInfo.profession,
          img: response.data.userInfo.img || coolCat, // Use coolCat if img is not provided
        });
      } catch (error) {
        setError("Error fetching userData");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [profileName]); // Re-run the effect when profileName changes

  const handleLogOut = () => {
    setloginSuccess(false);
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="flex flex-col py-4 items-center justify-center">
      <section className="w-fit mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg h-fit flex items-center justify-center flex-col gap-2">
        <div className="w-fit mx-auto">
          <img src={userData.img} className="rounded-full w-28" alt="profile" />
        </div>
        <div className="mt-8 text-white">
          <h2 className="font-bold text-2xl tracking-wide">
            Name : {userData.name}
          </h2>
          <p className="text-lg">Username : {userData.username}</p>
          <p className="text-sm">Profession : {userData.profession}</p>
        </div>
      </section>
      <div className="flex gap-6 py-2">
        <button
          onClick={handleLogOut}
          className="font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-blue-600 hover:text-white"
        >
          Log Out
        </button>
        <a href="">
          <button className="font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-blue-600 hover:text-white">
            My blogs
          </button>
        </a>
      </div>
    </section>
  );
};

export default UserProfile;

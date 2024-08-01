import React, { useContext } from "react";
import coolCat from "../assets/images/cool_cat.webp";
import { useLogin } from "../context/logInContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const { setloginSuccess, profileName } = useLogin();

  const handleLogOut = () => {
    setloginSuccess(false);
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    navigate("/");
  };
  return (
    <section className="h-screen flex items-center justify-center">
      <section className="w-fit mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg h-fit flex items-center justify-center flex-col gap-2">
        <div className="w-fit mx-auto">
          <img src={coolCat} className="rounded-full w-28" alt="profile" />
        </div>
        <div className="mt-8">
          <h2 className="text-white font-bold text-2xl tracking-wide">
            {profileName}
          </h2>
        </div>
        <button
          onClick={handleLogOut}
          className={`font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-blue-600 hover:text-white`}
        >
          Log Out
        </button>
      </section>
    </section>
  );
};

export default UserProfile;

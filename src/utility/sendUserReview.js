import axios from "axios";

const sendUserReview = async (username, raterUsername, rating, message) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_PATH}/api/user/rateUser`,
      {
        username,
        raterUsername,
        rating,
        message,
      },
      { withCredentials: true }
    );
    if (response.status == 201) {
      return 1;
    }
  } catch (error) {
    console.log("Error occurred while sending review", error.response.data);
    return error.response.data;
  }
};

export default sendUserReview;

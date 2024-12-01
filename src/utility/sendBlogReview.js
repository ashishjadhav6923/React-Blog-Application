import axios from "axios";

const sendBlogReview = async (Data, raterUsername, rating, message) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_PATH}/api/user/rateBlog`,
      {
        id:Data.id,
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
    console.log("Error occurred while sending review", error);
    return error.response.data;
  }
};

export default sendBlogReview;

import React, { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import sendUserReview from "../utility/sendUserReview";
import { useUserContext } from "../context/userDataContext";
const ReviewModal = ({ toggleReview, toggleReviewModal, Data, type }) => {
  const { userData, loginSuccess } = useUserContext();
  const [isReviewSubmitting, setisReviewSubmitting] = useState(false);
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);
  const [globalError, setglobalError] = useState();
  const [errOccured, setErrOccured] = useState();
  const ContactSchema = Yup.object().shape({
    rating: Yup.number().min(1, "Rating must be greater than 0"),
    message: Yup.string().required("Message is required"),
  });
  const {
    handleChange,
    handleSubmit,
    resetForm,
    handleBlur,
    isSubmitting,
    touched,
    errors,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      rating: 0,
      message: "",
    },
    validationSchema: ContactSchema,
    validateOnChange: true,
    onSubmit: async () => {
      if(!loginSuccess){
        setErrOccured(true);
        setglobalError('Log In First');
        return;
      }
      setisReviewSubmitting(true);
      const username = Data.username;
      const raterUsername = userData.username;
      const rating = values.rating;
      const message = values.message;
      const res = await sendUserReview(
        username,
        raterUsername,
        rating,
        message
      );
      if (res===1) {
        setIsSuccessfullySubmitted(true);
        setisReviewSubmitting(false);
      } else {
        setErrOccured(true);
        setglobalError(res.message);
        console.log("Error occured while submitting review");
        setisReviewSubmitting(false);
      }
    },
  });
  if (isSuccessfullySubmitted) {
    setTimeout(() => toggleReviewModal(), 5000);
  }
  return (
    <div className="absolute flex justify-center w-80 bg-black bg-opacity-50 z-40">
      <div
        className={`${
          toggleReview ? "block" : "hidden"
        } overflow-y-auto absolute justify-center items-center drop-shadow-2xl`}
      >
        <div className="relative p-4 max-w-xl max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-lg font-semibold text-gray-900">
                Write Your Review
              </h3>
              <button
                onClick={() => {
                  toggleReviewModal();
                }}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-4 py-2">
              <div className="relative mb-2">
                <label
                  htmlFor="message"
                  className="leading-7 text-sm text-gray-600"
                >
                  Review
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full bg-white rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
                {touched.message && errors.message && (
                  <div className="text-red-500">{errors.message}</div>
                )}
              </div>
              <div className="relative mb-2">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Rating
                </label>
                <Rating
                  style={{ maxWidth: 180 }}
                  value={values.rating}
                  onChange={(rating) => setFieldValue("rating", rating)}
                />
                {touched.rating && errors.rating && (
                  <div className="text-red-500">{errors.rating}</div>
                )}
              </div>
              <button
                disabled={isReviewSubmitting}
                className="w-full hover:bg-white hover:ring-2 hover:ring-gray-800 bg-gray-800 hover:text-gray-800 text-white rounded-full px-6 py-2 text-lg font-semibold"
                type="submit"
              >
                {isReviewSubmitting ? "Submitting..." : "Submit"}
              </button>
              {isSuccessfullySubmitted && (
                <div className="text-green-600 text-sm text-center">
                  Form submitted successfully!
                </div>
              )}
              {errOccured && (
                <div className="text-red-600 text-sm text-center py-2">
                  {globalError}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;

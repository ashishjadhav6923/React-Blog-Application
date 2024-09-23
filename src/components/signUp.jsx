import React from "react";
import logo from "../assets/BlogVerse Logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUp = () => {
  const navigate = useNavigate();

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      name: "",
      profession: "",
      img: null, // To store the image file
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one special character"
        )
        .required("Password is required"),
      name: Yup.string()
        .min(4, "Name must be at least 4 characters")
        .required("Name is required"),
      profession: Yup.string().required("Profession is required"),
      img: Yup.mixed()
        .test(
          "fileType",
          "Unsupported file format. Please upload an image (jpg, jpeg, png)",
          (value) => {
            return (
              value &&
              ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
            );
          }
        ),
    }),
    onSubmit: async (values, { setErrors }) => {
      try {
        // Prepare form data for submission
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("profession", values.profession);
        formData.append("img", values.img); // Append the image file

        // Submit data to the backend API
        const response = await axios.post("/api/user/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201) {
          navigate("/logIn");
        }
      } catch (error) {
        const formikErrors = {};
        if (error.response && error.response.data) {
          formikErrors.general = error.response.data.message;
          setErrors(formikErrors);
        } else {
          console.error("There was an error!", error.message);
        }
      }
    },
  });

  return (
    <section className="bg-gray-5">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img className="w-8 h-8 mr-2" src={logo} alt="BlogVerse logo" />
          BlogVerse
        </a>
        <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              {/* Name Field */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className={`bg-gray-50 border ${
                    formik.errors.name && formik.touched.name
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  id="name"
                  name="name"
                  placeholder="Name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>

              {/* Username Field */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className={`bg-gray-50 border ${
                    formik.errors.username && formik.touched.username
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  id="username"
                  name="username"
                  placeholder="Username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                {formik.errors.username && formik.touched.username ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.username}
                  </div>
                ) : null}
              </div>

              {/* Email Field */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className={`bg-gray-50 border ${
                    formik.errors.email && formik.touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

              {/* Password Field */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className={`bg-gray-50 border ${
                    formik.errors.password && formik.touched.password
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              {/* Profession Field */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="profession"
                >
                  Profession
                </label>
                <input
                  className={`bg-gray-50 border ${
                    formik.errors.profession && formik.touched.profession
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  id="profession"
                  name="profession"
                  placeholder="Profession"
                  onChange={formik.handleChange}
                  value={formik.values.profession}
                />
                {formik.errors.profession && formik.touched.profession ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.profession}
                  </div>
                ) : null}
              </div>

              {/* Image Upload */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="img"
                >
                  Image
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  id="img"
                  name="img"
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={(event) => {
                    formik.setFieldValue("img", event.currentTarget.files[0]);
                  }}
                />
                {formik.errors.img && formik.touched.img ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.img}
                  </div>
                ) : null}
              </div>

              {/* General Errors */}
              {formik.errors.general && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.general}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <a
                  href="/logIn"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

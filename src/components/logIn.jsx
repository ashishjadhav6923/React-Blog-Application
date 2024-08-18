import React from "react";
import logo from "../assets/BlogVerse Logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useLogin } from "../context/logInContext";

const LogIn = () => {
  const { setloginSuccess, setprofileName } = useLogin();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img className="w-8 h-8 mr-2" src={logo} alt="BlogVerse logo" />
          BlogVerse
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setErrors }) => {
                try {
                  const response = await axios.post(
                    "/api/login",
                    {
                      username: values.username,
                      password: values.password,
                    }
                  );
                  console.log(response.data);
                  if (response.status === 200) {
                    setprofileName(values.username);
                    setloginSuccess(true);
                    localStorage.setItem("username", values.username);
                    localStorage.setItem("password", values.password);
                    navigate("/");
                  }
                } catch (error) {
                  if (error.response && error.response.data) {
                    const formikErrors = {};

                    // Set the general error message returned by the API
                    formikErrors.general = error.response.data.message;

                    setErrors(formikErrors);
                  } else {
                    console.error("There was an error!", error.message);
                  }
                }
              }}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4 md:space-y-6">
                  <div>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900"
                      htmlFor="username"
                    >
                      Your email
                    </label>
                    <Field
                      className={`bg-gray-50 border ${
                        errors.username && touched.username
                          ? "border-red-500"
                          : "border-gray-300"
                      } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      id="username"
                      name="username"
                      autoComplete="username"
                      placeholder="name@company.com"
                    />
                    {errors.username && touched.username ? (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.username}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <Field
                      className={`bg-gray-50 border ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : "border-gray-300"
                      } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                    />
                    {errors.password && touched.password ? (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </div>
                    ) : null}
                  </div>

                  {/* Display general error */}
                  {errors.general && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.general}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <Field
                          id="remember"
                          aria-describedby="remember"
                          name="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-gray-500">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-light text-gray-500">
                    Don’t have an account yet?{" "}
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline"
                    >
                      Sign up
                    </a>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogIn;

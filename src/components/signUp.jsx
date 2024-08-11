import React from "react";
import logo from "../assets/BlogVerse Logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const SignUp = () => {
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
    <section className="bg-gray-5">
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
              Create an account
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
                    "http://localhost:5000/api/register",
                    {
                      username: values.username,
                      password: values.password,
                    }
                  );
                  console.log(response.data);
                  if (response.status === 201) {
                    navigate("/logIn");
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
                      placeholder="username"
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
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

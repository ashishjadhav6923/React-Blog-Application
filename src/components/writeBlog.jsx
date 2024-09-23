import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Importing uuid for unique ID generation
import { useLogin } from "../context/logInContext";

// Validation schema using Yup
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  additionalInfo: Yup.string(),
  category: Yup.string(),
});

const BlogWritingForm = () => {
  const { loginSuccess, profileName } = useLogin(); // Single useLogin call
  const initialValues = {
    id: "",
    title: "",
    profile: "",
    content: "",
    additionalInfo: "",
    category: "",
  };
  const [successMessage, setSuccessMessage] = useState("");
  const [submitError, setSubmitError] = useState(""); // State to handle general submission errors

  const handleSubmit = async (values, { resetForm, setErrors, setSubmitting }) => {
    if (loginSuccess) {
      values.profile = profileName;
      values.id = uuidv4(); // Generate a unique ID for each submission

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_PATH}/api/user/writeBlog`, {
          id: values.id,
          title: values.title,
          profile: values.profile,
          content: values.content,
          additionalInfo: values.additionalInfo,
          category: values.category,
        });

        if (response.status === 201) {
          setSuccessMessage("Blog post created successfully!");
          resetForm(); // Clear the form fields after submission
          setSubmitError(""); // Clear any previous errors
        } else {
          setSubmitError("Failed to create blog post. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitError(error.response?.data?.message || "An error occurred while submitting the form."); // Handle submission error
      } finally {
        setSubmitting(false); // Re-enable the submit button
      }
    } else {
      setErrors({ general: "You need to Log in First" });
      console.log("You need to Log in First");
      setSubmitting(false); // Re-enable the submit button
    }
  };

  return (
    <div className="mx-auto p-6 my-4 rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Write a New Blog Post</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Content
              </label>
              <Field
                as="textarea"
                id="content"
                name="content"
                rows="6"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <ErrorMessage
                name="content"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="additionalInfo"
                className="block text-sm font-medium text-gray-700"
              >
                Additional Information
              </label>
              <Field
                type="text"
                id="additionalInfo"
                name="additionalInfo"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <Field
                type="text"
                id="category"
                name="category"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            {successMessage && (
              <div className="mt-4 text-green-500">{successMessage}</div>
            )}
            {submitError && (
              <div className="text-red-500 text-sm mt-1">{submitError}</div>
            )}
            {errors.general && (
              <div className="text-red-500 text-sm mt-1">{errors.general}</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BlogWritingForm;

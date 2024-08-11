import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useLogin } from "../context/logInContext";

// Validation schema using Yup
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author name is required"),
  content: Yup.string().required("Content is required"),
  additionalInfo: Yup.string(),
});

const BlogWritingForm = () => {
  // Initial values for the form
  const initialValues = {
    title: "",
    author: "",
    profile: "",
    content: "",
    additionalInfo: "",
  };
  const { profileName } = useLogin();
  // State to hold the success message
  const [successMessage, setSuccessMessage] = useState("");

  // Submit handler
  const handleSubmit = async (values, { resetForm, setStatus }) => {
    values.profile = profileName;
    try {
      // Replace with your API endpoint
      const response = await axios.post(
        "http://localhost:5000/api/writeBlogs",
        values
      );

      // Check if the response status is 201 (Created)
      if (response.status === 201) {
        setSuccessMessage("Blog post created successfully!");
        resetForm(); // Clear the form fields after submission
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSuccessMessage(""); // Clear success message if there's an error
    }
  };

  return (
    <div className="h-screen">
      <div className="max-w-4xl mx-auto p-6 my-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Write a New Blog Post</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
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
                  htmlFor="author"
                  className="block text-sm font-medium text-gray-700"
                >
                  Author Name
                </label>
                <Field
                  type="text"
                  id="author"
                  name="author"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <ErrorMessage
                  name="author"
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BlogWritingForm;

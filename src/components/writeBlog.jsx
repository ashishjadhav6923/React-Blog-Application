import React, { useRef, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useUserContext } from "../context/userDataContext";
import { blogCategories } from "../constants/constants.js";

const validationSchema = Yup.object({
  title: Yup.string()
    .max(100, "Title must be 100 characters or less")
    .required("Title is required"),
  content: Yup.string().required("Content is required"),
  additionalInfo: Yup.string().max(
    500,
    "Additional information must be 500 characters or less"
  ),
  category: Yup.string().required("Category is required"),
});

const BlogWritingForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [submitError, setSubmitError] = useState(""); 
  const { loginSuccess, username } = useUserContext();
  const quillRef = useRef(null); // Ref for Quill editor

  const handleSubmit = async (
    values,
    { resetForm, setErrors, setSubmitting }
  ) => {
    if (loginSuccess) {
      values.id = uuidv4();

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_PATH}/api/user/writeBlog`,
          {
            id: values.id,
            title: values.title,
            username: username,
            content: values.content,
            additionalInfo: values.additionalInfo,
            category: values.category,
          },
          { withCredentials: true }
        );

        if (response.status === 201) {
          setSuccessMessage("Blog post created successfully!");
          resetForm();
          quillRef.current.innerHTML='';
        } else {
          console.error("Failed to create blog post.");
          setSubmitError("Failed to create blog post. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitError(
          error.response?.data?.message ||
            "An error occurred while submitting the form."
        ); 
      } finally {
        setSubmitting(false);
      }
    } else {
      setErrors({ general: "You need to Log in First" });
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto min-h-96">
      <h1 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900">
        Write a New Blog Post
      </h1>
      <Formik
        initialValues={{
          id: "",
          title: "",
          username: "",
          content: "",
          additionalInfo: "",
          category: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, errors }) => {
          useEffect(() => {
            const quill = new Quill(quillRef.current, {
              theme: "snow",
              placeholder: "Write your content here...",
              modules: {
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image"],
                ],
              },
            });

            quill.on("text-change", () => {
              const content = quill.root.innerHTML; // Get the content
              setFieldValue("content", content);
            });
          }, [setFieldValue]);

          return (
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
                <div
                  ref={quillRef}
                  className="bg-white border border-gray-300 rounded-md min-h-[200px] p-2"
                ></div>
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
                <ErrorMessage
                  name="additionalInfo"
                  component="div"
                  className="text-red-500 text-sm"
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
                  as="select"
                  id="category"
                  name="category"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">--Please choose an option--</option>
                  {blogCategories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm"
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
                <div className="text-red-500 text-sm mt-1">
                  {errors.general}
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default BlogWritingForm;

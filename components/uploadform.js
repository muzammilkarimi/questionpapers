import { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import CustomSelect from "./customselect";
import Pdfupload from "./pdfupload";
import Input from "./input";

const ListingSchema = Yup.object().shape({
  year: Yup.number()
    .min(1900, "Invalid year")
    .max(new Date().getFullYear() + 1, "Invalid year")
    .required("Year is required"),
  boardId: Yup.string().required("Select Board"),
  typeId: Yup.string().required("Select Type"),
  class_name: Yup.string().required("Enter class"),
  subject: Yup.string().required("Enter subject"),
  author: Yup.string().required("Enter your name"),
});

const Uploadform = ({
  boards = [],
  type = [],
  initialValues = null,
  redirectPath = "",
  buttonText = "Submit",
  onSubmit = () => null,
}) => {
  const router = useRouter();

  const [pdfUrl, setPdfUrl] = useState(initialValues?.pdf_url || "");
  const [uploading, setUploading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // ======================
  // Upload PDF to Supabase
  // ======================
  const upload = async (base64File) => {
    if (!base64File) return;

    let toastId;
    try {
      setUploading(true);
      toastId = toast.loading("Uploading PDF...");

      const { data } = await axios.post("/api/pdf-upload", {
        image: base64File,
      });

      if (!data?.url) throw new Error("Upload failed");

      setPdfUrl(data.url);
      toast.success("PDF uploaded", { id: toastId });
    } catch (err) {
      console.error(err);
      setPdfUrl("");
      toast.error("Upload failed", { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  // ======================
  // Submit Form
  // ======================
  const handleOnSubmit = async (values) => {
    if (!pdfUrl) {
      toast.error("Please upload PDF first");
      return;
    }

    let toastId;

    try {
      setDisabled(true);
      toastId = toast.loading("Submitting...");

      await onSubmit({
        ...values,
        pdf_url: pdfUrl,
      });

      toast.success("Successfully submitted", { id: toastId });

      if (redirectPath) {
        router.push(redirectPath);
      }
    } catch (err) {
      console.error(err);
      toast.error("Submission failed", { id: toastId });
      setDisabled(false);
    }
  };

  const initialFormValues = initialValues ?? {
    boardId: "",
    year: "",
    typeId: "",
    subject: "",
    class_name: "",
    author: "",
  };

  return (
    <div className="flex flex-col bg-[#D9D9D9] rounded-lg p-10">
      <Formik
        initialValues={initialFormValues}
        validationSchema={ListingSchema}
        validateOnBlur={false}
        onSubmit={handleOnSubmit}
      >
        {({ isValid }) => (
          <Form className="space-y-8 md:p-10">
            <div className="space-y-6 flex flex-col">

              {/* Boards & Type */}
              <div className="flex flex-col md:flex-row md:space-x-16 space-y-3 md:space-y-0 w-full">
                <div className="w-full">
                  <CustomSelect name="boardId" label="Select Board">
                    <option value="">Select Board</option>
                    {boards.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </CustomSelect>
                </div>

                <div className="w-full">
                  <CustomSelect name="typeId" label="Select Type">
                    <option value="">Select Type</option>
                    {type.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </CustomSelect>
                </div>
              </div>

              {/* Year & Class */}
              <div className="flex flex-col md:flex-row md:space-x-16 space-y-3 md:space-y-0 w-full">
                <Input name="year" type="number" label="Year" placeholder="2024" />
                <Input name="class_name" type="text" label="Class / Dept" />
              </div>

              {/* Subject & Upload */}
              <div className="flex flex-col md:flex-row md:space-x-16 space-y-3 md:space-y-0 w-full">
                <Input name="subject" type="text" label="Subject" />
                <Pdfupload onChangePicture={upload} />
              </div>

              {/* Author */}
              <Input name="author" type="text" label="Your Name" />

              {/* Upload Status */}
              {pdfUrl && (
                <p className="text-green-700 text-sm">
                  ✅ PDF Uploaded Successfully
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={disabled || uploading || !isValid || !pdfUrl}
                className="bg-qp-orange text-black py-2 px-6 rounded-md disabled:opacity-50"
              >
                {uploading ? "Uploading..." : buttonText}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

Uploadform.propTypes = {
  boards: PropTypes.array,
  type: PropTypes.array,
  initialValues: PropTypes.object,
  redirectPath: PropTypes.string,
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default Uploadform;

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
import { FiCheckCircle, FiUploadCloud } from "react-icons/fi";

const ListingSchema = Yup.object().shape({
  typeId: Yup.string().required("Select Document Type"),
  year: Yup.number().when("typeId", {
    is: (val) => val !== "type_notes",
    then: () => Yup.number().min(1900, "Invalid year").max(new Date().getFullYear() + 1, "Invalid year").required("Year is required"),
    otherwise: () => Yup.number().nullable(),
  }),
  boardId: Yup.string().when("typeId", {
    is: (val) => val !== "type_notes",
    then: () => Yup.string().required("Select Board"),
    otherwise: () => Yup.string().nullable(),
  }),
  class_name: Yup.string().required("Enter class or exam"),
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

  const upload = async (base64File) => {
    if (!base64File) return;

    let toastId;
    try {
      setUploading(true);
      toastId = toast.loading("Uploading PDF to our servers...");

      const { data } = await axios.post("/api/pdf-upload", {
        image: base64File,
      });

      if (!data?.url) throw new Error("Upload failed");

      setPdfUrl(data.url);
      toast.success("PDF uploaded successfully!", { id: toastId });
    } catch (err) {
      console.error(err);
      setPdfUrl("");
      toast.error("Upload failed. Please try again.", { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  const handleOnSubmit = async (values) => {
    if (!pdfUrl) {
      toast.error("Please upload the PDF document first");
      return;
    }

    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading("Processing your contribution...");

      await onSubmit({
        ...values,
        pdf_url: pdfUrl,
      });

      toast.success("Successfully contributed!", { id: toastId });

      if (redirectPath) {
        router.push(redirectPath);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please check your connection.", { id: toastId });
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
    <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-sm border border-gray-100 max-w-4xl mx-auto animate-fade-in">
      <Formik
        initialValues={initialFormValues}
        validationSchema={ListingSchema}
        validateOnBlur={false}
        onSubmit={handleOnSubmit}
      >
        {({ isValid, dirty, values }) => (
          <Form className="space-y-10">
            <div className="space-y-8">
              {/* Header Info */}
              <div className="border-b border-gray-100 pb-6">
                <h2 className="text-2xl font-bold text-gray-900">Document Details</h2>
                <p className="text-gray-500 mt-1">Provide accurate information to help other students find your paper.</p>
              </div>

              {/* Boards & Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CustomSelect name="typeId" label="Document Type">
                  <option value="">Choose Type (Notes, Paper, etc.)</option>
                  {type.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </CustomSelect>

                {values.typeId !== "type_notes" && (
                  <CustomSelect name="boardId" label="Select Board / Institution">
                    <option value="">Choose Board</option>
                    {boards.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </CustomSelect>
                )}
              </div>

              {/* Year & Class */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.typeId !== "type_notes" && (
                  <Input name="year" type="number" label="Year" placeholder="e.g. 2024" />
                )}
                <Input name="class_name" type="text" label="Class / Department / Exam" placeholder="e.g. 10th, B.Tech or JEE" />
              </div>

              {/* Subject & Author */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input name="subject" type="text" label="Subject / Topic" placeholder="e.g. Mathematics or Thermodynamics" />
                <Input name="author" type="text" label="Contributed By" placeholder="Your name or institution" />
              </div>

              {/* Upload PDF */}
              <div className="pt-4">
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Upload Document (PDF)</label>
                    <div className={`p-8 border-2 border-dashed rounded-[2rem] transition-all flex flex-col items-center justify-center space-y-4 ${pdfUrl ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}>
                      {pdfUrl ? (
                        <>
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-3xl">
                            <FiCheckCircle />
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-green-800 tracking-tight">Document Ready!</p>
                            <button 
                              type="button" 
                              onClick={() => setPdfUrl('')}
                              className="text-xs text-green-600 underline mt-1 font-medium"
                            >
                              Change file
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-qp-orange/10 rounded-full flex items-center justify-center text-qp-orange text-3xl animate-bounce">
                            <FiUploadCloud />
                          </div>
                          <div className="text-center">
                            <Pdfupload onChangePicture={upload} />
                            <p className="text-xs text-gray-400 mt-2 font-medium">Max file size: 10MB (PDF only)</p>
                          </div>
                        </>
                      )}
                    </div>
                 </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
               <p className="text-xs text-gray-400 max-w-xs">By submitting, you agree to our community guidelines and verify that you have the right to share this document.</p>
               <button
                  type="submit"
                  disabled={disabled || uploading || !isValid || !pdfUrl}
                  className="btn-primary w-full sm:w-auto h-14 text-lg px-12 shadow-xl shadow-qp-orange/20"
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

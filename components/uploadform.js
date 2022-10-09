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
  // pdf_url: Yup.string().required(),
  year: Yup.number().positive().required(),
  boardId: Yup.string().required("select Board"),
  typeId: Yup.string().required("Select Type"),
  class_name: Yup.string().required("Enter class"),
  subject: Yup.string().required("Enter subject"),
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
  const [imageUrl, setImageUrl] = useState(initialValues?.pdf_url);
  // const [boardIds, setBoardIds] = useState(initialValues?.boardId ?? '');
  // const [typeIds, setTypeIds] = useState(initialValues?.typeId ?? '');
  // console.log(imageUrl);
  const [disabled, setDisabled] = useState(false);
  // const selectboard = async board => {
  //     // console.log(board.id);
  //     setBoardIds(board.id)
  // }
  // const selecttype = async types => {
  //     setTypeIds(types.id)
  // }
  const upload = async (image) => {
    // console.log(image)
    if (!image) return;
    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading("Uploading...");
      const { data } = await axios.post("/api/pdf-upload", { image });
      setImageUrl(data?.url);
      toast.success("Successfully uploaded", { id: toastId });
    } catch (e) {
      toast.error("Unable to upload", { id: toastId });
      setImageUrl("");
    } finally {
      setDisabled(false);
    }
  };
  const handleOnSubmit = async (values = null) => {
    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading("Submitting...");
      // Submit data
      if (typeof onSubmit === "function") {
        await onSubmit({ ...values, pdf_url: imageUrl });
      }
      toast.success("Successfully submitted", { id: toastId });
      // Redirect user
      if (redirectPath) {
        router.push(redirectPath);
      }
    } catch (e) {
      toast.error("Upload file", { id: toastId });
      setDisabled(false);
    }
  };

  const { pdf_url, ...initialFormValues } = initialValues ?? {
    pdf_url: "",
    boardId: "",
    year: "",
    typeId: "",
    subject: "",
    class_name: "",
    author: "",
  };
  return (
    <>
      <div className="flex flex-col bg-[#D9D9D9] rounded-b-lg rounded-t-lg p-10 ">
        <Formik
          initialValues={initialFormValues}
          validationSchema={ListingSchema}
          validateOnBlur={false}
          onSubmit={handleOnSubmit}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="space-y-8 md:p-10">
              <div className="space-y-6 flex flex-col">
                <div className="flex flex-col md:flex-row  md:space-x-16 space-y-3 md:space-y-0 w-full ">
                  <div className="w-full">
                    <CustomSelect
                      label="Select Boards"
                      name="boardId"
                      placeholder="Select Board"
                    >
                      <option value="">Select Board</option>
                      {boards.map((data) => (
                        <option key={data.id} value={data.id}>
                          {data.name}
                        </option>
                      ))}
                    </CustomSelect>
                  </div>
                  <div className="w-full">
                    <CustomSelect
                      label="Select Type"
                      name="typeId"
                      placeholder="Select Type"
                    >
                      <option value="">Select Type</option>
                      {type.map((data) => (
                        <option key={data.id} value={data.id}>
                          {data.name}
                        </option>
                      ))}
                    </CustomSelect>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row  md:space-x-16 space-y-3 md:space-y-0 w-full">
                  <div className="w-full">
                    <Input
                      name="year"
                      type="number"
                      label="Year"
                      placeholder="2020"
                      disabled={disabled}
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      name="class_name"
                      type="text"
                      label="Class"
                      placeholder="Enter Class or Dept."
                      disabled={disabled}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row  md:space-x-16 space-y-3 md:space-y-0 w-full">
                  <div className="w-full">
                    <Input
                      name="subject"
                      type="text"
                      label="Subject"
                      placeholder="Enter subject"
                      disabled={disabled}
                    />
                  </div>
                  <div className="w-full">
                    <Pdfupload onChangePicture={upload} />
                  </div>
                </div>
                <div className="w-full ">
                  <Input
                    name="author"
                    type="text"
                    label="Your Name"
                    placeholder="Enter your Name"
                    disabled={disabled}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={disabled || !isValid}
                  className="bg-qp-orange text-black py-2 px-6 rounded-md focus:outline-none focus:ring-4 focus:ring-qp-orange focus:ring-opacity-50 hover:bg-qp-orange transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-qp-orange"
                >
                  {isSubmitting ? "Submitting..." : buttonText}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
Uploadform.propTypes = {
  initialValues: PropTypes.shape({
    pdf_url: PropTypes.string,
    boardId: PropTypes.string,
    year: PropTypes.number,
    typeId: PropTypes.string,
    subject: PropTypes.string,
    class_name: PropTypes.string,
    author: PropTypes.string,
  }),
  redirectPath: PropTypes.string,
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
};
export default Uploadform;

import { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const Pdfupload = ({
  label = "Upload PDF",
  accept = ".pdf",
  sizeLimit = 10 * 1024 * 1024, // 10MB
  onChangePicture = () => null,
}) => {
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const handleUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate file type
    if (!file.name.endsWith(".pdf")) {
      setError("Only PDF files are allowed");
      return;
    }

    // Validate size
    if (file.size > sizeLimit) {
      setError("File must be less than 10MB");
      return;
    }

    setError("");
    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = () => {
      try {
        onChangePicture(reader.result); // base64 goes to upload()
      } catch (err) {
        console.error(err);
        toast.error("Failed to process file");
      }
    };

    reader.onerror = () => {
      toast.error("File reading failed");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-gray-700 font-medium">{label}</label>

      <div className="w-full h-10 flex items-center rounded-md bg-qp-orange cursor-pointer px-3">
        <input
          id="file_input"
          type="file"
          accept={accept}
          hidden
          onChange={handleUpload}
        />
        <label
          htmlFor="file_input"
          className="w-full h-full flex items-center cursor-pointer"
        >
          {fileName ? fileName : "Choose PDF file"}
        </label>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
};

Pdfupload.propTypes = {
  label: PropTypes.string,
  accept: PropTypes.string,
  sizeLimit: PropTypes.number,
  onChangePicture: PropTypes.func,
};

export default Pdfupload;

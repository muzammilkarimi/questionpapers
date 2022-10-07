import Link from "next/link";
import Login from "../components/login";
import { FiUpload } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";

const headerright = () => {

  return (
    <>
      <div>
        <div className="hidden lg:flex bg-back-grey rounded-b-lg h-20 items-center justify-center pl-10 pr-10">
          <div className="flex space-x-4 ">
            <Link href="/upload">
              <div className="bg-qp-orange flex h-10 w-28 items-center justify-evenly rounded-xl drop-shadow-neo cursor-pointer ">
                <FiUpload className="w-5 h-5 shrink-0 text-black" />
                <h3>Upload</h3>
              </div>
            </Link>
            <Link href="/">
              <div className="bg-qp-orange flex h-10 w-28 items-center justify-evenly rounded-xl drop-shadow-neo cursor-pointer">
                <FiEdit className="w-5 h-5 shrink-0 text-black" />
                <h3>Write</h3>
              </div>
            </Link>
            <Login />
          </div>
        </div>
      </div>
    </>
  );
};

export default headerright;

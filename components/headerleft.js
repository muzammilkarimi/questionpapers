import Link from "next/link";
import Image from "next/image";
import Login from "../components/login";
import { FiSearch } from "react-icons/fi";
const Headerleft = () => {
  return (
    <>
      <div className="flex bg-back-grey rounded-b-lg h-20 items-center justify-between w-screen ">
        <Link href="/">
          <div className="flex ml-6 items-center cursor-pointer ">
            <Image
              width={40}
              height={40}
              src="/logo.svg"
              alt="questionpapers logo"
            />
            <div className=" ml-3 font-bold ">
              <h3>Questionpaperz.com</h3>
            </div>
          </div>
        </Link>
        <div className="flex justify-center items-center text-black duration-200">
          <ul className="hidden lg:flex space-x-6 items-center font-bold">
            <Link href="/Boards">
              <li className="cursor-pointer hover:text-gray-600">
                Boards
              </li>
            </Link>
            <Link href="/Universities">
              <li className="cursor-pointer hover:text-gray-600">
                Universities
              </li>
            </Link>
            <Link href="/EntExam">
              <li className="cursor-pointer hover:text-gray-600">
                Ent. Exams
              </li>
            </Link>
            <Link href="/Notes">
              <li className="cursor-pointer hover:text-gray-600">
                Notes
              </li>
            </Link>
          </ul>
          <div className="flex items-center justify-center ml-5 mr-5">
            <Link href="/Search">
              <div className="md:bg-qp-orange w-10 h-10 flex justify-center items-center rounded-full drop-shadow-neo cursor-pointer hover:bg-[#ec9e6e] ">
                <Image width={25} height={25} src="/searchicon.svg" alt="icon" />
              </div>
            </Link>
          </div>
          <div className="flex lg:hidden mr-4">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
};

export default Headerleft;

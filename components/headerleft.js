import Link from "next/link";
import Image from "next/image";
import Login from "../components/login";
const headerleft = () => {
  return (
    <>
      <div className="flex bg-back-grey rounded-b-lg h-20 items-center justify-between w-screen ">
        <Link href="/">
          <div className="flex ml-6 items-center cursor-pointer ">
            <Image width={40} height={40} src="/logo.svg" alt="questionpapers logo" />
            <div className=" ml-3 font-bold ">
              <h3>Questionpaperz.com</h3>
            </div>
          </div>
        </Link>
        <div className="flex justify-center items-center text-black duration-200">
          <ul className="hidden lg:flex space-x-6 items-center font-bold">
            <Link href="/Boards">
              <li className="cursor-pointer hover:text-gray-600">
                <a>Boards</a>
              </li>
            </Link>
            <Link href="/Universities">
              <li className="cursor-pointer hover:text-gray-600">
                <a>Universities</a>
              </li>
            </Link>
            <Link href="/EntExam">
              <li className="cursor-pointer hover:text-gray-600">
                <a>Ent. Exams</a>
              </li>
            </Link>
            <Link href="/Notes">
              <li className="cursor-pointer hover:text-gray-600">
                <a>Notes</a>
              </li>
            </Link>
          </ul>
          <div className="flex items-center justify-center ml-5 mr-5">
            <Link href="/Search">
              <div className="md:bg-qp-orange w-10 h-10 flex justify-center items-center rounded-full drop-shadow-neo cursor-pointer hover:bg-[#ec9e6e] ">
                <img className="w-6 h-6" src="/searchicon.svg" alt="" />
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

export default headerleft;

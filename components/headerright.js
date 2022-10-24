import Link from "next/link";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Login from "../components/login";
import AuthModal from "./authmodal";
import { useSession, signOut } from "next-auth/react";
import { FiUpload } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";

const headerright = ({ children = null }) => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoadingUser = status === "loading";

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <div>
        <div className="hidden lg:flex bg-back-grey rounded-b-lg h-20 items-center justify-center pl-10 pr-10">
          <div className="flex space-x-4 ">
            <button
              onClick={() => {
                session?.user ? router.push("/upload") : openModal();
              }}
            >
              <div className="group bg-qp-orange flex h-10 w-28 items-center justify-evenly rounded-xl drop-shadow-neo cursor-pointer duration-200">
                <FiUpload className="group-hover:animate-bounce w-5 h-5 shrink-0 text-black" />
                <h3>Upload</h3>
              </div>
            </button>

            <Link href="/">
              <div className="group bg-qp-orange flex h-10 w-28 items-center justify-evenly rounded-xl drop-shadow-neo cursor-pointer duration-200">
                <FiEdit className="group-hover:animate-bounce w-5 h-5 shrink-0 text-black" />
                <h3>Write</h3>
              </div>
            </Link>
            <Login />
          </div>
        </div>
        <main className="flex-grow container mx-auto">
          <div className="">
            {typeof children === 'function' ? children(openModal) : children}
          </div>
        </main>

        <AuthModal show={showModal} onClose={closeModal} />
      </div>
    </>
  );
};

export default headerright;

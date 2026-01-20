import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Login from "../components/login";
import AuthModal from "./authmodal";
import { useSession } from "next-auth/react";
import { FiUpload, FiSearch } from "react-icons/fi";

const Headerright = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="flex items-center space-x-3 sm:space-x-6">
      <div className="hidden sm:flex items-center space-x-3">
        {/* Search Icon Shortcut */}
        <Link href="/Search">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors cursor-pointer text-gray-500">
            <FiSearch className="w-5 h-5" />
          </div>
        </Link>

        {/* Upload Button */}
        <button
          onClick={() => {
            session?.user ? router.push("/upload") : openModal();
          }}
          className="btn-primary py-2.5 px-5 text-sm h-10 shadow-sm"
        >
          <FiUpload className="text-lg" />
          <span className="hidden md:inline">Upload</span>
        </button>
      </div>

      <Login />
      
      <AuthModal show={showModal} onClose={closeModal} />
    </div>
  );
};

export default Headerright;

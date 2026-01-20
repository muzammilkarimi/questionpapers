import React, { Fragment, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthModal from "./authmodal";
import { useSession, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { FiUpload, FiEdit, FiLogOut, FiUser, FiGlobe, FiBookmark, FiFileText } from "react-icons/fi";
import { AiOutlineUserAdd, AiOutlineFileDone } from "react-icons/ai";
import { ChevronDownIcon } from "@heroicons/react/solid";

const menuItems = [
  { label: "Upload Paper", icon: FiUpload, href: "/upload" },
  { label: "Educational Boards", icon: FiGlobe, href: "/Boards" },
  { label: "Your Uploads", icon: AiOutlineFileDone, href: "/uploads" },
  { label: "Saved Papers", icon: FiBookmark, href: "/Bookmarks" },
  { label: "Logout", icon: FiLogOut, onClick: signOut, danger: true },
];

const Login = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className="relative z-[70]">
        {user ? (
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-2 p-1.5 pr-3 rounded-2xl hover:bg-gray-100 transition-all group border border-transparent hover:border-gray-200">
              <div className="shrink-0 w-9 h-9 rounded-xl overflow-hidden relative border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                {user?.image ? (
                  <Image src={user.image} alt={user.name || "User"} layout="fill" />
                ) : (
                  <div className="w-full h-full bg-qp-orange/10 flex items-center justify-center text-qp-orange">
                    <FiUser className="w-5 h-5" />
                  </div>
                )}
              </div>
              <div className="hidden sm:block text-left">
                  <p className="text-xs font-black text-gray-900 leading-tight truncate max-w-[80px]">{user.name?.split(' ')[0]}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Student</p>
              </div>
              <ChevronDownIcon className="w-4 h-4 text-gray-400 group-hover:text-qp-orange transition-colors" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-2 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-2 scale-95"
            >
              <Menu.Items className="absolute right-0 w-64 mt-3 origin-top-right bg-white rounded-[2rem] shadow-2xl ring-1 ring-black/5 focus:outline-none overflow-hidden p-2">
                <div className="flex items-center gap-3 p-4 border-b border-gray-50 mb-2">
                  <div className="shrink-0 w-10 h-10 rounded-xl overflow-hidden relative border-2 border-gray-50">
                    {user?.image ? (
                      <Image src={user.image} alt={user.name || "User"} layout="fill" />
                    ) : (
                      <div className="w-full h-full bg-qp-orange/10 flex items-center justify-center text-qp-orange">
                        <FiUser className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="text-sm font-black text-gray-900 truncate tracking-tight">{user?.name}</span>
                    <span className="text-[10px] text-gray-400 font-medium truncate">{user?.email}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  {menuItems.map(({ label, href, onClick, icon: Icon, danger }) => (
                    <Menu.Item key={label}>
                      {({ active }) => (
                        href ? (
                          <Link href={href}>
                            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                              active ? 'bg-qp-orange/10 text-qp-orange' : 'text-gray-600'
                            }`}>
                              <Icon className="w-5 h-5" />
                              <span className="text-sm font-bold tracking-tight">{label}</span>
                            </div>
                          </Link>
                        ) : (
                          <button
                            onClick={onClick}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                              active 
                                ? danger ? 'bg-red-50 text-red-600' : 'bg-qp-orange/10 text-qp-orange' 
                                : danger ? 'text-red-400' : 'text-gray-600'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="text-sm font-bold tracking-tight">{label}</span>
                          </button>
                        )
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <button
            onClick={openModal}
            className="btn-primary py-2.5 px-6 h-10 shadow-lg shadow-qp-orange/20"
          >
            <AiOutlineUserAdd className="text-xl" />
            <span className="font-bold text-sm tracking-tight">Sign In</span>
          </button>
        )}
      </div>

      <AuthModal show={showModal} onClose={closeModal} />
    </>
  );
};

export default Login;

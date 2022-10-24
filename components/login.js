import React from "react";
import { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import AuthModal from "./authmodal";
import { useSession, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { FiUpload, FiEdit } from "react-icons/fi";
import { BsGlobe, BsBookmark, BsFilePost } from "react-icons/bs";
import {
  AiOutlineUser,
  AiOutlineUserAdd,
  AiOutlineFileDone,
} from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { ChevronDownIcon } from "@heroicons/react/solid";
// import { signIn, useSession, signOut } from "next-auth/react";
const menuItems = [
  {
    label: "Upload",
    icon: FiUpload,
    href: "/upload",
  },
  {
    label: "Write",
    icon: FiEdit,
    href: "/",
  },
  {
    label: "Boards",
    icon: BsGlobe,
    href: "/Boards",
  },
  {
    label: "Saved",
    icon: BsBookmark,
    href: "/",
  },
  {
    label: "Your Posts",
    icon: BsFilePost,
    href: "/",
  },
  {
    label: "Your Uploads",
    icon: AiOutlineFileDone,
    href: "/uploads",
  },
  {
    label: "Logout",
    icon: MdOutlineLogout,
    onClick: signOut,
  },
];
const login = ({ children = null }) => {
  // console.log(session)
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

        {user ? (
          <Menu as="div" className="relative z-50">
            <Menu.Button className="flex items-center justify-center space-x-px group">
              <div className="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
                {user?.image ? (
                  <Image
                    src={user?.image}
                    alt={user?.name || "Avatar"}
                    layout="fill"
                  />
                ) : (
                  <AiOutlineUser className="text-gray-400 w-6 h-6" />
                )}
              </div>
              <ChevronDownIcon className="w-5 h-5 shrink-0 text-gray-500 group-hover:text-current" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-72 overflow-hidden mt-1 divide-y divide-gray-100 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="flex items-center space-x-2 py-4 px-4 mb-2">
                  <div className="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
                    {user?.image ? (
                      <Image
                        src={user?.image}
                        alt={user?.name || "Avatar"}
                        layout="fill"
                      />
                    ) : (
                      <AiOutlineUser className="text-gray-400 w-6 h-6" />
                    )}
                  </div>
                  <div className="flex flex-col truncate">
                    <span>{user?.name}</span>
                    <span className="text-sm text-gray-500">{user?.email}</span>
                  </div>
                </div>

                <div className="py-2">
                  {menuItems.map(({ label, href, onClick, icon: Icon }) => (
                    <div
                      key={label}
                      className="px-2 last:border-t last:pt-2 last:mt-2"
                    >
                      <Menu.Item>
                        {href ? (
                          <Link href={href}>
                            <a className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-qp-orange">
                              <Icon className="w-5 h-5 shrink-0 text-black" />
                              <span>{label}</span>
                            </a>
                          </Link>
                        ) : (
                          <button
                            className="w-full flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-qp-orange"
                            onClick={onClick}
                          >
                            <Icon className="w-5 h-5 shrink-0 text-black" />
                            <span>{label}</span>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <div
            onClick={openModal}
            className="bg-qp-orange flex h-10 w-28 items-center justify-evenly rounded-xl drop-shadow-neo cursor-pointer "
          >
            <AiOutlineUserAdd className="w-5 h-5 shrink-0 text-black" />
            <h3>Signin</h3>
          </div>
        )}
        <main className="">
          <div className="">
            {typeof children === 'function' ? children(openModal) : children}
          </div>
        </main>

        <AuthModal show={showModal} onClose={closeModal} />
      </div>
    </>
  );
  // if (session) {
  //   return (
  //     <>
  //       <div className="flex ">

  //         <div
  //           onClick={() => signOut()}
  //           className="bg-qp-orange flex h-10 w-10 rounded- items-center justify-evenly rounded-full drop-shadow-neo cursor-pointer "
  //         >
  //           <img
  //             className="h-10 w-10 rounded-full"
  //             src={session.user.image}
  //             alt="user"
  //           />

  //           {/* <h3>logout</h3>
  //         <p>{session.user.name}</p> */}
  //         </div>
  //         <ChevronDownIcon className="w-5 h-5 shrink-0 text-gray-500 group-hover:text-current" />
  //       </div>

  //     </>
  //   );
  // } else {
  //   return (
  //     <>
  // <div
  //   onClick={() => signIn()}
  //   className="bg-qp-orange flex h-10 w-28 items-center justify-evenly rounded-xl drop-shadow-neo cursor-pointer "
  // >
  //   <img src="/login.svg" alt="login icon" />
  //   <h3>Signin</h3>
  // </div>
  //     </>
  //   );
  // }
};
export default login;

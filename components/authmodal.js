import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { IoCloseOutline } from "react-icons/io5";
import { Dialog, Transition } from "@headlessui/react";
import { FcGoogle } from "react-icons/fc";

const AuthModal = ({ show = false, onClose = () => null }) => {
  const [disabled, setDisabled] = useState(false);

  const signInWithGoogle = () => {
    toast.loading("Redirecting to Google...");
    setDisabled(true);
    signIn("google", {
      callbackUrl: window.location.href,
    });
  };

  const closeModal = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        setDisabled(false);
      }, 200);
    }
  }, [show]);

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[100] overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-0 text-center flex flex-col items-center justify-end sm:justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-full sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-full sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-full text-left align-bottom transition-all transform bg-white shadow-2xl rounded-t-[2.5rem] sm:rounded-[2.5rem] max-w-md relative overflow-hidden">
              
              {/* Mobile Drag Indicator */}
              <div className="sm:hidden flex justify-center pt-4 pb-2">
                 <div className="w-12 h-1 bg-gray-200 rounded-full" />
              </div>

              {/* Close icon */}
              <button
                onClick={closeModal}
                className="absolute top-4 sm:top-6 right-6 p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 transition-all focus:outline-none z-10"
              >
                <IoCloseOutline className="w-6 h-6" />
              </button>

              <div className="px-8 pt-6 sm:pt-14 pb-12 sm:px-12">
                <div className="flex justify-center mb-8">
                  <div className="relative w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center p-3 shadow-inner">
                    <Image
                      width={48}
                      height={48}
                      src="/logo.svg"
                      alt="Questionpaperz"
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight"
                  >
                    Welcome Back
                  </Dialog.Title>
                  <Dialog.Description className="text-gray-500 font-medium leading-relaxed">
                    Sign in to easily contribute, save papers, and manage your dashboard.
                  </Dialog.Description>
                </div>

                <div className="mt-10 space-y-4">
                  <button
                    disabled={disabled}
                    onClick={signInWithGoogle}
                    className="group relative w-full h-14 flex items-center justify-center gap-3 bg-white border-2 border-gray-100 rounded-2xl font-bold text-gray-700 hover:border-qp-orange hover:bg-orange-50 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-qp-orange/0 via-qp-orange/5 to-qp-orange/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <FcGoogle className="w-6 h-6" />
                    <span className="relative">Continue with Google</span>
                  </button>

                  <p className="text-[10px] text-center text-gray-400 font-medium px-4">
                    By continuing, you agree to our <span className="underline hover:text-gray-600 cursor-pointer">Terms of Service</span> and <span className="underline hover:text-gray-600 cursor-pointer">Privacy Policy</span>.
                  </p>
                </div>
              </div>
              
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

AuthModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default AuthModal;

import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { IoCloseOutline } from "react-icons/io5";
import { Dialog, Transition } from '@headlessui/react';



const AuthModal = ({ show = false, onClose = () => null }) => {
    const [disabled, setDisabled] = useState(false);
    const [showConfirm, setConfirm] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);



    const signInWithGoogle = () => {
        toast.loading('Redirecting...');
        setDisabled(true);
        // Perform sign in
        signIn('google', {
            callbackUrl: window.location.href,
        });
    };

    const closeModal = () => {
        if (typeof onClose === 'function') {
            onClose();
        }
    };

    // Reset modal
    useEffect(() => {
        if (!show) {
            // Wait for 200ms for aniamtion to finish
            setTimeout(() => {
                setDisabled(false);
                setConfirm(false);
                setShowSignIn(false);
            }, 200);
        }
    }, [show]);

    // Remove pending toasts if any
    useEffect(() => {
        toast.dismiss();
    }, []);

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto"
                onClose={closeModal}
            >
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

                <div className="min-h-screen text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:rounded-md max-w-md relative">
                            {/* Close icon */}
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 shrink-0 p-1 rounded-md hover:bg-gray-100 transition focus:outline-none"
                            >
                                <IoCloseOutline className="w-5 h-5" />
                            </button>

                            <div className="py-12">
                                <div className="px-4 sm:px-12">
                                    <div className="flex justify-center">
                                        <Link href="/">
                                            <a className="flex items-center space-x-1 justify-center">
                                                <Image width={40} height={40} src="/logo.svg" alt="questionpapers logo" />
                                                <span className="pl-1 text-xl font-semibold tracking-wide">
                                                    Questionpaperz
                                                </span>
                                            </a>
                                        </Link>
                                    </div>

                                    <Dialog.Title
                                        as="h3"
                                        className="mt-6 font-bold text-lg sm:text-2xl text-center"
                                    >
                                        {showSignIn ? 'Welcome back!' : 'Welcome back!'}
                                    </Dialog.Title>

                                    {!showSignIn ? (
                                        <Dialog.Description className="mt-2 text-gray-500 text-base text-center">
                                            Please Login your account to Upload Questions and bookmark
                                            your favourite ones.
                                        </Dialog.Description>
                                    ) : null}

                                    <div className="mt-10">
                                        {/* Sign with Google */}
                                        <button
                                            disabled={disabled}
                                            onClick={() => signInWithGoogle()}
                                            className="h-[46px] w-full mx-auto border rounded-md p-2 flex justify-center items-center space-x-2 text-gray-500 hover:text-gray-600 hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-500 disabled:hover:bg-transparent disabled:hover:border-gray-200 transition-colors"
                                        >
                                            <Image
                                                src="/google.svg"
                                                alt="Google"
                                                width={32}
                                                height={32}
                                            />
                                            <span>Login with Google</span>
                                        </button>
                                    </div>
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
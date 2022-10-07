import { getSession } from "next-auth/react";
import Grid from "../components/grid";
import Headerleft from "../components/headerleft";
import Headerright from "../components/headerright";
import Sidebar from "../components/sidebar";
import { prisma } from "../lib/prisma";
import toast, { Toaster } from 'react-hot-toast';

export async function getServerSideProps(context) {
    // Check if user is authenticated
    const session = await getSession(context);

    // If not, redirect to the homepage
    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    // Get all homes from the authenticated user
    const questions = await prisma.question.findMany({
        where: { owner: { email: session.user.email } },
        orderBy: { createdAt: "desc" },
        include: {
            board: {
                select: { logo_url: true, name: true },
            },
            type: {
                select: {
                    name: true,
                },
            }, // Return all fields
        },
    });

    // Pass the data to the Homes component
    return {
        props: {
            questions: JSON.parse(JSON.stringify(questions)),
        },
    };
}

const Uploads = ({ questions = [] }) => {
    // console.log(questions);
    return (
        <>
            <div className="flex flex-col space-y-2">
                {/* nav bar */}
                <div className="flex justify-between lg:space-x-2 ">
                    <Headerleft />
                    <Headerright />
                </div>
                <div className="flex justify-between lg:space-x-2 min-h-screen">
                    <div className="flex flex-col bg-back-grey rounded-b-lg rounded-t-lg w-screen">
                        <div className="pl-8 pt-8 space-y-1">
                            <h1 className="text-xl font-medium text-gray-800">Your Uploads</h1>
                            <p className="text-gray-500">Thanks for your contributions</p>
                        </div>
                        <div className="mt-8">
                            <Grid questions={questions} />
                        </div>
                    </div>
                    <Sidebar />
                </div>
            </div>
        </>
    );
};

export default Uploads;

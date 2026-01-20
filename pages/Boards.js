import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";
import { prisma } from "../lib/prisma";
import Image from "next/image";
import Link from "next/link";

export async function getServerSideProps() {
  const boards = await prisma.boards.findMany({
    include: {
      _count: {
        select: { Question: true }
      }
    }
  });
  
  return {
    props: {
      boards: JSON.parse(JSON.stringify(boards)),
    },
  };
}

const Boards = ({ boards = [] }) => {
  return (
    <Layout title="All Boards | QuestionPaperz.com">
      <div className="space-y-12 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Educational Boards
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Browse question papers by educational boards. We cover all major national and state boards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <Link key={board.id} href={`/Search?q=${board.name}`}>
              <div className="group relative bg-white rounded-3xl p-8 shadow-sm border border-transparent hover:border-qp-orange transition-all duration-300 hover:shadow-xl cursor-pointer overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <div className="text-8xl font-black">{board.name[0]}</div>
                </div>
                
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden border-2 border-white shadow-inner group-hover:scale-110 transition-transform duration-500">
                    {board.logo_url ? (
                      <Image src={board.logo_url} alt={board.name} width={80} height={80} objectFit="contain" />
                    ) : (
                      <div className="text-2xl font-bold text-qp-orange">{board.name[0]}</div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">{board.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{board._count?.Question || 0} Papers Available</p>
                  </div>
                  <div className="pt-2">
                    <span className="inline-flex items-center text-qp-orange font-semibold text-sm group-hover:translate-x-1 transition-transform">
                      View Papers <span className="ml-1">→</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {boards.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500">No boards found in our database yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Boards;

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../components/Layout";
import Grid from "../components/grid";
import { FiSearch } from "react-icons/fi";
import { getSession } from "next-auth/react";
import { prisma } from "../lib/prisma";

const Search = ({ initialResults = [], query: initialQuery = "" }) => {
  const router = useRouter();
  const { q } = router.query;
  
  // Local state for the input field
  const [searchInput, setSearchInput] = useState(initialQuery || q || "");
  const [loading, setLoading] = useState(false);

  // Sync search input if URL changes externally
  useEffect(() => {
    if (q) {
      setSearchInput(q);
    }
  }, [q]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setLoading(true);
      router.push(`/Search?q=${encodeURIComponent(searchInput.trim())}`).then(() => {
        setLoading(false);
      });
    }
  };

  return (
    <Layout title="Search Results | QuestionPaperz.com">
      <div className="space-y-10 animate-fade-in">
        <div className="space-y-6 max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Find Your Papers
          </h1>
          <form onSubmit={onFormSubmit} className="relative group">
            <input
              type="text"
              placeholder="Search by subject, year, or board..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full h-16 pl-14 pr-32 rounded-2xl bg-white border border-gray-200 shadow-sm focus:ring-4 focus:ring-qp-orange/20 focus:border-qp-orange outline-none transition-all text-lg"
            />
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6 group-focus-within:text-qp-orange transition-colors" />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2.5 top-2.5 bottom-2.5 bg-qp-orange text-white px-8 rounded-xl font-bold hover:bg-qp-orange-dark transition-all active:scale-95 shadow-md shadow-qp-orange/20 disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-[2rem] p-6 sm:p-10 border border-white shadow-sm min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
              <div className="h-12 w-12 border-4 border-gray-200 border-t-qp-orange rounded-full animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Updating results...</p>
            </div>
          ) : (
            <div>
              {(initialResults && initialResults.length > 0) ? (
                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <p className="text-gray-500 font-medium">Found {initialResults.length} question papers</p>
                  </div>
                  <Grid questions={initialResults} />
                </div>
              ) : (
                q ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-3xl">🔍</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">No results found for &quot;{q}&quot;</h3>
                      <p className="text-gray-500 max-w-md mx-auto mt-2">Try checking for typos or searching with different keywords.</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
                    <p className="text-lg">Type something above to start searching.</p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { q } = context.query;
  const session = await getSession(context);

  if (!q) {
    return { props: { initialResults: [], query: "" } };
  }

  const isYear = !isNaN(q) && q.length === 4;

  const questions = await prisma.question.findMany({
    where: {
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { subject: { contains: q, mode: "insensitive" } },
        { class_name: { contains: q, mode: "insensitive" } },
        { board: { name: { contains: q, mode: "insensitive" } } },
        isYear ? { year: parseInt(q) } : {},
      ],
    },
    include: {
      board: { select: { logo_url: true, name: true } },
      type: { select: { name: true } },
      bookmarkedBy: session?.user ? {
        where: { user: { email: session.user.email } },
        select: { id: true }
      } : false
    },
    take: 40,
  });

  const formattedResults = questions.map(question => ({
    ...question,
    saved: question.bookmarkedBy?.length > 0,
    bookmarkedBy: undefined
  }));

  return {
    props: {
      initialResults: JSON.parse(JSON.stringify(formattedResults)),
      query: q
    }
  };
}

export default Search;

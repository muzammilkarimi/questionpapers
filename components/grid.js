import PropTypes from "prop-types";
import Card from "./questionspostcard";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-hot-toast";

const ITEMS_PER_PAGE = 8;

const Grid = ({ questions: initialQuestions = [] }) => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const isEmpty = questions.length === 0;

  const toggleSave = async (id) => {
    const questionIndex = questions.findIndex(q => q.id === id);
    if (questionIndex === -1) return;

    const question = questions[questionIndex];
    const isSaved = question.saved;

    // Optimistic UI update
    const newQuestions = [...questions];
    newQuestions[questionIndex] = { ...question, saved: !isSaved };
    setQuestions(newQuestions);

    try {
      if (isSaved) {
        await axios.delete("/api/bookmark", { data: { questionId: id } });
        toast.success("Removed from bookmarks");
      } else {
        await axios.post("/api/bookmark", { questionId: id });
        toast.success("Saved to bookmarks");
      }
    } catch (error) {
      console.error("Failed to update bookmark:", error);
      toast.error("Failed to update bookmark");
      // Rollback on error
      setQuestions(questions);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="text-6xl text-gray-200">📭</div>
        <p className="text-gray-500 font-medium">Unfortunately, there is nothing to display here yet.</p>
      </div>
    );
  }

  const visibleQuestions = questions.slice(0, visibleCount);
  const hasMore = visibleCount < questions.length;

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 px-1 sm:px-0">
        {visibleQuestions.map((question) => (
          <Card key={question.id} {...question} onClickSaved={toggleSave} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-4">
          <button 
            onClick={handleLoadMore}
            className="group btn-secondary px-10 h-14 rounded-2xl hover:bg-qp-orange hover:text-white hover:border-qp-orange transition-all duration-500"
          >
            Load More Papers <FiPlus className="group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      )}
    </div>
  );
};

Grid.propTypes = {
  questions: PropTypes.array,
};

export default Grid;

import PropTypes from "prop-types";
import Card from "./questionspostcard";
import { useState } from "react";
const imagePerRow = 6;
const Grid = ({ questions = [] }) => {
  const isEmpty = questions.length === 0;

  const toggleSave = async (id) => {
    // TODO: Add/remove home from the authenticated user's favorites
  };
  const [next, setNext] = useState(imagePerRow);
  const handleMoreImage = () => {
      setNext(next + imagePerRow);
    };
  return isEmpty ? (
    <p className="text-amber-700 px-4 rounded-md py-2 flex items-center justify-center space-x-1">
      <span>Unfortunately, there is nothing to display yet.</span>
    </p>
  ) : (
    <>
      <div className="flex flex-wrap justify-center items-center">
        {questions?.slice(0,next)?.map((question) => (
          <Card key={question.id} {...question} onClickSave={toggleSave} />
        ))}
      </div>
        {next < questions?.length &&(
        <div className="flex justify-center items-center pb-16 pt-5" onClick={handleMoreImage}>
          <div className="duration-200 hover:bg-qp-orange flex h-12 w-32 items-center justify-center rounded-xl cursor-pointer bg-black/[0.05] shrink-0">
            <p>Load More</p>
          </div>
        </div>)}
    </>
  );
};

Grid.propTypes = {
  questions: PropTypes.array,
};

export default Grid;

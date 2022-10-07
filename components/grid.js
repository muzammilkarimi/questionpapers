import PropTypes from 'prop-types';
import Card from './questionspostcard';

const Grid = ({ questions = [] }) => {
  const isEmpty = questions.length === 0;

  const toggleSave = async id => {
    // TODO: Add/remove home from the authenticated user's favorites
  };

  return isEmpty ? (
    <p className="text-amber-700 px-4 rounded-md py-2 flex items-center justify-center space-x-1">
      
      <span>Unfortunately, there is nothing to display yet.</span>
    </p>
  ) : (
    <div className="flex flex-wrap justify-center items-center">
      {questions.map(question => (
        <Card key={question.id} {...question} onClickSave={toggleSave} />
      ))}
    </div>
  );
};

Grid.propTypes = {
  questions: PropTypes.array,
};

export default Grid;
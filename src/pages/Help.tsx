const Help: React.FC = () => {
  return <div>
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Help</h1>
      <div className="space-y-6">
        <p className="text-xl">
          This is a website for creating and playing quiz with your friends.
        </p>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Requirements when creating or editing a quiz:</h2>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-lg">
            <li>Question text must be between 5-50 characters in length</li>
            <li>Each question must have 2-6 answers</li>
            <li>Question duration must be a positive number</li>
            <li>Total quiz duration cannot exceed 3 minutes</li>
            <li>Points awarded must be between 1-10 points</li>
            <li>Answer text must be between 1-30 characters in length</li>
            <li>Answers cannot be duplicates within the same question</li>
            <li>Each question must have at least one correct answer</li>
          </ol>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">When playing a quiz, each question will go through serveral stages. As game administrator, you can control the stage of game using control panel.</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
            <li>Lobby: Waiting for players to join</li>
            <li>Question Countdown: Display a 3 second countdown before next question is displayed</li>
            <li>Question Open: Display the question and answers, player can only answer and change answer during this stage. </li>
            <li>Question Close: Current question is closed, waiting for admin's instruction, whether to continue or end the game</li>
            <li>Show Current Question Result: Display the result of current question, and the correct answer</li>
            <li>Show Final Result: Display the final result of the game</li>
            <li>End: The game is ended, you can end the game during any stage</li>
          </ul>
        </div>

        <p className="text-lg text-gray-700">
          If you encounter any problems, feel free to{' '}
          <a 
            href="https://github.com/wiperi/Amadine-Frontend/issues" 
            className="text-blue-600 hover:text-blue-800 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            open an issue on GitHub
          </a>
        </p>
      </div>
    </div>
  </div>;
};

export default Help;

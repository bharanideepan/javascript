import React, { useState, useEffect, useReducer } from "react";
import Confetti from "react-confetti";
import Question from "./Question";
import spinner from "./logo.svg";

interface State {
  questions: QuestionModal[];
  result: number;
}

interface QuestionModal {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  options: string[];
  selectedOption?: string;
  isCorrect?: boolean;
}

const initialValue = {
  questions: [],
  result: 0,
};

const getQuestions = async () => {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=5&category=19&difficulty=easy&type=multiple"
  );
  const json = await res.json();
  return json;
};

const shuffle = (arr: string[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const questionsReducer = (
  state: State,
  action: {
    type: string;
    payload: {
      selectedQuestion?: string;
      selectedOption?: string;
      questions?: QuestionModal[];
      result?: number;
    };
  }
) => {
  const {
    selectedQuestion,
    selectedOption,
    questions,
    result,
  } = action.payload;
  if (action.type === "SELECT_OPTION") {
    let result = state.result;
    const questions = state.questions.map((question) => {
      if (question.question === selectedQuestion) {
        result += question.correct_answer === selectedOption ? 1 : 0;
        return { ...question, selectedOption: selectedOption };
      }
      return { ...question };
    });
    return { questions, result };
  }

  if (action.type === "LOAD_QUESTIONS" && questions) {
    return {
      questions: questions,
      result: result ?? 0,
    };
  }

  return state;
};

const Questions = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, dispatchState] = useReducer(questionsReducer, initialValue);
  const handleCheckAnswers = () => {
    setSubmitted(true);
  };
  const handlePlayAgain = () => {
    setSubmitted(false);
    dispatchState({ type: "LOAD_QUESTIONS", payload: initialValue });
  };
  const setSelectedOption = (
    selectedQuestion: string,
    selectedOption: string
  ) => {
    dispatchState({
      type: "SELECT_OPTION",
      payload: { selectedQuestion, selectedOption },
    });
  };
  useEffect(() => {
    if (submitted) return;
    async function fetchQuestions() {
      setLoading(true);
      const res = await getQuestions();
      const questions = res.results.map(
        (question: { incorrect_answers: any; correct_answer: string }) => ({
          ...question,
          options: shuffle([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
        })
      );
      setLoading(false);
      dispatchState({
        type: "LOAD_QUESTIONS",
        payload: {
          questions,
          result: 0,
        },
      });
    }
    fetchQuestions();
  }, [submitted, dispatchState, setLoading]);
  return (
    <div className="questions-container">
      {submitted && state.result >= 4 && <Confetti />}
      {loading && <img className="spinner" src={spinner} alt="" />}
      {state.questions.map((question, index) => (
        <Question
          key={index}
          correctAnswer={question.correct_answer}
          incorrectAnswers={question.incorrect_answers}
          question={question.question}
          submitted={submitted}
          options={question.options}
          setSelectedOption={setSelectedOption}
          selectedOption={question.selectedOption}
        />
      ))}
      {!loading && (
        <div className="footer">
          {submitted && (
            <p className="result">
              You scored {state.result}/{state.questions.length} correct answers
            </p>
          )}

          <button
            className="btn md"
            onClick={submitted ? handlePlayAgain : handleCheckAnswers}
          >
            {submitted ? "Play again" : "Check answers"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Questions;

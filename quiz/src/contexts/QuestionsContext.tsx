import React, {
  createContext,
  useState,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { State, QuestionModal, Filters } from "../interfaces/Common";
import { getQuestions, shuffle } from "../services/Util.service";

const INITIAL_VALUE: State = {
  questions: [],
  result: 0,
};

const reducer = (
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
    return { ...state, questions, result };
  }

  if (action.type === "LOAD_QUESTIONS" && questions) {
    return {
      ...state,
      questions: questions,
      result: result ?? 0,
    };
  }

  return state;
};

export const QuestionsContext = createContext({
  ...INITIAL_VALUE,
  selectOption: (selectedQuestion: string, selectedOption: string) => {},
  loadQuestions: () => {},
  loading: false,
});

const QuestionsProvider: React.FC<{ filters: Filters }> = ({
  filters,
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_VALUE);
  const [loading, setLoading] = useState(false);
  const selectOption = (selectedQuestion: string, selectedOption: string) => {
    dispatch({
      type: "SELECT_OPTION",
      payload: { selectedQuestion, selectedOption },
    });
  };
  const loadQuestions = useCallback(() => {
    async function fetchQuestions() {
      setLoading(true);
      const res = await getQuestions(filters);
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
      dispatch({
        type: "LOAD_QUESTIONS",
        payload: {
          questions,
          result: 0,
        },
      });
    }
    fetchQuestions();
  }, [setLoading, dispatch]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  return (
    <QuestionsContext.Provider
      value={{
        loadQuestions,
        selectOption,
        loading,
        ...state,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsProvider;

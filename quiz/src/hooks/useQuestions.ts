import { useContext } from "react";
import { QuestionsContext } from "../contexts/QuestionsContext";

export const useQuestions = () => useContext(QuestionsContext);
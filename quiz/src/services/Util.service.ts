import { Filters } from "../interfaces/Common";

export const getQuestions = async (filters: Filters) => {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=${
    filters.amount
    }&category=${filters.category.trim()}&difficulty=${filters.difficulty.trim()}&type=multiple`
  );
  const json = await res.json();
  return json;
};

export const shuffle = (arr: string[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
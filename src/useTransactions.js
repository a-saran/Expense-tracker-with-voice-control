import { useExpenseTracker } from "./context/context";
import {
  incomeCategories,
  expenseCategories,
  resetCategories
} from "./constants/categories";

const useTransactions = title => {
  resetCategories();

  const { transactions } = useExpenseTracker();

  const transactionsPerType = transactions.filter(t => t.type === title);
  const total = transactionsPerType.reduce((acc, t) => (acc += t.amount), 0);
  const categories = title === "Income" ? incomeCategories : expenseCategories;

  let filteredCategories = [];

  transactionsPerType.forEach(t => {
    const category = categories.find(c => c.type === t.category);

    if (category) {
      filteredCategories.push({
        ...category,
        amount: category.amount + t.amount
      });
    }
  });

  const chartData = {
    datasets: [
      {
        data: filteredCategories.map(c => c.amount),
        backgroundColor: filteredCategories.map(c => c.color)
      }
    ],
    labels: filteredCategories.map(c => c.type)
  };

  return {
    filteredCategories,
    total,
    chartData
  };
};

export default useTransactions;

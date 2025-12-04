import React from "react";
import { useExpenses } from "../Context/ExpenseContext";
import {
  formatCurrency,
  getExpensesByCategory,
  getTotalExpenses,
} from "../utils/Expense";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

const ExpenseSummary = () => {
  const { expenses } = useExpenses();

  const totalExpenses = getTotalExpenses(expenses);
  const categoriesData = getExpensesByCategory(expenses);

  let highestCategory = { name: "none", amount: 0 };

  Object.entries(categoriesData).forEach(([category, amount]) => {
    if (amount > highestCategory.amount) {
      highestCategory = { name: category, amount };
    }
  });
const summaryCards = [
  {
    title: "Total Expenses",
    value: formatCurrency(totalExpenses),
    icon: <Wallet size={22} className="text-blue-700" />,
    bg: "bg-gradient-to-br from-blue-200 to-blue-300",
  },
  {
    title: "Highest Category",
    value:
      highestCategory.name !== "none" ? (
        <>
          <span className="capitalize">{highestCategory.name}</span>
          <span className="text-sm font-normal text-gray-500 ml-2">
            ({formatCurrency(highestCategory.amount)})
          </span>
        </>
      ) : (
        "None"
      ),
    icon: <TrendingUp size={22} className="text-rose-700" />,
    bg: "bg-gradient-to-br from-rose-200 to-rose-300",
  },
  {
    title: "Total Entries",
    value: expenses.length,
    icon: <TrendingDown size={22} className="text-emerald-700" />,
    bg: "bg-gradient-to-br from-emerald-200 to-emerald-300",
  },
];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {summaryCards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-sm hover:shadow-lg p-6
          flex items-center space-x-5 border border-gray-100
          transition-all duration-300 hover:-translate-y-1"
        >
          <div
            className={`p-4 rounded-xl ${card.bg} shadow-md flex items-center justify-center`}
          >
            {card.icon}
          </div>

          <div>
            <h3 className="text-xs font-medium text-gray-500 tracking-wide uppercase">
              {card.title}
            </h3>

            <p className="text-2xl font-semibold text-gray-800 mt-1">
              {card.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseSummary;

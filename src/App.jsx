import Header from "./components/Header";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import { useEffect, useState } from "react";

export default function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen p-4 max-w-xl mx-auto">
      <Header />
      <Summary total={total} />
      <AddExpense setExpenses={setExpenses} />
      <ExpenseList expenses={expenses} setExpenses={setExpenses} />
    </div>
  );
}
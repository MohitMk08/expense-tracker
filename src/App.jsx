import Login from "./pages/Login";
import Header from "./components/Header";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import { exportToPDF } from "./utils/exportPDF";
import { useAuth } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { subscribeToUserExpenses } from "./firebase/expenseService";

export default function App() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("general");
  const eventOptions = [...new Set(
    expenses.map(e => (e.event || "general").trim())
  )];

  // ✅ filter by event
  const filteredExpenses = expenses.filter(
    (e) => (e.event || "general") === selectedEvent
  );

  // ✅ calculations
  const totalExpense = filteredExpenses
    .filter((e) => (e.type || "expense") === "expense")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const totalCredit = filteredExpenses
    .filter((e) => e.type === "credit")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const balance = totalCredit - totalExpense;

  const handleExport = () => {
    exportToPDF(filteredExpenses, {
      totalCredit,
      totalExpense,
      balance,
    }, selectedEvent);
  };

  // ✅ realtime updates
  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToUserExpenses(user.uid, setExpenses);
    return () => unsubscribe();
  }, [user]);

  if (!user) return <Login />;

  return (
    <div className="min-h-screen transition-colors duration-300 
      bg-linear-to-br from-gray-50 via-white to-gray-100 
      dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">

      {/* 🔹 HEADER */}
      <div className="sticky top-0 z-10 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">

        <button
          onClick={handleExport}
          className="w-full bg-black dark:bg-white dark:text-black text-white py-2 rounded-xl text-sm font-medium hover:opacity-90 transition"
        >
          Download Report 📄
        </button>
        <div className="max-w-xl mx-auto px-4 py-3">
          <Header />
        </div>
      </div>

      {/* 🔹 MAIN CONTENT */}
      <div className="max-w-xl mx-auto px-4 py-5 space-y-5">

        {/* 🔹 EVENT SELECTOR */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-3 shadow-sm border border-gray-200 dark:border-gray-800">
          <input
            list="events"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            placeholder="Search or type event..."
            className="w-full bg-transparent outline-none text-sm"
          />

          <datalist id="events">
            {eventOptions.map((event, i) => (
              <option key={i} value={event} />
            ))}
          </datalist>
        </div>

        {/* 🔹 SUMMARY */}
        <Summary
          totalExpense={totalExpense}
          totalCredit={totalCredit}
          balance={balance}
        />

        {/* 🔹 ADD EXPENSE */}
        <AddExpense user={user} eventOptions={eventOptions} />

        {/* 🔹 EXPENSE LIST */}
        <ExpenseList expenses={filteredExpenses} />
      </div>
    </div>
  );
}
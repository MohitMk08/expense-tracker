import Login from "./pages/Login";
import Header from "./components/Header";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import { exportToPDF } from "./utils/exportPDF";
import { useAuth } from "./context/AuthContext";
import { useEffect, useState, useMemo } from "react";
import { subscribeToUserExpenses } from "./firebase/expenseService";

export default function App() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("all"); // ✅ FIXED default

  // ✅ REALTIME FETCH (SAFE)
  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToUserExpenses(user.uid, (data) => {
      setExpenses(data || []);
    });

    return () => unsubscribe();
  }, [user]);

  // ✅ FIX: DEFINE eventOptions (this was missing ❌)
  const eventOptions = useMemo(() => {
    return [
      ...new Set(
        (expenses || []).map((e) =>
          (e.event || "general").trim()
        )
      ),
    ];
  }, [expenses]);

  // ✅ EVENT TABS
  const eventTabs = useMemo(() => {
    return ["all", ...eventOptions];
  }, [eventOptions]);

  // ✅ FILTER LOGIC
  const filteredExpenses =
    selectedEvent === "all"
      ? expenses
      : expenses.filter(
        (e) => (e.event || "general") === selectedEvent
      );

  // ✅ CALCULATIONS (FIXED LOGIC)
  const totalExpense = filteredExpenses
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const totalCredit = filteredExpenses
    .filter((e) => e.type === "credit")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const balance = totalCredit - totalExpense;

  // ✅ EXPORT PDF
  const handleExport = () => {
    exportToPDF(
      filteredExpenses,
      {
        totalCredit,
        totalExpense,
        balance,
      },
      selectedEvent
    );
  };

  if (!user) return <Login />;

  return (
    <div
      className="min-h-screen transition-colors duration-300 
      bg-linear-to-br from-gray-50 via-white to-gray-100 
      dark:from-gray-900 dark:via-gray-950 dark:to-gray-900"
    >
      {/* 🔹 HEADER */}
      <div className="sticky top-0 z-10 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">



        <div className="max-w-xl mx-auto px-4 py-3">
          <Header />
          <button
            onClick={handleExport}
            className="w-full bg-black dark:bg-white dark:text-black text-white py-2 rounded-xl text-sm font-medium hover:opacity-90 transition"
          >
            Download Report 📄
          </button>
        </div>
      </div>

      {/* 🔹 MAIN */}
      <div className="max-w-xl mx-auto px-4 py-5 space-y-5">

        {/* 🔹 EVENT TABS */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {eventTabs.map((ev, i) => (
            <button
              key={i}
              onClick={() => setSelectedEvent(ev)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition
              ${selectedEvent === ev
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
            >
              {ev}
            </button>
          ))}
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
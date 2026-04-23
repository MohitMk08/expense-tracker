import Login from "./pages/Login";
import Header from "./components/Header";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import Insights from "./components/Insights";
import ExpenseChart from "./components/ExpenseChart";
import Loader from "./components/Loader";
import { exportToPDF } from "./utils/exportPDF";
import { useAuth } from "./context/AuthContext";
import { useEffect, useState, useMemo } from "react";
import { subscribeToUserExpenses } from "./firebase/expenseService";

export default function App() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("all"); // ✅ FIXED default
  const [appLoading, setAppLoading] = useState(true);

  // ✅ REALTIME FETCH (SAFE)
  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToUserExpenses(user.uid, (data) => {
      setExpenses(data);

      // ⏳ force minimum loader time (3 sec)
      setTimeout(() => {
        setAppLoading(false);
      }, 3000);
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

  if (appLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (

    <div className="min-h-screen relative overflow-hidden">

      {/* 🌈 BACKGROUND GRADIENT BLOBS */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-25 left-25 w-72 h-72 bg-indigo-500 opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-30 right-25 w-72 h-72 bg-pink-500 opacity-20 blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-5 space-y-6">
        {/* 🔹 HEADER */}
        <div className="sticky top-0 z-10 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">



          <div className="max-w-xl mx-auto px-4 py-3">
            <Header />
            <button
              onClick={handleExport}
              className="w-full py-2 rounded-xl text-sm font-medium
bg-indigo-600 text-white hover:bg-indigo-700
dark:bg-indigo-500 dark:hover:bg-indigo-600 hover:opacity-90 transition-all duration-200 active:scale-95"
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
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-all duration-200 active:scale-95
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
          {/* AI Insights */}
          <Insights expenses={filteredExpenses} />

          {/* Expense charts */}
          <ExpenseChart expenses={filteredExpenses} />

          {/* 🔹 ADD EXPENSE */}
          <AddExpense user={user} eventOptions={eventOptions} />

          {/* 🔹 EXPENSE LIST */}
          <ExpenseList expenses={filteredExpenses} />
        </div>
      </div>
    </div>
  );
}
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
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToUserExpenses(user.uid, (data) => {
      setExpenses(data);

      setTimeout(() => {
        setAppLoading(false);
      }, 3000);
    });

    return () => unsubscribe();
  }, [user]);

  const eventOptions = useMemo(() => {
    return [
      ...new Set(
        (expenses || []).map((e) =>
          (e.event || "general").trim()
        )
      ),
    ];
  }, [expenses]);

  const eventTabs = useMemo(() => {
    return ["all", ...eventOptions];
  }, [eventOptions]);

  const filteredExpenses =
    selectedEvent === "all"
      ? expenses
      : expenses.filter(
        (e) => (e.event || "general") === selectedEvent
      );

  const totalExpense = filteredExpenses
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const totalCredit = filteredExpenses
    .filter((e) => e.type === "credit")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const balance = totalCredit - totalExpense;

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
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg)", color: "var(--text)" }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden transition-all duration-300"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >

      {/* 🌈 PREMIUM SOFT BACKGROUND BLOBS */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl opacity-20"
          style={{ background: "var(--primary)" }}
        />
        <div
          className="absolute bottom-20 right-20 w-72 h-72 rounded-full blur-3xl opacity-20"
          style={{ background: "#ec4899" }}
        />
      </div>

      <div className="max-w-xl mx-auto px-4 py-5 space-y-6">

        {/* 🔹 HEADER */}
        <div
          className="sticky top-0 z-10 backdrop-blur-xl rounded-xl border shadow-sm"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <div className="px-4 py-3 space-y-3">
            <Header />

            <button
              onClick={handleExport}
              className="w-full py-2 rounded-xl text-sm font-medium transition-all active:scale-95"
              style={{
                background: "var(--primary)",
                color: "#fff",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "var(--primary-hover)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "var(--primary)")
              }
            >
              Download Report 📄
            </button>
          </div>
        </div>

        {/* 🔹 MAIN */}
        <div className="space-y-5">

          {/* 🔹 EVENT TABS */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {eventTabs.map((ev, i) => {
              const active = selectedEvent === ev;

              return (
                <button
                  key={i}
                  onClick={() => setSelectedEvent(ev)}
                  className="px-3 py-1 rounded-full text-sm whitespace-nowrap transition-all active:scale-95 border"
                  style={{
                    background: active ? "var(--primary)" : "var(--card)",
                    color: active ? "#fff" : "var(--text)",
                    borderColor: active
                      ? "var(--primary)"
                      : "var(--border)",
                  }}
                >
                  {ev}
                </button>
              );
            })}
          </div>

          {/* 🔹 SUMMARY */}
          <Summary
            totalExpense={totalExpense}
            totalCredit={totalCredit}
            balance={balance}
          />

          {/* 🔹 INSIGHTS */}
          <Insights expenses={filteredExpenses} />

          {/* 🔹 CHART */}
          <ExpenseChart expenses={filteredExpenses} />

          {/* 🔹 ADD EXPENSE */}
          <AddExpense user={user} eventOptions={eventOptions} />

          {/* 🔹 LIST */}
          <ExpenseList expenses={filteredExpenses} />
        </div>
      </div>
    </div>
  );
}
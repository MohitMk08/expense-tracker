import Login from "./pages/Login"
import Header from "./components/Header"
import AddExpense from "./components/AddExpense"
import ExpenseList from "./components/ExpenseList"
import Summary from "./components/Summary"
import { useAuth } from "./context/AuthContext"
import { useEffect, useState } from "react"
import { getUserExpenses } from "./firebase/expenseService"

export default function App() {
  const { user } = useAuth()
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    if (!user) return
    getUserExpenses(user.uid).then(setExpenses)
  }, [user])

  if (!user) return <Login />

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="min-h-screen p-4 max-w-xl mx-auto">
      <Header />
      <Summary total={total} />
      <AddExpense user={user} setExpenses={setExpenses} />
      <ExpenseList expenses={expenses} setExpenses={setExpenses} />
    </div>
  )
}
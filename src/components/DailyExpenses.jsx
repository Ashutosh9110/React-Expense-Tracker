import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { addExpenseToDB, getExpensesFromDB, deleteExpenseFromDB, updateExpenseInDB } from "../utils/firebaseUtils";

export default function DailyExpenses() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenses, setExpenses] = useState([]);
  const { user } = useContext(AuthContext);
  const [editId, setEditId] = useState(null);


  // Fetch expenses when component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!user?.uid) return;
      try {
        const fetched = await getExpensesFromDB(user.uid);
        setExpenses(fetched.reverse()); // newest first
      } catch (err) {
        console.error("Error fetching expenses:", err);
      }
    };
    fetchExpenses();
  }, [user]);

  //Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !description) {
      alert("Please fill all fields");
      return;
    }

    const expenseData = {
      amount,
      description,
      category,
      date: new Date().toLocaleDateString(),
    };

    try {
      
      if (editId) {
        // edit expense
        await updateExpenseInDB(user.uid, editId, expenseData);
        setExpenses((prev) =>
          prev.map((exp) =>
            exp.firebaseId === editId ? { firebaseId: editId, ...expenseData } : exp
          )
        );
        alert("Expense has been edited");

        setEditId(null);
      } else {
      const savedExpense = await addExpenseToDB(user.uid, expenseData);
      setExpenses((prev) => [
        { firebaseId: savedExpense.name, ...expenseData },
        ...prev,
      ]);
    }
      setAmount("");
      setDescription("");
      setCategory("Food");
    } catch (err) {
      console.error("Error adding expense:", err);
      alert("Failed to save expense. Try again.");
    }
  };

  // delete Expense
  const handleDelete = async (id) => {
    try {
      await deleteExpenseFromDB(user.uid, id);
      setExpenses((prev) => prev.filter((exp) => exp.firebaseId !== id));
      alert("Expense has been deleted")
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

// Start editing

  const startEditing = (exp) => {
    setEditId(exp.firebaseId);
    setAmount(exp.amount);
    setDescription(exp.description);
    setCategory(exp.category);
  };


  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-12 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {editId ? "Edit Expense" : "Add Daily Expense"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Description */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">Description</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">Amount Spent (₹)</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-black"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">Category</label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-black"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
          >
            {editId ? "Update Expense" : "Add Expense"}
            </button>
        </form>
      </div>

      {/* Expenses List */}
      <div className="mt-10 w-full max-w-lg">
        <h3 className="text-xl font-semibold text-white mb-4 text-center">Your Expenses</h3>
        {expenses.length === 0 ? (
          <p className="text-center text-white">No expenses added yet.</p>
        ) : (
          <ul className="space-y-4">
            {expenses.map((exp) => (
              <li
                key={exp.firebaseId}
                className="bg-white rounded-xl p-4 shadow flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold text-indigo-700">₹{exp.amount}</p>
                  <p className="text-gray-700">{exp.description}</p>
                  <p className="text-sm text-gray-500">
                    {exp.category} • {exp.date}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => startEditing(exp)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp.firebaseId)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>

              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

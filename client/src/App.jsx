import { useState } from 'react';
import useExpenses from './hooks/useExpenses';

function App() {
  const {
    expenses,
    loading,
    error,
    addExpense,
    editExpense,
    removeExpense,
  } = useExpenses();

  return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-800">
              💰 Expense Tracker
            </h1>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8">
          {error && (
              <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
          )}

          {loading ? (
              <div className="text-center text-gray-500 py-12">
                Loading expenses...
              </div>
          ) : (
              <div>
                <p className="text-gray-500">
                  {expenses.length} expense(s) found
                </p>
              </div>
          )}
        </main>
      </div>
  );
}

export default App;
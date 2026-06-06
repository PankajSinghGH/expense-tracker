import { useState } from 'react';
import useExpenses from './hooks/useExpenses';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';

function App() {
    const {
        expenses,
        loading,
        error,
        addExpense,
        editExpense,
        removeExpense,
    } = useExpenses();

    const [editingExpense, setEditingExpense] = useState(null);

    const handleAdd = async (data) => {
        await addExpense(data);
    };

    const handleEdit = (expense) => {
        setEditingExpense(expense);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleUpdate = async (data) => {
        await editExpense(editingExpense.id, data);
        setEditingExpense(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            await removeExpense(id);
        }
    };

    const handleCancel = () => {
        setEditingExpense(null);
    };

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

                <ExpenseForm
                    onSubmit={editingExpense ? handleUpdate : handleAdd}
                    initialData={editingExpense}
                    onCancel={handleCancel}
                />

                {loading ? (
                    <div className="text-center text-gray-500 py-12">
                        Loading expenses...
                    </div>
                ) : (
                    <ExpenseTable
                        expenses={expenses}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </main>
        </div>
    );
}

export default App;
import { useState, useMemo, useCallback } from 'react';
import useExpenses from './hooks/useExpenses';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import FilterBar from './components/FilterBar';
import SummaryPanel from './components/SummaryPanel';
import ExpenseChart from './components/ExpenseChart';
import Skeleton from './components/Skeleton';
import Toast from './components/Toast';

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
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterDateRange, setFilterDateRange] = useState('all');
    const [customDateFrom, setCustomDateFrom] = useState('');
    const [customDateTo, setCustomDateTo] = useState('');
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const filteredExpenses = useMemo(() => {
        return expenses.filter((expense) => {
            if (filterCategory !== 'all' && expense.category !== filterCategory) {
                return false;
            }

            const expenseDate = new Date(expense.date);
            const now = new Date();

            if (filterDateRange === 'thisMonth') {
                return (
                    expenseDate.getMonth() === now.getMonth() &&
                    expenseDate.getFullYear() === now.getFullYear()
                );
            }

            if (filterDateRange === 'lastMonth') {
                const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
                return (
                    expenseDate.getMonth() === lastMonth.getMonth() &&
                    expenseDate.getFullYear() === lastMonth.getFullYear()
                );
            }

            if (filterDateRange === 'custom') {
                if (customDateFrom && expenseDate < new Date(customDateFrom)) return false;
                if (customDateTo && expenseDate > new Date(customDateTo)) return false;
            }

            return true;
        });
    }, [expenses, filterCategory, filterDateRange, customDateFrom, customDateTo]);

    const handleAdd = async (data) => {
        await addExpense(data);
        showToast('Expense added successfully!');
    };

    const handleEdit = (expense) => {
        setEditingExpense(expense);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleUpdate = async (data) => {
        await editExpense(editingExpense.id, data);
        setEditingExpense(null);
        showToast('Expense updated successfully!');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            await removeExpense(id);
            showToast('Expense deleted!', 'error');
        }
    };

    const handleCancel = () => {
        setEditingExpense(null);
    };

    const handleCustomDateChange = (field, value) => {
        if (field === 'from') setCustomDateFrom(value);
        if (field === 'to') setCustomDateTo(value);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

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

                <FilterBar
                    filterCategory={filterCategory}
                    filterDateRange={filterDateRange}
                    customDateFrom={customDateFrom}
                    customDateTo={customDateTo}
                    onCategoryChange={setFilterCategory}
                    onDateRangeChange={setFilterDateRange}
                    onCustomDateChange={handleCustomDateChange}
                />

                {loading ? (
                    <Skeleton />
                ) : (
                    <>
                        <SummaryPanel expenses={filteredExpenses} />
                        <ExpenseChart expenses={filteredExpenses} />
                        <ExpenseTable
                            expenses={filteredExpenses}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </>
                )}
            </main>
        </div>
    );
}

export default App;
import { useState, useMemo, useEffect } from 'react';
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
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            {/* Navbar */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-cyan-900/40 shadow-sm">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                            <span className="text-white text-lg">💸</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                                ExpenseTracker
                            </h1>
                            <p className="text-xs text-gray-400 dark:text-gray-500 -mt-0.5 tracking-widest uppercase">
                                Smart Finance
                            </p>
                        </div>
                    </div>

                    {/* Theme toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 border border-gray-700 dark:border-gray-600 transition-all duration-200 text-lg shadow-md"
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-8">
                {error && (
                    <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl mb-4 border border-red-200 dark:border-red-800">
                        {error}
                    </div>
                )}

                <ExpenseForm
                    onSubmit={editingExpense ? handleUpdate : handleAdd}
                    initialData={editingExpense}
                    onCancel={handleCancel}
                    darkMode={darkMode}
                />

                <FilterBar
                    filterCategory={filterCategory}
                    filterDateRange={filterDateRange}
                    customDateFrom={customDateFrom}
                    customDateTo={customDateTo}
                    onCategoryChange={setFilterCategory}
                    onDateRangeChange={setFilterDateRange}
                    onCustomDateChange={handleCustomDateChange}
                    darkMode={darkMode}
                />

                {loading ? (
                    <Skeleton />
                ) : (
                    <>
                        <SummaryPanel expenses={filteredExpenses} darkMode={darkMode} />
                        <ExpenseChart expenses={filteredExpenses} darkMode={darkMode} />
                        <ExpenseTable
                            expenses={filteredExpenses}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            darkMode={darkMode}
                        />
                    </>
                )}
            </main>
        </div>
    );
}

export default App;
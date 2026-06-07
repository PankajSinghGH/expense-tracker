const CATEGORY_COLORS = {
    Food: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Transport: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Bills: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    Entertainment: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    Other: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
};

const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
    if (expenses.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center">
                <p className="text-4xl mb-3">🧾</p>
                <p className="text-gray-500 dark:text-gray-400 font-medium">No expenses yet</p>
                <p className="text-gray-400 dark:text-gray-600 text-sm mt-1">
                    Add your first expense using the form above
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <tr>
                    {['Date', 'Category', 'Note', 'Amount', 'Actions'].map((h) => (
                        <th
                            key={h}
                            className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ${h === 'Amount' || h === 'Actions' ? 'text-right' : 'text-left'}`}
                        >
                            {h}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {expenses.map((expense) => (
                    <tr
                        key={expense.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
                    >
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-sm">
                            {new Date(expense.date).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                            })}
                        </td>
                        <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.Other}`}>
                  {expense.category}
                </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 dark:text-gray-500">
                            {expense.note || '—'}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-gray-800 dark:text-gray-100">
                            ₹{expense.amount.toLocaleString('en-IN', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                        </td>
                        <td className="px-4 py-3 text-right">
                            <button
                                onClick={() => onEdit(expense)}
                                className="text-cyan-500 hover:text-cyan-400 font-semibold mr-3 text-xs uppercase tracking-wider transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(expense.id)}
                                className="text-red-400 hover:text-red-300 font-semibold text-xs uppercase tracking-wider transition"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseTable;
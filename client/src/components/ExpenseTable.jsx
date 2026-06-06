const CATEGORY_COLORS = {
    Food: 'bg-green-100 text-green-700',
    Transport: 'bg-blue-100 text-blue-700',
    Bills: 'bg-red-100 text-red-700',
    Entertainment: 'bg-purple-100 text-purple-700',
    Other: 'bg-gray-100 text-gray-700',
};

const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
    if (expenses.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-4xl mb-3">🧾</p>
                <p className="text-gray-500 font-medium">No expenses yet</p>
                <p className="text-gray-400 text-sm mt-1">
                    Add your first expense using the form above
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                <tr>
                    <th className="text-left px-4 py-3 text-gray-600 font-medium">Date</th>
                    <th className="text-left px-4 py-3 text-gray-600 font-medium">Category</th>
                    <th className="text-left px-4 py-3 text-gray-600 font-medium">Note</th>
                    <th className="text-right px-4 py-3 text-gray-600 font-medium">Amount</th>
                    <th className="text-right px-4 py-3 text-gray-600 font-medium">Actions</th>
                </tr>
                </thead>
                <tbody>
                {expenses.map((expense, index) => (
                    <tr
                        key={expense.id}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                        <td className="px-4 py-3 text-gray-600">
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
                        <td className="px-4 py-3 text-gray-500">
                            {expense.note || '—'}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-800">
                            ₹{expense.amount.toLocaleString('en-IN', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                        </td>
                        <td className="px-4 py-3 text-right">
                            <button
                                onClick={() => onEdit(expense)}
                                className="text-blue-600 hover:text-blue-800 font-medium mr-3"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(expense.id)}
                                className="text-red-500 hover:text-red-700 font-medium"
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
const CATEGORY_COLORS = {
    Food: 'bg-green-100 text-green-700',
    Transport: 'bg-blue-100 text-blue-700',
    Bills: 'bg-red-100 text-red-700',
    Entertainment: 'bg-purple-100 text-purple-700',
    Other: 'bg-gray-100 text-gray-700',
};

const formatAmount = (amount) =>
    `₹${amount.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;

const SummaryPanel = ({ expenses }) => {
    if (expenses.length === 0) return null;

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    const byCategory = expenses.reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
    }, {});

    const highest = expenses.reduce((max, e) =>
        e.amount > max.amount ? e : max, expenses[0]
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

            {/* Total */}
            <div className="bg-white rounded-lg shadow p-5">
                <p className="text-sm text-gray-500 mb-1">Total Spent</p>
                <p className="text-2xl font-bold text-gray-800">{formatAmount(total)}</p>
                <p className="text-xs text-gray-400 mt-1">{expenses.length} expense(s)</p>
            </div>

            {/* By Category */}
            <div className="bg-white rounded-lg shadow p-5">
                <p className="text-sm text-gray-500 mb-3">By Category</p>
                <div className="space-y-2">
                    {Object.entries(byCategory)
                        .sort((a, b) => b[1] - a[1])
                        .map(([cat, amt]) => (
                            <div key={cat} className="flex justify-between items-center">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[cat] || CATEGORY_COLORS.Other}`}>
                  {cat}
                </span>
                                <span className="text-sm font-semibold text-gray-700">
                  {formatAmount(amt)}
                </span>
                            </div>
                        ))}
                </div>
            </div>

            {/* Highest */}
            <div className="bg-white rounded-lg shadow p-5">
                <p className="text-sm text-gray-500 mb-1">Highest Expense</p>
                <p className="text-2xl font-bold text-gray-800">
                    {formatAmount(highest.amount)}
                </p>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium mt-2 inline-block ${CATEGORY_COLORS[highest.category] || CATEGORY_COLORS.Other}`}>
          {highest.category}
        </span>
                {highest.note && (
                    <p className="text-xs text-gray-400 mt-1">{highest.note}</p>
                )}
            </div>

        </div>
    );
};

export default SummaryPanel;
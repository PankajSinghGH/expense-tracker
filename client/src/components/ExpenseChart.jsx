import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';

const CATEGORY_COLORS = {
    Food: '#22c55e',
    Transport: '#3b82f6',
    Bills: '#ef4444',
    Entertainment: '#a855f7',
    Other: '#6b7280',
};

const formatAmount = (value) =>
    `₹${value.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;

const ExpenseChart = ({ expenses, darkMode }) => {
    if (expenses.length === 0) return null;

    const data = Object.entries(
        expenses.reduce((acc, e) => {
            acc[e.category] = (acc[e.category] || 0) + e.amount;
            return acc;
        }, {})
    )
        .map(([category, total]) => ({ category, total }))
        .sort((a, b) => b.total - a.total);

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 mb-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
                Spending by Category
            </p>
            <ResponsiveContainer width="100%" height={240}>
                <BarChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={darkMode ? '#1f2937' : '#f0f0f0'}
                    />
                    <XAxis
                        dataKey="category"
                        tick={{ fontSize: 12, fill: darkMode ? '#6b7280' : '#9ca3af' }}
                    />
                    <YAxis
                        tickFormatter={(value) => `₹${value}`}
                        tick={{ fontSize: 12, fill: darkMode ? '#6b7280' : '#9ca3af' }}
                    />
                    <Tooltip
                        formatter={(value) => [formatAmount(value), 'Total']}
                        contentStyle={{
                            borderRadius: '12px',
                            border: darkMode ? '1px solid #1f2937' : '1px solid #e5e7eb',
                            background: darkMode ? '#111827' : '#ffffff',
                            color: darkMode ? '#f3f4f6' : '#1f2937',
                            fontSize: '13px',
                        }}
                    />
                    <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                        {data.map((entry) => (
                            <Cell
                                key={entry.category}
                                fill={CATEGORY_COLORS[entry.category] || CATEGORY_COLORS.Other}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExpenseChart;
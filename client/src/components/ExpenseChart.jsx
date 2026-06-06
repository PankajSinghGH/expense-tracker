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

const ExpenseChart = ({ expenses }) => {
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
        <div className="bg-white rounded-lg shadow p-5 mb-6">
            <h2 className="text-sm font-semibold text-gray-600 mb-4">
                Spending by Category
            </h2>
            <ResponsiveContainer width="100%" height={240}>
                <BarChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                        dataKey="category"
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis
                        tickFormatter={(value) => `₹${value}`}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <Tooltip
                        formatter={(value) => [formatAmount(value), 'Total']}
                        contentStyle={{
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            fontSize: '13px',
                        }}
                    />
                    <Bar dataKey="total" radius={[4, 4, 0, 0]}>
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
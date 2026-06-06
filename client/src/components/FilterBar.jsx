const CATEGORIES = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

const FilterBar = ({
                       filterCategory,
                       filterDateRange,
                       customDateFrom,
                       customDateTo,
                       onCategoryChange,
                       onDateRangeChange,
                       onCustomDateChange,
                   }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex flex-wrap gap-4 items-end">

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Category
                    </label>
                    <select
                        value={filterCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        <option value="all">All Categories</option>
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Date Range
                    </label>
                    <div className="flex gap-2">
                        {['all', 'thisMonth', 'lastMonth', 'custom'].map((range) => (
                            <button
                                key={range}
                                onClick={() => onDateRangeChange(range)}
                                className={`px-3 py-2 rounded text-sm font-medium transition ${
                                    filterDateRange === range
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {range === 'all' ? 'All' :
                                    range === 'thisMonth' ? 'This Month' :
                                        range === 'lastMonth' ? 'Last Month' : 'Custom'}
                            </button>
                        ))}
                    </div>
                </div>

                {filterDateRange === 'custom' && (
                    <div className="flex gap-3 items-end">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                From
                            </label>
                            <input
                                type="date"
                                value={customDateFrom}
                                onChange={(e) => onCustomDateChange('from', e.target.value)}
                                className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                To
                            </label>
                            <input
                                type="date"
                                value={customDateTo}
                                onChange={(e) => onCustomDateChange('to', e.target.value)}
                                className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default FilterBar;
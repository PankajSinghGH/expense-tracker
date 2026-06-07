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
    const inputClass = "border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition";

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 mb-6 shadow-sm">
            <div className="flex flex-wrap gap-4 items-end">

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                        Category
                    </label>
                    <select
                        value={filterCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className={inputClass}
                    >
                        <option value="all">All Categories</option>
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                        Date Range
                    </label>
                    <div className="flex gap-2">
                        {['all', 'thisMonth', 'lastMonth', 'custom'].map((range) => (
                            <button
                                key={range}
                                onClick={() => onDateRangeChange(range)}
                                className={`px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                                    filterDateRange === range
                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
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
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                From
                            </label>
                            <input
                                type="date"
                                value={customDateFrom}
                                onChange={(e) => onCustomDateChange('from', e.target.value)}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                                To
                            </label>
                            <input
                                type="date"
                                value={customDateTo}
                                onChange={(e) => onCustomDateChange('to', e.target.value)}
                                className={inputClass}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterBar;
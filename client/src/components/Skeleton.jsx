const SkeletonRow = () => (
    <tr>
        {[...Array(5)].map((_, i) => (
            <td key={i} className="px-4 py-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
            </td>
        ))}
    </tr>
);

const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-3 w-1/2" />
        <div className="h-7 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-2 w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse w-1/3" />
    </div>
);

const Skeleton = () => (
    <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <tr>
                    {['Date', 'Category', 'Note', 'Amount', 'Actions'].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            {h}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                </tbody>
            </table>
        </div>
    </>
);

export default Skeleton;
const SkeletonRow = () => (
    <tr>
        {[...Array(5)].map((_, i) => (
            <td key={i} className="px-4 py-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
            </td>
        ))}
    </tr>
);

const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow p-5">
        <div className="h-3 bg-gray-200 rounded animate-pulse mb-3 w-1/2" />
        <div className="h-7 bg-gray-200 rounded animate-pulse mb-2 w-3/4" />
        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3" />
    </div>
);

const Skeleton = () => (
    <>
        {/* Summary skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>

        {/* Table skeleton */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                <tr>
                    {['Date', 'Category', 'Note', 'Amount', 'Actions'].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-gray-600 font-medium">
                            {h}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                </tbody>
            </table>
        </div>
    </>
);

export default Skeleton;
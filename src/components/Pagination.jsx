const Pagination = ({page, setPage, pagination}) => {
    return (
        <div className="flex justify-center items-center gap-2 mt-10">
            <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-4 py-2 border rounded disabled:opacity-50"
            >
                Previous
            </button>

            {Array.from(
                { length: pagination.totalPages },
                (_, index) => (
                <button
                    key={index}
                    onClick={() => setPage(index + 1)}
                    className={`px-4 py-2 rounded ${
                    page === index + 1
                        ? "bg-[#ef0161] text-white"
                        : "border"
                    }`}
                >
                    {index + 1}
                </button>
                )
            )}

            <button
                disabled={page === pagination.totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-2 border rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
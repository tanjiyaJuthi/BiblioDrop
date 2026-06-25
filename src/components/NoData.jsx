import Link from 'next/link';

const NoData = () => {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#ef0161]/30 bg-[#ef0161]/3 py-20 px-6 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-xl bg-[#ef0161]/10">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-[#ef0161]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                    />
                </svg>
            </div>

            <h3 className="text-2xl font-bold text-gray-900">No Data Available</h3>

            <p className="mt-3 max-w-md text-gray-500">We haven't added any data to the library yet. Check back later for new arrivals and featured collections.</p>

            <Link
                href="/books"
                className="mt-5 relative overflow-hidden h-9.5 px-6 text-sm font-semibold text-white rounded-xl bg-[#ef0161] group flex items-center"
            >
                <span className="relative z-10">
                    Refresh Library
                </span>

                <span
                    className="absolute inset-0 rounded-xl bg-[#5d1bb6] translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out pointer-events-none"
                />
            </Link>
        </div>
    );
};

export default NoData;
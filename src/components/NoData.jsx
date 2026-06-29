import Link from 'next/link';

const NoData = () => {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#ef0161]/30 bg-[#ef0161]/3 py-10 px-6 text-center">
            <div className="mb-6 flex h-15 w-15 items-center justify-center rounded-xl bg-[#ef0161]/10">
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

            <h3 className="text-xl font-bold text-gray-900">No Data Available</h3>
        </div>
    );
};

export default NoData;
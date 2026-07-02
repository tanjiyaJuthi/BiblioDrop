const StatCard = ({ title, value, icon, color }) => {
    return (
        <div className="rounded-xl p-5 bg-white transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">
                        {title}
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-gray-800">
                        {value}
                    </h2>
                </div>

                <div className={`flex h-14 w-14 items-center justify-center rounded-xl text-[#ef0161]  ${color}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
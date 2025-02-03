export const Card = ({ name, description }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 w-full">
            <div className="flex flex-col gap-2">
                <div className="font-bold text-lg">{name}</div>
                <div className="text-gray-600">{description}</div>
            </div>
        </div>
    );
};
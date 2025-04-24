import { FaChartBar } from "react-icons/fa";

type Props = {
  title: string;
};

const BarGraphComponent = ({ title }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 min-h-[160px] flex flex-col justify-start">
      <h3 className="text-sm font-semibold text-black mb-4">{title}</h3>

      <div className="flex flex-col items-center justify-center flex-grow text-gray-500">
        <FaChartBar className="text-3xl mb-2" />
        <p className="text-sm">No Graph data available!</p>
      </div>
    </div>
  );
};

export default BarGraphComponent;

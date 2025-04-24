"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

type RiskDataItem = {
  name: string;
  value: number;
  color: string;
};

const data: RiskDataItem[] = [
  { name: "Failed", value: 1689, color: "#D32F2F" },
  { name: "Warning", value: 681, color: "#FBC02D" },
  { name: "Not available", value: 36, color: "#B0BEC5" },
  { name: "Passed", value: 7253, color: "#43A047" },
];

const total = data.reduce((sum, item) => sum + item.value, 0);

const RiskAssessmentCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 w-full min-w-[420px]">
      <h2 className="text-lg font-semibold mb-4">
        Cloud Account Risk Assessment
      </h2>

      <div className="flex items-center gap-6">
        {/* Chart */}
        <div className="w-[120px] h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={55}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center -mt-20 font-semibold text-lg">
            {total}
            <div className="text-sm font-normal text-gray-500">Total</div>
          </div>
        </div>

        {/* Labels */}
        <div className="space-y-2 text-sm">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span>
                {item.name} ({item.value})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskAssessmentCard;

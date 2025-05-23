"use client";
import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "../../../components/ui/button";
import { useWidgetStore, Widget } from "../../../store/useWidgetStore";

type Props = {
  widgets: Widget[];
  openDrawer: () => void;
};

const CSPMExecutiveDashboard = ({ widgets, openDrawer }: Props) => {
  const removeWidget = useWidgetStore((state) => state.removeWidget);
  const searchQuery = useWidgetStore((state) => state.searchQuery);

  const demoWidgets: Widget[] = [
    {
      id: "demo-1",
      name: "Cloud Risk Overview",
      description: "Demo data showing risk levels",
      data: [
        { name: "High", value: 45, color: "#EF4444" },
        { name: "Medium", value: 30, color: "#F59E0B" },
        { name: "Low", value: 25, color: "#10B981" },
      ],
    },
  ];

  const activeWidgets = widgets.length > 0 ? widgets : demoWidgets;

  const filteredWidgets = useMemo(() => {
    if (!searchQuery.trim()) return activeWidgets;
    return activeWidgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeWidgets, searchQuery]);

  return (
    <div className="space-y-2 px-4">
      <h2 className="text-lg font-semibold">CSPM Executive Dashboard</h2>

      {filteredWidgets.length === 0 && (
        <div className="text-center text-gray-500 text-sm">
          No widgets found
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWidgets.map((widget) => {
          const total = widget.data?.reduce((sum, item) => sum + item.value, 0);

          return (
            <div
              key={widget.id}
              className="relative bg-white rounded-xl shadow-sm p-4"
            >
              <Button
                onClick={() => removeWidget("CSPM", widget.id)}
                className="absolute top-2 right-2 z-10 text-gray-400 hover:text-red-600 bg-gray-100"
                title="Remove Widget"
              >
                Remove
              </Button>

              {widget.data && Array.isArray(widget.data) ? (
                <>
                  <h2 className="text-base font-semibold mb-4">
                    {widget.name}
                  </h2>
                  <div className="flex items-center gap-6">
                    <div className="w-[120px] h-[120px] relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={widget.data}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={55}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {widget.data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col justify-center items-center text-lg font-semibold">
                        {total}
                        <div className="text-sm font-normal text-gray-500">
                          Total
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      {widget.data.map((item, idx) => (
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
                </>
              ) : (
                <>
                  <h3 className="font-semibold text-base mb-1">
                    {widget.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {widget.description || "No description"}
                  </p>
                </>
              )}
            </div>
          );
        })}

        <div className="bg-white rounded-xl shadow-sm flex items-center justify-center p-6">
          <Button
            onClick={openDrawer}
            className="border border-dashed bg-gray-200 border-gray-400 p-4 rounded-lg text-gray-500 hover:bg-gray-700 hover:text-white"
          >
            + Add Widget
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CSPMExecutiveDashboard;

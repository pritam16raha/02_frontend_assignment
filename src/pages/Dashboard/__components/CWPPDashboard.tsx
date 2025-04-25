"use client";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "../../../components/ui/button";
import { useWidgetStore, Widget } from "../../../store/useWidgetStore";

type Props = {
  widgets: Widget[];
  openDrawer: () => void;
};

const CWPPDashboard = ({ widgets, openDrawer }: Props) => {
  const removeWidget = useWidgetStore((state) => state.removeWidget);
  const searchQuery = useWidgetStore((state) => state.searchQuery);

  const demoWidgets: Widget[] = [
    {
      id: "cwpp-demo-1",
      name: "VM Alert Summary",
      description: "Demo alert counts by severity",
      data: [
        { name: "Critical", value: 40, color: "#DC2626" },
        { name: "High", value: 30, color: "#F97316" },
        { name: "Medium", value: 20, color: "#EAB308" },
        { name: "Low", value: 10, color: "#10B981" },
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
      <h2 className="text-lg font-semibold">CWPP Dashboard</h2>

      {filteredWidgets.length === 0 && (
        <div className="text-center text-gray-500 text-sm">
          No widgets found
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWidgets.map((widget) => (
          <div
            key={widget.id}
            className="relative bg-white rounded-xl shadow-sm p-4"
          >
            <Button
              onClick={() => removeWidget("CWPP", widget.id)}
              className="absolute top-2 right-2 z-10 text-gray-400 hover:text-red-600 bg-gray-100"
              title="Remove Widget"
            >
              Remove
            </Button>

            <h3 className="text-base font-semibold mb-1">{widget.name}</h3>
            <p className="text-sm text-gray-500 mb-4">
              {widget.description || "No description"}
            </p>

            {Array.isArray(widget.data) && widget.data.length > 0 ? (
              <div className="w-full h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={widget.data}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value">
                      {widget.data.map((entry, index) => (
                        <Cell key={`bar-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-sm text-gray-400">No data available</div>
            )}
          </div>
        ))}

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

export default CWPPDashboard;

"use client";
import { useMemo } from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { useWidgetStore, Widget } from "../../../store/useWidgetStore";
import { FaTimes } from "react-icons/fa";

type Props = {
  widgets: Widget[];
  openDrawer: () => void;
};

const CWPPDashboard = ({ widgets, openDrawer }: Props) => {
  const removeWidget = useWidgetStore((state) => state.removeWidget);
  const searchQuery = useWidgetStore((state) => state.searchQuery);

  const filteredWidgets = useMemo(() => {
    if (!searchQuery.trim()) return widgets;
    return widgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [widgets, searchQuery]);

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
            <button
              onClick={() => removeWidget("CWPP", widget.id)}
              className="absolute top-2 right-2 z-10 text-gray-400 hover:text-red-600"
              title="Remove Widget"
            >
              <FaTimes />
            </button>

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
          <button
            onClick={openDrawer}
            className="border border-dashed border-gray-400 p-4 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            + Add Widget
          </button>
        </div>
      </div>
    </div>
  );
};

export default CWPPDashboard;

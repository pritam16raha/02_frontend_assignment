"use client";
import { useWidgetStore, Widget } from "../../../store/useWidgetStore";
import { FaTimes } from "react-icons/fa";

type Props = {
  widgets: Widget[];
  openDrawer: () => void;
};

const RegistryScanDashboard = ({ widgets, openDrawer }: Props) => {
  const removeWidget = useWidgetStore((state) => state.removeWidget);

  return (
    <div className="space-y-2 px-4">
      <h2 className="text-lg font-semibold">Registry Scan</h2>

      {widgets.length === 0 && (
        <div className="text-center text-gray-500 text-sm">
          No widgets found
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {widgets.map((widget) => {
          const total =
            widget.data?.reduce((sum, item) => sum + item.value, 0) || 0;

          return (
            <div
              key={widget.id}
              className="relative bg-white rounded-xl shadow-sm p-4"
            >
              <button
                onClick={() => removeWidget("Image", widget.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-600 z-10"
                title="Remove Widget"
              >
                <FaTimes />
              </button>

              <h3 className="text-base font-semibold">{widget.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{total} Total Images</p>

              {Array.isArray(widget.data) && widget.data.length > 0 ? (
                <>
                  <div className="flex w-full h-4 overflow-hidden rounded-full mb-4">
                    {widget.data.map((item, idx) => {
                      const width = total
                        ? `${(item.value / total) * 100}%`
                        : "0%";
                      return (
                        <div
                          key={idx}
                          className="h-full"
                          style={{ width, backgroundColor: item.color }}
                        ></div>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                    {widget.data.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <span
                          className="w-3 h-3 inline-block rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>
                          {item.name} ({item.value})
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-sm text-gray-400">No data available</div>
              )}
            </div>
          );
        })}

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

export default RegistryScanDashboard;

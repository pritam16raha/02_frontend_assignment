"use client";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useWidgetStore, Widget } from "../../../store/useWidgetStore";

type AddWidgetDrawerProps = {
  open: boolean;
  onClose: () => void;
  defaultTab?: string;
};

const AddWidgetDrawer = ({
  open,
  onClose,
  defaultTab = "CSPM",
}: AddWidgetDrawerProps) => {
  const tabs = ["CSPM", "CWPP", "Image", "Ticket"];
  const [activeTab, setActiveTab] = useState(defaultTab);
  const { widgets, addWidget } = useWidgetStore();

  // Shared input fields
  const [newWidgetName, setNewWidgetName] = useState("");
  const [newWidgetDesc, setNewWidgetDesc] = useState(""); // for CSPM
  const [alertType, setAlertType] = useState(""); // for CWPP
  const [severity, setSeverity] = useState(""); // for Image

  // CSPM-specific chart data
  const [riskItems, setRiskItems] = useState([
    { name: "", value: 0, color: "#D32F2F" },
  ]);

  // CWPP-specific
  const [cwppAlerts, setCWPPAlerts] = useState([
    { name: "", value: 0, color: "#3B82F6" },
  ]);

  const updateCWPPItem = (
    index: number,
    key: "name" | "value" | "color",
    value: any
  ) => {
    setCWPPAlerts((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };

  const addCWPPItem = () => {
    setCWPPAlerts([...cwppAlerts, { name: "", value: 0, color: "#3B82F6" }]);
  };

const updateItem = (
  index: number,
  key: "name" | "value" | "color",
  value: string | number,
  setter: React.Dispatch<
    React.SetStateAction<{ name: string; value: number; color: string }[]>
  >
) => {
  setter((prev) =>
    prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
  );
};


  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const updateRiskItem = (
    index: number,
    key: "name" | "value" | "color",
    value: any
  ) => {
    setRiskItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };

  const addRiskItem = () => {
    setRiskItems([...riskItems, { name: "", value: 0, color: "#000000" }]);
  };

  const [imageSeverities, setImageSeverities] = useState([
    { name: "", value: 0, color: "#D97706" },
  ]);

  const [ticketStatuses, setTicketStatuses] = useState([
    { name: "", value: 0, color: "#10B981" },
  ]);

  const updateImageSeverity = (
    index: number,
    key: "name" | "value" | "color",
    value: any
  ) => {
    setImageSeverities((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };

  const addImageSeverity = () => {
    setImageSeverities([
      ...imageSeverities,
      { name: "", value: 0, color: "#6B7280" },
    ]);
  };

  const resetFields = () => {
    setNewWidgetName("");
    setNewWidgetDesc("");
    setAlertType("");
    setSeverity("");
    setRiskItems([{ name: "", value: 0, color: "#D32F2F" }]);
    setTicketStatuses([{ name: "", value: 0, color: "#10B981" }]);
  };

  const handleAddWidget = () => {
    if (!newWidgetName.trim()) return;

    const newId = `w-${Date.now()}`;

    // Build widget base
    const newWidget: Widget = {
      id: newId,
      name: newWidgetName,
      description: "",
      data: undefined,
    };

    // Assign description & data based on tab
    switch (activeTab) {
      case "CSPM":
        newWidget.description = newWidgetDesc;
        newWidget.data = riskItems;
        break;

      case "CWPP":
        newWidget.description = "Alert Summary";
        newWidget.data = cwppAlerts;
        break;

      case "Image":
        newWidget.description = "Image Severity Overview";
        newWidget.data = imageSeverities;
        break;

      case "Ticket":
        newWidget.description = "Support Ticket Overview";
        newWidget.data = ticketStatuses;
        break;

      default:
        break;
    }

    addWidget(activeTab, newWidget);
    resetFields();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div className="bg-white w-full max-w-md h-full shadow-xl p-6 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-semibold">Add Widget</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <FaTimes />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-3 text-sm font-medium ${
                tab === activeTab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Widget List */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-6">
          {widgets[activeTab]?.map((widget) => (
            <div
              key={widget.id}
              className="bg-gray-100 rounded-md p-3 hover:bg-gray-200 cursor-default"
            >
              <p className="font-medium">{widget.name}</p>
              {widget.description && (
                <p className="text-sm text-gray-500">{widget.description}</p>
              )}
            </div>
          ))}
        </div>

        {/* Add New Widget */}
        <div className="border-t pt-4 space-y-2">
          <h3 className="text-sm font-semibold mb-1">Add New Widget</h3>

          <input
            type="text"
            value={newWidgetName}
            onChange={(e) => setNewWidgetName(e.target.value)}
            placeholder="Widget Name"
            className="w-full px-3 py-2 border rounded text-sm"
          />

          {activeTab === "CSPM" && (
            <>
              <textarea
                value={newWidgetDesc}
                onChange={(e) => setNewWidgetDesc(e.target.value)}
                placeholder="Widget Description"
                className="w-full px-3 py-2 border rounded text-sm resize-none"
              />

              <div className="border p-3 mt-2 rounded space-y-2">
                <h4 className="font-medium text-sm mb-2">Risk Items</h4>
                {riskItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Name"
                      value={item.name}
                      onChange={(e) =>
                        updateRiskItem(idx, "name", e.target.value)
                      }
                      className="w-1/3 px-2 py-1 border rounded text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Value"
                      value={item.value}
                      onChange={(e) =>
                        updateRiskItem(idx, "value", +e.target.value)
                      }
                      className="w-1/3 px-2 py-1 border rounded text-sm"
                    />
                    <input
                      type="color"
                      value={item.color}
                      onChange={(e) =>
                        updateRiskItem(idx, "color", e.target.value)
                      }
                      className="w-1/3 h-9 rounded border"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addRiskItem}
                  className="text-xs text-blue-600 hover:underline"
                >
                  + Add Item
                </button>
              </div>
            </>
          )}

          {activeTab === "CWPP" && (
            <>
              <div className="border p-3 mt-2 rounded space-y-2">
                <h4 className="font-medium text-sm mb-2">Alert Types</h4>
                {cwppAlerts.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Alert Name"
                      value={item.name}
                      onChange={(e) =>
                        updateCWPPItem(idx, "name", e.target.value)
                      }
                      className="w-1/3 px-2 py-1 border rounded text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Count"
                      value={item.value}
                      onChange={(e) =>
                        updateCWPPItem(idx, "value", +e.target.value)
                      }
                      className="w-1/3 px-2 py-1 border rounded text-sm"
                    />
                    <input
                      type="color"
                      value={item.color}
                      onChange={(e) =>
                        updateCWPPItem(idx, "color", e.target.value)
                      }
                      className="w-1/3 h-9 rounded border"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCWPPItem}
                  className="text-xs text-blue-600 hover:underline"
                >
                  + Add Alert
                </button>
              </div>
            </>
          )}

          {activeTab === "Image" && (
            <>
              <div className="border p-3 mt-2 rounded space-y-2">
                <h4 className="font-medium text-sm mb-2">Image Severities</h4>
                {imageSeverities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Severity"
                      value={item.name}
                      onChange={(e) =>
                        updateImageSeverity(idx, "name", e.target.value)
                      }
                      className="w-1/3 px-2 py-1 border rounded text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Value"
                      value={item.value}
                      onChange={(e) =>
                        updateImageSeverity(idx, "value", +e.target.value)
                      }
                      className="w-1/3 px-2 py-1 border rounded text-sm"
                    />
                    <input
                      type="color"
                      value={item.color}
                      onChange={(e) =>
                        updateImageSeverity(idx, "color", e.target.value)
                      }
                      className="w-1/3 h-9 rounded border"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageSeverity}
                  className="text-xs text-blue-600 hover:underline"
                >
                  + Add Severity
                </button>
              </div>
            </>
          )}

          {activeTab === "Ticket" && (
            <>
              <h4 className="font-medium text-sm mb-2">Ticket Statuses</h4>
              {ticketStatuses.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Status"
                    value={item.name}
                    onChange={(e) =>
                      updateItem(idx, "name", e.target.value, setTicketStatuses)
                    }
                    className="w-1/3 px-2 py-1 border rounded text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Value"
                    value={item.value}
                    onChange={(e) =>
                      updateItem(
                        idx,
                        "value",
                        +e.target.value,
                        setTicketStatuses
                      )
                    }
                    className="w-1/3 px-2 py-1 border rounded text-sm"
                  />
                  <input
                    type="color"
                    value={item.color}
                    onChange={(e) =>
                      updateItem(
                        idx,
                        "color",
                        e.target.value,
                        setTicketStatuses
                      )
                    }
                    className="w-1/3 h-9 rounded border"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setTicketStatuses([
                    ...ticketStatuses,
                    { name: "", value: 0, color: "#10B981" },
                  ])
                }
                className="text-xs text-blue-600 hover:underline"
              >
                + Add Status
              </button>
            </>
          )}

          <button
            onClick={handleAddWidget}
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
          >
            + Add Widget
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border text-sm text-gray-600 hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetDrawer;

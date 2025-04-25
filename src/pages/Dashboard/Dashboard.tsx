"use client";
import { useState } from "react";
import DashboardTopBar from "../../components/DashboardTopBar";
import CSPMExecutiveDashboard from "./__components/CSPMExecutiveDashboard";
import CWPPDashboard from "./__components/CWPPDashboard";
import RegistryScanDashboard from "./__components/RegistryScanDashboard";
import TicketDashboard from "./__components/TicketDashboard";
import AddWidgetDrawer from "./__components/AddWidgetDrawer";
import { useWidgetStore } from "../../store/useWidgetStore";
import { Button } from "../../components/ui/button";

const DashboardPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("CSPM");

  const widgets = useWidgetStore((state) => state.widgets);

  const openDrawerFromSection = (tab: string) => {
    setCurrentTab(tab);
    setDrawerOpen(true);
  };

  return (
    <>
      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-between items-center">
          <DashboardTopBar />
        </div>

        <div className=" flex items-center justify-between py-4 rounded-md">
          {/* Left: Title */}
          <h2 className="text-2xl sm:text-2xl font-extrabold text-gray-900">
            CNAPP Dashboard
          </h2>

          {/* Right: Controls */}
          <div className="flex items-center gap-3">
            {/* Add Widget */}
            <Button
              onClick={() => openDrawerFromSection("CSPM")}
              className="flex items-center gap-1 text-sm font-medium bg-white text-gray-700 border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-100 transition"
            >
              Add Widget
              <span className="text-lg leading-none">+</span>
            </Button>

            <button className="w-9 h-9 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-100 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582M20 20v-5h-.581M5.582 9A7.962 7.962 0 0112 4c4.418 0 8 3.582 8 8a8 8 0 01-1.757 5M18.418 15A7.962 7.962 0 0112 20c-4.418 0-8-3.582-8-8a8 8 0 011.757-5"
                />
              </svg>
            </button>

            <button className="w-9 h-9 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-100 transition">
              <span className="text-xl font-bold text-gray-600">⋮</span>
            </button>

            <div className="relative">
              <button className="text-sm font-medium text-white bg-[#151D48] px-4 py-2 rounded border border-[#151D48] hover:bg-[#1d275a] transition">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 9h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Last 2 days
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="pb-10">
          {" "}
          <div className="py-4">
            <CSPMExecutiveDashboard
              widgets={widgets["CSPM"] || []}
              openDrawer={() => openDrawerFromSection("CSPM")}
            />
          </div>
          <div className="py-4">
            <CWPPDashboard
              widgets={widgets["CWPP"] || []}
              openDrawer={() => openDrawerFromSection("CWPP")}
            />
          </div>
          <div className="py-4">
            <RegistryScanDashboard
              widgets={widgets["Image"] || []}
              openDrawer={() => openDrawerFromSection("Image")}
            />
          </div>
          <div className="py-4">
            <TicketDashboard
              widgets={widgets["Ticket"] || []}
              openDrawer={() => openDrawerFromSection("Ticket")}
            />
          </div>
        </div>
      </div>

      <AddWidgetDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        defaultTab={currentTab}
      />
    </>
  );
};

export default DashboardPage;

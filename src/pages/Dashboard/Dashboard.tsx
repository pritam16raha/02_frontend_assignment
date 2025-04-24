"use client";
import { useState } from "react";
import DashboardTopBar from "../../components/DashboardTopBar";
import CSPMExecutiveDashboard from "./__components/CSPMExecutiveDashboard";
import CWPPDashboard from "./__components/CWPPDashboard";
import RegistryScanDashboard from "./__components/RegistryScanDashboard";
import TicketDashboard from "./__components/TicketDashboard";
import AddWidgetDrawer from "./__components/AddWidgetDrawer";
import { useWidgetStore } from "../../store/useWidgetStore";

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
        <div className="flex justify-between items-center p-4">
          <DashboardTopBar />
        </div>

        {/* Dynamically render each section with zustand widgets */}
        <CSPMExecutiveDashboard
          widgets={widgets["CSPM"] || []}
          openDrawer={() => openDrawerFromSection("CSPM")}
        />
        <CWPPDashboard
          widgets={widgets["CWPP"] || []}
          openDrawer={() => openDrawerFromSection("CWPP")}
        />
        <RegistryScanDashboard
          widgets={widgets["Image"] || []}
          openDrawer={() => openDrawerFromSection("Image")}
        />
        <TicketDashboard
          widgets={widgets["Ticket"] || []}
          openDrawer={() => openDrawerFromSection("Ticket")}
        />
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

import { FaSearch, FaBell } from "react-icons/fa";

const DashboardTopBar = () => {
  return (
    <div className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        <span className="text-gray-400">Home</span> &gt;{" "}
        <span className="font-semibold text-gray-800">Dashboard V2</span>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search anything..."
            className="pl-10 pr-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Dropdown (optional) */}
        <div className="w-4 h-4 border-r border-gray-300" />

        {/* Notification icon */}
        <FaBell className="text-gray-500 hover:text-indigo-500 cursor-pointer" />

        {/* Avatar (placeholder) */}
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default DashboardTopBar;

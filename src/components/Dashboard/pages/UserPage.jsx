// Imports : ( useEffect , useState ) , ( Eye , SlidersHorizontal ) , ( userData )
import { useState, useEffect, use } from "react";

import { Eye, SlidersHorizontal } from "lucide-react";

import { getUserData } from "../data/userData";

import FetchLoader from "../../ui/FetchLoader";
import { setActive, setRole as setRoleMethod } from "../../../API/APIUser";

// Function : ( ViewModal )
// Passing : ( user - The data props. , onClose - To close the filter modal. )
function ViewModal({ user, onClose, refreshData }) {
  const [isActive, setIsActive] = useState(user?.isActive || undefined);
  const [role, setRole] = useState(user?.role || undefined);
  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    setActive(user.isActive);
    setRole(user.role);
  }, []);

  // Function to format date strings
  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  const handleIsActive = async (user) => {
    setIsChanged(true);
    try {
      const response = await setActive(user.id, !isActive);
      alert(response.message);
      setIsActive(!isActive);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      alert(errorMessage);
    }
  };
  const handleSetRole = async (role) => {
    setIsChanged(true);
    try {
      const response = await setRoleMethod(user.id, role);
      alert(response.message);
      setRole(role);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      alert(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 sm:p-8">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
          <div className="w-full text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-purple-900">
              User Details
            </h2>
          </div>
          <button
            onClick={() => {onClose(); isChanged && refreshData();}}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-600 hover:text-gray-900 text-xl cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Container with padding to create space for scrollbar */}
        <div className="px-2">
          {/* Scrollable content area with purple-themed scrollbar */}
          <div className="max-h-[60vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-purple-50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-purple-300 hover:[&::-webkit-scrollbar-thumb]:bg-purple-400 p-4 sm:p-6">
            {/* Basic Information */}
            <div className="space-y-4 sm:space-y-5">
              <div className="bg-purple-50 p-3 sm:p-4 rounded-xl">
                <h3 className="text-md font-semibold text-purple-800 mb-2 sm:mb-3 text-center">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600">User ID</span>
                    <span className="p-2 bg-white rounded-md shadow-sm">
                      {user.id}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600">Status</span>
                    <span
                      className={`p-2 bg-white rounded-md shadow-sm ${
                        isActive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex flex-col col-span-1 sm:col-span-2">
                    <span className="font-medium text-gray-600">
                      Change status
                    </span>
                    <span className="p-2 bg-white rounded-md shadow-sm">
                      <button
                        onClick={() => handleIsActive(user)}
                        className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
                      >
                        {isActive ? "Set Deactivate" : "Set Active"}{" "}
                      </button>
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600">Username</span>
                    <span className="p-2 bg-white rounded-md shadow-sm">
                      {user.username}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600">Role</span>
                    <span className="p-2 bg-white rounded-md shadow-sm">
                      <select
                        name=""
                        id=""
                        onChange={(e) => handleSetRole(e.target.value)}
                        value={role}
                      >
                        <option value="ADMIN">ADMIN</option>
                        <option value="USER">USER</option>
                      </select>
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-blue-50 p-3 sm:p-4 rounded-xl">
                <h3 className="text-md font-semibold text-blue-800 mb-2 sm:mb-3 text-center">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600">Email</span>
                    <span className="p-2 bg-white rounded-md shadow-sm">
                      {user.email || "Not provided"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600">Phone</span>
                    <span className="p-2 bg-white rounded-md shadow-sm">
                      {user.phone || "Not provided"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Date Information */}
              <div className="bg-amber-50 p-3 sm:p-4 rounded-xl">
                <h3 className="text-md font-semibold text-amber-800 mb-2 sm:mb-3 text-center">
                  Date Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600">
                      Created At
                    </span>
                    <span className="p-2 bg-white rounded-md shadow-sm">
                      {formatDate(user.createdAt)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600">
                      Last Updated
                    </span>
                    <span className="p-2 bg-white rounded-md shadow-sm">
                      {formatDate(user.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100">
          <div className="flex justify-center">
            <button
              onClick={() => {onClose(); isChanged && refreshData();}}
              className="px-4 sm:px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition duration-200 cursor-pointer shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Function : ( FilterModal )
// Passing : ( onClose - To close the filter modal. , onApply - To apply the filter. , currentFilters - To show the current filters. )
function FilterModal({ onClose, onApply, currentFilters, roles }) {
  // Using useState to store the values of the filters.
  const [name, setName] = useState(currentFilters.name || "");
  const [username, setUsername] = useState(currentFilters.username || "");
  const [email, setEmail] = useState(currentFilters.email || "");
  const [role, setRole] = useState(currentFilters.role || "");
  const [status, setStatus] = useState(currentFilters.status || "");

  // Arrow Function : ( handleApply )
  const handleApply = () => {
    // Calling the onApply function to apply the filter.
    onApply({ name, username, email, role, status });
    // Calling the onClose function to close the modal.
    onClose();
  };

  // Arrow Function : ( handleReset )
  const handleReset = () => {
    // Setting the values of the filters to empty.
    setName("");
    setUsername("");
    setEmail("");
    setRole("");
    setStatus("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto m-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-600 hover:text-gray-900 text-xl cursor-pointer"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold text-purple-900 mb-4 text-center">
          Advanced Filters
        </h2>

        {/* Basic Information Section */}
        <div className="mb-4">
          <h3 className="text-md font-medium text-purple-700 mb-2 text-center">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 rounded-lg border border-gray-300 focus:outline-none"
                placeholder="Filter by name"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 rounded-lg border border-gray-300 focus:outline-none"
                placeholder="Filter by username"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 rounded-lg border border-gray-300 focus:outline-none"
                placeholder="Filter by email"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="p-2 rounded-lg border border-gray-300 focus:outline-none"
              >
                <option value="">All</option>
                {roles.map((roleOption) => (
                  <option key={roleOption} value={roleOption}>
                    {roleOption}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="p-2 rounded-lg border border-gray-300 focus:outline-none"
              >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

// Function : ( UserPage )
function UserPage() {
  // Using the useState to create a variable and then update it accordingly by the function.
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({});
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Add isFetching state
  const [isFetching, setIsFetching] = useState(true);

  // Fetch user data from API when component mounts
  useEffect(() => {
    
    fetchData();
  }, []);

const fetchData = async () => {
      try {
        setLoading(true);
        setIsFetching(true); // Set isFetching to true
        const data = await getUserData();

        if (data) {
          setUserData(data);
        } else {
          setError("No data returned from API");
        }
      } catch (err) {
        setError("Failed to fetch user data");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
        // Add timeout for isFetching
        setTimeout(() => {
          setIsFetching(false);
        }, 3000);
      }
    };




  // Function to format date for display in the table
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Get unique roles from user data
  const roles = Array.isArray(userData)
    ? [...new Set(userData.map((user) => user.role))]
    : [];

  // Filtering the data based on the search term and other filters
  const filteredData = Array.isArray(userData)
    ? userData.filter((user) => {
        // Search across all fields
        const searchFields = [
          user.id.toString(),
          user.name || "",
          user.username || "",
          user.email || "",
          user.role || "",
          user.phone || "",
        ];

        const matchesSearch = searchFields.some((field) =>
          field.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Apply filters
        const matchesName =
          !filters.name ||
          (user.name &&
            user.name.toLowerCase().includes(filters.name.toLowerCase()));
        const matchesUsername =
          !filters.username ||
          (user.username &&
            user.username
              .toLowerCase()
              .includes(filters.username.toLowerCase()));
        const matchesEmail =
          !filters.email ||
          (user.email &&
            user.email.toLowerCase().includes(filters.email.toLowerCase()));
        const matchesRole = !filters.role || user.role === filters.role;
        const matchesStatus =
          !filters.status ||
          (filters.status === "active" && user.isActive) ||
          (filters.status === "inactive" && !user.isActive);

        // Return true if all conditions are met
        return (
          matchesSearch &&
          matchesName &&
          matchesUsername &&
          matchesEmail &&
          matchesRole &&
          matchesStatus
        );
      })
    : [];

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-purple-900 text-center">
        User Management
      </h1>

      {/* Responsive search and filter controls */}
      <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 w-full sm:w-auto"
        />
        <button
          onClick={() => setShowFilterModal(true)}
          className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <SlidersHorizontal size={16} /> Options
        </button>
      </div>

      {/* Responsive table container */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {isFetching ? (
          <FetchLoader />
        ) : loading ? (
          <div className="p-6 text-center">Loading user data...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">{error}</div>
        ) : (
          <div className="relative">
            <div className="max-h-[70vh] overflow-y-auto overflow-x-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-purple-300/50 hover:[&::-webkit-scrollbar-thumb]:bg-purple-400/70">
              <table className="w-full text-sm text-left">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-purple-800 text-white shadow-sm">
                    <th className="p-3 whitespace-nowrap rounded-tl-lg">ID</th>
                    <th className="p-3 whitespace-nowrap">Name</th>
                    <th className="p-3 whitespace-nowrap hidden sm:table-cell">
                      Username
                    </th>
                    <th className="p-3 whitespace-nowrap hidden md:table-cell">
                      Email
                    </th>
                    <th className="p-3 whitespace-nowrap">Role</th>
                    <th className="p-3 whitespace-nowrap hidden lg:table-cell">
                      Created
                    </th>
                    <th className="p-3 whitespace-nowrap">Status</th>
                    <th className="p-3 text-center whitespace-nowrap rounded-tr-lg">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((user) => (
                      <tr
                        key={user.id}
                        className="border-t hover:bg-gray-50 transition duration-200 ease-in-out"
                      >
                        <td className="p-3 font-medium">{user.id}</td>
                        <td className="p-3 font-semibold text-purple-900">
                          {user.name}
                        </td>
                        <td className="p-3 text-gray-700 hidden sm:table-cell">
                          {user.username}
                        </td>
                        <td className="p-3 text-gray-700 hidden md:table-cell">
                          {user.email || "—"}
                        </td>
                        <td className="p-3 text-gray-700">{user.role}</td>
                        <td className="p-3 text-gray-700 hidden lg:table-cell">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="text-purple-700 hover:text-purple-900 cursor-pointer transition"
                            aria-label="View user details"
                          >
                            <Eye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="p-3 text-center font-medium text-gray-500"
                      >
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {selectedUser && (
        <ViewModal user={selectedUser} onClose={() => {setSelectedUser(null)}} refreshData={fetchData} />
      )}
      {showFilterModal && (
        <FilterModal
          roles={roles}
          currentFilters={filters}
          onClose={() => setShowFilterModal(false)}
          onApply={setFilters}
        />
      )}
    </div>
  );
}

// Exporting the component
export default UserPage;

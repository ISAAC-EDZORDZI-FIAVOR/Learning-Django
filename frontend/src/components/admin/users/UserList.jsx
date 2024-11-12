import { useState, useEffect } from "react";
import axios from "../../../../utils/axios";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { toast } from "react-toastify";
import AddUserModal from "./AddUserModal";
import PropTypes from "prop-types";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white rounded-lg p-6 z-50 w-96">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Confirm Delete
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this user? This action cannot be
            undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
};

DeleteConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};



const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const itemsPerPage = 10;

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("users/");
      setUsers(data);
      setLoading(false);
    } catch (error) {
      toast.error(
        `Failed to fetch users: ${
          error.response?.data?.message || error.message
        }`
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/users/${userToDelete.id}/delete/`);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error(
        `Failed to delete user: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department?.faculty?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text font-semibold text-gray-800">
          Users Management
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FiPlus className="mr-2" /> Add New User
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50 sticky top-0 z-1">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                  Department
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                  Faculty
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 text-sm">
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700">
                    {user.name}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700">
                    {user.department?.name || "Not Assigned"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700">
                    {user?.department?.faculty?.name || "Not Assigned"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-1 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50"
                        onClick={() => handleEdit(user)}
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
                        onClick={() => handleDelete(user)}
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredUsers.length)} of{" "}
            {filteredUsers.length} entries
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              <FiChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <AddUserModal
          onClose={() => {
            setShowModal(false);
            setEditingUser(null);
          }}
          onSuccess={() => {
            fetchUsers();
            setShowModal(false);
            setEditingUser(null);
          }}
          user={editingUser}
        />
      )}

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default UserList;

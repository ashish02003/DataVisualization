// src/components/dashboard/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getDatasets, deleteDataset } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function Dashboard() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadDatasets();
  }, []);

  const loadDatasets = async () => {
    try {
      const response = await getDatasets();
      setDatasets(response.data);
    } catch (error) {
      console.error('Failed to load datasets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this dataset?')) {
      try {
        await deleteDataset(id);
        setDatasets(datasets.filter(d => d._id !== id));
      } catch (error) {
        alert('Failed to delete dataset');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-slate-800 cursor-pointer">DataViz Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Welcome, {user?.fullName}</span>
              <button
                onClick={signout}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-950">My Datasets 🟢⚡</h2>
          <button
            onClick={() => navigate('/dashboard/upload')}
            className="px-6 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition duration-200 font-medium cursor-pointer"
          >
            + Upload New Dataset
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading datasets...</p>
          </div>
        ) : datasets.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No datasets yet</h3>
            <p className="mt-1 text-gray-500">Get started by uploading your first dataset.</p>
            <button
              onClick={() => navigate('/dashboard/upload')}
              className="mt-6 px-6 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition duration-200 font-medium cursor-pointer"
            >
              Upload Dataset
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {datasets.map((dataset) => (
              <div
                key={dataset._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition duration-200 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 truncate">
                    {dataset.name}
                  </h3>
                  <button
                    onClick={() => handleDelete(dataset._id)} 
                    className="text-red-600 hover:text-red-700 cursor-pointer"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {dataset.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {dataset.description}
                  </p>
                )}

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>Rows:</span>
                    <span className="font-medium">{dataset.rowCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Columns:</span>
                    <span className="font-medium">{dataset.columnCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span className="font-medium">
                      {(dataset.fileSize / 1024).toFixed(2)} KB
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/dashboard/dataset/${dataset._id}`)}
                  className="w-full px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition duration-200 font-medium cursor-pointer"
                >
                  View Dataset
                </button>

                <p className="mt-3 text-xs text-gray-800 text-center">
                  Uploaded {new Date(dataset.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
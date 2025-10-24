// src/components/dashboard/DatasetView.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDataset } from '../../services/api';
import DataTable from './DataTable';
import ChartPanel from './ChartPanel';
import React from 'react';

export default function DatasetView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('table');
  
  // Query params for pagination and filtering
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    loadDataset();
  }, [id, page, search, sortBy, sortOrder]);

  const loadDataset = async () => {
    try {
      setLoading(true);
      const response = await getDataset(id, {
        page,
        limit,
        search,
        sortBy,
        sortOrder
      });
      setDataset(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dataset');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSort = (column, order) => {
    setSortBy(column);
    setSortOrder(order);
    setPage(1); // Reset to first page
  };

  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
    setPage(1); // Reset to first page
  };

  if (loading && !dataset) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dataset...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error loading dataset</div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Dataset Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{dataset?.name}</h1>
          {dataset?.description && (
            <p className="text-gray-600 mb-4">{dataset.description}</p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 font-medium">Total Rows</p>
              <p className="text-2xl font-bold text-blue-900">
                {dataset?.pagination.totalRows.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600 font-medium">Total Columns</p>
              <p className="text-2xl font-bold text-green-900">{dataset?.columns.length}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-purple-600 font-medium">File Name</p>
              <p className="text-lg font-bold text-purple-900 truncate">{dataset?.fileName}</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-sm text-orange-600 font-medium">Current Page</p>
              <p className="text-2xl font-bold text-orange-900">
                {dataset?.pagination.currentPage} / {dataset?.pagination.totalPages}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px space-x-8">
              <button
                onClick={() => setActiveTab('table')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition cursor-pointer ${
                  activeTab === 'table'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Data Table
                </span>
              </button>
              <button
                onClick={() => setActiveTab('charts')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition cursor-pointer ${
                  activeTab === 'charts'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Visualizations
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'table' && dataset && (
          <DataTable
            columns={dataset.columns}
            rows={dataset.rows}
            pagination={dataset.pagination}
            onPageChange={handlePageChange}
            onSort={handleSort}
            onSearch={handleSearch}
          />
        )}

        {activeTab === 'charts' && dataset && (
          <ChartPanel
            data={dataset.rows}
            columns={dataset.columns}
          />
        )}
      </div>
    </div>
  );
}
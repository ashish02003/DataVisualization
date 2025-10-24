// src/components/dashboard/ChartPanel.jsx
import { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import React from 'react';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

export default function ChartPanel({ data, columns }) {
  const [chartType, setChartType] = useState('bar');
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');

  // Get numeric and categorical columns
  const numericColumns = columns.filter(col => col.type === 'number');
  const categoricalColumns = columns.filter(col => col.type === 'string');

  // Prepare chart data
  const prepareChartData = () => {
    if (!xAxis || !yAxis) return [];

    // Group and aggregate data
    const grouped = {};
    data.forEach(row => {
      const key = row[xAxis];
      if (!grouped[key]) {
        grouped[key] = { name: key, value: 0, count: 0 };
      }
      const val = parseFloat(row[yAxis]);
      if (!isNaN(val)) {
        grouped[key].value += val;
        grouped[key].count += 1;
      }
    });

    // Calculate average for each group
    return Object.values(grouped).map(item => ({
      name: String(item.name),
      value: item.count > 0 ? item.value / item.count : 0
    })).slice(0, 20); // Limit to 20 items for readability
  };

  const chartData = prepareChartData();

  const renderChart = () => {
    if (!xAxis || !yAxis) {
      return (
        <div className="flex items-center justify-center h-96 text-gray-500">
          <div className="text-center">
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <p className="mt-2 text-lg font-medium">Select axes to visualize data</p>
            <p className="text-sm text-gray-400 mt-1">Choose X and Y axis from the dropdowns above</p>
          </div>
        </div>
      );
    }

    if (chartData.length === 0) {
      return (
        <div className="flex items-center justify-center h-96 text-gray-500">
          No data available for the selected columns
        </div>
      );
    }

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3B82F6" name={yAxis} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#3B82F6" name={yAxis} />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Data Visualization</h3>

      {/* Chart Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Chart Type Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chart Type
          </label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
        </div>

        {/* X-Axis Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            X-Axis (Category)
          </label>
          <select
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select column...</option>
            {categoricalColumns.map((col) => (
              <option key={col.name} value={col.name}>
                {col.name}
              </option>
            ))}
          </select>
        </div>

        {/* Y-Axis Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Y-Axis (Value)
          </label>
          <select
            value={yAxis}
            onChange={(e) => setYAxis(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select column...</option>
            {numericColumns.map((col) => (
              <option key={col.name} value={col.name}>
                {col.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart Rendering Area */}
      <div className="border border-gray-200 rounded-lg p-4">
        {renderChart()}
      </div>

      {/* Chart Info */}
      {xAxis && yAxis && chartData.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Showing:</strong> {chartData.length} data points |{' '}
            <strong>Aggregation:</strong> Average of {yAxis} grouped by {xAxis}
          </p>
        </div>
      )}
    </div>
  );
}
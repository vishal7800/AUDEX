import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, FileAudio, Clock, TrendingUp, Settings, LogOut, Home, FileText, DollarSign } from 'lucide-react';

const HARDCODED_CREDENTIALS = {
  username: 'admin',
  password: 'audex2024'
};

export default function AudexAdmin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');


  const conversionData = [
    { month: 'Jan', conversions: 245 },
    { month: 'Feb', conversions: 312 },
    { month: 'Mar', conversions: 289 },
    { month: 'Apr', conversions: 398 },
    { month: 'May', conversions: 445 },
    { month: 'Jun', conversions: 502 }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 2450 },
    { month: 'Feb', revenue: 3120 },
    { month: 'Mar', revenue: 2890 },
    { month: 'Apr', revenue: 3980 },
    { month: 'May', revenue: 4450 },
    { month: 'Jun', revenue: 5020 }
  ];

  const recentConversions = [
    { id: 1, user: 'john@example.com', file: 'meeting_recording.mp3', duration: '45:30', status: 'Completed', date: '2025-10-03' },
    { id: 2, user: 'sarah@example.com', file: 'podcast_ep12.wav', duration: '1:20:15', status: 'Processing', date: '2025-10-03' },
    { id: 3, user: 'mike@example.com', file: 'interview.m4a', duration: '32:45', status: 'Completed', date: '2025-10-02' },
    { id: 4, user: 'emma@example.com', file: 'lecture_notes.mp3', duration: '55:20', status: 'Completed', date: '2025-10-02' },
    { id: 5, user: 'david@example.com', file: 'webinar.wav', duration: '1:45:00', status: 'Failed', date: '2025-10-01' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === HARDCODED_CREDENTIALS.username && password === HARDCODED_CREDENTIALS.password) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileAudio className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Audex Admin</h1>
            <p className="text-gray-600">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg"
            >
              Sign In
            </button>
          </form>

          {/* <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">Demo Credentials:</p>
            <p className="text-xs text-gray-700 text-center font-mono mt-1">admin / audex2024</p>
          </div> */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-white w-10 h-10 rounded-lg flex items-center justify-center">
            <FileAudio className="text-indigo-600" size={24} />
          </div>
          <h1 className="text-2xl font-bold">Audex</h1>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'dashboard' ? 'bg-white text-indigo-900' : 'hover:bg-indigo-700'
            }`}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('conversions')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'conversions' ? 'bg-white text-indigo-900' : 'hover:bg-indigo-700'
            }`}
          >
            <FileText size={20} />
            <span>Conversions</span>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'users' ? 'bg-white text-indigo-900' : 'hover:bg-indigo-700'
            }`}
          >
            <Users size={20} />
            <span>Users</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'settings' ? 'bg-white text-indigo-900' : 'hover:bg-indigo-700'
            }`}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {activeTab === 'dashboard' && 'Dashboard Overview'}
            {activeTab === 'conversions' && 'Audio Conversions'}
            {activeTab === 'users' && 'User Management'}
            {activeTab === 'settings' && 'Settings'}
          </h2>
          <p className="text-gray-600 mt-1">Welcome back, Admin</p>
        </div>

        {activeTab === 'dashboard' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Users className="text-blue-600" size={24} />
                  </div>
                  <span className="text-green-600 text-sm font-semibold">+12%</span>
                </div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">2,847</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <FileAudio className="text-purple-600" size={24} />
                  </div>
                  <span className="text-green-600 text-sm font-semibold">+8%</span>
                </div>
                <p className="text-gray-600 text-sm">Conversions</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">2,191</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Clock className="text-green-600" size={24} />
                  </div>
                  <span className="text-gray-600 text-sm font-semibold">~45min</span>
                </div>
                <p className="text-gray-600 text-sm">Avg Duration</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">52m 30s</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <DollarSign className="text-yellow-600" size={24} />
                  </div>
                  <span className="text-green-600 text-sm font-semibold">+15%</span>
                </div>
                <p className="text-gray-600 text-sm">Revenue</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">$21,910</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Conversions</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="conversions" fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">Recent Conversions</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">File</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentConversions.map((conv) => (
                      <tr key={conv.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-800">{conv.user}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{conv.file}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{conv.duration}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            conv.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            conv.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {conv.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{conv.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'conversions' && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-gray-600">Detailed conversion history and management will appear here.</p>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-gray-600">User management interface will appear here.</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-gray-600">System settings and configuration will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
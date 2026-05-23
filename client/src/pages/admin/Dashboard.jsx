import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useAnalytics, useReports, useResolveReport } from '../../hooks/useAdmin';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from 'recharts';

const CATEGORY_COLORS = {
  legal: '#FF6B9D',
  health: '#6BCB77',
  career: '#FFD93D',
  general: '#B2BEC3',
  safety: '#EF4444',
};

function KpiCard({ icon, value, label }) {
  return (
    <Card hover={false} className="flex items-center gap-4">
      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#FF6B9D] text-white flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-dark">{value ?? '--'}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </Card>
  );
}

export default function Dashboard() {
  const { data: analytics, isLoading: analyticsLoading } = useAnalytics();
  const [reportsPage, setReportsPage] = useState(1);
  const { data: reportsData, isLoading: reportsLoading } = useReports({ page: reportsPage, limit: 10 });
  const resolveReport = useResolveReport();

  const handleResolve = (id, action) => {
    resolveReport.mutate({ id, action });
  };

  if (analyticsLoading) {
    return (
      <AdminLayout>
        <LoadingSpinner size="lg" className="py-32" />
      </AdminLayout>
    );
  }

  const stats = analytics?.data || analytics || {};
  const userGrowth = stats.userGrowth30d || [];
  const postsByCategory = stats.postsByCategory || [];
  const reports = reportsData?.data || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page heading */}
        <div>
          <h2 className="text-2xl font-bold text-dark">Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">Platform overview and moderation queue</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <KpiCard
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            value={stats.totalUsers ?? 0}
            label="Total Users"
          />
          <KpiCard
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            }
            value={stats.postsToday ?? 0}
            label="Posts Today"
          />
          <KpiCard
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            }
            value={stats.pendingReports ?? 0}
            label="Pending Reports"
          />
          <KpiCard
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            }
            value={stats.newSignups7d ?? 0}
            label="New Signups (7d)"
          />
          <KpiCard
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            value={stats.unreadMessages ?? 0}
            label="Unread Messages"
          />
          <KpiCard
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            }
            value={stats.totalOrders ?? 0}
            label="Total Orders"
          />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth Line Chart */}
          <Card hover={false}>
            <h3 className="text-lg font-semibold text-dark mb-4">User Growth (30 days)</h3>
            {userGrowth.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={userGrowth} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    tickFormatter={(val) => {
                      const d = new Date(val);
                      return `${d.getMonth() + 1}/${d.getDate()}`;
                    }}
                  />
                  <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
                    labelFormatter={(val) => new Date(val).toLocaleDateString()}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#FF6B9D"
                    strokeWidth={2}
                    dot={{ r: 3, fill: '#FF6B9D' }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-gray-400 text-center py-12">No growth data available</p>
            )}
          </Card>

          {/* Posts by Category Bar Chart */}
          <Card hover={false}>
            <h3 className="text-lg font-semibold text-dark mb-4">Posts by Category (This Week)</h3>
            {postsByCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={postsByCategory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    tickFormatter={(val) => val.charAt(0).toUpperCase() + val.slice(1)}
                  />
                  <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
                    labelFormatter={(val) => val.charAt(0).toUpperCase() + val.slice(1)}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {postsByCategory.map((entry, idx) => (
                      <Cell
                        key={idx}
                        fill={CATEGORY_COLORS[entry.category] || '#6B7280'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-gray-400 text-center py-12">No post data available</p>
            )}
          </Card>
        </div>

        {/* Recent Reports Table */}
        <Card hover={false}>
          <h3 className="text-lg font-semibold text-dark mb-4">Recent Reports</h3>
          {reportsLoading ? (
            <LoadingSpinner className="py-8" />
          ) : reports.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No pending reports</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Post Title</th>
                    <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reporter(s)</th>
                    <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reports</th>
                    <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {reports.map((report) => {
                    const post = report;
                    return (
                      <tr key={post._id} className="hover:bg-gray-50">
                        <td className="py-3 pr-4">
                          <span className="text-sm font-medium text-dark line-clamp-1">
                            {post.title}
                          </span>
                        </td>
                        <td className="py-3 pr-4">
                          <span className="text-sm text-gray-600">
                            {post.reports?.length || 0} user(s)
                          </span>
                        </td>
                        <td className="py-3 pr-4">
                          <Badge variant="safety">{post.reports?.length || 0}</Badge>
                        </td>
                        <td className="py-3 pr-4">
                          <span className="text-sm text-gray-500">
                            {post.createdAt
                              ? new Date(post.createdAt).toLocaleDateString()
                              : '--'}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              className="h-8 px-3 text-xs"
                              onClick={() => handleResolve(post._id, 'dismiss')}
                              disabled={resolveReport.isPending}
                            >
                              Dismiss
                            </Button>
                            <Button
                              variant="danger"
                              className="h-8 px-3 text-xs"
                              onClick={() => handleResolve(post._id, 'hide')}
                              disabled={resolveReport.isPending}
                            >
                              Hide Post
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {/* Simple pagination for reports */}
          {reportsData?.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-border">
              <button
                onClick={() => setReportsPage((p) => Math.max(1, p - 1))}
                disabled={reportsPage <= 1}
                className="px-3 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              <span className="text-sm text-gray-500">
                Page {reportsPage} of {reportsData.totalPages}
              </span>
              <button
                onClick={() => setReportsPage((p) => Math.min(reportsData.totalPages, p + 1))}
                disabled={reportsPage >= reportsData.totalPages}
                className="px-3 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </Card>

        {/* Recent Contact Messages */}
        <Card hover={false}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-dark">Recent Contact Messages</h3>
            <Link to="/admin/messages" className="text-sm text-[#FF6B9D] hover:underline">View All →</Link>
          </div>
          {(stats.recentMessages || []).length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No contact messages yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-8"></th>
                    <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {(stats.recentMessages || []).map((msg) => (
                    <tr key={msg._id} className={`hover:bg-gray-50 ${!msg.isRead ? 'bg-[#FF6B9D]/5' : ''}`}>
                      <td className="py-3 pr-2">
                        {!msg.isRead && <div className="w-2 h-2 rounded-full bg-[#FF6B9D]" />}
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-sm font-medium text-dark">{msg.name}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-sm text-gray-600">{msg.email}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-sm text-gray-600 line-clamp-1 max-w-[200px] block">{msg.subject}</span>
                      </td>
                      <td className="py-3">
                        <span className="text-sm text-gray-500">
                          {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : '--'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}

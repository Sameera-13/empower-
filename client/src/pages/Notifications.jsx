import { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import NotificationItem from '../components/domain/NotificationItem';
import { useNotifications, useMarkRead, useMarkAllRead } from '../hooks/useNotifications';

export default function Notifications() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useNotifications({ page });
  const markRead = useMarkRead();
  const markAllRead = useMarkAllRead();
  const notifications = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const handleClick = (notification) => {
    if (!notification.isRead) {
      markRead.mutate(notification._id);
    }
  };

  return (
    <PageContainer title="Notifications — Empower Stop">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-display text-[#2D3436]">Notifications</h1>
          {notifications.some((n) => !n.isRead) && (
            <button
              onClick={() => markAllRead.mutate()}
              className="text-sm text-[#FF6B9D] hover:underline font-medium"
            >
              Mark all as read
            </button>
          )}
        </div>

        {isLoading ? (
          <LoadingSpinner size="lg" className="py-20" />
        ) : notifications.length === 0 ? (
          <EmptyState
            title="No notifications"
            description="You're all caught up!"
            icon={<svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>}
          />
        ) : (
          <div className="bg-white border border-[#F0E6F6] rounded-xl overflow-hidden divide-y divide-[#F0E6F6]">
            {notifications.map((n) => (
              <NotificationItem key={n._id} notification={n} onClick={handleClick} />
            ))}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </PageContainer>
  );
}

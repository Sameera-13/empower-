import { Link } from 'react-router-dom';
import NotificationItem from './NotificationItem';
import { useNotifications, useMarkRead, useMarkAllRead } from '../../hooks/useNotifications';

export default function NotificationDropdown({ onClose }) {
  const { data } = useNotifications({ limit: 5 });
  const markRead = useMarkRead();
  const markAllRead = useMarkAllRead();
  const notifications = data?.data || [];

  const handleClick = (notification) => {
    if (!notification.isRead) {
      markRead.mutate(notification._id);
    }
    onClose?.();
  };

  const handleMarkAll = () => {
    markAllRead.mutate();
  };

  return (
    <div className="absolute right-0 mt-1 w-80 bg-white border border-[#F0E6F6] rounded-xl shadow-xl shadow-black/20 overflow-hidden z-50">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0E6F6]">
        <span className="text-sm font-semibold text-[#2D3436]">Notifications</span>
        {notifications.some((n) => !n.isRead) && (
          <button onClick={handleMarkAll} className="text-xs text-[#FF6B9D] hover:underline">
            Mark all read
          </button>
        )}
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="px-4 py-8 text-sm text-[#2D3436]/40 text-center">No notifications yet</p>
        ) : (
          notifications.map((n) => (
            <NotificationItem key={n._id} notification={n} onClick={handleClick} />
          ))
        )}
      </div>
      <Link
        to="/notifications"
        onClick={onClose}
        className="block text-center text-xs font-medium text-[#FF6B9D] py-2.5 border-t border-[#F0E6F6] hover:bg-[#F0E6F6]/50 transition-colors"
      >
        View all notifications
      </Link>
    </div>
  );
}

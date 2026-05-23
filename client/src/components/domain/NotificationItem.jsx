import { Link } from 'react-router-dom';

const TYPE_ICONS = {
  order_update: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  comment_reply: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  post_like: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  new_opportunity: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  announcement: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
};

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function NotificationItem({ notification, onClick }) {
  const icon = TYPE_ICONS[notification.type] || TYPE_ICONS.announcement;

  const content = (
    <div
      className={`flex items-start gap-3 px-4 py-3 transition-colors cursor-pointer ${
        notification.isRead ? 'bg-white' : 'bg-[#FF6B9D]/5'
      } hover:bg-[#F0E6F6]/50`}
      onClick={() => onClick?.(notification)}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        notification.isRead ? 'bg-gray-100 text-gray-400' : 'bg-[#FF6B9D]/10 text-[#FF6B9D]'
      }`}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${notification.isRead ? 'text-[#2D3436]/60' : 'text-[#2D3436] font-medium'}`}>
          {notification.title}
        </p>
        <p className="text-xs text-[#2D3436]/40 line-clamp-1">{notification.message}</p>
        <p className="text-[10px] text-[#2D3436]/30 mt-0.5">{timeAgo(notification.createdAt)}</p>
      </div>
      {!notification.isRead && (
        <div className="w-2 h-2 rounded-full bg-[#FF6B9D] mt-2 flex-shrink-0" />
      )}
    </div>
  );

  if (notification.link) {
    return <Link to={notification.link} className="block">{content}</Link>;
  }
  return content;
}

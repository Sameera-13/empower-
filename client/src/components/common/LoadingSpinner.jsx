export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizes[size]} rounded-full animate-spin`} style={{ border: '3px solid #F0E6F6', borderTopColor: '#FF6B9D', borderRightColor: '#6BCB77', borderBottomColor: '#FFD93D' }} />
    </div>
  );
}

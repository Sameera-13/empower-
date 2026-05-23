export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={`bg-white border border-[#F0E6F6] rounded-2xl p-5 ${hover ? 'transition-all duration-300 hover:border-[#FFB8D0] hover:shadow-lg hover:shadow-[#FF6B9D]/8 hover:-translate-y-0.5' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

import Button from './Button';

export default function EmptyState({ icon, title, description, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && <div className="text-[#2D3436]/20 mb-4">{icon}</div>}
      <h3 className="text-lg font-semibold text-[#2D3436] mb-1">{title}</h3>
      {description && <p className="text-sm text-[#2D3436]/50 mb-4 max-w-md">{description}</p>}
      {actionLabel && onAction && <Button onClick={onAction}>{actionLabel}</Button>}
    </div>
  );
}

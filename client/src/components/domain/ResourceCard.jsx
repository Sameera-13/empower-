import Card from '../common/Card';
import Badge from '../common/Badge';

export default function ResourceCard({ resource }) {
  const { title, description, category, language, sourceUrl, isPinned } = resource;

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-dark leading-snug">{title}</h3>
        {isPinned && (
          <svg
            className="w-4 h-4 text-primary shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-label="Pinned"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        )}
      </div>

      <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-1">
        {description}
      </p>

      <div className="flex items-center flex-wrap gap-2 mt-auto">
        <Badge variant={category}>{category}</Badge>
        {language && (
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {language}
          </span>
        )}
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-xs text-primary hover:text-primary-dark font-medium inline-flex items-center gap-1"
          >
            Source
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>
    </Card>
  );
}

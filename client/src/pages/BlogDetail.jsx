import { useParams, Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useBlogPost } from '../hooks/useBlog';

export default function BlogDetail() {
  const { slug } = useParams();
  const { data, isLoading } = useBlogPost(slug);

  if (isLoading) return <PageContainer><LoadingSpinner size="lg" className="py-32" /></PageContainer>;

  const post = data?.data;
  if (!post) {
    return (
      <PageContainer>
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-xl font-semibold text-[#2D3436] mb-2">Post not found</h2>
          <Link to="/blog" className="text-[#FF6B9D] hover:underline">Back to Blog</Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={`${post.title} — Empower Stop Blog`}>
      {post.coverImage && (
        <div className="w-full max-h-[400px] overflow-hidden">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <article className="max-w-3xl mx-auto px-4 py-10">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-[#2D3436]/50 hover:text-[#FF6B9D] mb-6 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Blog
        </Link>

        <div className="flex items-center gap-2 mb-4">
          <Badge variant={post.category}>{post.category}</Badge>
          {post.publishedAt && (
            <span className="text-sm text-[#2D3436]/40">
              {new Date(post.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-display text-[#2D3436] mb-6 leading-tight">{post.title}</h1>

        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-[#F0E6F6]">
          {post.author?.avatar ? (
            <img src={post.author.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#FF6B9D] text-white flex items-center justify-center text-sm font-bold">
              {post.author?.name?.[0]?.toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-[#2D3436]">{post.author?.name}</p>
            <p className="text-xs text-[#2D3436]/40">Author</p>
          </div>
        </div>

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs bg-[#F0E6F6]/50 text-[#2D3436]/60 px-3 py-1 rounded-full">#{tag}</span>
            ))}
          </div>
        )}

        <div
          className="prose prose-lg max-w-none text-[#2D3436]/80 leading-relaxed [&_h2]:font-display [&_h2]:text-[#2D3436] [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:font-display [&_h3]:text-[#2D3436] [&_a]:text-[#FF6B9D] [&_a:hover]:underline [&_ul]:list-disc [&_ol]:list-decimal [&_li]:mb-1"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </article>
    </PageContainer>
  );
}

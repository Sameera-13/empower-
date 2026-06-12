import PageContainer from '../components/layout/PageContainer';

export default function MediaCoverage() {
  return (
    <PageContainer title="Media Coverage — Empower Stop">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 text-center">
        <h1 className="text-4xl md:text-[56px] font-serif font-bold text-[#1a202c] mb-6 leading-tight tracking-tight">
          Media Coverage
        </h1>
        <p className="text-[17px] text-[#4a5568] font-medium leading-[1.8] max-w-2xl mx-auto mb-10">
          See what the press has been saying about our mission and impact.
        </p>
        <div className="bg-white/80 backdrop-blur-md rounded-[2rem] border border-white/50 p-12 shadow-sm inline-block">
          <div className="w-20 h-20 bg-[#ff4f8b]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#ff4f8b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1a202c] mb-2">Media presskit coming soon!</h2>
          <p className="text-gray-500">We are currently gathering our latest news features.</p>
        </div>
      </div>
    </PageContainer>
  );
}

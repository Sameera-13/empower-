import PageContainer from '../components/layout/PageContainer';

export default function Partners() {
  return (
    <PageContainer title="Partners — Empower Stop">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 text-center">
        <h1 className="text-4xl md:text-[56px] font-serif font-bold text-[#1a202c] mb-6 leading-tight tracking-tight">
          Our Partners
        </h1>
        <p className="text-[17px] text-[#4a5568] font-medium leading-[1.8] max-w-2xl mx-auto mb-10">
          We collaborate with incredible organizations and brands who share our mission of empowering women.
        </p>
        <div className="bg-white/80 backdrop-blur-md rounded-[2rem] border border-white/50 p-12 shadow-sm inline-block">
          <div className="w-20 h-20 bg-[#ff4f8b]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#ff4f8b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1a202c] mb-2">Partner directory coming soon!</h2>
          <p className="text-gray-500">We are currently updating our list of partners.</p>
        </div>
      </div>
    </PageContainer>
  );
}

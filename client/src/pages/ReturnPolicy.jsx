import PageContainer from '../components/layout/PageContainer';

const sections = [
  {
    id: 'returns',
    title: 'I. RETURNS',
    content: `We only accept returns in the following conditions:`,
    list: [
      'You received a damaged or defective product.',
      'You received the wrong item.',
    ],
    subsections: [
      {
        title: 'How to Initiate a Return:',
        content: `To be eligible for a return, please notify us within 48 hours of receiving the product by writing to support@empowerstop.com with photos and order details.`,
      },
    ],
  },
  {
    id: 'refunds',
    title: 'II. REFUNDS',
    content: 'Refunds are processed under the following conditions:',
    list: [
      'If the returned product meets our inspection criteria.',
      'If your order is canceled before dispatch.',
    ],
    subsections: [
      {
        title: 'Processing Time:',
        content: 'Once approved, the refund will be processed within 7\u201310 business days to your original method of payment.',
      },
    ],
  },
  {
    id: 'cancellations',
    title: 'III. CANCELLATIONS',
    content: `Orders can be canceled within 12 hours of placing the order. To request a cancellation, please email us at support@empowerstop.com with your order number.

Once the product is shipped, cancellation is not possible.`,
  },
  {
    id: 'contact',
    title: 'IV. QUESTIONS OR CONCERNS',
    content: 'If you have any questions or concerns regarding our return, refund, or cancellation policies, please send us a detailed message to support@empowerstop.com, and we will try to resolve your concerns.',
  },
];

export default function ReturnPolicy() {
  return (
    <PageContainer title="Return, Refund & Cancellation Policy — Empower Stop">
      {/* Hero */}
      <section className="bg-transparent border-b border-white/50">
        <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 text-center">
          <h1 className="text-4xl md:text-[56px] font-serif font-bold text-[#1a202c] leading-tight tracking-tight">Return, Refund &amp; Cancellation Policy</h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        {/* Intro */}
        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
          <p className="text-[17px] text-[#4a5568] font-medium leading-[1.8]">
            Thank you for shopping with Empower Stop, an initiative by Gully Classes Foundation to empower women artisans. Please read the following policy carefully before making a purchase. By placing an order, you agree to the terms outlined below.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-serif font-bold text-[#1a202c] mb-4">Contents</h2>
          <nav className="space-y-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block text-sm text-[#FF6B9D] hover:text-[#E8457A] hover:underline transition-colors"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="bg-white/80 backdrop-blur-md border border-white/50 rounded-2xl p-6 md:p-8 scroll-mt-20 shadow-sm"
            >
              <h2 className="text-2xl font-serif font-bold text-[#1a202c] mb-4 leading-snug">{section.title}</h2>

              {section.content && (
                <div className="text-[17px] text-[#4a5568] font-medium leading-[1.8] whitespace-pre-line mb-4">
                  {section.content}
                </div>
              )}

              {section.list && (
                <ul className="list-disc list-inside text-[17px] text-[#4a5568] font-medium space-y-2 mb-4 ml-2">
                  {section.list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}

              {section.subsections?.map((sub, idx) => (
                <div key={idx} className="mt-6">
                  <h3 className="text-xl font-serif font-bold text-[#1a202c] mb-3">{sub.title}</h3>
                  <p className="text-[17px] text-[#4a5568] font-medium leading-[1.8] whitespace-pre-line">{sub.content}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

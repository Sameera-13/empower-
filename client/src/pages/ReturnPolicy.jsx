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
      <section className="gradient-hero border-b border-[#F0E6F6]">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl md:text-3xl font-display gradient-text-pink-green mb-2">Return, Refund &amp; Cancellation Policy</h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        {/* Intro */}
        <div className="bg-white border border-[#F0E6F6] rounded-2xl p-6 md:p-8 mb-8">
          <p className="text-sm text-[#2D3436]/60 leading-relaxed">
            Thank you for shopping with Empower Stop, an initiative by Gully Classes Foundation to empower women artisans. Please read the following policy carefully before making a purchase. By placing an order, you agree to the terms outlined below.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-white border border-[#F0E6F6] rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="text-lg font-display text-[#2D3436] mb-4">Contents</h2>
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
              className="bg-white border border-[#F0E6F6] rounded-2xl p-6 md:p-8 scroll-mt-20"
            >
              <h2 className="text-lg font-display text-[#2D3436] mb-4 leading-snug">{section.title}</h2>

              {section.content && (
                <div className="text-sm text-[#2D3436]/60 leading-relaxed whitespace-pre-line mb-4">
                  {section.content}
                </div>
              )}

              {section.list && (
                <ul className="list-disc list-inside text-sm text-[#2D3436]/60 space-y-1 mb-4 ml-2">
                  {section.list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}

              {section.subsections?.map((sub, idx) => (
                <div key={idx} className="mt-5">
                  <h3 className="text-sm font-semibold text-[#2D3436] mb-2">{sub.title}</h3>
                  <p className="text-sm text-[#2D3436]/60 leading-relaxed whitespace-pre-line">{sub.content}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

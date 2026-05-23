import PageContainer from '../components/layout/PageContainer';

const sections = [
  {
    id: 'cover',
    title: 'I. WHAT DOES THIS PRIVACY POLICY COVER?',
    content: `This Privacy Policy covers our treatment of personally identifiable information ("Personal Information") that we gather when you are accessing or using our Services. This policy does not apply to the practices of companies that we do not own or control or to individuals that we do not employ or manage.

We do not knowingly collect or solicit personal information from anyone under the age of 13 or knowingly allow such persons to register for the Services (as defined in our Terms of Use). If you are under 13, please do not attempt to register for the Services or send any information about yourself to us, including your name, address, telephone number, or email address. No one under age 13 may provide any personal information to us or on the Services. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible. If you believe that we might have any information from or about a child under 13, please contact us at support@empowerstop.com.

We gather various types of Personal Information from our users, as explained more fully below. We may use this Personal Information to personalize and improve our services, allow users to set up a user account and profile, contact users, fulfill requests for products and services, analyze how users utilize the Services, and as otherwise set forth in this Privacy Policy. We may share certain types of Personal Information with third parties, as described below.`,
  },
  {
    id: 'collect',
    title: 'II. WHAT INFORMATION DOES THE COMPANY COLLECT?',
    content: null,
    subsections: [
      {
        title: 'A. Information You Provide to Us:',
        content: `We receive and store any information you knowingly provide to us. For example, we collect personal information such as your name, email address, and browser information.

You can choose not to provide us with certain information, but then you may not be able to register or take advantage of some of our features. We may anonymize your personal information so that you cannot be individually identified and provide that information to our partners.

If you have provided us with a means of contacting you, we may use such means to communicate with you. You may opt out of non-essential communications by clicking on the unsubscribe link provided in our emails.`,
      },
      {
        title: 'B. Information Collected Automatically:',
        content: `Whenever you interact with our services, we automatically receive and record information on our server logs from your browser, including your IP address, cookie information, and the page you requested.

When we collect usage information, we only use this data in aggregate form and not in a manner that would identify you personally.`,
      },
    ],
  },
  {
    id: 'share',
    title: 'III. WILL THE COMPANY SHARE ANY OF THE PERSONAL INFORMATION IT RECEIVES?',
    content: 'We neither rent nor sell your personal information in personally identifiable form to anyone. However, we do share your personal information with third parties as described below:',
    subsections: [
      {
        title: 'A. Affiliated Businesses and Third-Party Websites We Do Not Control:',
        content: 'In certain situations, businesses or third-party websites we\'re affiliated with may sell items or provide services to you through our services. We will share your personal information with that affiliated business only to the extent necessary for that transaction or service.',
      },
      {
        title: 'B. Agents:',
        content: 'We employ other companies and people to perform tasks on our behalf and need to share your information with them to provide products or services to you.',
      },
      {
        title: 'C. Business Transfers:',
        content: 'In the event of a business transfer, customer information may be transferred as part of that transaction.',
      },
      {
        title: 'D. Protection of Company and Others:',
        content: 'We reserve the right to access, read, preserve, and disclose any information that we reasonably believe is necessary to comply with the law or protect rights, property, or safety.',
      },
      {
        title: 'E. With Your Consent:',
        content: 'Except as set forth above, you will be notified when your personal information may be shared with third parties and will be able to prevent sharing.',
      },
    ],
  },
  {
    id: 'secure',
    title: 'IV. IS PERSONAL INFORMATION ABOUT ME SECURE?',
    content: `Your account is protected by a password for your privacy and security. You must prevent unauthorized access to your account by selecting and protecting your password appropriately and signing off after using our services.

While we strive to protect your personal information, we cannot guarantee complete security. The services may contain links to other sites. We are not responsible for the privacy policies of other sites.`,
  },
  {
    id: 'access',
    title: 'V. WHAT PERSONAL INFORMATION CAN I ACCESS?',
    content: 'Through your account settings, you may access, and in some cases edit or delete the following information:',
    list: [
      'Name, User ID, and password',
      'Email address',
      'Location',
      'Payment information',
      'User profile information',
    ],
  },
  {
    id: 'choices',
    title: 'VI. WHAT CHOICES DO I HAVE?',
    content: `You can opt not to disclose information to us, but some information is needed to register and access certain features.

You may request deletion of your account by emailing us at support@empowerstop.com. Some information may remain in our records after deletion for legal archival purposes.`,
  },
  {
    id: 'changes',
    title: 'VII. CHANGES TO THIS PRIVACY POLICY',
    content: 'We may amend this privacy policy from time to time. If we make changes in the way we use personal information, we will notify you (for example, by email or a sign-in notification). If you do not agree to the changes, do not use the services after they become effective.',
  },
  {
    id: 'questions',
    title: 'VIII. QUESTIONS OR CONCERNS',
    content: 'If you have any questions or concerns regarding our privacy policies, please send us a detailed message to support@empowerstop.com, and we will try to resolve your concerns.',
  },
];

export default function PrivacyPolicy() {
  return (
    <PageContainer title="Privacy Policy — Empower Stop">
      {/* Hero */}
      <section className="gradient-hero border-b border-[#F0E6F6]">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl md:text-3xl font-display gradient-text-pink-green mb-2">Privacy Policy</h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        {/* Intro */}
        <div className="bg-white border border-[#F0E6F6] rounded-2xl p-6 md:p-8 mb-8">
          <p className="text-sm text-[#2D3436]/60 leading-relaxed">
            We at Empower Stop ("Company," "we," "us," "our") know that our users ("you," "your") care about how your personal information is used and shared, and we take your privacy seriously. Please read the following to learn more about our Privacy Policy. By visiting or using the Website or Services in any manner, you acknowledge that you accept the practices and policies outlined in this Privacy Policy, and you hereby consent that we will collect, use, and share your information in the following ways. Any capitalized terms used herein without definition shall have the meaning given to them in the Company Terms of Use.
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

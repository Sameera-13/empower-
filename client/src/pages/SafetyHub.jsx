import { useState } from 'react';
import jsPDF from 'jspdf';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useEmergencyNumbers, useSafetyTips, useNationalOrgs } from '../hooks/useSafety';

function AccordionCategory({ category, tips }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-white/80 backdrop-blur-md hover:bg-white/95 transition-colors text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-dark">{category}</span>
        <span className={`text-xl leading-none shrink-0 ml-2 transition-colors ${open ? 'text-[#FF6B9D]' : 'text-gray-400'}`}>
          {open ? '\u2212' : '+'}
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 bg-white/80 backdrop-blur-md space-y-3">
          {tips.map((tip) => (
            <div key={tip.title} className="pl-4 border-l-2 border-[#FF6B9D]/30">
              <h4 className="text-sm font-medium text-dark mb-1">
                {tip.title}
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function downloadSafetyPlan() {
  const doc = new jsPDF('p', 'mm', 'a4');
  const W = 190;
  const LM = 14;
  let y = 18;

  const pink = [232, 69, 122];
  const green = [61, 165, 72];
  const red = [239, 83, 80];
  const dark = [45, 52, 54];
  const gray = [100, 100, 100];
  const lightGray = [180, 180, 180];

  function heading(text) {
    if (y > 260) { doc.addPage(); y = 18; }
    y += 6;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...pink);
    doc.text(text, LM, y);
    y += 2;
    doc.setDrawColor(...pink);
    doc.setLineWidth(0.5);
    doc.line(LM, y, LM + W, y);
    y += 6;
  }

  function para(text) {
    if (y > 270) { doc.addPage(); y = 18; }
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...gray);
    const lines = doc.splitTextToSize(text, W);
    doc.text(lines, LM, y);
    y += lines.length * 5 + 2;
  }

  function bullet(text) {
    if (y > 272) { doc.addPage(); y = 18; }
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...dark);
    const lines = doc.splitTextToSize(text, W - 6);
    doc.text('•', LM, y);
    doc.text(lines, LM + 6, y);
    y += lines.length * 5 + 1;
  }

  function blankLine(label) {
    if (y > 268) { doc.addPage(); y = 18; }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...gray);
    doc.text(label, LM, y);
    y += 4;
    doc.setDrawColor(...lightGray);
    doc.setLineWidth(0.3);
    doc.line(LM, y, LM + W, y);
    y += 6;
  }

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...pink);
  doc.text('Personal Safety Plan', LM, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...gray);
  doc.text('A confidential guide to help you prepare for emergencies. Fill in and keep safe.', LM, y);
  y += 10;

  // Emergency box
  doc.setFillColor(255, 240, 240);
  doc.setDrawColor(...red);
  doc.setLineWidth(0.6);
  doc.roundedRect(LM, y, W, 52, 3, 3, 'FD');
  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...red);
  doc.text('EMERGENCY NUMBERS', LM + 4, y);
  y += 6;

  const nums = [
    ['Women Helpline', '181 (24/7)'],
    ['National Emergency', '112'],
    ['Police', '100'],
    ['Domestic Violence', '1091'],
    ['Ambulance', '108'],
    ['Child Helpline', '1098'],
    ['Cyber Crime', '1930'],
  ];
  doc.setFontSize(9);
  nums.forEach(([name, num]) => {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...dark);
    doc.text(name + ':', LM + 6, y);
    doc.setFont('helvetica', 'bold');
    doc.text(num, LM + 55, y);
    y += 5;
  });
  y += 6;

  // Section 1
  heading('1. My Trusted Contacts');
  para('People I can call or go to in an emergency:');
  for (let i = 1; i <= 3; i++) {
    blankLine(`Person ${i} — Name, Relation & Phone`);
  }
  blankLine('Nearest Police Station & Phone');

  // Section 2
  heading('2. Safe Places I Can Go');
  para('Locations I can reach quickly if I need to leave home:');
  blankLine('Place 1');
  blankLine('Place 2');
  blankLine('Place 3');

  // Section 3
  heading('3. Important Documents to Keep Ready');
  ['Aadhaar Card / Voter ID / Passport', 'Bank passbook or ATM card',
   'Birth certificates (yours and children\'s)', 'Marriage certificate',
   'FIR copies or legal documents (if any)', 'Medical records',
   'Phone/laptop with evidence saved', 'House keys, vehicle keys', 'Some cash'
  ].forEach(bullet);
  y += 2;
  blankLine('Where I keep copies of these documents');

  // Section 4
  heading('4. My Safety Code Word');
  para('A word or phrase to signal trusted contacts that you need help.');
  blankLine('My code word');
  blankLine('Who knows this code word');

  // Section 5
  heading('5. If I Need to Leave Quickly');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...green);
  doc.text('Essentials bag checklist:', LM, y);
  y += 6;
  ['ID documents (originals or copies)', 'Cash / debit card',
   'Phone + charger', 'Medications',
   'Change of clothes for me (and children)',
   'Important phone numbers written on paper', 'Snacks and water'
  ].forEach(bullet);
  y += 2;
  blankLine('Where I keep my essentials bag');

  // Section 6
  heading('6. Online Safety');
  ['Change passwords on email, social media, banking',
   'Turn off location sharing with anyone unsafe',
   'Enable two-factor authentication',
   'Screenshot and save threatening messages as evidence',
   'Report cyber harassment: 1930 or cybercrime.gov.in'
  ].forEach(bullet);

  // Section 7
  heading('7. Legal Help');
  ['NCW Online Complaints: ncwapps.nic.in',
   'Free Legal Aid: nalsa.gov.in (National Legal Services Authority)',
   'DV Act 2005 — Apply for protection order, residence order, or monetary relief',
   'POSH Act — Workplace harassment via Internal Complaints Committee'
  ].forEach(bullet);

  // Section 8
  heading('8. My Personal Notes');
  for (let i = 0; i < 4; i++) blankLine('');

  // Footer
  y += 4;
  if (y > 270) { doc.addPage(); y = 18; }
  doc.setDrawColor(...lightGray);
  doc.setLineWidth(0.3);
  doc.line(LM, y, LM + W, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...lightGray);
  doc.text('This safety plan is confidential. Keep it in a safe place that only you can access.', 105, y, { align: 'center' });
  y += 4;
  doc.text('If you are in immediate danger, call 112 (National Emergency) or 181 (Women Helpline).', 105, y, { align: 'center' });
  y += 4;
  doc.text('Generated by Empower Stop', 105, y, { align: 'center' });

  doc.save('EmpowerStop-Personal-Safety-Plan.pdf');
}

export default function SafetyHub() {
  const { data: emergencyData, isLoading: loadingNumbers } = useEmergencyNumbers();
  const { data: tipsData, isLoading: loadingTips } = useSafetyTips();
  const { data: orgsData, isLoading: loadingOrgs } = useNationalOrgs();

  const emergencyNumbers = emergencyData?.data || [];
  const safetyTips = tipsData?.data || [];
  const nationalOrgs = orgsData?.data || [];

  return (
    <PageContainer>
      {/* Emergency strip — sticky */}
      <div className="sticky top-14 z-30 bg-danger text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-sm font-bold">Emergency? Tap to call:</span>
          </div>
          {!loadingNumbers && (
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              {emergencyNumbers.map((en) => (
                <a
                  key={en.number}
                  href={`tel:${en.number}`}
                  className="text-sm hover:underline inline-flex items-center gap-1"
                >
                  <span className="font-semibold">{en.name}:</span>
                  <span className="font-bold text-base">{en.number}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-4xl md:text-[56px] font-serif font-bold text-[#1a202c] mb-4 leading-tight tracking-tight">Safety Hub</h1>
        <p className="text-[17px] text-[#4a5568] font-medium leading-[1.8] mb-10">
          Your safety matters. Access emergency contacts, safety tips, and
          helpful organizations all in one place.
        </p>

        {/* Safety Tips Accordion */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-dark mb-4">Safety Tips</h2>
          {loadingTips ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 rounded-xl bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {safetyTips.map((group) => (
                <AccordionCategory
                  key={group.category}
                  category={group.category}
                  tips={group.tips}
                />
              ))}
            </div>
          )}
        </section>

        {/* National Organizations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-dark mb-4">
            National Organizations & Resources
          </h2>
          {loadingOrgs ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 rounded-xl bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nationalOrgs.map((org) => (
                <a
                  key={org._id}
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="h-full group">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FF6B9D]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-[#FF6B9D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-dark group-hover:text-[#FF6B9D] transition-colors">
                          {org.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">{org.description}</p>
                      </div>
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* Download safety plan */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-dark mb-4">
            Safety Plan
          </h2>
          <Card hover={false}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#6BCB77]/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-[#6BCB77]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-dark">
                  Download Personal Safety Plan
                </h3>
                <p className="text-sm text-gray-500">
                  A printable plan with emergency numbers, trusted contacts, escape checklist, and legal resources. Fill it in and keep it safe.
                </p>
              </div>
              <Button
                variant="accent"
                onClick={downloadSafetyPlan}
              >
                Download
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </PageContainer>
  );
}

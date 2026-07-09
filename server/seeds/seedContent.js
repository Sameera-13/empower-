const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Testimonial = require('../models/Testimonial');
const EmergencyNumber = require('../models/EmergencyNumber');
const SafetyTip = require('../models/SafetyTip');
const NationalOrg = require('../models/NationalOrg');

const testimonials = [
  { name: 'Priya S.', quote: 'Empower Stop connected me with legal resources when I needed them most. The community gave me courage to take action.', order: 0 },
  { name: 'Ananya R.', quote: 'Found a scholarship here that funded my engineering degree. I went from struggling to pay fees to graduating with honors.', order: 1 },
  { name: 'Fatima K.', quote: 'The safety hub genuinely helped during a crisis. Having emergency numbers one tap away made all the difference.', order: 2 },
  { name: 'Meera I.', quote: 'Got my first internship through Empower Stop. The career advice from this community was better than any career counselor.', order: 3 },
  { name: 'Ritu D.', quote: "Whether it's health advice, career guidance, or just someone to talk to — this community has been my support system.", order: 4 },
];

const emergencyNumbers = [
  { name: 'Women Helpline', number: '181', description: '24/7 national helpline for women', order: 0 },
  { name: 'National Emergency', number: '112', description: 'Unified emergency number (police, fire, ambulance)', order: 1 },
  { name: 'Police', number: '100', description: 'Emergency police', order: 2 },
  { name: 'Domestic Violence', number: '1091', description: 'Women in distress', order: 3 },
  { name: 'Ambulance', number: '108', description: 'Medical emergency', order: 4 },
  { name: 'Child Helpline', number: '1098', description: 'Child abuse reporting', order: 5 },
  { name: 'Cyber Crime', number: '1930', description: 'Online harassment/fraud', order: 6 },
];

const safetyTips = [
  {
    category: 'Home Safety',
    order: 0,
    tips: [
      { title: 'Secure all entry points', description: 'Install deadbolt locks on all exterior doors and ensure windows have working locks. Consider adding a peephole or video doorbell to identify visitors before opening.' },
      { title: 'Create a safe room', description: 'Designate a room with a strong lock where you can retreat in an emergency. Keep a charged phone, important documents, and emergency supplies inside.' },
      { title: 'Build a trusted neighbor network', description: 'Establish a code word or signal with trusted neighbors that indicates you need help. This can be a specific light left on, a text message, or a verbal cue.' },
      { title: 'Keep emergency numbers accessible', description: 'Store emergency contacts on speed dial. Keep a printed list near your phone in case your mobile is inaccessible. Include local police, women\'s helpline, and a trusted friend.' },
      { title: 'Document and secure important papers', description: 'Keep copies of IDs, financial documents, and legal papers in a secure place outside your home — with a trusted friend, family member, or in a bank locker.' },
      { title: 'Install adequate lighting', description: 'Ensure entrances, hallways, and parking areas are well-lit. Motion-sensor lights can deter unwanted visitors and help you spot unusual activity.' },
    ],
  },
  {
    category: 'Travel Safety',
    order: 1,
    tips: [
      { title: 'Share your live location', description: 'Use your phone\'s location-sharing feature to let a trusted contact track your journey in real time, especially during late-night travel or rides with strangers.' },
      { title: 'Verify ride details before boarding', description: 'Always match the driver\'s name, photo, vehicle model, and license plate with the app details before getting into a ride-share. Ask the driver to confirm your name.' },
      { title: 'Stay alert in public transport', description: 'Sit near the driver or in well-occupied compartments. Avoid isolated bus stops or train platforms at night. Keep your belongings close and be aware of your surroundings.' },
      { title: 'Carry a personal safety device', description: 'Keep pepper spray, a personal alarm, or a safety whistle in an easily accessible pocket. Many personal alarms emit a loud sound that can attract attention in emergencies.' },
      { title: 'Plan routes in advance', description: 'Research your route before traveling to unfamiliar areas. Identify safe landmarks, police stations, and hospitals along the way. Avoid shortcuts through isolated areas.' },
      { title: 'Trust your instincts', description: 'If a situation or person makes you uncomfortable, remove yourself immediately. It is always better to be cautious than to ignore warning signs. Walk into a public shop or restaurant if you feel followed.' },
    ],
  },
  {
    category: 'Online Safety',
    order: 2,
    tips: [
      { title: 'Guard your personal information', description: 'Never share your home address, phone number, workplace, or daily schedule on public social media profiles. Adjust privacy settings to limit who can see your posts.' },
      { title: 'Use strong, unique passwords', description: 'Create passwords with a mix of uppercase letters, numbers, and symbols. Use a password manager and enable two-factor authentication on all important accounts.' },
      { title: 'Be cautious with online connections', description: 'Verify the identity of people you meet online before sharing personal details. Reverse image search profile photos and be wary of people who refuse video calls.' },
      { title: 'Document and report harassment', description: 'Screenshot all threatening messages, emails, or posts. Report cyberbullying and harassment to the platform and to the Cyber Crime helpline (1930). Do not engage with harassers.' },
      { title: 'Review app permissions regularly', description: 'Check which apps have access to your location, camera, microphone, and contacts. Revoke permissions for apps you no longer use or that do not need the access.' },
    ],
  },
  {
    category: 'Workplace Safety',
    order: 3,
    tips: [
      { title: 'Know your rights under POSH Act', description: 'The Prevention of Sexual Harassment (POSH) Act mandates every organization with 10+ employees to have an Internal Complaints Committee. Know who your ICC members are and how to file a complaint.' },
      { title: 'Document inappropriate behavior', description: 'Keep a written log of incidents including dates, times, locations, witnesses, and exact words or actions. Save any relevant emails or messages as evidence.' },
      { title: 'Build a support network at work', description: 'Identify trusted colleagues, mentors, or employee resource groups you can confide in. Having allies makes it easier to address issues and feel supported.' },
      { title: 'Use official channels for reporting', description: 'Report harassment through your company\'s formal grievance mechanism. If internal channels fail, you can approach the Local Complaints Committee set up by the district administration.' },
      { title: 'Maintain professional boundaries', description: 'Clearly communicate your boundaries regarding physical contact, after-hours communication, and personal topics. You have the right to a respectful and safe work environment.' },
      { title: 'Seek legal counsel when needed', description: 'If workplace harassment persists despite reporting, consult a lawyer who specializes in labor or women\'s rights law. Many NGOs offer free legal consultations for women.' },
    ],
  },
];

const nationalOrgs = [
  { name: 'National Commission for Women', url: 'https://www.ncw.gov.in/', description: 'File complaints, seek legal guidance', order: 0 },
  { name: 'Women Helpline 181 (Mission Shakti)', url: 'https://www.myscheme.gov.in/schemes/whl-181', description: '24/7 emergency & non-emergency helpline', order: 1 },
  { name: 'One Stop Centre Scheme', url: 'https://www.wcd.gov.in/women/one-stop-centre-header', description: 'Integrated support for women affected by violence', order: 2 },
  { name: 'Swadhar Greh (Shelter for Women)', url: 'https://www.myscheme.gov.in/', description: 'Shelter, food, clothing & legal aid for women in distress', order: 3 },
  { name: 'Ujjawala (Anti-Trafficking)', url: 'https://www.india.gov.in/', description: 'Prevention of trafficking, rescue & rehabilitation', order: 4 },
  { name: 'Mission Shakti Portal', url: 'https://missionshakti.wcd.gov.in/', description: 'Govt umbrella scheme for women safety & empowerment', order: 5 },
  { name: 'Cyber Crime Reporting Portal', url: 'https://cybercrime.gov.in/', description: 'Report online harassment, cyberstalking & fraud', order: 6 },
  { name: 'NCW Online Complaint Portal', url: 'https://ncwapps.nic.in/', description: 'Register complaints online with NCW', order: 7 },
];

const seedContent = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/womenrise';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Seed testimonials
    const existingTestimonials = await Testimonial.countDocuments();
    if (existingTestimonials === 0) {
      await Testimonial.insertMany(testimonials);
      console.log(`Seeded ${testimonials.length} testimonials`);
    } else {
      console.log(`Testimonials already exist (${existingTestimonials}). Skipping.`);
    }

    // Seed emergency numbers
    const existingNumbers = await EmergencyNumber.countDocuments();
    if (existingNumbers === 0) {
      await EmergencyNumber.insertMany(emergencyNumbers);
      console.log(`Seeded ${emergencyNumbers.length} emergency numbers`);
    } else {
      console.log(`Emergency numbers already exist (${existingNumbers}). Skipping.`);
    }

    // Seed safety tips
    const existingTips = await SafetyTip.countDocuments();
    if (existingTips === 0) {
      await SafetyTip.insertMany(safetyTips);
      console.log(`Seeded ${safetyTips.length} safety tip categories`);
    } else {
      console.log(`Safety tips already exist (${existingTips}). Skipping.`);
    }

    // Seed national orgs
    const existingOrgs = await NationalOrg.countDocuments();
    if (existingOrgs === 0) {
      await NationalOrg.insertMany(nationalOrgs);
      console.log(`Seeded ${nationalOrgs.length} national organizations`);
    } else {
      console.log(`National organizations already exist (${existingOrgs}). Skipping.`);
    }

    await mongoose.disconnect();
    console.log('Seed complete. Disconnected from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seedContent();

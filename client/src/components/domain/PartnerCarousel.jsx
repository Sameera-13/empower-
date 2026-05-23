import { usePartners } from '../../hooks/usePartners';

const DEFAULT_PARTNERS = [
  { _id: 'p1', name: 'Erasustain', logo: 'https://empowerstop.odoo.com/web/image/885-8e204132/Erasustain.png?height=256' },
  { _id: 'p2', name: "L'Oreal India", logo: 'https://empowerstop.odoo.com/web/image/886-89d10b77/Lorealindia.png?height=256' },
  { _id: 'p3', name: 'Taj Lands End', logo: 'https://empowerstop.odoo.com/web/image/887-2782fd69/TajLandsEnd.png?height=256' },
  { _id: 'p4', name: 'Contetra', logo: 'https://empowerstop.odoo.com/web/image/888-f30335f2/Contetra.png?height=256' },
  { _id: 'p5', name: 'Drop of Change', logo: 'https://empowerstop.odoo.com/web/image/890-bda2a45b/dropofchange.png?height=256' },
  { _id: 'p6', name: 'Shemaroo', logo: 'https://empowerstop.odoo.com/web/image/1417-53abd36a/shemaroo.png?height=256' },
  { _id: 'p7', name: 'Free Press Journal', logo: 'https://empowerstop.odoo.com/web/image/1419-e539955d/fpj-logo.png?height=256' },
  { _id: 'p8', name: 'Future', logo: 'https://empowerstop.odoo.com/web/image/1420-a72ee30d/Future.jpg?height=256' },
];

export default function PartnerCarousel() {
  const { data } = usePartners();
  const dbPartners = data?.data || [];
  const partners = dbPartners.length > 0 ? dbPartners : DEFAULT_PARTNERS;

  // Duplicate for seamless infinite scroll
  const logos = [...partners, ...partners];

  return (
    <section className="py-16 overflow-hidden">
      <div>
        <div className="max-w-5xl mx-auto px-4 text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-display gradient-text-green-yellow mb-2 inline-block">Partners</h2>
          <p className="text-[#2D3436]/40 text-sm">Our Valued Partners: Together, We Create Impact!</p>
        </div>

        <div className="partner-scroll-container">
          <div className="partner-scroll-track">
            {logos.map((partner, idx) => (
              <div
                key={`${partner._id}-${idx}`}
                className="flex-shrink-0 mx-6 md:mx-10 transition-all duration-300 hover:scale-110"
              >
                <img src={partner.logo} alt={partner.name} className="h-14 md:h-16 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

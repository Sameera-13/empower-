import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';


/* ═══════════════════════════════════════════
   1. Empower Stop
   ═══════════════════════════════════════════ */
function EmpowerStopSection() {
  return (
    <section className="pt-16 pb-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-center">
        {/* Left — text */}
        <div className="lg:w-1/2">
          <div className="mb-10">
            <h2 className="text-2xl md:text-4xl font-display text-[#2D3436] leading-tight">Empower Stop</h2>
            <p className="text-[11px] md:text-xs font-bold text-[#FF6B9D] uppercase tracking-[0.18em] mt-0.5">
              Empower. Inspire. Transform.
            </p>
          </div>

          <div className="space-y-5">
            <p className="text-[#2D3436]/70 leading-[1.8] text-[15px]">
              Empower Stop is an initiative by Gully Classes Foundation dedicated to empowering women
              by providing them with a platform to showcase and sell their handmade products. Through
              this initiative, we aim to promote financial independence and entrepreneurial growth
              among women artisans and small business owners.
            </p>
            <p className="text-[#2D3436]/70 leading-[1.8] text-[15px]">
              At Empower Stop, we feature a diverse range of handcrafted products, including resin art,
              home decor, eco-friendly gifts, and more. Every purchase directly supports skilled women,
              helping them achieve economic stability and build a sustainable future for themselves and
              their families.
            </p>
            <p className="text-[#2D3436]/70 leading-[1.8] text-[15px]">
              Join us in our mission to uplift women and create a positive impact. Shop with purpose.
              Support women entrepreneurs.
            </p>

            <Link to="/shop" className="inline-block mt-2">
              <button className="h-11 px-7 rounded-full gradient-btn-pink text-white font-semibold text-sm transition-all">
                Shop Now
              </button>
            </Link>
          </div>
        </div>

        {/* Right — collage image */}
        <div className="lg:w-1/2">
          <img
            src="/about/empower-collage.png"
            alt="Empower Stop products and community"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   2. Gully Classes Foundation
   ═══════════════════════════════════════════ */
function GullyClassesSection() {
  return (
    <section className="py-20 px-4 bg-[#F9FBF9]">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-center">
        {/* Left — collage image */}
        <div className="lg:w-1/2">
          <img
            src="/about/gcf-collage.png"
            alt="Gully Classes Foundation community"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Right — text */}
        <div className="lg:w-1/2">
          <div className="mb-10">
            <h2 className="text-2xl md:text-4xl font-display text-[#2D3436] leading-tight">Gully Classes Foundation</h2>
            <p className="text-[11px] md:text-xs font-bold text-[#6BCB77] uppercase tracking-[0.18em] mt-0.5">
              Educate. Empower. Elevate.
            </p>
          </div>

          <div className="space-y-5">
            <p className="text-[#2D3436]/70 leading-[1.8] text-[15px]">
              Gully Classes Foundation is a non-profit organization dedicated to transforming lives
              through education, environmental sustainability, and women empowerment. Founded with the
              vision of creating equal opportunities for all, we work closely with underprivileged
              communities in Mumbai and Rajasthan, providing free primary education to children, skill
              development programs for women, and environmental initiatives to build a greener future.
            </p>
            <p className="text-[#2D3436]/70 leading-[1.8] text-[15px]">
              Our mission is to break barriers and uplift marginalized communities by fostering education,
              financial independence, and sustainable livelihoods. Through various initiatives like
              Empower Stop, Ride to Independence, and Diwali: A Hope, we empower individuals to lead
              dignified and self-sufficient lives.
            </p>
            <p className="text-[#2D3436]/70 leading-[1.8] text-[15px]">
              By supporting Empower Stop, you are directly contributing to our larger goal of social
              upliftment and change. Every purchase made helps sustain our programs, enabling us to
              reach more people and create a lasting impact.
            </p>

            <Link to="/contact" className="inline-block mt-2">
              <button className="h-11 px-7 rounded-full gradient-btn-green text-white font-semibold text-sm transition-all">
                Support Our Mission
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Page
   ═══════════════════════════════════════════ */
/* ═══════════════════════════════════════════
   3. Our Journey
   ════════════��══════════════════════════════ */
function JourneySection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-display text-[#2D3436] mb-8">Our Journey</h2>
        <div className="rounded-2xl overflow-hidden shadow-md">
          <img
            src="https://www.empowerstop.com/web/image/1778-e6eba054/Empower%20Stop%20%283%29.jpg"
            alt="Our Journey"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   4. Video
   ═══════════════════════════════════════════ */
function VideoSection() {
  return (
    <section className="pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl overflow-hidden shadow-md aspect-video">
          <iframe
            src="https://www.youtube.com/embed/cEtcNowJ8Qc"
            title="Empower Stop"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <PageContainer title="About Us — Empower Stop">
      <EmpowerStopSection />
      <GullyClassesSection />
      <JourneySection />
      <VideoSection />
    </PageContainer>
  );
}

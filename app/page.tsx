"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Clock3,
  Hammer,
  Home,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  TriangleAlert,
  Wrench,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const assets = (name: string) => `${basePath}/assets/${name}`;

const businessName = "L.P Roofing";
const legalName = "L.P Roofing, Walsall";
const fallbackEmail = "enquiries@siteforge.local";
const facebookUrl = "https://www.facebook.com/LPRoofing";
const serviceArea = "Walsall and surrounding West Midlands areas";
const mapsQuery = encodeURIComponent("Walsall, UK");
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
const mapEmbedUrl = `https://maps.google.com/maps?q=${mapsQuery}&z=10&output=embed`;

const services = [
  {
    icon: Home,
    title: "New roofs",
    body: "Clear roof replacement enquiries for homes that need a properly planned new tiled or pitched roof.",
  },
  {
    icon: Sparkles,
    title: "Re-roofs",
    body: "Re-roofing support when an older roof has reached the point where patching is no longer the best answer.",
  },
  {
    icon: TriangleAlert,
    title: "Dry systems",
    body: "Dry ridge and dry verge style roofline work for cleaner detailing and lower-maintenance roof edges.",
  },
  {
    icon: Hammer,
    title: "Maintenance",
    body: "Roof maintenance, small defects and practical roof checks before water damage or weather exposure gets worse.",
  },
];

const proofPoints = [
  "Facebook page verifies L.P Roofing as a Walsall roofing business.",
  "Public Facebook description lists new roofs, re-roofs, dry systems and maintenance.",
  "Customer comments mention reliable work, strong communication and a neat finished roof.",
  "The footer includes the Facebook profile for quick profile checking and follow-up.",
];

const gallery = [
  {
    src: "re-roof-finish.png",
    alt: "Generated roofing service visual showing a clean new tiled roof finish",
    title: "New roof and re-roof enquiries",
    shape: "landscape",
  },
  {
    src: "dry-ridge-system.png",
    alt: "Generated roofing service visual showing dry ridge roofline detail",
    title: "Dry ridge and roofline detail",
    shape: "portrait",
  },
  {
    src: "roof-maintenance-detail.png",
    alt: "Generated roofing service visual showing roof maintenance detail",
    title: "Roof maintenance checks",
    shape: "landscape",
  },
  {
    src: "fb-profile.jpg",
    alt: "L.P Roofing verified Facebook profile image",
    title: "Verified Facebook presence",
    shape: "small",
  },
];

const testimonials = [
  {
    quote:
      "Professional, reliable, and completed the job to a high standard. Great communication throughout, and the finished roof looks fantastic.",
    name: "William Alexander",
    source: "Facebook review",
  },
  {
    quote:
      "Did a great job when we needed our roof fixing quickly. Communication was great and he’s a good guy to work with.",
    name: "Oli B-S",
    source: "Facebook review",
  },
  {
    quote: "Reasonable pricing, friendly service, free quotes, clean and perfect work.",
    name: "Adele Fryer",
    source: "Facebook review",
  },
];

const faqs = [
  ["What roofing work is listed?", "L.P Roofing covers new roofs, re-roofs, dry systems and maintenance enquiries."],
  ["Where are they based?", "L.P Roofing is based in Walsall and works around the surrounding West Midlands area."],
  ["Are reviews available?", "Yes. The featured customer comments mention reliability, communication, fast roof help and clean work."],
  ["How does the form work?", "The enquiry form prepares a clear roof brief with your contact details, area, service type and message."],
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      className="group w-full rounded-xl border border-white/10 bg-white/[0.045] p-5 text-left transition hover:border-amber-300/35 hover:bg-white/[0.075]"
      onClick={() => setOpen((current) => !current)}
      type="button"
    >
      <span className="flex items-center justify-between gap-4 text-base font-black text-white">
        {q}
        <ArrowUpRight className={`shrink-0 text-amber-300 transition ${open ? "-rotate-45" : ""}`} size={19} />
      </span>
      {open ? <span className="mt-4 block text-sm leading-7 text-white/68">{a}</span> : null}
    </button>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.25 10.44 22v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.25c-1.24 0-1.63.78-1.63 1.57v1.89h2.77l-.44 2.91h-2.33V22C18.34 21.25 22 17.08 22 12.06z" />
    </svg>
  );
}

export default function Page() {
  const main = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.28], [0, -90]);
  const [service, setService] = useState("New roof / re-roof");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [postcode, setPostcode] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false });
    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        y: 44,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-grid", start: "top 74%" },
      });
      const track = document.querySelector<HTMLElement>(".gallery-track");
      const media = gsap.matchMedia();
      media.add("(min-width: 768px)", () => {
        if (!track) return;
        const overflow = () => Math.max(0, track.scrollWidth - window.innerWidth + 64);
        gsap.to(track, {
          x: () => -overflow(),
          ease: "none",
          scrollTrigger: {
            trigger: ".gallery-stage",
            start: "top top",
            end: () => `+=${Math.max(1500, overflow() + window.innerHeight * 0.75)}`,
            scrub: 0.45,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
      gsap.to(".proof-line", {
        scaleX: 1,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: { trigger: ".proof-section", start: "top 70%", end: "bottom 42%", scrub: true },
      });
      return () => media.revert();
    }, main);
    return () => ctx.revert();
  }, []);

  const mailSubject = encodeURIComponent(`Roofing enquiry from ${name || "website visitor"}`);
  const mailBody = encodeURIComponent(
    `Hi L.P Roofing,\n\nName: ${name}\nContact: ${contact}\nArea/postcode: ${postcode}\nService: ${service}\nDetails: ${details}\n\nPlease contact me about this roofing enquiry.`,
  );
  const mailHref = `mailto:${fallbackEmail}?subject=${mailSubject}&body=${mailBody}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: businessName,
    legalName,
    image: `${basePath}/assets/fb-profile.jpg`,
    areaServed: ["Walsall", "West Midlands"],
    url: "https://deanooooooooo.github.io/lp-roofing-walsall/",
    sameAs: [facebookUrl],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Walsall",
      addressCountry: "GB",
    },
    description:
      "Roofing contractor in Walsall for new roofs, re-roofs, dry systems and roof maintenance.",
  };

  return (
    <main ref={main} className="min-h-screen overflow-hidden bg-[#f6f2ea] text-[#16201c]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/14 bg-[#16201c]/86 text-white backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-amber-200/25 bg-white/10">
              <Image src={assets("fb-profile.jpg")} alt="L.P Roofing profile image" fill sizes="56px" className="object-cover" priority />
            </span>
            <span className="min-w-0">
              <span className="block text-lg font-black leading-tight">L.P Roofing</span>
              <span className="block text-sm font-semibold text-white/68">Walsall roofing contractor</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-black lg:flex">
            <a href="#services" className="transition hover:text-amber-200">Services</a>
            <a href="#gallery" className="transition hover:text-amber-200">Visuals</a>
            <a href="#proof" className="transition hover:text-amber-200">Reviews</a>
            <a href="#contact" className="transition hover:text-amber-200">Contact</a>
          </nav>
          <a href={facebookUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-xl bg-amber-200 px-4 py-3 text-sm font-black text-[#16201c] shadow-[0_16px_48px_rgba(251,191,36,0.22)] transition hover:bg-white sm:px-5">
            <FacebookIcon />
            <span className="hidden sm:inline">Facebook</span>
          </a>
        </div>
      </header>

      <section id="top" className="relative flex min-h-screen items-center overflow-hidden bg-[#16201c] px-4 pb-14 pt-28 text-white sm:px-8 lg:pt-24">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image src={assets("hero-roof-atmosphere.png")} alt="Atmospheric slate roof and stone property scene" fill sizes="100vw" priority className="object-cover opacity-78" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,32,28,0.98)_0%,rgba(22,32,28,0.80)_45%,rgba(22,32,28,0.34)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_45%,rgba(251,191,36,0.20),transparent_34%)]" />
        </motion.div>
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[0.96fr_0.84fr] xl:gap-12">
          <Reveal>
            <div className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-amber-200/28 bg-amber-200/12 px-4 py-2 text-sm font-black text-amber-100">
              <ShieldCheck size={18} /> Roofing across Walsall
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.02] sm:text-6xl lg:text-[4.55rem] xl:text-[4.85rem]">
              Roofing contractor in Walsall for new roofs, re-roofs and dry systems.
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-white/76 sm:text-xl">
              L.P Roofing is listed on Facebook for new roofs, re-roofs, dry systems and maintenance, with customer reviews highlighting reliable work, communication and tidy finishes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={mailHref} className="inline-flex min-h-14 items-center gap-2 rounded-xl bg-amber-200 px-6 py-4 text-base font-black text-[#16201c] shadow-[0_22px_80px_rgba(251,191,36,0.24)] transition hover:bg-white">
                <Mail size={20} /> Send enquiry
              </a>
              <a href="#gallery" className="inline-flex min-h-14 items-center gap-2 rounded-xl border border-white/18 bg-white/10 px-6 py-4 text-base font-black text-white backdrop-blur-xl transition hover:bg-white hover:text-[#16201c]">
                <ArrowUpRight size={20} /> See services
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form className="w-full max-w-xl rounded-2xl border border-white/16 bg-white/[0.10] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.44)] backdrop-blur-2xl sm:p-6 lg:justify-self-end" onSubmit={(event) => event.preventDefault()}>
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase text-amber-100">Roof enquiry</p>
                  <h2 className="mt-2 text-3xl font-black leading-tight text-white">Ask L.P Roofing for a quote.</h2>
                </div>
                <Wrench className="shrink-0 text-amber-200" size={34} />
              </div>
              <div className="grid gap-3">
                <input value={name} onChange={(event) => setName(event.target.value)} className="min-h-13 rounded-xl border border-white/12 bg-white/92 px-4 text-base font-semibold text-[#16201c] outline-none ring-amber-300 transition focus:ring-4" placeholder="Name" />
                <input value={contact} onChange={(event) => setContact(event.target.value)} className="min-h-13 rounded-xl border border-white/12 bg-white/92 px-4 text-base font-semibold text-[#16201c] outline-none ring-amber-300 transition focus:ring-4" placeholder="Phone or email" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <select value={service} onChange={(event) => setService(event.target.value)} className="min-h-13 rounded-xl border border-white/12 bg-white/92 px-4 text-base font-semibold text-[#16201c] outline-none ring-amber-300 transition focus:ring-4">
                    <option>New roof / re-roof</option>
                    <option>Re-roof</option>
                    <option>Dry ridge / dry verge</option>
                    <option>Roof maintenance</option>
                    <option>Leak / roof check</option>
                    <option>General roofing enquiry</option>
                  </select>
                  <input value={postcode} onChange={(event) => setPostcode(event.target.value)} className="min-h-13 rounded-xl border border-white/12 bg-white/92 px-4 text-base font-semibold text-[#16201c] outline-none ring-amber-300 transition focus:ring-4" placeholder="Area / postcode" />
                </div>
                <textarea value={details} onChange={(event) => setDetails(event.target.value)} className="min-h-28 rounded-xl border border-white/12 bg-white/92 px-4 py-3 text-base font-semibold leading-7 text-[#16201c] outline-none ring-amber-300 transition focus:ring-4" placeholder="What needs looking at? Roof type, leak, damage, age, access, timing..." />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
                <Button asChild className="min-h-14 rounded-xl bg-amber-200 text-base font-black text-[#16201c] hover:bg-white">
                  <a href={mailHref}><Mail size={20} /> Send enquiry</a>
                </Button>
                <a href={facebookUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-white/16 px-5 text-base font-black text-white transition hover:bg-white hover:text-[#16201c]">
                  <FacebookIcon /> Facebook
                </a>
              </div>
              <p className="mt-4 text-sm font-semibold leading-6 text-white/62">The form prepares a clear roof brief from your details. You can also check the Facebook profile below.</p>
            </form>
          </Reveal>
        </div>
      </section>

      <section id="services" className="bg-[#f6f2ea] px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="mb-3 text-sm font-black uppercase text-amber-700">Roofing services</p>
            <h2 className="text-4xl font-black leading-none sm:text-6xl">Practical roof work, from first quote to aftercare.</h2>
          </Reveal>
          <div className="services-grid mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((item) => (
              <article key={item.title} className="service-card rounded-2xl border border-[#16201c]/10 bg-white p-6 shadow-[0_18px_60px_rgba(22,32,28,0.08)]">
                <item.icon className="mb-7 text-amber-700" size={34} />
                <h3 className="text-2xl font-black leading-tight">{item.title}</h3>
                <p className="mt-4 text-base font-medium leading-7 text-[#53605a]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="gallery-stage overflow-hidden bg-[#16201c] py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <Reveal>
            <p className="mb-3 text-sm font-black uppercase text-amber-200">Roofing service cues</p>
            <h2 className="max-w-4xl text-4xl font-black leading-none sm:text-6xl">New roofs, dry systems and maintenance made easy to enquire about.</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/68">
              Quick visual cues for the types of roof enquiries L.P Roofing handles around Walsall.
            </p>
          </Reveal>
        </div>
        <div className="gallery-track mx-auto mt-12 grid w-full max-w-7xl grid-cols-1 gap-4 px-4 sm:px-8 md:flex md:w-max md:max-w-none md:gap-6">
          {gallery.map((item) => {
            const sizeClass =
              item.shape === "portrait"
                ? "md:h-[620px] md:w-[430px]"
                : item.shape === "small"
                  ? "md:h-[520px] md:w-[560px]"
                  : "md:h-[620px] md:w-[760px]";
            return (
              <motion.figure key={item.src} className={`relative h-[72vh] max-h-[640px] min-h-[430px] w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:min-h-[540px] ${sizeClass}`} whileHover={{ y: -10, scale: 1.012 }}>
                <Image src={assets(item.src)} alt={item.alt} fill sizes="(min-width: 768px) 760px, 100vw" loading="eager" className="object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/68 to-transparent p-5">
                  <span className="block text-xl font-black">{item.title}</span>
                  <span className="mt-1 block text-sm font-bold text-white/64">Roofing service</span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </section>

      <section id="proof" className="proof-section bg-white px-4 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1fr]">
          <Reveal>
            <p className="mb-3 text-sm font-black uppercase text-amber-700">Why call</p>
            <h2 className="text-4xl font-black leading-none sm:text-6xl">What helps homeowners choose the right roofer.</h2>
            <div className="proof-line mt-8 h-1 w-full origin-left scale-x-0 rounded-full bg-amber-400" />
          </Reveal>
          <div className="grid gap-4">
            {proofPoints.map((point) => (
              <Reveal key={point}>
                <div className="flex gap-4 rounded-2xl border border-[#16201c]/10 bg-[#f6f2ea] p-5">
                  <BadgeCheck className="mt-1 shrink-0 text-amber-700" size={24} />
                  <p className="text-base font-bold leading-7 text-[#3d4742]">{point}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-16 grid max-w-7xl gap-4 lg:grid-cols-3">
          {testimonials.map((item) => (
            <Reveal key={item.name}>
              <article className="h-full rounded-2xl border border-[#16201c]/10 bg-[#16201c] p-6 text-white shadow-[0_18px_60px_rgba(22,32,28,0.14)]">
                <div className="mb-5 flex gap-1 text-amber-300" aria-label="5 star review">
                  {[0, 1, 2, 3, 4].map((star) => <Star key={star} size={18} fill="currentColor" />)}
                </div>
                <p className="text-base font-semibold leading-8 text-white/82">"{item.quote}"</p>
                <p className="mt-6 text-lg font-black">{item.name}</p>
                <p className="mt-1 text-sm font-bold text-white/52">{item.source}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[#101714] px-4 py-24 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.86fr]">
          <Reveal>
            <p className="mb-3 text-sm font-black uppercase text-amber-200">Common questions</p>
            <h2 className="text-4xl font-black leading-none sm:text-6xl">Before you ask for a roofing quote.</h2>
          </Reveal>
          <div className="grid gap-3">
            {faqs.map(([q, a]) => <FAQItem key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#f6f2ea] px-4 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl border border-[#16201c]/10 bg-white shadow-[0_24px_90px_rgba(22,32,28,0.12)] lg:grid-cols-[0.88fr_1.12fr]">
          <div className="p-6 sm:p-9 lg:p-12">
            <p className="mb-3 text-sm font-black uppercase text-amber-700">Contact</p>
            <h2 className="text-4xl font-black leading-none sm:text-5xl">Send a roofing enquiry for Walsall roof work.</h2>
            <div className="mt-8 grid gap-4">
              <a href={mailHref} className="flex items-center gap-4 rounded-xl bg-[#16201c] p-4 text-white transition hover:bg-[#2d3a33]"><Mail className="text-amber-200" /> <span className="font-black">Send email enquiry</span></a>
              <a href={facebookUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-xl bg-[#f6f2ea] p-4 transition hover:bg-amber-100"><FacebookIcon /> <span className="font-black">L.P Roofing on Facebook</span></a>
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-xl bg-[#f6f2ea] p-4 transition hover:bg-amber-100"><MapPin className="text-amber-700" /> <span className="font-black">Walsall service area</span></a>
            </div>
            <p className="mt-7 flex items-center gap-2 text-base font-bold text-[#53605a]"><Clock3 size={20} /> New roofs, re-roofs, dry systems and maintenance enquiries.</p>
          </div>
          <iframe title="L.P Roofing Walsall service area map" src={mapEmbedUrl} width="100%" height="520" loading="lazy" className="h-[420px] w-full border-0 lg:h-full" />
        </div>
      </section>

      <footer className="bg-[#16201c] px-4 py-10 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xl font-black">L.P Roofing</p>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-white/58">{legalName}. New roofs, re-roofs, dry systems and maintenance enquiries around Walsall.</p>
          </div>
          <div className="flex gap-3">
            <a href={mailHref} aria-label="Email L.P Roofing enquiry" className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/12 bg-white/10 text-white transition hover:bg-white hover:text-[#16201c]"><Mail size={20} /></a>
            <a href={facebookUrl} target="_blank" rel="noreferrer" aria-label="L.P Roofing on Facebook" className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/12 bg-white/10 text-white transition hover:bg-white hover:text-[#16201c]"><FacebookIcon /></a>
            <a href={mapsUrl} target="_blank" rel="noreferrer" aria-label="Search L.P Roofing in Walsall on Google Maps" className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/12 bg-white/10 text-white transition hover:bg-white hover:text-[#16201c]"><MapPin size={20} /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}

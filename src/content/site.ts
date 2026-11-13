import type { SocialIconName } from "@/components/ui/icons";

export const CONTACT_HREF = "#start";

/**
 * Phone number for the header's call button on phones, in international
 * format, e.g. "+441234567890". Until it's set, the button jumps to the
 * contact section instead of calling.
 */
export const CONTACT_PHONE = "";

export type CarCutout = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Holds back while the other cars drive on ahead. */
  hold?: boolean;
};

/**
 * The cars that drive up through the Ordinary / Ends Here scene, left to
 * right: top-down transparent cut-outs, facing up, trimmed to the car so they
 * line up at the same scale. Width/height are the files' pixel sizes.
 */
const blackCar: CarCutout = { src: "/images/cars/black-top.webp", width: 804, height: 1500, alt: "" };
export const ordinaryCars: CarCutout[] = [
  blackCar,
  { src: "/images/cars/red-top.webp", width: 726, height: 1539, alt: "", hold: true },
  blackCar,
];

export const socialLinks: { name: string; href: string; icon: SocialIconName }[] = [
  { name: "LinkedIn", href: "#", icon: "linkedin" },
  { name: "Instagram", href: "#", icon: "instagram" },
  { name: "Facebook", href: "#", icon: "facebook" },
];

/** The menu's main links (large): every section on the page, in order. */
export const menuLinks = [
  { label: "Home", href: "#top" },
  { label: "Approach", href: "#approach" },
  { label: "Philosophy", href: "#identity" },
  { label: "Services", href: "#services" },
  { label: "Builds", href: "#builds" },
  { label: "Stock", href: "#stock" },
  { label: "Contact", href: CONTACT_HREF },
];

/** "Developed by devKey" link in the footer. Set the URL when you have it. */
export const DEVELOPER = { name: "devKey", href: "#" };

/** Small links under the menu. No pages exist for these yet. */
export const menuLegalLinks = [
  { label: "Legal", href: "#" },
  { label: "Cookie settings", href: "#" },
];

export type Marque = { name: string; logo: string };

/** Logos are transparent PNGs, rendered white in the UI. */
export const marques: Marque[] = [
  { name: "Cadillac", logo: "/images/marques/cadillac.png" },
  { name: "Chevrolet", logo: "/images/marques/chevrolet.png" },
  { name: "Volkswagen", logo: "/images/marques/volkswagen.png" },
  { name: "Genesis", logo: "/images/marques/genesis.png" },
  { name: "Audi", logo: "/images/marques/audi.png" },
  { name: "Maserati", logo: "/images/marques/maserati.png" },
  { name: "McLaren", logo: "/images/marques/mclaren.png" },
  { name: "Jaguar", logo: "/images/marques/jaguar.png" },
];

export type Pillar = {
  id: string;
  index: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  objectPosition?: string;
  /** Backdrop gradient behind the blurred photo. */
  gradient: string;
};

export const pillars: Pillar[] = [
  {
    id: "identity",
    index: "01",
    title: "Identity",
    body: "Every build begins with the person behind the wheel, shaped around their individual taste, lifestyle, presence and personal sense of identity on the road.",
    image: "/images/pillar-identity.jpg",
    alt: "Porsche crest close-up",
    gradient: "linear-gradient(180deg,#4A4744 0%,#3A3836 60%,#2A2826 100%)",
  },
  {
    id: "insight",
    index: "02",
    title: "Insight",
    body: "Exterior, interior and performance are brought together through a considered, detail-led approach, creating one complete and fully resolved vision.",
    image: "/images/pillar-insight-interior.jpg",
    alt: "White leather Porsche interior seen from above, black steering wheel",
    objectPosition: "50% 15%", // steering wheel in frame
    gradient: "linear-gradient(180deg,#3B3936 0%,#262523 60%,#151413 100%)",
  },
  {
    id: "cohesion",
    index: "03",
    title: "Cohesion",
    body: "Every modification is chosen with precision, ensuring each detail adds purpose, balance and distinction to the final bespoke automotive build.",
    image: "/images/pillar-cohesion-rear.jpg",
    alt: "Rear of a white Porsche concept car at an unveiling, light bar glowing",
    objectPosition: "50% 85%", // the car's rear in frame
    gradient: "linear-gradient(180deg,#222120 0%,#121111 60%,#0A0A0A 100%)",
  },
];

export type Service = {
  id: string;
  title: string;
  body: string;
  image: string;
  alt: string;
};

export const services: Service[] = [
  {
    id: "bodystyling",
    title: "Bodystyling",
    body: "From aero styling to carbon details and exterior refinement, bodywork is designed to change the vehicle’s presence without compromising its original character.",
    image: "/images/service-bodystyling.jpg",
    alt: "Porsche rear with light bar",
  },
  {
    id: "interior",
    title: "Interior",
    body: "Material, stitching, trim and finish are selected to create an interior that feels personal, tactile and composed. We turn the cabin into a space of identity, comfort and control.",
    image: "/images/service-interior.jpg",
    alt: "Interior seat stitching",
  },
  {
    id: "wheels",
    title: "Wheels",
    body: "Bespoke wheel upgrades designed to enhance stance, proportion and road presence, with fitments selected to complement the vehicle’s character and performance.",
    image: "/images/service-wheels.jpg",
    alt: "Porsche wheel with red caliper",
  },
  {
    id: "lighting",
    title: "Lighting",
    body: "Lighting gives a vehicle its expression. From subtle tinting to signature illumination and refined visual details, we use light to sharpen character, presence and atmosphere.",
    image: "/images/service-lighting.jpg",
    alt: "Porsche headlight close-up",
  },
  {
    id: "exhaust",
    title: "Exhaust",
    body: "Exhaust upgrades are chosen for tone, response and presence. Not noise for the sake of noise, but a sound profile that gives the vehicle more character and depth.",
    image: "/images/service-exhaust.jpg",
    alt: "Porsche twin exhaust tips",
  },
  {
    id: "protection",
    title: "Protection",
    body: "Paint protective film solutions that preserve the finish of the vehicle while allowing for satin finishes, coloured films and full visual transformation.",
    image: "/images/service-protection.jpg",
    alt: "Water beading on red paint",
  },
];

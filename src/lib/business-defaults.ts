import {
  Scissors, UtensilsCrossed, Dumbbell, Wrench, Sparkles, Smile,
  Leaf, Home, Coffee, Briefcase, Droplets, LucideIcon
} from "lucide-react";

export type BusinessType =
  | "barber_shop"
  | "hair_salon"
  | "restaurant"
  | "cafe"
  | "auto_repair"
  | "gym"
  | "cleaning_service"
  | "dental_office"
  | "landscaping"
  | "real_estate"
  | "general_service";

export interface ServiceItem {
  name: string;
  description: string;
}

export interface BusinessDefaults {
  icon: LucideIcon;
  label: string;
  tagline: string;
  aboutTemplate: string;
  primaryColor: string;
  accentColor: string;
  heroImage: string;
  services: ServiceItem[];
  socialPlatforms: string[];
  stats: { value: string; label: string }[];
}

export const BUSINESS_DEFAULTS: Record<BusinessType, BusinessDefaults> = {
  barber_shop: {
    icon: Scissors,
    label: "Barber Shop",
    tagline: "Sharp Cuts. Clean Fades. Every Time.",
    aboutTemplate:
      "{name} has been the go-to barbershop in {city} for quality cuts and classic grooming. Walk-ins welcome — appointments available online.",
    primaryColor: "#1a1a2e",
    accentColor: "#e94560",
    heroImage:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1600&q=80&fit=crop",
    services: [
      { name: "Haircuts & Fades", description: "Precision cuts, skin fades, and tapers for any style." },
      { name: "Beard Trims & Shaves", description: "Classic straight razor shaves and beard shaping." },
      { name: "Kids Cuts", description: "Friendly, patient service for our youngest customers." },
      { name: "Hot Towel Service", description: "Old-school hot towel treatment for the full experience." },
    ],
    socialPlatforms: ["facebook", "instagram", "google", "yelp"],
    stats: [
      { value: "5★", label: "Google Rating" },
      { value: "Walk-ins", label: "Always Welcome" },
      { value: "Same-Day", label: "Appointments" },
    ],
  },

  hair_salon: {
    icon: Sparkles,
    label: "Hair Salon",
    tagline: "Where Beauty Meets Confidence.",
    aboutTemplate:
      "{name} is {city}'s premier destination for hair color, cuts, and styling. Our experienced stylists bring your vision to life.",
    primaryColor: "#6b21a8",
    accentColor: "#d946ef",
    heroImage:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80&fit=crop",
    services: [
      { name: "Haircuts & Styling", description: "Precision cuts and blowouts for every occasion." },
      { name: "Color Services", description: "Full color, highlights, balayage, and corrective color." },
      { name: "Treatments", description: "Deep conditioning, keratin, and scalp treatments." },
      { name: "Bridal & Events", description: "Special occasion updos and styling packages." },
    ],
    socialPlatforms: ["facebook", "instagram", "google", "yelp"],
    stats: [
      { value: "5★", label: "Google Rating" },
      { value: "500+", label: "Happy Clients" },
      { value: "Book Online", label: "Easy Scheduling" },
    ],
  },

  restaurant: {
    icon: UtensilsCrossed,
    label: "Restaurant",
    tagline: "Great Food. Great Company. Every Visit.",
    aboutTemplate:
      "Welcome to {name}, where {city} comes to eat. Fresh ingredients, bold flavors, and a dining experience worth coming back for.",
    primaryColor: "#7f1d1d",
    accentColor: "#f97316",
    heroImage:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80&fit=crop",
    services: [
      { name: "Dine-In", description: "Full table service in a comfortable, welcoming atmosphere." },
      { name: "Takeout & Delivery", description: "Your favorite dishes, ready when you are." },
      { name: "Catering", description: "Private events, office lunches, and large group dining." },
      { name: "Happy Hour", description: "Daily specials on drinks and small plates." },
    ],
    socialPlatforms: ["facebook", "instagram", "google", "yelp"],
    stats: [
      { value: "5★", label: "Google Rating" },
      { value: "Open Daily", label: "Lunch & Dinner" },
      { value: "Reserve", label: "Your Table" },
    ],
  },

  cafe: {
    icon: Coffee,
    label: "Café",
    tagline: "Your Daily Cup, Done Right.",
    aboutTemplate:
      "{name} is {city}'s neighborhood café — the kind of place where you know everyone's order and everyone knows your name.",
    primaryColor: "#44260b",
    accentColor: "#d97706",
    heroImage:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&q=80&fit=crop",
    services: [
      { name: "Espresso & Coffee", description: "Single origin beans, expertly pulled shots." },
      { name: "Teas & Specialty Drinks", description: "Matcha, chai, seasonal lattes, and cold brews." },
      { name: "Pastries & Food", description: "Fresh-baked goods and light bites daily." },
      { name: "Work-Friendly Space", description: "Fast WiFi, plenty of outlets, quiet atmosphere." },
    ],
    socialPlatforms: ["facebook", "instagram", "google", "yelp"],
    stats: [
      { value: "5★", label: "Google Rating" },
      { value: "Open 7am", label: "Every Day" },
      { value: "Free WiFi", label: "Work Here" },
    ],
  },

  auto_repair: {
    icon: Wrench,
    label: "Auto Repair",
    tagline: "Honest Repairs. Fair Prices. Done Right.",
    aboutTemplate:
      "{name} has been keeping {city} vehicles running since day one. ASE-certified technicians, transparent pricing, no surprises.",
    primaryColor: "#1e3a5f",
    accentColor: "#f59e0b",
    heroImage:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1600&q=80&fit=crop",
    services: [
      { name: "Oil Changes & Tune-Ups", description: "Fast, affordable maintenance to keep you on the road." },
      { name: "Brakes & Tires", description: "Inspection, repair, and replacement of all brake systems." },
      { name: "Engine & Transmission", description: "Diagnostics and full repair on all makes and models." },
      { name: "AC & Electrical", description: "Climate control service and electrical diagnostics." },
    ],
    socialPlatforms: ["facebook", "google", "yelp"],
    stats: [
      { value: "ASE", label: "Certified Tech" },
      { value: "Same-Day", label: "Most Repairs" },
      { value: "Free", label: "Estimates" },
    ],
  },

  gym: {
    icon: Dumbbell,
    label: "Gym & Fitness",
    tagline: "Train Hard. Live Strong.",
    aboutTemplate:
      "{name} is {city}'s most results-driven fitness center. State-of-the-art equipment, expert coaching, and a community that pushes you forward.",
    primaryColor: "#0f172a",
    accentColor: "#10b981",
    heroImage:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80&fit=crop",
    services: [
      { name: "Open Gym Access", description: "Full floor of free weights, machines, and cardio equipment." },
      { name: "Personal Training", description: "One-on-one sessions with certified coaches." },
      { name: "Group Classes", description: "HIIT, yoga, spin, kickboxing, and more." },
      { name: "Nutrition Coaching", description: "Custom meal plans and supplement guidance." },
    ],
    socialPlatforms: ["facebook", "instagram", "google", "yelp"],
    stats: [
      { value: "24/7", label: "Member Access" },
      { value: "No", label: "Contracts" },
      { value: "Free", label: "First Class" },
    ],
  },

  cleaning_service: {
    icon: Droplets,
    label: "Cleaning Service",
    tagline: "Spotless Every Time. Guaranteed.",
    aboutTemplate:
      "{name} provides professional home and office cleaning to {city} residents. Bonded, insured, and trusted by hundreds of local families.",
    primaryColor: "#0c4a6e",
    accentColor: "#06b6d4",
    heroImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80&fit=crop",
    services: [
      { name: "Residential Cleaning", description: "Regular and deep cleaning for homes of all sizes." },
      { name: "Move-In / Move-Out", description: "Thorough cleaning for rentals and new homeowners." },
      { name: "Office Cleaning", description: "Daily, weekly, or monthly commercial cleaning plans." },
      { name: "Post-Construction", description: "Dust, debris, and detail cleaning after renovations." },
    ],
    socialPlatforms: ["facebook", "google", "yelp"],
    stats: [
      { value: "Insured", label: "& Bonded" },
      { value: "100%", label: "Satisfaction" },
      { value: "Eco", label: "Products" },
    ],
  },

  dental_office: {
    icon: Smile,
    label: "Dental Office",
    tagline: "Healthy Smiles Start Here.",
    aboutTemplate:
      "{name} provides comprehensive dental care to families across {city}. From routine checkups to cosmetic dentistry — we make every visit comfortable.",
    primaryColor: "#164e63",
    accentColor: "#22d3ee",
    heroImage:
      "https://images.unsplash.com/photo-1629909615957-be38d48fbbe4?w=1600&q=80&fit=crop",
    services: [
      { name: "Cleanings & Exams", description: "Routine checkups and professional cleanings." },
      { name: "Teeth Whitening", description: "In-office and take-home whitening treatments." },
      { name: "Fillings & Crowns", description: "Tooth-colored restorations that look and feel natural." },
      { name: "Orthodontics", description: "Braces and clear aligner options for all ages." },
    ],
    socialPlatforms: ["facebook", "google", "yelp"],
    stats: [
      { value: "New", label: "Patients Welcome" },
      { value: "Same-Day", label: "Emergency Slots" },
      { value: "Financing", label: "Available" },
    ],
  },

  landscaping: {
    icon: Leaf,
    label: "Landscaping",
    tagline: "Your Yard, Our Pride.",
    aboutTemplate:
      "{name} transforms outdoor spaces across {city}. From weekly lawn care to full landscape design — we make your property the best on the block.",
    primaryColor: "#14532d",
    accentColor: "#4ade80",
    heroImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd58e?w=1600&q=80&fit=crop",
    services: [
      { name: "Lawn Mowing & Edging", description: "Weekly or bi-weekly maintenance packages." },
      { name: "Mulching & Planting", description: "Seasonal color, shrubs, and flower bed installation." },
      { name: "Tree & Shrub Trimming", description: "Shape, health pruning, and dead branch removal." },
      { name: "Irrigation & Drainage", description: "Sprinkler installation, repair, and drainage solutions." },
    ],
    socialPlatforms: ["facebook", "google", "yelp"],
    stats: [
      { value: "Free", label: "Estimates" },
      { value: "Licensed", label: "& Insured" },
      { value: "Year-Round", label: "Service" },
    ],
  },

  real_estate: {
    icon: Home,
    label: "Real Estate",
    tagline: "Find Your Place. Love Where You Live.",
    aboutTemplate:
      "{name} helps buyers and sellers navigate the {city} real estate market with confidence. Local expertise, personal attention, proven results.",
    primaryColor: "#1e293b",
    accentColor: "#3b82f6",
    heroImage:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&q=80&fit=crop",
    services: [
      { name: "Buyer Representation", description: "Find the right home at the right price." },
      { name: "Seller Services", description: "Strategic pricing, staging, and marketing to sell fast." },
      { name: "Investment Properties", description: "Identify cash-flow opportunities in the local market." },
      { name: "Rental Management", description: "Full-service property management for landlords." },
    ],
    socialPlatforms: ["facebook", "instagram", "google"],
    stats: [
      { value: "50+", label: "Homes Sold" },
      { value: "Local", label: "Market Expert" },
      { value: "Free", label: "Consultation" },
    ],
  },

  general_service: {
    icon: Briefcase,
    label: "Local Business",
    tagline: "Professional Service You Can Count On.",
    aboutTemplate:
      "{name} has been serving the {city} community with quality, reliability, and a commitment to doing the job right.",
    primaryColor: "#1f2937",
    accentColor: "#6366f1",
    heroImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&fit=crop",
    services: [
      { name: "Consultation", description: "Free initial consultation to understand your needs." },
      { name: "Custom Services", description: "Solutions tailored to your specific situation." },
      { name: "Ongoing Support", description: "Reliable follow-through and responsive communication." },
      { name: "Emergency Service", description: "Available when you need us most." },
    ],
    socialPlatforms: ["facebook", "instagram", "google"],
    stats: [
      { value: "5★", label: "Google Rating" },
      { value: "Local", label: "& Trusted" },
      { value: "Free", label: "Estimates" },
    ],
  },
};

export function generateAbout(template: string, businessName: string, city: string): string {
  return template.replace(/{name}/g, businessName).replace(/{city}/g, city);
}

export function extractCity(address: string): string {
  const parts = address.split(",").map((p) => p.trim());
  return parts.length >= 2 ? parts[parts.length - 2] : parts[0] || "your area";
}

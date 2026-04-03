import {
  Scissors, UtensilsCrossed, Dumbbell, Wrench, Sparkles, Smile,
  Leaf, Home, Coffee, Briefcase, Droplets, LucideIcon,
  Zap, Flame, PawPrint, Flower2, Camera, Scale, Calculator,
  ShieldCheck, Bug, Paintbrush, Hammer, Shirt, Pill, Stethoscope,
  Heart, Truck, Dog
} from "lucide-react";

export type BusinessType =
  | "barber_shop"
  | "hair_salon"
  | "nail_salon"
  | "spa"
  | "restaurant"
  | "cafe"
  | "auto_repair"
  | "car_wash"
  | "gym"
  | "cleaning_service"
  | "dental_office"
  | "landscaping"
  | "real_estate"
  | "contractor"
  | "plumber"
  | "electrician"
  | "hvac"
  | "roofing"
  | "painting"
  | "pest_control"
  | "pet_groomer"
  | "veterinarian"
  | "photographer"
  | "florist"
  | "lawyer"
  | "accountant"
  | "insurance"
  | "dry_cleaner"
  | "pharmacy"
  | "tattoo_shop"
  | "moving_company"
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

  nail_salon: {
    icon: Sparkles,
    label: "Nail Salon",
    tagline: "Pamper Your Hands. Perfect Every Detail.",
    aboutTemplate:
      "{name} is {city}'s favorite spot for nails, pedicures, and self-care. Walk in stressed, walk out polished.",
    primaryColor: "#831843",
    accentColor: "#f472b6",
    heroImage:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1600&q=80&fit=crop",
    services: [
      { name: "Manicures", description: "Classic, gel, and dip powder manicures." },
      { name: "Pedicures", description: "Relaxing pedicures with massage and hot towels." },
      { name: "Nail Art & Extensions", description: "Custom designs, acrylics, and gel extensions." },
      { name: "Waxing & Lashes", description: "Brow waxing, lash lifts, and lash extensions." },
    ],
    socialPlatforms: ["facebook", "instagram", "google", "yelp"],
    stats: [
      { value: "5★", label: "Google Rating" },
      { value: "Walk-ins", label: "Welcome" },
      { value: "Book Online", label: "Easy Scheduling" },
    ],
  },

  spa: {
    icon: Heart,
    label: "Spa & Wellness",
    tagline: "Relax. Restore. Renew.",
    aboutTemplate:
      "{name} offers {city}'s finest spa experience. Massages, facials, and body treatments designed to melt away stress.",
    primaryColor: "#4a1942",
    accentColor: "#c084fc",
    heroImage:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80&fit=crop",
    services: [
      { name: "Massage Therapy", description: "Swedish, deep tissue, hot stone, and couples massage." },
      { name: "Facials", description: "Customized facials for every skin type and concern." },
      { name: "Body Treatments", description: "Wraps, scrubs, and detox treatments." },
      { name: "Spa Packages", description: "All-day pampering bundles for the full experience." },
    ],
    socialPlatforms: ["facebook", "instagram", "google", "yelp"],
    stats: [
      { value: "5★", label: "Google Rating" },
      { value: "Couples", label: "Packages" },
      { value: "Gift Cards", label: "Available" },
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
    label: "Cafe",
    tagline: "Your Daily Cup, Done Right.",
    aboutTemplate:
      "{name} is {city}'s neighborhood cafe — the kind of place where you know everyone's order and everyone knows your name.",
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

  car_wash: {
    icon: Droplets,
    label: "Car Wash",
    tagline: "Drive Clean. Shine Bright. Every Time.",
    aboutTemplate:
      "{name} keeps {city} vehicles looking their best. From express washes to full detail — drive in dirty, drive out sparkling.",
    primaryColor: "#0a2540",
    accentColor: "#00b4d8",
    heroImage:
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=1600&q=80&fit=crop",
    services: [
      { name: "Express Wash", description: "Quick exterior wash — in and out in minutes." },
      { name: "Full Service Wash", description: "Inside and out. Vacuum, wipe-down, and hand dry." },
      { name: "Premium Detail", description: "Deep clean, wax, tire shine, and interior shampoo." },
      { name: "Unlimited Wash Plans", description: "Monthly memberships for unlimited washes." },
    ],
    socialPlatforms: ["facebook", "instagram", "google", "yelp"],
    stats: [
      { value: "5min", label: "Express Wash" },
      { value: "Eco", label: "Friendly" },
      { value: "Open", label: "7 Days" },
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
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80&fit=crop",
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

  contractor: {
    icon: Hammer,
    label: "General Contractor",
    tagline: "Built Right. Built to Last.",
    aboutTemplate:
      "{name} is {city}'s trusted general contractor for renovations, additions, and new construction. Licensed, insured, and committed to quality craftsmanship.",
    primaryColor: "#292524",
    accentColor: "#ea580c",
    heroImage:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80&fit=crop",
    services: [
      { name: "Home Renovations", description: "Kitchens, bathrooms, basements, and whole-home remodels." },
      { name: "Additions & Extensions", description: "Extra rooms, sunrooms, and second-story additions." },
      { name: "Decks & Patios", description: "Custom outdoor living spaces built to last." },
      { name: "New Construction", description: "Ground-up builds with full project management." },
    ],
    socialPlatforms: ["facebook", "google", "yelp"],
    stats: [
      { value: "Licensed", label: "& Insured" },
      { value: "Free", label: "Estimates" },
      { value: "25+", label: "Years Experience" },
    ],
  },

  plumber: {
    icon: Wrench,
    label: "Plumber",
    tagline: "Fast Fixes. Fair Prices. No Leaks.",
    aboutTemplate:
      "{name} provides reliable plumbing services across {city}. From emergency repairs to full installations — we get the job done right the first time.",
    primaryColor: "#1e3a5f",
    accentColor: "#3b82f6",
    heroImage:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1600&q=80&fit=crop",
    services: [
      { name: "Emergency Repairs", description: "24/7 emergency plumbing when you need it most." },
      { name: "Drain Cleaning", description: "Clogged drains cleared fast with professional equipment." },
      { name: "Water Heaters", description: "Tank and tankless installation, repair, and replacement." },
      { name: "Pipe & Fixture Work", description: "Repiping, leak repair, and fixture installation." },
    ],
    socialPlatforms: ["facebook", "google", "yelp"],
    stats: [
      { value: "24/7", label: "Emergency" },
      { value: "Licensed", label: "& Insured" },
      { value: "Free", label: "Estimates" },
    ],
  },

  electrician: {
    icon: Zap,
    label: "Electrician",
    tagline: "Safe Wiring. Bright Solutions.",
    aboutTemplate:
      "{name} provides licensed electrical services to homes and businesses in {city}. Safety-first approach, clean work, and code-compliant installations.",
    primaryColor: "#1a1a2e",
    accentColor: "#facc15",
    heroImage:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1600&q=80&fit=crop",
    services: [
      { name: "Panel Upgrades", description: "Electrical panel replacement and capacity upgrades." },
      { name: "Wiring & Rewiring", description: "New construction wiring and old home rewiring." },
      { name: "Lighting Installation", description: "Recessed lighting, fixtures, and landscape lighting." },
      { name: "Outlets & Switches", description: "GFCI outlets, USB outlets, and smart switches." },
    ],
    socialPlatforms: ["facebook", "google", "yelp"],
    stats: [
      { value: "Licensed", label: "Master Electrician" },
      { value: "Same-Day", label: "Service" },
      { value: "Free", label: "Estimates" },
    ],
  },

  hvac: {
    icon: Flame,
    label: "HVAC",
    tagline: "Stay Comfortable. Year-Round.",
    aboutTemplate:
      "{name} keeps {city} homes and businesses comfortable all year. Expert heating, cooling, and air quality solutions with fast response times.",
    primaryColor: "#1e293b",
    accentColor: "#ef4444",
    heroImage:
      "https://images.unsplash.com/photo-1631545806609-09ef0f48f3a0?w=1600&q=80&fit=crop",
    services: [
      { name: "AC Repair & Install", description: "Central air, mini-splits, and ductless systems." },
      { name: "Heating Repair & Install", description: "Furnaces, heat pumps, and boiler systems." },
      { name: "Maintenance Plans", description: "Seasonal tune-ups to prevent breakdowns and save money." },
      { name: "Air Quality", description: "Duct cleaning, filtration, and humidity control." },
    ],
    socialPlatforms: ["facebook", "google", "yelp"],
    stats: [
      { value: "24/7", label: "Emergency" },
      { value: "Licensed", label: "& Insured" },
      { value: "Financing", label: "Available" },
    ],
  },

  roofing: {
    icon: Home,
    label: "Roofing",
    tagline: "Strong Roofs. Solid Protection.",
    aboutTemplate:
      "{name} is {city}'s trusted roofing contractor. From storm damage repairs to full replacements — we protect what matters most.",
    primaryColor: "#422006",
    accentColor: "#d97706",
    heroImage:
      "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=1600&q=80&fit=crop",
    services: [
      { name: "Roof Replacement", description: "Full tear-off and installation with top-grade materials." },
      { name: "Roof Repair", description: "Leak repair, shingle replacement, and storm damage." },
      { name: "Inspections", description: "Free roof inspections and insurance claim assistance." },
      { name: "Gutters & Siding", description: "Seamless gutters, siding, and exterior trim." },
    ],
    socialPlatforms: ["facebook", "google", "yelp"],
    stats: [
      { value: "Free", label: "Inspections" },
      { value: "Licensed", label: "& Insured" },
      { value: "Warranty", label: "Included" },
    ],
  },

  painting: {
    icon: Paintbrush,
    label: "Painting",
    tagline: "Fresh Color. Clean Lines. Every Room.",
    aboutTemplate:
      "{name} delivers professional painting services across {city}. Interior, exterior, and commercial — we transform spaces with precision and care.",
    primaryColor: "#312e81",
    accentColor: "#818cf8",
    heroImage:
      "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=1600&q=80&fit=crop",
    services: [
      { name: "Interior Painting", description: "Walls, ceilings, trim, and accent walls." },
      { name: "Exterior Painting", description: "Siding, decks, fences, and weather protection." },
      { name: "Cabinet Refinishing", description: "Kitchen and bathroom cabinet painting and staining." },
      { name: "Commercial Painting", description: "Office, retail, and multi-unit painting projects." },
    ],
    socialPlatforms: ["facebook", "google", "yelp"],
    stats: [
      { value: "Free", label: "Color Consult" },
      { value: "Licensed", label: "& Insured" },
      { value: "Eco", label: "Low-VOC Paint" },
    ],
  },

  pest_control: {
    icon: Bug,
    label: "Pest Control",
    tagline: "Your Home. Pest-Free. Guaranteed.",
    aboutTemplate:
      "{name} protects {city} homes and businesses from unwanted pests. Safe, effective treatments with a satisfaction guarantee.",
    primaryColor: "#1a2e05",
    accentColor: "#84cc16",
    heroImage:
      "https://images.unsplash.com/photo-1632236295711-5b4c78f9ec62?w=1600&q=80&fit=crop",
    services: [
      { name: "General Pest Control", description: "Ants, roaches, spiders, and common household pests." },
      { name: "Termite Treatment", description: "Inspection, treatment, and prevention plans." },
      { name: "Rodent Control", description: "Mice and rat removal with exclusion sealing." },
      { name: "Mosquito & Tick", description: "Yard treatments for outdoor pest reduction." },
    ],
    socialPlatforms: ["facebook", "google", "yelp"],
    stats: [
      { value: "Free", label: "Inspections" },
      { value: "Same-Day", label: "Service" },
      { value: "Guaranteed", label: "Results" },
    ],
  },

  pet_groomer: {
    icon: Dog,
    label: "Pet Grooming",
    tagline: "Happy Pets. Happy Owners.",
    aboutTemplate:
      "{name} provides gentle, professional grooming for dogs and cats in {city}. Your pet leaves clean, styled, and tail-wagging happy.",
    primaryColor: "#4a2c2a",
    accentColor: "#f97316",
    heroImage:
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1600&q=80&fit=crop",
    services: [
      { name: "Full Grooming", description: "Bath, haircut, nail trim, ear cleaning, and blow dry." },
      { name: "Bath & Brush", description: "Shampoo, conditioner, brush-out, and nail trim." },
      { name: "Puppy's First Groom", description: "Gentle introduction to grooming for puppies." },
      { name: "Add-On Treatments", description: "Teeth brushing, flea treatment, and de-shedding." },
    ],
    socialPlatforms: ["facebook", "instagram", "google", "yelp"],
    stats: [
      { value: "5★", label: "Google Rating" },
      { value: "All Breeds", label: "Welcome" },
      { value: "Book Online", label: "Easy Scheduling" },
    ],
  },

  veterinarian: {
    icon: Stethoscope,
    label: "Veterinarian",
    tagline: "Compassionate Care for Every Pet.",
    aboutTemplate:
      "{name} provides comprehensive veterinary care for dogs, cats, and small animals in {city}. Your pet's health is our priority.",
    primaryColor: "#134e4a",
    accentColor: "#2dd4bf",
    heroImage:
      "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=1600&q=80&fit=crop",
    services: [
      { name: "Wellness Exams", description: "Annual checkups, vaccinations, and preventive care." },
      { name: "Surgery", description: "Spay/neuter, soft tissue, and orthopedic procedures." },
      { name: "Dental Care", description: "Professional cleanings, extractions, and oral health." },
      { name: "Emergency Care", description: "Urgent care for sick or injured pets." },
    ],
    socialPlatforms: ["facebook", "google", "yelp"],
    stats: [
      { value: "New", label: "Patients Welcome" },
      { value: "Emergency", label: "Walk-ins OK" },
      { value: "All Pets", label: "Dogs, Cats & More" },
    ],
  },

  photographer: {
    icon: Camera,
    label: "Photographer",
    tagline: "Moments Captured. Memories Made.",
    aboutTemplate:
      "{name} is a professional photographer serving {city} and surrounding areas. Weddings, portraits, events — every shot tells your story.",
    primaryColor: "#18181b",
    accentColor: "#a78bfa",
    heroImage:
      "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1600&q=80&fit=crop",
    services: [
      { name: "Wedding Photography", description: "Full-day coverage, engagement sessions, and albums." },
      { name: "Portrait Sessions", description: "Family, senior, headshot, and maternity photography." },
      { name: "Event Photography", description: "Corporate events, parties, and milestone celebrations." },
      { name: "Commercial & Product", description: "Brand photography, product shots, and content creation." },
    ],
    socialPlatforms: ["facebook", "instagram", "google"],
    stats: [
      { value: "500+", label: "Sessions Shot" },
      { value: "48hr", label: "Sneak Peeks" },
      { value: "Book Now", label: "Limited Dates" },
    ],
  },

  florist: {
    icon: Flower2,
    label: "Florist",
    tagline: "Fresh Blooms. Beautiful Arrangements.",
    aboutTemplate:
      "{name} creates stunning floral arrangements for every occasion in {city}. Weddings, events, and everyday bouquets delivered with care.",
    primaryColor: "#4c1d95",
    accentColor: "#e879f9",
    heroImage:
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1600&q=80&fit=crop",
    services: [
      { name: "Custom Arrangements", description: "Hand-crafted bouquets for any occasion." },
      { name: "Wedding Flowers", description: "Bridal bouquets, centerpieces, and ceremony decor." },
      { name: "Event Florals", description: "Corporate events, galas, and celebration displays." },
      { name: "Delivery", description: "Same-day and scheduled delivery throughout the area." },
    ],
    socialPlatforms: ["facebook", "instagram", "google", "yelp"],
    stats: [
      { value: "Same-Day", label: "Delivery" },
      { value: "Fresh", label: "Daily Blooms" },
      { value: "Custom", label: "Orders Welcome" },
    ],
  },

  lawyer: {
    icon: Scale,
    label: "Law Firm",
    tagline: "Strong Advocacy. Trusted Counsel.",
    aboutTemplate:
      "{name} provides experienced legal representation to clients in {city}. We fight for your rights with integrity and dedication.",
    primaryColor: "#1e293b",
    accentColor: "#64748b",
    heroImage:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80&fit=crop",
    services: [
      { name: "Personal Injury", description: "Car accidents, slip and fall, and wrongful death claims." },
      { name: "Family Law", description: "Divorce, custody, child support, and adoption." },
      { name: "Criminal Defense", description: "Misdemeanors, felonies, DUI, and traffic offenses." },
      { name: "Business Law", description: "Contracts, formation, disputes, and compliance." },
    ],
    socialPlatforms: ["facebook", "google"],
    stats: [
      { value: "Free", label: "Consultation" },
      { value: "No Fee", label: "Unless We Win" },
      { value: "24/7", label: "Available" },
    ],
  },

  accountant: {
    icon: Calculator,
    label: "Accountant",
    tagline: "Your Numbers. Our Expertise.",
    aboutTemplate:
      "{name} provides professional accounting and tax services to individuals and businesses in {city}. Accurate, timely, and always looking out for your bottom line.",
    primaryColor: "#1e3a5f",
    accentColor: "#059669",
    heroImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80&fit=crop",
    services: [
      { name: "Tax Preparation", description: "Individual and business tax filing with maximum deductions." },
      { name: "Bookkeeping", description: "Monthly bookkeeping and financial statement preparation." },
      { name: "Payroll Services", description: "Payroll processing, tax deposits, and W-2 preparation." },
      { name: "Business Advisory", description: "Financial planning, entity selection, and growth strategy." },
    ],
    socialPlatforms: ["facebook", "google"],
    stats: [
      { value: "CPA", label: "Certified" },
      { value: "Free", label: "Consultation" },
      { value: "Year-Round", label: "Service" },
    ],
  },

  insurance: {
    icon: ShieldCheck,
    label: "Insurance",
    tagline: "Coverage You Can Count On.",
    aboutTemplate:
      "{name} helps {city} families and businesses find the right insurance coverage. Independent agency — we shop multiple carriers to get you the best rate.",
    primaryColor: "#1e3a5f",
    accentColor: "#2563eb",
    heroImage:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80&fit=crop",
    services: [
      { name: "Auto Insurance", description: "Car, truck, and motorcycle coverage at competitive rates." },
      { name: "Home Insurance", description: "Homeowner, renter, and condo insurance policies." },
      { name: "Business Insurance", description: "General liability, workers comp, and commercial property." },
      { name: "Life Insurance", description: "Term, whole life, and retirement planning." },
    ],
    socialPlatforms: ["facebook", "google"],
    stats: [
      { value: "Free", label: "Quotes" },
      { value: "Multiple", label: "Carriers" },
      { value: "Local", label: "Agent" },
    ],
  },

  dry_cleaner: {
    icon: Shirt,
    label: "Dry Cleaner",
    tagline: "Fresh. Pressed. Ready When You Are.",
    aboutTemplate:
      "{name} provides professional dry cleaning and laundry services in {city}. Expert stain removal, quality pressing, and convenient pickup and delivery.",
    primaryColor: "#1e3a5f",
    accentColor: "#06b6d4",
    heroImage:
      "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=1600&q=80&fit=crop",
    services: [
      { name: "Dry Cleaning", description: "Professional cleaning for suits, dresses, and delicates." },
      { name: "Wash & Fold", description: "Drop off your laundry — pick it up clean and folded." },
      { name: "Alterations", description: "Hemming, tailoring, and garment repairs." },
      { name: "Pickup & Delivery", description: "Free pickup and delivery to your home or office." },
    ],
    socialPlatforms: ["facebook", "google", "yelp"],
    stats: [
      { value: "Same-Day", label: "Service" },
      { value: "Free", label: "Pickup" },
      { value: "Eco", label: "Cleaning" },
    ],
  },

  pharmacy: {
    icon: Pill,
    label: "Pharmacy",
    tagline: "Your Health. Our Priority.",
    aboutTemplate:
      "{name} is {city}'s trusted neighborhood pharmacy. Personalized service, fast prescriptions, and a pharmacist who knows your name.",
    primaryColor: "#14532d",
    accentColor: "#22c55e",
    heroImage:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1600&q=80&fit=crop",
    services: [
      { name: "Prescriptions", description: "Fast, accurate prescription filling and transfers." },
      { name: "Immunizations", description: "Flu shots, COVID, shingles, and travel vaccines." },
      { name: "Compounding", description: "Custom medications tailored to your needs." },
      { name: "Health Screenings", description: "Blood pressure, glucose, and cholesterol checks." },
    ],
    socialPlatforms: ["facebook", "google"],
    stats: [
      { value: "Fast", label: "Refills" },
      { value: "Free", label: "Delivery" },
      { value: "Walk-in", label: "Vaccines" },
    ],
  },

  tattoo_shop: {
    icon: Paintbrush,
    label: "Tattoo Shop",
    tagline: "Your Story. Your Skin. Our Art.",
    aboutTemplate:
      "{name} is {city}'s premier tattoo studio. Custom designs, experienced artists, and a clean, professional environment for your next piece.",
    primaryColor: "#18181b",
    accentColor: "#dc2626",
    heroImage:
      "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1600&q=80&fit=crop",
    services: [
      { name: "Custom Tattoos", description: "Original designs drawn specifically for you." },
      { name: "Cover-Ups", description: "Transform old tattoos into new artwork." },
      { name: "Piercings", description: "Professional piercings with sterile, high-quality jewelry." },
      { name: "Touch-Ups", description: "Color refresh and line touch-ups on existing work." },
    ],
    socialPlatforms: ["facebook", "instagram", "google"],
    stats: [
      { value: "Custom", label: "Designs Only" },
      { value: "Sterile", label: "Environment" },
      { value: "Book Now", label: "Consultations" },
    ],
  },

  moving_company: {
    icon: Truck,
    label: "Moving Company",
    tagline: "Your Move. Done Right.",
    aboutTemplate:
      "{name} makes moving in {city} stress-free. Local and long-distance moves handled with care — your belongings are safe with us.",
    primaryColor: "#1e293b",
    accentColor: "#f59e0b",
    heroImage:
      "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1600&q=80&fit=crop",
    services: [
      { name: "Local Moving", description: "Same-city moves with careful handling and fast service." },
      { name: "Long-Distance Moving", description: "Interstate moves with tracking and insurance coverage." },
      { name: "Packing Services", description: "Full packing, unpacking, and supplies included." },
      { name: "Storage", description: "Short and long-term climate-controlled storage units." },
    ],
    socialPlatforms: ["facebook", "google", "yelp"],
    stats: [
      { value: "Free", label: "Estimates" },
      { value: "Licensed", label: "& Insured" },
      { value: "Same-Day", label: "Available" },
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

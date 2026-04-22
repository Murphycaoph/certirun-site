type SupportGroup = {
  title: string;
  items: string[];
};

export type BrowserPlatform = {
  id: string;
  name: string;
  family?: string;
  image: string;
  imageAlt: string;
  imageStyle?: string;
  supportGroups: SupportGroup[];
  detailTitle?: string;
  whatsappLabel?: string;
};

export type BrowserAssembly = {
  id: string;
  label: string;
  platforms: BrowserPlatform[];
};

type RelatedPath = {
  title: string;
  desc: string;
  href: string;
};

type FaqItem = {
  q: string;
  a: string;
};

type CardItem = {
  title: string;
  desc: string;
};

export type BrandPageConfig = {
  brand: string;
  eyebrow: string;
  heroTitle: string;
  heroLead: string;
  whatsappHref: string;
  browserId: string;
  browserEyebrow: string;
  browserTitle: string;
  browserFallbackText: string;
  matchingInputs: string[];
  painPoints: CardItem[];
  processSteps: CardItem[];
  whyWorkWithUs: CardItem[];
  faq: FaqItem[];
  relatedPaths: RelatedPath[];
  assemblies: BrowserAssembly[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  canonical: string;
  ogImage: string;
  jsonLd: object[];
  robots?: string;
};

const matchingInputs = [
  "OE number or part number",
  "VIN or truck model",
  "Part photos",
  "Part names and quantities",
  "Destination country or port",
  "Packing or label requirements if relevant",
];

const painPoints = [
  {
    title: "Same part name, different fitment",
    desc: "A broad part name is often not enough. Without OE number, VIN, or clear truck details, different suppliers may quote different items for the same request.",
  },
  {
    title: "Lowest price does not mean the right part",
    desc: "Some suppliers quote fast and cheap, but the part scope, quality level, or packing may not match what you actually need.",
  },
  {
    title: "Mixed orders become hard to compare",
    desc: "When brake parts, air system parts, and other items are quoted separately, it becomes harder to compare suppliers and plan one shipment.",
  },
];

const processSteps = [
  {
    title: "You send the inquiry",
    desc: "Share OE numbers, VIN, photos, part list, quantities, and destination details.",
  },
  {
    title: "We check the matching scope",
    desc: "We review the references first so the inquiry is clear before quotation starts.",
  },
  {
    title: "We compare workable suppliers",
    desc: "We compare quotes based on part scope, execution, and order practicality, not price alone.",
  },
  {
    title: "We move into inspection and shipping follow-up",
    desc: "After order confirmation, we continue with QC points, packing checks, documents, and shipment coordination.",
  },
];

const scopeImages = {
  brakeHeavy: "/images/platform-library/brake/fallback/Brake heavy truck 1.png",
  brakeLight: "/images/platform-library/brake/fallback/Brake light truck 1.png",
  suspensionHeavy: "/images/platform-library/suspension/fallback/Suspension heavy truck 2.png",
  suspensionLight: "/images/platform-library/suspension/fallback/Suspension light truck 1.png",
  axleHeavy: "/images/platform-library/axle/fallback/Axle heavy truck 2.png",
  axleLight: "/images/platform-library/axle/fallback/Axle light truck 1.jpg",
  airPrimary: "/images/platform-library/air-system/air-candidate-2.jpg",
  airSecondary: "/images/platform-library/air-system/air-candidate-1.jpg",
} as const;

const airImageStyleA = "transform: rotate(90deg) scale(1.18); transform-origin: center center;";
const airImageStyleB = "transform: rotate(90deg) scale(1.22); transform-origin: center center;";

const makeWhyWorkWithUs = (brand: string): CardItem[] => [
  {
    title: "We start from real inquiry details",
    desc: "We work from OE numbers, VIN, photos, and usable references instead of pushing buyers into a generic catalog.",
  },
  {
    title: "We compare suppliers on execution, not only price",
    desc: "Quotation is only one part. Matching accuracy, packing, QC, and shipment follow-up matter for repeat orders.",
  },
  {
    title: "We support mixed orders",
    desc: `Many ${brand} inquiries include different systems or items. We help organize them into one workable sourcing and shipment plan.`,
  },
];

const makeFaq = (brand: string): FaqItem[] => [
  {
    q: "Can you help if I don't have the OE number?",
    a: "Yes. You can start with VIN, truck model, photos, old supplier references, or a part list.",
  },
  {
    q: `Can you handle mixed ${brand} orders?`,
    a: "Yes. We can support inquiries covering multiple part systems and organize them into one order.",
  },
  {
    q: "Do you support inspection and shipment follow-up?",
    a: "Yes. We support supplier comparison, QC checkpoints, packing checks, and shipment coordination.",
  },
];

const makeJsonLd = (brand: string, url: string, description: string) => [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${brand} Platform Inquiry`,
    description,
    url,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://certirun.com/" },
      { "@type": "ListItem", position: 2, name: "Product", item: "https://certirun.com/product/" },
      { "@type": "ListItem", position: 3, name: brand, item: `https://certirun.com${url}` },
    ],
  },
];

const enginePlatform = (
  id: string,
  name: string,
  family: string,
  image: string,
  imageAlt: string,
): BrowserPlatform => ({
  id,
  name,
  family,
  image,
  imageAlt,
  detailTitle: `Supported parts for ${name}`,
  supportGroups: [
    { title: "Maintenance support", items: ["Filter service parts", "Belt items", "Routine seal parts"] },
    { title: "Repair support", items: ["Gasket sets", "Pump-related parts", "Sensor replacement items"] },
    { title: "Matching references", items: ["Engine model", "Vehicle code", "OE number", "Photo check"] },
  ],
});

const gearboxPlatform = (
  id: string,
  name: string,
  family: string,
  image: string,
  imageAlt: string,
): BrowserPlatform => ({
  id,
  name,
  family,
  image,
  imageAlt,
  supportGroups: [
    { title: "Maintenance support", items: ["Oil service items", "Routine seals", "Shift-related wear parts"] },
    { title: "Repair support", items: ["Bearing support", "Synchronizer-related parts", "Gasket bundles"] },
    { title: "Matching references", items: ["Gearbox model", "Truck platform", "OE number", "Photos"] },
  ],
});

const scopePlatform = (
  id: string,
  name: string,
  family: string,
  image: string,
  imageAlt: string,
  primaryItems: string[],
  secondaryItems: string[],
  referenceItems: string[],
  imageStyle?: string,
): BrowserPlatform => ({
  id,
  name,
  family,
  image,
  imageAlt,
  imageStyle,
  detailTitle: `Supported parts for ${name}`,
  supportGroups: [
    { title: "Common support scope", items: primaryItems },
    { title: "Related support", items: secondaryItems },
    { title: "Matching references", items: referenceItems },
  ],
});

const makeWhatsappHref = (brand: string) =>
  `https://wa.me/8615633022618?text=${encodeURIComponent(
    `Hello CertiRun, I want to discuss ${brand} platform matching.`,
  )}`;

const makeCommonConfig = (
  brand: string,
  heroTitle: string,
  heroLead: string,
  canonical: string,
  ogImage: string,
  relatedPaths: RelatedPath[],
  assemblies: BrowserAssembly[],
  eyebrow = "CertiRun / Brand Sourcing",
): BrandPageConfig => {
  const seoDescription = `Send your ${brand} parts inquiry with OE numbers, VIN, photos, or part names. CertiRun helps narrow the right platform, check matching scope, compare suppliers, and move your inquiry into quotation support.`;

  return {
    brand,
    eyebrow,
    heroTitle,
    heroLead,
    whatsappHref: makeWhatsappHref(brand),
    browserId: `${brand.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-platform-browser`,
    browserEyebrow: `${brand} platform browser`,
    browserTitle: `Browse ${brand} platforms and parts support`,
    browserFallbackText:
      "Not all supported parts are listed here. If you have a specific request, just reach out and we'll check it for you.",
    matchingInputs,
    painPoints,
    processSteps,
    whyWorkWithUs: makeWhyWorkWithUs(brand),
    faq: makeFaq(brand),
    relatedPaths,
    assemblies,
    seoTitle: `Send Your ${brand} Parts Inquiry | Platform Matching Support`,
    seoDescription,
    seoKeywords: [
      `${brand} parts sourcing from China`,
      `${brand} truck parts RFQ`,
      `${brand} parts supplier China`,
      `${brand} platform matching`,
      `OE number ${brand} parts`,
    ],
    canonical,
    ogImage,
    jsonLd: makeJsonLd(brand, canonical, seoDescription),
  };
};

const sinotrukAssemblies: BrowserAssembly[] = [
  {
    id: "engine",
    label: "Engine",
    platforms: [
      enginePlatform(
        "mc11-44-50",
        "MC11.44-50",
        "HOWO TX | heavy truck",
        "/images/platform-library/engine/sinotruk/Engine Sinotruk MC11.44-50.jpg",
        "Sinotruk MC11.44-50 engine",
      ),
      enginePlatform(
        "wp2-5nq180e62",
        "WP2.5NQ180E62",
        "HOWO Commander | light truck",
        "/images/platform-library/engine/weichai/Engine Weichai WP2.5NQ180E62 family.jpg",
        "Weichai WP2.5NQ180E62 engine",
      ),
    ],
  },
  {
    id: "gearbox",
    label: "Gearbox & transmission",
    platforms: [
      gearboxPlatform(
        "hw19712c",
        "HW19712C",
        "HOWO TX | heavy truck",
        "/images/platform-library/gearbox/fallback/Gearbox heavy truck 1.webp",
        "Heavy truck gearbox",
      ),
      gearboxPlatform(
        "fast-8j55ta",
        "FAST 8J55TA",
        "HOWO Commander | light truck",
        "/images/platform-library/gearbox/fallback/Gearbox light truck 1.png",
        "Light truck gearbox",
      ),
    ],
  },
  {
    id: "brake",
    label: "Brake system",
    platforms: [
      scopePlatform(
        "howo-tx-brake",
        "HOWO TX brake system",
        "Heavy truck support scope",
        scopeImages.brakeHeavy,
        "Heavy truck brake system",
        ["Brake chambers", "Brake valves", "Brake linings", "Brake drums"],
        ["Slack adjuster items", "Hardware kits", "Service wear parts"],
        ["Truck family", "OE number", "Dimensions", "Photos"],
      ),
      scopePlatform(
        "howo-commander-brake",
        "HOWO Commander brake system",
        "Light truck support scope",
        scopeImages.brakeLight,
        "Light truck brake system",
        ["Brake service items", "Pads or linings", "Chamber-related parts", "Valve support"],
        ["Hardware kits", "Wear parts", "Actuation parts"],
        ["Truck model", "OE number", "Photos", "Old sample"],
      ),
    ],
  },
  {
    id: "suspension",
    label: "Suspension",
    platforms: [
      scopePlatform(
        "howo-tx-suspension",
        "HOWO TX suspension support",
        "Heavy truck support scope",
        scopeImages.suspensionHeavy,
        "Heavy truck suspension system",
        ["Leaf spring parts", "Torque rod items", "Stabilizer-linked parts", "Mounting hardware"],
        ["Bushings", "Pins", "Chassis wear parts"],
        ["Truck family", "OE number", "Dimension check", "Photos"],
      ),
      scopePlatform(
        "howo-commander-suspension",
        "HOWO Commander suspension support",
        "Light truck support scope",
        scopeImages.suspensionLight,
        "Light truck suspension system",
        ["Spring support items", "Rod-related parts", "Mounting wear parts", "Bushing-linked support"],
        ["Rubber items", "Pins and sleeves", "Hardware kits"],
        ["Truck model", "Vehicle code", "OE number", "Part photos"],
      ),
    ],
  },
  {
    id: "axle",
    label: "Axle, steering & wheel-end",
    platforms: [
      scopePlatform(
        "howo-tx-axle",
        "HOWO TX axle and wheel-end",
        "Heavy truck support scope",
        scopeImages.axleHeavy,
        "Heavy truck axle platform",
        ["Hub support", "Bearing support", "Seal and washer items", "Steering-linked parts"],
        ["Wheel-end service items", "Axle repair support", "Hardware kits"],
        ["Truck family", "OE number", "Old sample", "Photos"],
      ),
      scopePlatform(
        "howo-commander-axle",
        "HOWO Commander axle and steering",
        "Light truck support scope",
        scopeImages.axleLight,
        "Light truck axle platform",
        ["Wheel-end wear parts", "Steering support items", "Seal and bearing parts", "Repair hardware"],
        ["Axle repair parts", "Hub-related service items", "Mounting hardware"],
        ["Truck model", "Application photo", "OE number", "Sample check"],
      ),
    ],
  },
  {
    id: "air-system",
    label: "Air system",
    platforms: [
      scopePlatform(
        "howo-tx-air",
        "HOWO TX air system support",
        "Heavy truck support scope",
        scopeImages.airPrimary,
        "Air system parts support",
        ["Air valves", "Brake chamber items", "Actuation parts", "Air dryer support"],
        ["Push rods", "Clevis items", "Repair diaphragms", "Fittings"],
        ["Truck family", "OE number", "Valve spec", "Photos"],
        airImageStyleA,
      ),
      scopePlatform(
        "howo-commander-air",
        "HOWO Commander air support",
        "Light truck support scope",
        scopeImages.airSecondary,
        "Light truck air support",
        ["Valve-related items", "Actuation support", "Fittings", "Air-side service parts"],
        ["Repair kits", "Wear parts", "Mixed replenishment support"],
        ["Truck model", "Part photos", "OE number", "Usage note"],
        airImageStyleB,
      ),
    ],
  },
];

const fotonAssemblies: BrowserAssembly[] = [
  {
    id: "engine",
    label: "Engine",
    platforms: [
      enginePlatform(
        "isf3-8s5168",
        "ISF3.8s5168",
        "Aumark | light truck",
        "/images/platform-library/engine/cummins/Engine Cummins ISF3.8.png",
        "Cummins ISF3.8 engine",
      ),
      enginePlatform(
        "x13ns5-560",
        "X13NS5-560",
        "Auman | heavy truck",
        "/images/platform-library/engine/fallback/Engine heavy truck 1.jpg",
        "Heavy truck engine",
      ),
    ],
  },
  {
    id: "gearbox",
    label: "Gearbox & transmission",
    platforms: [
      gearboxPlatform(
        "zf-ecolite-6s600",
        "ZF EcoLite 6S600",
        "Aumark | light truck",
        "/images/platform-library/gearbox/zf/Gearbox ZF Ecolite light truck.png",
        "ZF light truck gearbox",
      ),
      gearboxPlatform(
        "zf-12tx2621td",
        "ZF 12TX2621TD",
        "Auman | heavy truck",
        "/images/platform-library/gearbox/zf/Gearbox ZF TraXon.webp",
        "ZF TraXon gearbox",
      ),
    ],
  },
  {
    id: "brake",
    label: "Brake system",
    platforms: [
      scopePlatform(
        "aumark-brake",
        "Aumark brake system",
        "Light truck support scope",
        scopeImages.brakeLight,
        "Light truck brake system",
        ["Brake service items", "Brake chambers", "Linings and pads", "Valve support"],
        ["Hardware kits", "Actuation parts", "Wear items"],
        ["Truck model", "OE number", "Photos", "Old sample"],
      ),
      scopePlatform(
        "auman-brake",
        "Auman brake system",
        "Heavy truck support scope",
        scopeImages.brakeHeavy,
        "Heavy truck brake system",
        ["Brake chambers", "Brake valves", "Brake linings", "Brake drums"],
        ["Slack adjuster items", "Hardware kits", "Service wear parts"],
        ["Truck family", "OE number", "Dimensions", "Photos"],
      ),
    ],
  },
  {
    id: "suspension",
    label: "Suspension",
    platforms: [
      scopePlatform(
        "aumark-suspension",
        "Aumark suspension support",
        "Light truck support scope",
        scopeImages.suspensionLight,
        "Light truck suspension system",
        ["Spring support items", "Rod-related parts", "Mounting wear parts", "Bushing-linked support"],
        ["Rubber items", "Pins and sleeves", "Hardware kits"],
        ["Truck model", "Vehicle code", "OE number", "Part photos"],
      ),
      scopePlatform(
        "auman-suspension",
        "Auman suspension support",
        "Heavy truck support scope",
        scopeImages.suspensionHeavy,
        "Heavy truck suspension system",
        ["Leaf spring parts", "Torque rod items", "Stabilizer-linked parts", "Mounting hardware"],
        ["Bushings", "Pins", "Chassis wear parts"],
        ["Truck family", "OE number", "Dimension check", "Photos"],
      ),
    ],
  },
  {
    id: "axle",
    label: "Axle, steering & wheel-end",
    platforms: [
      scopePlatform(
        "aumark-axle",
        "Aumark axle and steering",
        "Light truck support scope",
        scopeImages.axleLight,
        "Light truck axle platform",
        ["Wheel-end wear parts", "Steering support items", "Seal and bearing parts", "Repair hardware"],
        ["Axle repair parts", "Hub-related service items", "Mounting hardware"],
        ["Truck model", "Application photo", "OE number", "Sample check"],
      ),
      scopePlatform(
        "auman-axle",
        "Auman axle and wheel-end",
        "Heavy truck support scope",
        scopeImages.axleHeavy,
        "Heavy truck axle platform",
        ["Hub support", "Bearing support", "Seal and washer items", "Steering-linked parts"],
        ["Wheel-end service items", "Axle repair support", "Hardware kits"],
        ["Truck family", "OE number", "Old sample", "Photos"],
      ),
    ],
  },
  {
    id: "air-system",
    label: "Air system",
    platforms: [
      scopePlatform(
        "aumark-air",
        "Aumark air system support",
        "Light truck support scope",
        scopeImages.airSecondary,
        "Light truck air support",
        ["Valve-related items", "Actuation support", "Fittings", "Air-side service parts"],
        ["Repair kits", "Wear parts", "Mixed replenishment support"],
        ["Truck model", "Part photos", "OE number", "Usage note"],
        airImageStyleB,
      ),
      scopePlatform(
        "auman-air",
        "Auman air system support",
        "Heavy truck support scope",
        scopeImages.airPrimary,
        "Air system parts support",
        ["Air valves", "Brake chamber items", "Actuation parts", "Air dryer support"],
        ["Push rods", "Clevis items", "Repair diaphragms", "Fittings"],
        ["Truck family", "OE number", "Valve spec", "Photos"],
        airImageStyleA,
      ),
    ],
  },
];

const jacAssemblies: BrowserAssembly[] = [
  {
    id: "engine",
    label: "Engine",
    platforms: [
      enginePlatform(
        "hfc4da1-2d",
        "HFC4DA1-2D",
        "Shuailing H330 | light truck",
        "/images/platform-library/engine/fallback/Engine light truck 2.png",
        "Light truck engine",
      ),
      enginePlatform(
        "yck05240-60",
        "YCK05240-60",
        "Geerfa A5L | medium truck",
        "/images/platform-library/engine/yuchai/Engine Yuchai YCK11-60 product.png",
        "Yuchai engine",
      ),
    ],
  },
  {
    id: "gearbox",
    label: "Gearbox & transmission",
    platforms: [
      gearboxPlatform(
        "liuan-lc6t540b",
        "Liuan LC6T540B",
        "Junling V7 | light truck",
        "/images/platform-library/gearbox/fallback/Gearbox light truck 2.png",
        "Light truck gearbox",
      ),
      gearboxPlatform(
        "fast-8mt",
        "FAST 8MT",
        "Geerfa A5L | medium truck",
        "/images/platform-library/gearbox/fallback/Gearbox medium truck 1.png",
        "Medium truck gearbox",
      ),
    ],
  },
  {
    id: "brake",
    label: "Brake system",
    platforms: [
      scopePlatform(
        "shuailing-brake",
        "Shuailing brake system",
        "Light truck support scope",
        scopeImages.brakeLight,
        "Light truck brake system",
        ["Brake service items", "Chamber-related parts", "Valve support", "Pads or linings"],
        ["Hardware kits", "Wear parts", "Actuation parts"],
        ["Truck model", "OE number", "Photos", "Old sample"],
      ),
      scopePlatform(
        "geerfa-brake",
        "Geerfa brake system",
        "Medium truck support scope",
        scopeImages.brakeHeavy,
        "Heavy truck brake system",
        ["Brake chambers", "Brake valves", "Brake linings", "Brake drums"],
        ["Slack adjuster items", "Hardware kits", "Service wear parts"],
        ["Truck family", "OE number", "Dimensions", "Photos"],
      ),
    ],
  },
  {
    id: "suspension",
    label: "Suspension",
    platforms: [
      scopePlatform(
        "shuailing-suspension",
        "Shuailing suspension support",
        "Light truck support scope",
        scopeImages.suspensionLight,
        "Light truck suspension system",
        ["Spring support items", "Rod-related parts", "Mounting wear parts", "Bushing-linked support"],
        ["Rubber items", "Pins and sleeves", "Hardware kits"],
        ["Truck model", "Vehicle code", "OE number", "Part photos"],
      ),
      scopePlatform(
        "geerfa-suspension",
        "Geerfa suspension support",
        "Medium truck support scope",
        scopeImages.suspensionHeavy,
        "Heavy truck suspension system",
        ["Leaf spring parts", "Torque rod items", "Stabilizer-linked parts", "Mounting hardware"],
        ["Bushings", "Pins", "Chassis wear parts"],
        ["Truck family", "OE number", "Dimension check", "Photos"],
      ),
    ],
  },
  {
    id: "axle",
    label: "Axle, steering & wheel-end",
    platforms: [
      scopePlatform(
        "shuailing-axle",
        "Shuailing axle and steering",
        "Light truck support scope",
        scopeImages.axleLight,
        "Light truck axle platform",
        ["Wheel-end wear parts", "Steering support items", "Seal and bearing parts", "Repair hardware"],
        ["Axle repair parts", "Hub-related service items", "Mounting hardware"],
        ["Truck model", "Application photo", "OE number", "Sample check"],
      ),
      scopePlatform(
        "geerfa-axle",
        "Geerfa axle and wheel-end",
        "Medium truck support scope",
        scopeImages.axleHeavy,
        "Heavy truck axle platform",
        ["Hub support", "Bearing support", "Seal and washer items", "Steering-linked parts"],
        ["Wheel-end service items", "Axle repair support", "Hardware kits"],
        ["Truck family", "OE number", "Old sample", "Photos"],
      ),
    ],
  },
  {
    id: "air-system",
    label: "Air system",
    platforms: [
      scopePlatform(
        "shuailing-air",
        "Shuailing air system support",
        "Light truck support scope",
        scopeImages.airSecondary,
        "Light truck air support",
        ["Valve-related items", "Actuation support", "Fittings", "Air-side service parts"],
        ["Repair kits", "Wear parts", "Mixed replenishment support"],
        ["Truck model", "Part photos", "OE number", "Usage note"],
        airImageStyleB,
      ),
      scopePlatform(
        "geerfa-air",
        "Geerfa air system support",
        "Medium truck support scope",
        scopeImages.airPrimary,
        "Air system parts support",
        ["Air valves", "Brake chamber items", "Actuation parts", "Air dryer support"],
        ["Push rods", "Clevis items", "Repair diaphragms", "Fittings"],
        ["Truck family", "OE number", "Valve spec", "Photos"],
        airImageStyleA,
      ),
    ],
  },
];

const dongfengAssemblies: BrowserAssembly[] = [
  {
    id: "engine",
    label: "Engine",
    platforms: [
      enginePlatform(
        "ycy24155-61",
        "YCY24155-61",
        "Dolica D6 | light truck",
        "/images/platform-library/engine/yuchai/Engine Yuchai YCY24155-61.png",
        "Yuchai engine",
      ),
      enginePlatform(
        "yc4f115-50",
        "YC4F115-50",
        "Captain T Series | light truck",
        "/images/platform-library/engine/yuchai/Engine Yuchai YC4F115-50.png",
        "Yuchai engine",
      ),
    ],
  },
  {
    id: "gearbox",
    label: "Gearbox & transmission",
    platforms: [
      gearboxPlatform(
        "fast-8j45t",
        "FAST 8J45T",
        "Dolica D6 | light truck",
        "/images/platform-library/gearbox/fallback/Gearbox light truck 1.png",
        "Light truck gearbox",
      ),
      gearboxPlatform(
        "6j45t",
        "6J45T",
        "Captain T Series | light truck",
        "/images/platform-library/gearbox/fallback/Gearbox light truck 2.png",
        "Light truck gearbox",
      ),
    ],
  },
  {
    id: "brake",
    label: "Brake system",
    platforms: [
      scopePlatform(
        "dolica-brake",
        "Dolica D6 brake system",
        "Light truck support scope",
        scopeImages.brakeLight,
        "Light truck brake system",
        ["Brake service items", "Brake chambers", "Valve support", "Linings or pads"],
        ["Hardware kits", "Wear parts", "Actuation parts"],
        ["Truck model", "OE number", "Photos", "Old sample"],
      ),
      scopePlatform(
        "captain-brake",
        "Captain T brake system",
        "Light truck support scope",
        scopeImages.brakeHeavy,
        "Brake system support",
        ["Brake chambers", "Brake valves", "Brake linings", "Brake drums"],
        ["Slack adjuster items", "Hardware kits", "Service wear parts"],
        ["Truck family", "OE number", "Dimensions", "Photos"],
      ),
    ],
  },
  {
    id: "suspension",
    label: "Suspension",
    platforms: [
      scopePlatform(
        "dolica-suspension",
        "Dolica D6 suspension support",
        "Light truck support scope",
        scopeImages.suspensionLight,
        "Light truck suspension system",
        ["Spring support items", "Rod-related parts", "Mounting wear parts", "Bushing-linked support"],
        ["Rubber items", "Pins and sleeves", "Hardware kits"],
        ["Truck model", "Vehicle code", "OE number", "Part photos"],
      ),
      scopePlatform(
        "captain-suspension",
        "Captain T suspension support",
        "Light truck support scope",
        scopeImages.suspensionHeavy,
        "Suspension support",
        ["Leaf spring parts", "Torque rod items", "Stabilizer-linked parts", "Mounting hardware"],
        ["Bushings", "Pins", "Chassis wear parts"],
        ["Truck family", "OE number", "Dimension check", "Photos"],
      ),
    ],
  },
  {
    id: "axle",
    label: "Axle, steering & wheel-end",
    platforms: [
      scopePlatform(
        "dolica-axle",
        "Dolica D6 axle and steering",
        "Light truck support scope",
        scopeImages.axleLight,
        "Light truck axle platform",
        ["Wheel-end wear parts", "Steering support items", "Seal and bearing parts", "Repair hardware"],
        ["Axle repair parts", "Hub-related service items", "Mounting hardware"],
        ["Truck model", "Application photo", "OE number", "Sample check"],
      ),
      scopePlatform(
        "captain-axle",
        "Captain T axle and wheel-end",
        "Light truck support scope",
        scopeImages.axleHeavy,
        "Axle support",
        ["Hub support", "Bearing support", "Seal and washer items", "Steering-linked parts"],
        ["Wheel-end service items", "Axle repair support", "Hardware kits"],
        ["Truck family", "OE number", "Old sample", "Photos"],
      ),
    ],
  },
  {
    id: "air-system",
    label: "Air system",
    platforms: [
      scopePlatform(
        "dolica-air",
        "Dolica D6 air system support",
        "Light truck support scope",
        scopeImages.airSecondary,
        "Light truck air support",
        ["Valve-related items", "Actuation support", "Fittings", "Air-side service parts"],
        ["Repair kits", "Wear parts", "Mixed replenishment support"],
        ["Truck model", "Part photos", "OE number", "Usage note"],
        airImageStyleB,
      ),
      scopePlatform(
        "captain-air",
        "Captain T air system support",
        "Light truck support scope",
        scopeImages.airPrimary,
        "Air system parts support",
        ["Air valves", "Brake chamber items", "Actuation parts", "Air dryer support"],
        ["Push rods", "Clevis items", "Repair diaphragms", "Fittings"],
        ["Truck family", "OE number", "Valve spec", "Photos"],
        airImageStyleA,
      ),
    ],
  },
];

const fawAssemblies: BrowserAssembly[] = [
  {
    id: "engine",
    label: "Engine",
    platforms: [
      enginePlatform(
        "ca6dm2-46e52",
        "CA6DM2-46E52",
        "J6P | heavy truck",
        "/images/platform-library/engine/fallback/Engine heavy truck 2.png",
        "Heavy truck engine",
      ),
      enginePlatform(
        "ca6dk1-32e5",
        "CA6DK1-32E5",
        "J6P | cargo truck",
        "/images/platform-library/engine/fallback/Engine heavy truck 1.jpg",
        "Heavy truck engine",
      ),
    ],
  },
  {
    id: "gearbox",
    label: "Gearbox & transmission",
    platforms: [
      gearboxPlatform(
        "ca12tax210m",
        "CA12TAX210M",
        "J6P | heavy truck",
        "/images/platform-library/gearbox/fallback/Gearbox heavy truck 2.webp",
        "Heavy truck gearbox",
      ),
      gearboxPlatform(
        "fast-12jsd220ta",
        "FAST 12JSD220TA",
        "J6P | dump truck",
        "/images/platform-library/gearbox/fallback/Gearbox heavy truck 1.webp",
        "Heavy truck gearbox",
      ),
    ],
  },
  {
    id: "brake",
    label: "Brake system",
    platforms: [
      scopePlatform(
        "j6p-brake",
        "J6P brake system",
        "Heavy truck support scope",
        scopeImages.brakeHeavy,
        "Heavy truck brake system",
        ["Brake chambers", "Brake valves", "Brake linings", "Brake drums"],
        ["Slack adjuster items", "Hardware kits", "Service wear parts"],
        ["Truck family", "OE number", "Dimensions", "Photos"],
      ),
      scopePlatform(
        "j6p-cargo-brake",
        "J6P cargo brake support",
        "Heavy truck support scope",
        scopeImages.brakeLight,
        "Brake support",
        ["Brake service items", "Pads or linings", "Chamber-related parts", "Valve support"],
        ["Hardware kits", "Wear parts", "Actuation parts"],
        ["Truck model", "OE number", "Photos", "Old sample"],
      ),
    ],
  },
  {
    id: "suspension",
    label: "Suspension",
    platforms: [
      scopePlatform(
        "j6p-suspension",
        "J6P suspension support",
        "Heavy truck support scope",
        scopeImages.suspensionHeavy,
        "Heavy truck suspension system",
        ["Leaf spring parts", "Torque rod items", "Stabilizer-linked parts", "Mounting hardware"],
        ["Bushings", "Pins", "Chassis wear parts"],
        ["Truck family", "OE number", "Dimension check", "Photos"],
      ),
      scopePlatform(
        "j6p-cargo-suspension",
        "J6P cargo suspension support",
        "Heavy truck support scope",
        scopeImages.suspensionLight,
        "Suspension support",
        ["Spring support items", "Rod-related parts", "Mounting wear parts", "Bushing-linked support"],
        ["Rubber items", "Pins and sleeves", "Hardware kits"],
        ["Truck model", "Vehicle code", "OE number", "Part photos"],
      ),
    ],
  },
  {
    id: "axle",
    label: "Axle, steering & wheel-end",
    platforms: [
      scopePlatform(
        "j6p-axle",
        "J6P axle and wheel-end",
        "Heavy truck support scope",
        scopeImages.axleHeavy,
        "Heavy truck axle platform",
        ["Hub support", "Bearing support", "Seal and washer items", "Steering-linked parts"],
        ["Wheel-end service items", "Axle repair support", "Hardware kits"],
        ["Truck family", "OE number", "Old sample", "Photos"],
      ),
      scopePlatform(
        "j6p-cargo-axle",
        "J6P cargo axle and steering",
        "Heavy truck support scope",
        scopeImages.axleLight,
        "Axle support",
        ["Wheel-end wear parts", "Steering support items", "Seal and bearing parts", "Repair hardware"],
        ["Axle repair parts", "Hub-related service items", "Mounting hardware"],
        ["Truck model", "Application photo", "OE number", "Sample check"],
      ),
    ],
  },
  {
    id: "air-system",
    label: "Air system",
    platforms: [
      scopePlatform(
        "j6p-air",
        "J6P air system support",
        "Heavy truck support scope",
        scopeImages.airPrimary,
        "Air system parts support",
        ["Air valves", "Brake chamber items", "Actuation parts", "Air dryer support"],
        ["Push rods", "Clevis items", "Repair diaphragms", "Fittings"],
        ["Truck family", "OE number", "Valve spec", "Photos"],
        airImageStyleA,
      ),
      scopePlatform(
        "j6p-cargo-air",
        "J6P cargo air support",
        "Heavy truck support scope",
        scopeImages.airSecondary,
        "Air support",
        ["Valve-related items", "Actuation support", "Fittings", "Air-side service parts"],
        ["Repair kits", "Wear parts", "Mixed replenishment support"],
        ["Truck model", "Part photos", "OE number", "Usage note"],
        airImageStyleB,
      ),
    ],
  },
];

const shacmanAssemblies: BrowserAssembly[] = [
  {
    id: "engine",
    label: "Engine",
    platforms: [
      enginePlatform(
        "wp12-430e50",
        "WP12.430E50",
        "Delong X3000 | heavy truck",
        "/images/platform-library/engine/weichai/Engine Weichai WP12.430E50 family.png",
        "Weichai engine",
      ),
      enginePlatform(
        "wp10-340e53",
        "WP10.340E53",
        "Delong H3000 | heavy truck",
        "/images/platform-library/engine/weichai/Engine Weichai WP10H family.png",
        "Weichai engine",
      ),
    ],
  },
  {
    id: "gearbox",
    label: "Gearbox & transmission",
    platforms: [
      gearboxPlatform(
        "fast-12jsd220ta",
        "FAST 12JSD220TA",
        "Delong X3000 | heavy truck",
        "/images/platform-library/gearbox/fallback/Gearbox heavy truck 1.webp",
        "Heavy truck gearbox",
      ),
      gearboxPlatform(
        "fast-10jsd140t",
        "FAST 10JSD140T",
        "Delong H3000 | cargo truck",
        "/images/platform-library/gearbox/fallback/Gearbox heavy truck 2.webp",
        "Heavy truck gearbox",
      ),
    ],
  },
  {
    id: "brake",
    label: "Brake system",
    platforms: [
      scopePlatform(
        "x3000-brake",
        "Delong X3000 brake system",
        "Heavy truck support scope",
        scopeImages.brakeHeavy,
        "Heavy truck brake system",
        ["Brake chambers", "Brake valves", "Brake linings", "Brake drums"],
        ["Slack adjuster items", "Hardware kits", "Service wear parts"],
        ["Truck family", "OE number", "Dimensions", "Photos"],
      ),
      scopePlatform(
        "h3000-brake",
        "Delong H3000 brake system",
        "Heavy truck support scope",
        scopeImages.brakeLight,
        "Brake support",
        ["Brake service items", "Pads or linings", "Chamber-related parts", "Valve support"],
        ["Hardware kits", "Wear parts", "Actuation parts"],
        ["Truck model", "OE number", "Photos", "Old sample"],
      ),
    ],
  },
  {
    id: "suspension",
    label: "Suspension",
    platforms: [
      scopePlatform(
        "x3000-suspension",
        "Delong X3000 suspension support",
        "Heavy truck support scope",
        scopeImages.suspensionHeavy,
        "Heavy truck suspension system",
        ["Leaf spring parts", "Torque rod items", "Stabilizer-linked parts", "Mounting hardware"],
        ["Bushings", "Pins", "Chassis wear parts"],
        ["Truck family", "OE number", "Dimension check", "Photos"],
      ),
      scopePlatform(
        "h3000-suspension",
        "Delong H3000 suspension support",
        "Heavy truck support scope",
        scopeImages.suspensionLight,
        "Suspension support",
        ["Spring support items", "Rod-related parts", "Mounting wear parts", "Bushing-linked support"],
        ["Rubber items", "Pins and sleeves", "Hardware kits"],
        ["Truck model", "Vehicle code", "OE number", "Part photos"],
      ),
    ],
  },
  {
    id: "axle",
    label: "Axle, steering & wheel-end",
    platforms: [
      scopePlatform(
        "x3000-axle",
        "Delong X3000 axle and wheel-end",
        "Heavy truck support scope",
        scopeImages.axleHeavy,
        "Heavy truck axle platform",
        ["Hub support", "Bearing support", "Seal and washer items", "Steering-linked parts"],
        ["Wheel-end service items", "Axle repair support", "Hardware kits"],
        ["Truck family", "OE number", "Old sample", "Photos"],
      ),
      scopePlatform(
        "h3000-axle",
        "Delong H3000 axle and steering",
        "Heavy truck support scope",
        scopeImages.axleLight,
        "Axle support",
        ["Wheel-end wear parts", "Steering support items", "Seal and bearing parts", "Repair hardware"],
        ["Axle repair parts", "Hub-related service items", "Mounting hardware"],
        ["Truck model", "Application photo", "OE number", "Sample check"],
      ),
    ],
  },
  {
    id: "air-system",
    label: "Air system",
    platforms: [
      scopePlatform(
        "x3000-air",
        "Delong X3000 air system support",
        "Heavy truck support scope",
        scopeImages.airPrimary,
        "Air system parts support",
        ["Air valves", "Brake chamber items", "Actuation parts", "Air dryer support"],
        ["Push rods", "Clevis items", "Repair diaphragms", "Fittings"],
        ["Truck family", "OE number", "Valve spec", "Photos"],
        airImageStyleA,
      ),
      scopePlatform(
        "h3000-air",
        "Delong H3000 air support",
        "Heavy truck support scope",
        scopeImages.airSecondary,
        "Air support",
        ["Valve-related items", "Actuation support", "Fittings", "Air-side service parts"],
        ["Repair kits", "Wear parts", "Mixed replenishment support"],
        ["Truck model", "Part photos", "OE number", "Usage note"],
        airImageStyleB,
      ),
    ],
  },
];

const manAssemblies: BrowserAssembly[] = [
  {
    id: "engine",
    label: "Engine",
    platforms: [
      enginePlatform(
        "d26-heavy",
        "D26 platform",
        "TGX | heavy truck",
        "/images/platform-library/engine/fallback/Engine heavy truck 1.jpg",
        "Heavy truck engine",
      ),
      enginePlatform(
        "d15-medium",
        "D15 platform",
        "TGS | heavy truck",
        "/images/platform-library/engine/fallback/Engine heavy truck 2.png",
        "Heavy truck engine",
      ),
    ],
  },
  {
    id: "gearbox",
    label: "Gearbox & transmission",
    platforms: [
      gearboxPlatform(
        "man-heavy-gearbox",
        "Heavy truck gearbox platform",
        "TGX | heavy truck",
        "/images/platform-library/gearbox/fallback/Gearbox heavy truck 1.webp",
        "Heavy truck gearbox",
      ),
      gearboxPlatform(
        "man-tractor-gearbox",
        "Tractor transmission platform",
        "TGS | heavy truck",
        "/images/platform-library/gearbox/fallback/Gearbox heavy truck 2.webp",
        "Heavy truck gearbox",
      ),
    ],
  },
  {
    id: "brake",
    label: "Brake system",
    platforms: [
      scopePlatform(
        "tgx-brake",
        "TGX brake system support",
        "Heavy truck support scope",
        scopeImages.brakeHeavy,
        "Heavy truck brake system",
        ["Brake chambers", "Brake valves", "Brake linings", "Brake drums"],
        ["Slack adjuster items", "Hardware kits", "Service wear parts"],
        ["Truck family", "OE number", "Dimensions", "Photos"],
      ),
      scopePlatform(
        "tgs-brake",
        "TGS brake system support",
        "Heavy truck support scope",
        scopeImages.brakeLight,
        "Brake support",
        ["Brake service items", "Pads or linings", "Chamber-related parts", "Valve support"],
        ["Hardware kits", "Wear parts", "Actuation parts"],
        ["Truck model", "OE number", "Photos", "Old sample"],
      ),
    ],
  },
  {
    id: "suspension",
    label: "Suspension",
    platforms: [
      scopePlatform(
        "tgx-suspension",
        "TGX suspension support",
        "Heavy truck support scope",
        scopeImages.suspensionHeavy,
        "Heavy truck suspension system",
        ["Leaf spring parts", "Torque rod items", "Stabilizer-linked parts", "Mounting hardware"],
        ["Bushings", "Pins", "Chassis wear parts"],
        ["Truck family", "OE number", "Dimension check", "Photos"],
      ),
      scopePlatform(
        "tgs-suspension",
        "TGS suspension support",
        "Heavy truck support scope",
        scopeImages.suspensionLight,
        "Suspension support",
        ["Spring support items", "Rod-related parts", "Mounting wear parts", "Bushing-linked support"],
        ["Rubber items", "Pins and sleeves", "Hardware kits"],
        ["Truck model", "Vehicle code", "OE number", "Part photos"],
      ),
    ],
  },
  {
    id: "axle",
    label: "Axle, steering & wheel-end",
    platforms: [
      scopePlatform(
        "tgx-axle",
        "TGX axle and wheel-end",
        "Heavy truck support scope",
        scopeImages.axleHeavy,
        "Heavy truck axle platform",
        ["Hub support", "Bearing support", "Seal and washer items", "Steering-linked parts"],
        ["Wheel-end service items", "Axle repair support", "Hardware kits"],
        ["Truck family", "OE number", "Old sample", "Photos"],
      ),
      scopePlatform(
        "tgs-axle",
        "TGS axle and steering",
        "Heavy truck support scope",
        scopeImages.axleLight,
        "Axle support",
        ["Wheel-end wear parts", "Steering support items", "Seal and bearing parts", "Repair hardware"],
        ["Axle repair parts", "Hub-related service items", "Mounting hardware"],
        ["Truck model", "Application photo", "OE number", "Sample check"],
      ),
    ],
  },
  {
    id: "air-system",
    label: "Air system",
    platforms: [
      scopePlatform(
        "tgx-air",
        "TGX air system support",
        "Heavy truck support scope",
        scopeImages.airPrimary,
        "Air system parts support",
        ["Air valves", "Brake chamber items", "Actuation parts", "Air dryer support"],
        ["Push rods", "Clevis items", "Repair diaphragms", "Fittings"],
        ["Truck family", "OE number", "Valve spec", "Photos"],
        airImageStyleA,
      ),
      scopePlatform(
        "tgs-air",
        "TGS air support",
        "Heavy truck support scope",
        scopeImages.airSecondary,
        "Air support",
        ["Valve-related items", "Actuation support", "Fittings", "Air-side service parts"],
        ["Repair kits", "Wear parts", "Mixed replenishment support"],
        ["Truck model", "Part photos", "OE number", "Usage note"],
        airImageStyleB,
      ),
    ],
  },
];

const volvoAssemblies: BrowserAssembly[] = [
  {
    id: "engine",
    label: "Engine",
    platforms: [
      enginePlatform(
        "d13-platform",
        "D13 platform",
        "FH | heavy truck",
        "/images/platform-library/engine/fallback/Engine heavy truck 1.jpg",
        "Heavy truck engine",
      ),
      enginePlatform(
        "d11-platform",
        "D11 platform",
        "FM | heavy truck",
        "/images/platform-library/engine/fallback/Engine heavy truck 2.png",
        "Heavy truck engine",
      ),
    ],
  },
  {
    id: "gearbox",
    label: "Gearbox & transmission",
    platforms: [
      gearboxPlatform(
        "volvo-i-shift-a",
        "I-Shift platform A",
        "FH | heavy truck",
        "/images/platform-library/gearbox/fallback/Gearbox heavy truck 1.webp",
        "Heavy truck gearbox",
      ),
      gearboxPlatform(
        "volvo-i-shift-b",
        "I-Shift platform B",
        "FM | heavy truck",
        "/images/platform-library/gearbox/fallback/Gearbox heavy truck 2.webp",
        "Heavy truck gearbox",
      ),
    ],
  },
  {
    id: "brake",
    label: "Brake system",
    platforms: [
      scopePlatform(
        "fh-brake",
        "FH brake system support",
        "Heavy truck support scope",
        scopeImages.brakeHeavy,
        "Heavy truck brake system",
        ["Brake chambers", "Brake valves", "Brake linings", "Brake drums"],
        ["Slack adjuster items", "Hardware kits", "Service wear parts"],
        ["Truck family", "OE number", "Dimensions", "Photos"],
      ),
      scopePlatform(
        "fm-brake",
        "FM brake system support",
        "Heavy truck support scope",
        scopeImages.brakeLight,
        "Brake support",
        ["Brake service items", "Pads or linings", "Chamber-related parts", "Valve support"],
        ["Hardware kits", "Wear parts", "Actuation parts"],
        ["Truck model", "OE number", "Photos", "Old sample"],
      ),
    ],
  },
  {
    id: "suspension",
    label: "Suspension",
    platforms: [
      scopePlatform(
        "fh-suspension",
        "FH suspension support",
        "Heavy truck support scope",
        scopeImages.suspensionHeavy,
        "Heavy truck suspension system",
        ["Leaf spring parts", "Torque rod items", "Stabilizer-linked parts", "Mounting hardware"],
        ["Bushings", "Pins", "Chassis wear parts"],
        ["Truck family", "OE number", "Dimension check", "Photos"],
      ),
      scopePlatform(
        "fm-suspension",
        "FM suspension support",
        "Heavy truck support scope",
        scopeImages.suspensionLight,
        "Suspension support",
        ["Spring support items", "Rod-related parts", "Mounting wear parts", "Bushing-linked support"],
        ["Rubber items", "Pins and sleeves", "Hardware kits"],
        ["Truck model", "Vehicle code", "OE number", "Part photos"],
      ),
    ],
  },
  {
    id: "axle",
    label: "Axle, steering & wheel-end",
    platforms: [
      scopePlatform(
        "fh-axle",
        "FH axle and wheel-end",
        "Heavy truck support scope",
        scopeImages.axleHeavy,
        "Heavy truck axle platform",
        ["Hub support", "Bearing support", "Seal and washer items", "Steering-linked parts"],
        ["Wheel-end service items", "Axle repair support", "Hardware kits"],
        ["Truck family", "OE number", "Old sample", "Photos"],
      ),
      scopePlatform(
        "fm-axle",
        "FM axle and steering",
        "Heavy truck support scope",
        scopeImages.axleLight,
        "Axle support",
        ["Wheel-end wear parts", "Steering support items", "Seal and bearing parts", "Repair hardware"],
        ["Axle repair parts", "Hub-related service items", "Mounting hardware"],
        ["Truck model", "Application photo", "OE number", "Sample check"],
      ),
    ],
  },
  {
    id: "air-system",
    label: "Air system",
    platforms: [
      scopePlatform(
        "fh-air",
        "FH air system support",
        "Heavy truck support scope",
        scopeImages.airPrimary,
        "Air system parts support",
        ["Air valves", "Brake chamber items", "Actuation parts", "Air dryer support"],
        ["Push rods", "Clevis items", "Repair diaphragms", "Fittings"],
        ["Truck family", "OE number", "Valve spec", "Photos"],
        airImageStyleA,
      ),
      scopePlatform(
        "fm-air",
        "FM air support",
        "Heavy truck support scope",
        scopeImages.airSecondary,
        "Air support",
        ["Valve-related items", "Actuation support", "Fittings", "Air-side service parts"],
        ["Repair kits", "Wear parts", "Mixed replenishment support"],
        ["Truck model", "Part photos", "OE number", "Usage note"],
        airImageStyleB,
      ),
    ],
  },
];

const mercedesAssemblies: BrowserAssembly[] = [
  {
    id: "engine",
    label: "Engine",
    platforms: [
      enginePlatform(
        "om471-platform",
        "OM471 platform",
        "Actros | heavy truck",
        "/images/platform-library/engine/fallback/Engine heavy truck 1.jpg",
        "Heavy truck engine",
      ),
      enginePlatform(
        "om470-platform",
        "OM470 platform",
        "Arocs | heavy truck",
        "/images/platform-library/engine/fallback/Engine heavy truck 2.png",
        "Heavy truck engine",
      ),
    ],
  },
  {
    id: "gearbox",
    label: "Gearbox & transmission",
    platforms: [
      gearboxPlatform(
        "power-shift-actros",
        "PowerShift platform A",
        "Actros | heavy truck",
        "/images/platform-library/gearbox/fallback/Gearbox heavy truck 1.webp",
        "Heavy truck gearbox",
      ),
      gearboxPlatform(
        "power-shift-arocs",
        "PowerShift platform B",
        "Arocs | heavy truck",
        "/images/platform-library/gearbox/fallback/Gearbox heavy truck 2.webp",
        "Heavy truck gearbox",
      ),
    ],
  },
  {
    id: "brake",
    label: "Brake system",
    platforms: [
      scopePlatform(
        "actros-brake",
        "Actros brake system support",
        "Heavy truck support scope",
        scopeImages.brakeHeavy,
        "Heavy truck brake system",
        ["Brake chambers", "Brake valves", "Brake linings", "Brake drums"],
        ["Slack adjuster items", "Hardware kits", "Service wear parts"],
        ["Truck family", "OE number", "Dimensions", "Photos"],
      ),
      scopePlatform(
        "arocs-brake",
        "Arocs brake system support",
        "Heavy truck support scope",
        scopeImages.brakeLight,
        "Brake support",
        ["Brake service items", "Pads or linings", "Chamber-related parts", "Valve support"],
        ["Hardware kits", "Wear parts", "Actuation parts"],
        ["Truck model", "OE number", "Photos", "Old sample"],
      ),
    ],
  },
  {
    id: "suspension",
    label: "Suspension",
    platforms: [
      scopePlatform(
        "actros-suspension",
        "Actros suspension support",
        "Heavy truck support scope",
        scopeImages.suspensionHeavy,
        "Heavy truck suspension system",
        ["Leaf spring parts", "Torque rod items", "Stabilizer-linked parts", "Mounting hardware"],
        ["Bushings", "Pins", "Chassis wear parts"],
        ["Truck family", "OE number", "Dimension check", "Photos"],
      ),
      scopePlatform(
        "arocs-suspension",
        "Arocs suspension support",
        "Heavy truck support scope",
        scopeImages.suspensionLight,
        "Suspension support",
        ["Spring support items", "Rod-related parts", "Mounting wear parts", "Bushing-linked support"],
        ["Rubber items", "Pins and sleeves", "Hardware kits"],
        ["Truck model", "Vehicle code", "OE number", "Part photos"],
      ),
    ],
  },
  {
    id: "axle",
    label: "Axle, steering & wheel-end",
    platforms: [
      scopePlatform(
        "actros-axle",
        "Actros axle and wheel-end",
        "Heavy truck support scope",
        scopeImages.axleHeavy,
        "Heavy truck axle platform",
        ["Hub support", "Bearing support", "Seal and washer items", "Steering-linked parts"],
        ["Wheel-end service items", "Axle repair support", "Hardware kits"],
        ["Truck family", "OE number", "Old sample", "Photos"],
      ),
      scopePlatform(
        "arocs-axle",
        "Arocs axle and steering",
        "Heavy truck support scope",
        scopeImages.axleLight,
        "Axle support",
        ["Wheel-end wear parts", "Steering support items", "Seal and bearing parts", "Repair hardware"],
        ["Axle repair parts", "Hub-related service items", "Mounting hardware"],
        ["Truck model", "Application photo", "OE number", "Sample check"],
      ),
    ],
  },
  {
    id: "air-system",
    label: "Air system",
    platforms: [
      scopePlatform(
        "actros-air",
        "Actros air system support",
        "Heavy truck support scope",
        scopeImages.airPrimary,
        "Air system parts support",
        ["Air valves", "Brake chamber items", "Actuation parts", "Air dryer support"],
        ["Push rods", "Clevis items", "Repair diaphragms", "Fittings"],
        ["Truck family", "OE number", "Valve spec", "Photos"],
        airImageStyleA,
      ),
      scopePlatform(
        "arocs-air",
        "Arocs air support",
        "Heavy truck support scope",
        scopeImages.airSecondary,
        "Air support",
        ["Valve-related items", "Actuation support", "Fittings", "Air-side service parts"],
        ["Repair kits", "Wear parts", "Mixed replenishment support"],
        ["Truck model", "Part photos", "OE number", "Usage note"],
        airImageStyleB,
      ),
    ],
  },
];

export const brandPageContent: Record<string, BrandPageConfig> = {
  sinotruk: makeCommonConfig(
    "Sinotruk",
    "Send your Sinotruk parts inquiry and narrow the right platform before you chat with us",
    "Narrow down the right platform before you reach out, so we can start from a clearer scope and move faster on matching and quotation.",
    "/product/brand/sinotruk/",
    "/images/brands/sinotruk.png",
    [
      { title: "Engine parts", desc: "For engine-model-based matching, overhaul demand, and mixed rebuild inquiries.", href: "/product/part/engine-parts/" },
      { title: "Brake system parts", desc: "For chambers, linings, drums, valves, and other brake-category RFQs.", href: "/product/part/brake-system-parts/" },
      { title: "Suspension parts", desc: "For leaf springs, torque rods, bushings, and suspension-led replenishment.", href: "/product/part/suspension-parts/" },
    ],
    sinotrukAssemblies,
  ),
  howo: makeCommonConfig(
    "HOWO",
    "Send your HOWO parts inquiry and narrow the right platform before you chat with us",
    "Narrow down the right HOWO platform before you reach out, so we can start from a clearer scope and move faster on matching and quotation.",
    "/product/brand/howo/",
    "/images/brands/howo.webp",
    [
      { title: "Brake system parts", desc: "For brake chamber, brake valve, linings, drums, and related brake inquiries.", href: "/product/part/brake-system-parts/" },
      { title: "Air system parts", desc: "For valves, fittings, air dryer items, and other air system requests.", href: "/product/part/air-system-parts/" },
      { title: "Axle and wheel-end parts", desc: "For hub, bearing, wheel-end, and axle-category inquiries.", href: "/product/part/axle-and-wheel-end-parts/" },
    ],
    sinotrukAssemblies,
  ),
  foton: makeCommonConfig(
    "Foton",
    "Send your Foton parts inquiry and narrow the right platform before you chat with us",
    "Narrow down the right Foton platform before you reach out, so we can start from a clearer scope and move faster on matching and quotation.",
    "/product/brand/foton/",
    "/images/brands/foton.png",
    [
      { title: "Engine parts", desc: "For overhaul demand, mixed engine orders, and model-led engine parts matching.", href: "/product/part/engine-parts/" },
      { title: "Brake system parts", desc: "For brake-category RFQs across Aumark, Auman, and other Foton truck families.", href: "/product/part/brake-system-parts/" },
      { title: "Air system parts", desc: "For valves, fittings, air dryer items, and grouped air-side support.", href: "/product/part/air-system-parts/" },
    ],
    fotonAssemblies,
  ),
  jac: makeCommonConfig(
    "JAC",
    "Send your JAC parts inquiry and narrow the right platform before you chat with us",
    "Narrow down the right JAC platform before you reach out, so we can start from a clearer scope and move faster on matching and quotation.",
    "/product/brand/jac/",
    "/images/brands/jac.png",
    [
      { title: "Engine parts", desc: "For rebuild demand, engine-model-led RFQs, and mixed engine-category orders.", href: "/product/part/engine-parts/" },
      { title: "Suspension parts", desc: "For spring, rod, chassis wear, and suspension-led replenishment demand.", href: "/product/part/suspension-parts/" },
      { title: "Axle and wheel-end parts", desc: "For axle, steering, hub, and wheel-end support across JAC truck families.", href: "/product/part/axle-and-wheel-end-parts/" },
    ],
    jacAssemblies,
  ),
  dongfeng: makeCommonConfig(
    "Dongfeng",
    "Send your Dongfeng parts inquiry and narrow the right platform before you chat with us",
    "Narrow down the right Dongfeng platform before you reach out, so we can start from a clearer scope and move faster on matching and quotation.",
    "/product/brand/dongfeng/",
    "/images/brands/dongfeng.png",
    [
      { title: "Engine parts", desc: "For engine-category RFQs where the inquiry starts from model, spec, or rebuild demand.", href: "/product/part/engine-parts/" },
      { title: "Brake system parts", desc: "For brake-category replenishment, chamber support, and valve-led RFQs.", href: "/product/part/brake-system-parts/" },
      { title: "Axle and wheel-end parts", desc: "For axle, steering, bearing, seal, and wheel-end support.", href: "/product/part/axle-and-wheel-end-parts/" },
    ],
    dongfengAssemblies,
  ),
  faw: makeCommonConfig(
    "FAW",
    "Send your FAW parts inquiry and narrow the right platform before you chat with us",
    "Narrow down the right FAW platform before you reach out, so we can start from a clearer scope and move faster on matching and quotation.",
    "/product/brand/faw/",
    "/images/brands/faw.png",
    [
      { title: "Brake system parts", desc: "For brake-category replacement demand, mixed service orders, and fitment-led RFQs.", href: "/product/part/brake-system-parts/" },
      { title: "Axle and wheel-end parts", desc: "For hubs, bearings, seals, wheel-end hardware, and axle-category replenishment.", href: "/product/part/axle-and-wheel-end-parts/" },
      { title: "Air system parts", desc: "For grouped air-side RFQs covering valves, fittings, and related service parts.", href: "/product/part/air-system-parts/" },
    ],
    fawAssemblies,
  ),
  shacman: makeCommonConfig(
    "Shacman",
    "Send your Shacman parts inquiry and narrow the right platform before you chat with us",
    "Narrow down the right Shacman platform before you reach out, so we can start from a clearer scope and move faster on matching and quotation.",
    "/product/brand/shacman/",
    "/images/brands/shacman.png",
    [
      { title: "Brake system parts", desc: "For brake-category RFQs covering chambers, linings, drums, valves, and other service parts.", href: "/product/part/brake-system-parts/" },
      { title: "Suspension parts", desc: "For leaf springs, torque rods, bushings, and chassis-related replacement demand.", href: "/product/part/suspension-parts/" },
      { title: "Engine parts", desc: "For engine-model-based matching, rebuild demand, and mixed spare-parts inquiries.", href: "/product/part/engine-parts/" },
    ],
    shacmanAssemblies,
  ),
  man: makeCommonConfig(
    "MAN",
    "Send your MAN parts inquiry and narrow the right platform before you chat with us",
    "Narrow down the right MAN platform before you reach out, so we can start from a clearer scope and move faster on matching and quotation.",
    "/product/brand/man/",
    "/images/brands/man.svg",
    [
      { title: "Engine parts", desc: "For overhaul demand, rebuild kits, and engine-platform-led MAN RFQs.", href: "/product/part/engine-parts/" },
      { title: "Brake system parts", desc: "For brake-category replenishment and grouped service support on MAN truck applications.", href: "/product/part/brake-system-parts/" },
      { title: "Axle and wheel-end parts", desc: "For hubs, bearings, seals, and axle-category support on MAN platforms.", href: "/product/part/axle-and-wheel-end-parts/" },
    ],
    manAssemblies,
  ),
  "volvo-truck": makeCommonConfig(
    "Volvo Truck",
    "Send your Volvo Truck parts inquiry and narrow the right platform before you chat with us",
    "Narrow down the right Volvo Truck platform before you reach out, so we can start from a clearer scope and move faster on matching and quotation.",
    "/product/brand/volvo-truck/",
    "/images/brands/volvo-truck.jpg",
    [
      { title: "Engine parts", desc: "For engine-platform-led RFQs and grouped service support across Volvo truck applications.", href: "/product/part/engine-parts/" },
      { title: "Brake system parts", desc: "For brake-category replenishment, service kits, and fitment-led RFQs.", href: "/product/part/brake-system-parts/" },
      { title: "Axle and wheel-end parts", desc: "For hubs, bearings, seals, and wheel-end replenishment tied to Volvo platforms.", href: "/product/part/axle-and-wheel-end-parts/" },
    ],
    volvoAssemblies,
  ),
  "mercedes-benz-truck": makeCommonConfig(
    "Mercedes-Benz Truck",
    "Send your Mercedes-Benz Truck parts inquiry and narrow the right platform before you chat with us",
    "Narrow down the right Mercedes-Benz Truck platform before you reach out, so we can start from a clearer scope and move faster on matching and quotation.",
    "/product/brand/mercedes-benz-truck/",
    "/images/brands/mercedes-benz-truck.svg",
    [
      { title: "Engine parts", desc: "For engine-platform-led RFQs and grouped service support across Mercedes-Benz Truck applications.", href: "/product/part/engine-parts/" },
      { title: "Brake system parts", desc: "For brake-category replenishment, service kits, and fitment-led RFQs.", href: "/product/part/brake-system-parts/" },
      { title: "Axle and wheel-end parts", desc: "For hubs, bearings, seals, and wheel-end replenishment tied to Mercedes-Benz Truck platforms.", href: "/product/part/axle-and-wheel-end-parts/" },
    ],
    mercedesAssemblies,
  ),
};

// src/data/websiteData.js

export const categories = [
  {
    id: "microinverter",
    name: "Microinverters",
    description: "Reliable and high-efficiency microinverters simplifying solar power installations.",
    icon: "Cpu",
    image: "microinverter1.png"
  },
  {
    id: "pv-inverter",
    name: "PV Inverters",
    description: "Standard on-grid string solar inverters for residential and commercial systems.",
    icon: "Activity",
    image: "ongrid1.jpeg"
  },
  {
    id: "hybrid-inverter",
    name: "Hybrid Inverters",
    description: "Intelligent inverters managing solar panels, battery storage, and grid feed.",
    icon: "RefreshCw",
    image: "hybrid1.png"
  },
  {
    id: "battery",
    name: "Lithium (LFP) Batteries",
    description: "Highly stable and long-lasting backup energy storage solutions.",
    icon: "BatteryCharging",
    image: "battery2.png"
  },
  {
    id: "grid-plus",
    name: "Grid+",
    description: "Advanced grid-tie and integration accessories for optimized generation.",
    icon: "Grid",
    image: "grid.jpeg"
  },
  {
    id: "wires",
    name: "Wires & Cables",
    description: "Safe, efficient, and heavy-duty power transmission cables.",
    icon: "Zap",
    image: "wire1.jpeg"
  },
  {
    id: "solar-structures",
    name: "Solar Structures",
    description: "Premium mounting solutions engineered for durability and wind resistance.",
    icon: "Layers",
    image: "structback1 - Copy (2).png"
  },
  {
    id: "earthing-systems",
    name: "Earthing Systems",
    description: "Pure copper lightning arrestors and surge protection accessories.",
    icon: "ShieldAlert",
    image: "earthback1 - Copy (2).png"
  }
];

export const products = [
  {
    id: "1",
    categoryId: "microinverter",
    name: "Jio Micro Inverter",
    tagline: "More Reliable, Flexible, and Safe Microinverter",
    description: "TDS Solar Energy has launched the Jio Micro Inverter to dramatically improve power generation efficiency, safety, and module-level monitoring.",
    maxEfficiency: "95.5%",
    normalEfficiency: "99.8% MPPT",
    image: "microinverter1.png",
    advantages: [
      { title: "High Performance", desc: "Low start-up voltage, wide voltage range, and higher energy yield." },
      { title: "Easy Installation", desc: "Flexible configuration, plug-and-play setup for quicker deployment." },
      { title: "IP67 Rated", desc: "Engineered to last with maximum weatherproofing and outdoor durability." },
      { title: "Remote Monitoring", desc: "Monitor your solar production remotely via smartphone app or web portal." }
    ],
    specs: [
      { name: "Max. Efficiency", value: "95.5%" },
      { name: "MPPT Efficiency", value: "99.8%" },
      { name: "Enclosure Protection", value: "IP67" },
      { name: "Startup Voltage", value: "22V" },
      { name: "Monitoring", value: "Module Level (Wifi/Zigbee)" }
    ]
  },
  {
    id: "8",
    categoryId: "microinverter",
    name: "Enphase IQ7A",
    tagline: "High-Powered Module-Level Electronics",
    description: "The high-powered Enphase IQ7A Microinverter dramatically simplifies the installation process while achieving maximum system efficiency for 60-cell, 66-cell, and 72-cell modules.",
    maxEfficiency: "96.0%",
    normalEfficiency: "99.9% MPPT",
    image: "microinverter1.png",
    advantages: [
      { title: "High Reliability", desc: "No single point of system failure. Operates independently on each module." },
      { title: "Superior Yield", desc: "Maximizes generation under partial shade or dusty panels." },
      { title: "Safe AC Output", desc: "Low-voltage AC cabling prevents dangerous high-voltage DC hazards on roofs." },
      { title: "Smart Grid Ready", desc: "Fully compliant with advanced grid utility requirements." }
    ],
    specs: [
      { name: "Max. Efficiency", value: "96.0%" },
      { name: "MPPT Efficiency", value: "99.9%" },
      { name: "Max. Input DC Power", value: "460W" },
      { name: "Compatible Panels", value: "60, 66, 72 cells" },
      { name: "Warranty", value: "Up to 25 Years" }
    ]
  },
  {
    id: "10",
    categoryId: "hybrid-inverter",
    name: "Deye & Servotec Hybrid Inverter",
    tagline: "Advanced Smart Energy Storage Management",
    description: "An intelligent, high-efficiency hybrid solar inverter that optimizes solar self-consumption, stores excess power in batteries, and feeds back into the grid.",
    maxEfficiency: "97.6%",
    normalEfficiency: "99.9% MPPT",
    image: "hybrid1.png",
    advantages: [
      { title: "Dual MPPT Channels", desc: "Maximizes power harvesting from two solar panel orientations." },
      { title: "Battery Storage", desc: "Supports LFP batteries for uninterrupted power supply during load shedding." },
      { title: "Grid Interaction", desc: "Zero-export function or peak shaving capabilities to save grid costs." }
    ],
    specs: [
      { name: "MPPT Tracking Channels", value: "2" },
      { name: "AC Output Power", value: "5 kW to 20 kW" },
      { name: "Battery Compatibility", value: "Lead-Acid / Lithium-Ion LFP" },
      { name: "Efficiency", value: "97.6%" }
    ]
  },
  {
    id: "34",
    categoryId: "hybrid-inverter",
    name: "Servotec 5 Kva Hybrid Solar Inverter",
    tagline: "Heavy-Duty Power Backup and Generation",
    description: "Designed specifically to handle power fluctuations in Uttar Pradesh, providing seamless, reliable, and noise-free electricity for homes and small shops.",
    maxEfficiency: "95.0%",
    normalEfficiency: "99.5% MPPT",
    image: "servotec.jpeg",
    advantages: [
      { title: "Pure Sine Wave", desc: "Protects sensitive electronic equipment from power surges." },
      { title: "Solar Priority Charging", desc: "Uses solar energy first to charge batteries and power household loads." },
      { title: "Robust Design", desc: "Capable of handling heavy inductive loads like air conditioners and water pumps." }
    ],
    specs: [
      { name: "Capacity", value: "5 KVA" },
      { name: "Output Waveform", value: "Pure Sine Wave" },
      { name: "Solar Charger Type", value: "MPPT" },
      { name: "Max Panel Wattage", value: "5000 Wp" }
    ]
  },
  {
    id: "35",
    categoryId: "hybrid-inverter",
    name: "Deye 3 - 100KW Inverter",
    tagline: "Enterprise-Scale Hybrid Solar Inverter",
    description: "Ideal for industrial, commercial, and agricultural setups, this high-performance Deye inverter handles massive loads and integrates with heavy battery banks.",
    maxEfficiency: "98.2%",
    normalEfficiency: "99.9% MPPT",
    image: "deye.jpeg",
    advantages: [
      { title: "Diesel Generator Input", desc: "Can automatically trigger diesel generator backup during extended grid outages." },
      { title: "Color Touchscreen", desc: "User-friendly LCD menu for monitoring solar production and battery charge statistics." },
      { title: "Parallel Connection", desc: "Can run up to 16 units in parallel to expand system capacity seamlessly." }
    ],
    specs: [
      { name: "Max. Efficiency", value: "98.2%" },
      { name: "Power Range", value: "3 kW to 100 kW" },
      { name: "IP Protection Rating", value: "IP65" },
      { name: "Communication Protocol", value: "CAN / RS485" }
    ]
  },
  {
    id: "11",
    categoryId: "pv-inverter",
    name: "Waaree & Deye Ongrid PV Inverter",
    tagline: "High Yield Grid-Tie Solar Inverter",
    description: "Perfect for zero-export systems or net-metering installations, offering high yield, quick installation, and excellent safety features.",
    maxEfficiency: "98.5%",
    normalEfficiency: "99.9%",
    image: "ongrid1.jpeg",
    advantages: [
      { title: "High Power Yield", desc: "Low thermal loss design ensures full capacity generation even in hot summers." },
      { title: "Remote Upgrades", desc: "Software is updated automatically over the air for continuous improvements." }
    ],
    specs: [
      { name: "System Type", value: "On-Grid (Grid-Tied)" },
      { name: "Max. Efficiency", value: "98.5%" },
      { name: "Cooling", value: "Smart Forced Air Cooling" },
      { name: "Protection", value: "DC Reverse Polarity, AC Short Circuit" }
    ]
  },
  {
    id: "36",
    categoryId: "pv-inverter",
    name: "WAAREE 3 - 100KW PV Inverter",
    tagline: "Authorized Waaree Dealership String Inverter",
    description: "Genuine Waaree grid-tied string inverters tailored for small residential rooftops up to large commercial industrial solar plants.",
    maxEfficiency: "98.6%",
    normalEfficiency: "99.9%",
    image: "waaaree.jpeg",
    advantages: [
      { title: "Authorized Waaree Quality", desc: "Comes with full manufacturer warranty and local Fatehpur dealer support." },
      { title: "High Reliability", desc: "Aluminum casing with high thermal dispersion prevents overheating." }
    ],
    specs: [
      { name: "Capacity Range", value: "3 kW to 100 kW" },
      { name: "Max DC Voltage", value: "1100 V" },
      { name: "Warranty", value: "5 to 10 Years" },
      { name: "Grid Standard", value: "Fully compliant with Indian grid codes" }
    ]
  },
  {
    id: "20",
    categoryId: "battery",
    name: "Reliable Backup LFP Battery System",
    tagline: "Long Life Lithium Iron Phosphate Storage",
    description: "Enterprise-grade solar battery backup offering clean, stable, and high-capacity storage for homes and industrial installations.",
    maxEfficiency: "98.0%",
    normalEfficiency: "90% DOD",
    image: "battery2.png",
    advantages: [
      { title: "Safe Chemistry", desc: "LFP technology prevents thermal runaway and guarantees safety." },
      { title: "High Lifecycles", desc: "Provides over 6,000 charge cycles, lasting for more than 10-15 years." },
      { title: "Fast Charging", desc: "Charges fully in under 2 hours with supported hybrid solar inverters." }
    ],
    specs: [
      { name: "Battery Type", value: "Lithium Iron Phosphate (LiFePO4)" },
      { name: "Depth of Discharge (DOD)", value: "90%" },
      { name: "Cycle Life", value: "6000+ Cycles" },
      { name: "Nominal Voltage", value: "48V / 51.2V" }
    ]
  },
  {
    id: "21",
    categoryId: "grid-plus",
    name: "Grid + Smart System",
    tagline: "Intelligent Power Grid Coordinator",
    description: "Grid+ is a dynamic integration interface that coordinates energy between solar modules, home batteries, the utility grid, and heavy local loads.",
    maxEfficiency: "99.0%",
    normalEfficiency: "24/7 Monitoring",
    image: "grid.jpeg",
    advantages: [
      { title: "Dynamic Load Balancing", desc: "Reduces peak load demand charges by drawing stored battery power automatically." },
      { title: "Smart Scheduling", desc: "Charges batteries during off-peak solar hours and discharges during peak tariff hours." }
    ],
    specs: [
      { name: "Interface Type", value: "Dynamic Power Manager" },
      { name: "Response Time", value: "< 20 ms" },
      { name: "Enclosure Protection", value: "IP65" },
      { name: "Integration Support", value: "RS485 / Modbus / Wi-Fi" }
    ]
  },
  {
    id: "25",
    categoryId: "wires",
    name: "Premium Electrical Wires & Cables",
    tagline: "V-MARC Safe Power Transmission Cables",
    description: "V-MARC Cables are designed for safe, efficient, and reliable power transmission. Offering excellent conductivity, strong fire-retardant insulation, and high durability.",
    maxEfficiency: "100% Copper",
    normalEfficiency: "Heavy Duty",
    image: "v-marc1 - Copy (2).png",
    advantages: [
      { title: "High Conductivity", desc: "Made of 99.97% pure electrolytic grade copper to minimize transmission losses." },
      { title: "FR-LSH Insulation", desc: "Flame Retardant Low Smoke & Halogen insulation ensures fire safety in buildings." },
      { title: "Durability", desc: "Resistant to moisture, grease, oil, and ozone, extending cable life." }
    ],
    specs: [
      { name: "Conductor Material", value: "99.97% Pure Copper" },
      { name: "Insulation", value: "FR-LSH PVC" },
      { name: "Voltage Rating", value: "1100V" },
      { name: "Standards Compliance", value: "IS 694 / IS 1554" }
    ]
  },
  {
    id: "22",
    categoryId: "wires",
    name: "Premium Solar Wires & Cables",
    tagline: "Double Insulated UV Resistant XLPE Cables",
    description: "Specially designed for outdoor solar installations, connecting solar panel strings to inverters with zero degradation and maximum weather resistance.",
    maxEfficiency: "99.9% Efficiency",
    normalEfficiency: "UV Protected",
    image: "wire1.jpeg",
    advantages: [
      { title: "XLPE Insulation", desc: "Cross-linked polyethylene provides high thermal resistance under direct sun." },
      { title: "UV & Ozone Resistant", desc: "Withstands Uttar Pradesh's harsh summer heat without cracking or fading." },
      { title: "Tinned Copper", desc: "Protects wires against corrosion caused by humidity and rain." }
    ],
    specs: [
      { name: "Conductor", value: "Tinned Electrolytic Copper" },
      { name: "Insulation", value: "XLPE (Cross-linked Polyethylene)" },
      { name: "Jacket Material", value: "UV Resistant Halogen-Free Copolymer" },
      { name: "Service Temp Range", value: "-40°C to +90°C" }
    ]
  },
  {
    id: "24",
    categoryId: "solar-structures",
    name: "RAFTER C-Channel Structural Mounting",
    tagline: "Hot-Dip Galvanized Steel Solar Mounting Profile",
    description: "Heavy-duty structural components used to construct robust solar panel arrays on residential roofs, commercial warehouses, or ground-mounted arrays.",
    maxEfficiency: "Wind speed 150 km/h",
    normalEfficiency: "HDG Zinc Coating",
    image: "structback1 - Copy (2).png",
    advantages: [
      { title: "HDG Coating", desc: "Zinc coating of 80+ microns protects the steel from rust and corrosion for 25+ years." },
      { title: "Wind Resistance", desc: "Engineered to withstand wind speeds up to 150 km/h under local storm codes." },
      { title: "Modular Assembly", desc: "Pre-punched slots allow rapid alignment and secure bolt-tight installation." }
    ],
    specs: [
      { name: "Steel Grade", value: "YS 250 / IS 2062" },
      { name: "Galvanization Thickness", value: "80-120 Microns" },
      { name: "Profile Type", value: "C-Channel / Lip Channel" },
      { name: "Structural Warranty", value: "25 Years" }
    ]
  },
  {
    id: "earthing",
    categoryId: "earthing-systems",
    name: "Pure Copper Earthing Electrodes & LA",
    tagline: "Advanced Lightning and Surge Protection Systems",
    description: "TDS Solar Earthing protects your solar installation, home appliances, and residents from electrical faults and lightning strikes by dispersing surges safely into the ground.",
    maxEfficiency: "Fast discharge",
    normalEfficiency: "Low Resistance",
    image: "earthback1 - Copy (2).png",
    advantages: [
      { title: "Pure Copper LA", desc: "Solid copper lightning arrestor rod attracts and safely grounds direct strokes." },
      { title: "Chemical Fill Compound", desc: "Soil enhancement compound maintains low ground resistance even in dry seasons." },
      { title: "Fault Isolation", desc: "Prevents voltage leakage from damaging hybrid inverters and solar modules." }
    ],
    specs: [
      { name: "Arrestor Type", value: "Solid Copper / Copper Bonded LA" },
      { name: "Grounding Rod", value: "Chemical Fill Copper Pipe (2-3 meter)" },
      { name: "Compound Type", value: "Eco-friendly Earth Enhancing Compound" },
      { name: "Standard", value: "IEEE 80 / IS 3043" }
    ]
  }
];

export const news = [
  {
    id: "39",
    date: "April 13, 2026",
    title: "Industrial Solar Power System Demonstrates a New Model for Energy Management",
    tagline: "Combining quality solar products and professional installation to support energy savings",
    summary: "Rising electricity costs are becoming a major concern for homes, businesses, and industrial operations. Many customers are now looking for dependable solar solutions that can reduce power expenses, improve energy efficiency, and support a cleaner future...",
    image: "413.png",
    content: `<p>Rising electricity costs are becoming a major concern for homes, businesses, and industrial operations. Many customers are now looking for dependable solar solutions that can reduce power expenses, improve energy efficiency, and support a cleaner future.</p>
    <p>This need is addressed by TDS Solar Energy, a trusted solar solutions provider established in 2016 in Fatehpur, Uttar Pradesh. The company provides complete solar products and installation services for residential, commercial, and industrial projects. As an Authorized Dealer of Waaree, TDS Solar Energy supplies genuine solar panels, inverters, mounting structures, cables, connectors, earthing materials, and other essential solar components for reliable system performance.</p>
    <p>The solar system is designed to generate clean electricity from sunlight and support the customer’s daily power requirements. By using solar energy during daytime operations, homes, businesses, and industries can reduce dependency on grid electricity and lower monthly electricity expenses.</p>
    <p>From a project perspective, TDS Solar Energy provides complete solar solutions that include product selection, site guidance, system planning, material supply, and professional installation. This approach makes the solar installation process easier and ensures that customers receive the right solution according to their energy needs.</p>
    <p>The company supplies all major solar components required for installation, including solar panels, solar inverters, mounting structures, DC cables, AC cables, MC4 connectors, combiner boxes, earthing materials, lightning protection, and other essential solar accessories.</p>`
  },
  {
    id: "40",
    date: "April 08, 2026",
    title: "TDS Solar Energy Strengthens Solar Products and Installation Services Across Uttar Pradesh",
    tagline: "Fatehpur Smart Renewable Energy Solutions Expansion",
    summary: "As energy demand grows, clean electricity has become a necessity. TDS Solar Energy continues to expand its reach, supplying top-grade Waaree panels and custom installation packages...",
    image: "ying417.png",
    content: `<p>As energy demand grows, clean electricity has become a necessity. TDS Solar Energy continues to expand its reach, supplying top-grade Waaree panels and custom installation packages for homes, commercial units, and agricultural farms.</p>
    <p>Our professional R&D engineers design structures tailored to withstand strong weather fluctuations, ensuring panels stay secure and harvest maximum sunlight. By partnering with leading brands like Deye and Servotec, we deliver hybrid setups that allow customers in Uttar Pradesh to achieve energy independence and battery backup security.</p>`
  },
  {
    id: "41",
    date: "April 23, 2026",
    title: "TDS Solar Energy Delivers Reliable Solar Solutions Since 2016",
    tagline: "Celebrating a decade of solar excellence and green energy transition",
    summary: "From a small dealer in Fatehpur to a leading smart renewable energy provider, TDS Solar Energy has spent years building a reputation of trust, premium quality, and expert installation...",
    image: "4.24-420.jpg",
    content: `<p>From a small dealer in Fatehpur to a leading smart renewable energy provider, TDS Solar Energy has spent years building a reputation of trust, premium quality, and expert installation.</p>
    <p>We believe that clean energy should be accessible, high-performing, and easy to deploy. Our projects span across homes, hospitals, cold storage plants, schools, and offices. With our certified Waaree authorized dealership, we ensure customers get genuine products, standard performance ratings, and full service warranty support right at their doorstep.</p>`
  },
  {
    id: "30",
    date: "March 15, 2026",
    title: "TDS Solar Energy Delivers Smart Solar Solutions for Homes, Businesses, and Industries",
    tagline: "A closer look at grid-tied, off-grid, and hybrid energy architectures",
    summary: "Choosing the right solar system depends on your load, power cuts, and savings targets. TDS Solar Energy simplifies this by providing grid-tied systems for net-metering and hybrid systems for heavy load backup...",
    image: "20260314news.png",
    content: `<p>Choosing the right solar system depends on your load, power cuts, and savings targets. TDS Solar Energy simplifies this by providing grid-tied systems for net-metering and hybrid systems for heavy load backup.</p>
    <p>Our solutions team guides customers on net-metering policies in UP, helping them earn solar credits for excess power pushed back to the grid. Whether it is a 3kW residential system or a 100kW industrial setup, we ensure high quality component selection and clean structural layouts for safety and performance.</p>`
  }
];

export const statistics = [
  { value: "10+", label: "Years of Solar Experience" },
  { value: "50+", label: "Solar Products & Materials" },
  { value: "75+", label: "Service Coverage Across U.P." },
  { value: "2500+", label: "Solar Battery Systems Installed" },
  { value: "3000+", label: "PV Inverters Installed" }
];

export const timeline = [
  {
    year: "2026",
    details: [
      "Strengthened solar installation services across Uttar Pradesh.",
      "Expanded customer support for residential, commercial, and industrial solar projects.",
      "Continued focus on reliable solar systems with long-term customer value."
    ]
  },
  {
    year: "2024",
    details: [
      "Enhanced solar product supply with genuine and high-performance solar solutions.",
      "Improved end-to-end project handling from guidance to installation.",
      "Served more customers looking to reduce electricity costs through solar energy."
    ]
  },
  {
    year: "2022",
    details: [
      "Expanded solar services for homes, businesses, and industries.",
      "Built stronger technical expertise in solar system planning and installation.",
      "Focused on delivering clean, affordable, and sustainable energy solutions."
    ]
  },
  {
    year: "2020",
    details: [
      "Started providing complete solar solutions from product selection to installation.",
      "Strengthened customer trust through reliable service and professional execution.",
      "Helped customers move toward clean energy and lower electricity expenses."
    ]
  },
  {
    year: "2018",
    details: [
      "Developed a stronger service network for solar product supply and support.",
      "Increased focus on quality products, customer guidance, and dependable installation.",
      "Took steady steps toward becoming a trusted solar solutions provider."
    ]
  },
  {
    year: "2016",
    details: [
      "TDS Solar Energy was established with a vision to make solar energy accessible and affordable.",
      "Started operations from Fatehpur, Uttar Pradesh, with a focus on reliable solar solutions.",
      "Began the journey of serving customers with clean energy products and professional service."
    ]
  }
];

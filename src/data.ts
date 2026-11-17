import { CourseModule, CertificationTrack, CareerPath, PromptTemplate } from "./types";

export const CERTIFICATION_TRACKS: CertificationTrack[] = [
  {
    id: "cert-ai",
    name: "AI & Workflow Automation Specialist",
    provider: "Google AI & OpenAI Academy",
    difficulty: "Beginner",
    globalDemand: "Extremely High (98/100)",
    colorTheme: "pink",
    modules: [
      {
        id: "ai-1",
        number: 1,
        title: "Generative AI Foundations & Prompt Design",
        description: "Learn instructions engineering, LLM tokenomics, and core construction schemas like few-shot learning and system roleplays.",
        duration: "Week 1-2",
        skillsAcquired: ["Prompt Engineering", "Large Language Model Basics", "Few-Shot Control", "Negative Constraints"],
        suggestedPrompt: "Act as a Socratic AI Tutor. I am studying 'Generative AI Foundations'. Ask me questions one by one to test my understanding of standard constraints, few-shot structures, and clear context definitions."
      },
      {
        id: "ai-2",
        number: 2,
        title: "LLM System Parameters & Context Tuning",
        description: "Deep dive into context boundaries, managing system roles, and fine-tuning parameters like Temperature, TopP, and TopK.",
        duration: "Week 3-4",
        skillsAcquired: ["Parameter Tuning", "Context Window Control", "System Instructions", "Hallucination Auditing"],
        suggestedPrompt: "Explain the difference between Temperature and topK/topP parameters using a very clear, fun analogy. Give examples of when to set high vs low temperature."
      },
      {
        id: "ai-3",
        number: 3,
        title: "Node-SaaS Architecture & Secure Proxying",
        description: "Configure server-side wrappers in Express, handle authorization headers, create secure environment gates, and prevent client-side key leaks.",
        duration: "Week 5-6",
        skillsAcquired: ["Secure API Architectures", "JSON Schemas", "Environment Gatekeeping", "Express Proxies"],
        suggestedPrompt: "Analyze this scenario: A student wants to call an AI model securely from their app without exposing keys. Draft a clean Express API route pattern that fulfills this."
      },
      {
        id: "ai-4",
        number: 4,
        title: "Responsible AI Practice & Security Engineering",
        description: "Safeguard applications against malicious prompt injections, configure content moderators, and conduct bias and alignment diagnostics.",
        duration: "Week 7",
        skillsAcquired: ["Responsible AI Practice", "AI Guardrails", "Output Validation", "Injection Defense"],
        suggestedPrompt: "Give me 3 practical tactics to prevent 'Prompt Injection' attacks inside a user-facing chatbot database application."
      },
      {
        id: "ai-5",
        number: 5,
        title: "Workflow Automation & AI Consulting",
        description: "Package your skills into premium consulting contracts. Conduct discovery calls, audit manual company processes, and deploy low-code automation systems.",
        duration: "Week 8",
        skillsAcquired: ["Remote Client Acquisition", "Workflow Auditing", "Value-Based Pricing", "SaaS Wrapper Business Models"],
        suggestedPrompt: "Draft an elegant discovery questionnaire for a local real estate agency explaining how implementing smart AI automations can save them 15 hours per week in automated listing summaries."
      }
    ]
  },
  {
    id: "cert-cloud",
    name: "Cloud Solutions Infrastructure Architect",
    provider: "AWS Certified Solutions Architect & Azure Associate",
    difficulty: "Intermediate",
    globalDemand: "Very High (95/100)",
    colorTheme: "cyan",
    modules: [
      {
        id: "cloud-1",
        number: 1,
        title: "Virtual Networks & Global Cloud Topography",
        description: "Deconstruct global infrastructure, master VPC custom networking, and learn subnets, route tables, and ingress security filters.",
        duration: "Week 1-2",
        skillsAcquired: ["VPC Configurations", "Subnet Partitioning", "Route Tables", "CIDR Block Planning"],
        suggestedPrompt: "Act as a Socratic Cloud Tutor. I am studying 'VPC Networking & Subnets'. Quiz me on IP allocations, private vs public subnets, and internet gateways to test my knowledge."
      },
      {
        id: "cloud-2",
        number: 2,
        title: "High-Availability Compute & Auto-Scaling Systems",
        description: "Deploy balanced computing power across virtual clusters. Setup Auto-Scaling groups with criteria triggers and Network Load Balancers.",
        duration: "Week 3-4",
        skillsAcquired: ["Auto-Scaling Groups", "Elastic Load Balancing", "Virtual Machine Clusters", "Multi-AZ Replication"],
        suggestedPrompt: "Explain how a Load Balancer decides to reroute traffic to unhealthy nodes and how auto-scaling policies decide when to spin up more instances."
      },
      {
        id: "cloud-3",
        number: 3,
        title: "Serverless Architecture & API Micro-routes",
        description: "Build micro-architectures that scale from zero using AWS Lambda/Cloud Run. Connect them to API Gateway endpoints for extreme cost savings.",
        duration: "Week 5-6",
        skillsAcquired: ["Serverless Architecture", "Micro-routing Protocols", "Bespoke API Gateways", "Event-Driven Triggers"],
        suggestedPrompt: "Compare a traditional VM server with a Serverless function. Under what conditions is serverless actually cheaper, and when is it more expensive? Use practical math."
      },
      {
        id: "cloud-4",
        number: 4,
        title: "IAM Multi-Tenant Security & VPC Peering Principles",
        description: "Harden corporate portals with Least Privilege principles. Practice cross-VPC peering, NAT mapping, and cloud trailing audits.",
        duration: "Week 7",
        skillsAcquired: ["Cloud Identity Systems (IAM)", "Policy Writing", "VPC Peering Gates", "Threat Logs Auditing"],
        suggestedPrompt: "Show me a secure AWS IAM JSON policy pattern that allows write access to only one specific folder in a storage bucket for a designated remote user."
      },
      {
        id: "cloud-5",
        number: 5,
        title: "Global Cost Optimizer Strategies & Cloud Auditing",
        description: "Deconstruct enterprise waste by migrating resources to cost-effective storage classes and formulating server shutdown policies.",
        duration: "Week 8",
        skillsAcquired: ["Corporate Budget Tracking", "Resource Lifecycles", "Migration Frameworks", "High-Ticket Advisory Pricing"],
        suggestedPrompt: "Draft a high-ticket cloud cost audit proposal for a logistics business whose AWS bill is $12,000/month. List 4 quick wins to reduce fees by 30%."
      }
    ]
  },
  {
    id: "cert-ux",
    name: "Interactive UX/UI & Product Design Strategist",
    provider: "Google UX Research & Figma Professional Certification",
    difficulty: "Beginner",
    globalDemand: "High (89/100)",
    colorTheme: "purple",
    modules: [
      {
        id: "ux-1",
        number: 1,
        title: "User-Centered Research, Personas & Empathy Mapping",
        description: "Conduct professional remote user interviews, draft detailed target personas, and construct empathy maps that identify core user frictions.",
        duration: "Week 1-2",
        skillsAcquired: ["User Research Methods", "Persona Conception", "Empathy Mapping", "Accessibility Best Practices"],
        suggestedPrompt: "Act as a Socratic UX Mentor. I am creating a research plan for a local telehealth delivery project. Ask me questions to test my understanding of user accessibility needs, user flows, and bias prevention."
      },
      {
        id: "ux-2",
        number: 2,
        title: "Information Architecture, User Flows & Wireframing",
        description: "Map intuitive hierarchies and logical page paths. Formulate visual layouts from low-fidelity paper napkins to wireframes in Figma.",
        duration: "Week 3-4",
        skillsAcquired: ["Information Architecture", "User Journey Navigations", "Bespoke Low-Fi Wireframing", "Figma Design Environments"],
        suggestedPrompt: "Give me advice on structuring a checkout user flow. How do I minimize conversion drop-offs while maintaining proper check security? Explain the design principles."
      },
      {
        id: "ux-3",
        number: 3,
        title: "Scalable Typography, Responsive Grids & Design Systems",
        description: "Build adaptive visual rhythms using layout grids. Construct robust Figma design systems with reusable master components, tokens, and auto-layouts.",
        duration: "Week 5-6",
        skillsAcquired: ["Responsive Grid Layouts", "Typography Hierarchy Scales", "Color Theory Accents", "Design System tokens"],
        suggestedPrompt: "Provide a standard typographic hierarchy scale for a modern dashboard and explain when to use sans-serif vs serif styles for optimum readability."
      },
      {
        id: "ux-4",
        number: 4,
        title: "High-Fidelity Interactive Wireframes & Usability Audits",
        description: "Convert static screens into working interactive prototypes. Design validation cycles, note-taking scripts, and map remote usability tests.",
        duration: "Week 7",
        skillsAcquired: ["Hi-Fi Interactive Prototyping", "Usability Testing Methods", "User Feedback Analysis", "Visual Layout Iteration"],
        suggestedPrompt: "Draft an clear, concise 3-minute moderator script for testing and auditing page issues during a checkout flow with a remote test subject."
      },
      {
        id: "ux-5",
        number: 5,
        title: "Remote UX Portfolio & Design Agency Strategy",
        description: "Transform your exercises into pristine case studies. Establish remote freelance rates, standard contract terms, and client deliverable schedules.",
        duration: "Week 8",
        skillsAcquired: ["Case Study Formulations", "Freelance Contracting", "Handoff Procedures", "Remote Client Pipelines"],
        suggestedPrompt: "Draft a modern case study outline for a design project. What are the 4 core sections stakeholders expect to see to evaluate a designer's true competency?"
      }
    ]
  },
  {
    id: "cert-cyber",
    name: "Cybersecurity Systems & Threat Analyst",
    provider: "CompTIA Security+ & Google Cybersecurity Professional",
    difficulty: "Advanced",
    globalDemand: "Extreme (97/100)",
    colorTheme: "amber",
    modules: [
      {
        id: "cyber-1",
        number: 1,
        title: "Modern Threat Landscapes & Forensic Vectors",
        description: "Identify malware variations, social engineering loops, DDOS schemas, and examine live attack methodologies within sandbox terminals.",
        duration: "Week 1-2",
        skillsAcquired: ["Malware Classification", "Social Engineering Vectors", "System Diagnostic Controls", "Sandbox Testing Protocols"],
        suggestedPrompt: "Act as a Socratic Cybersecurity Specialist. I am studying 'Malware Vectors & Prevention'. Ask me questions to test my knowledge of Trojan wrappers, rootkits, and social engineering traps."
      },
      {
        id: "cyber-2",
        number: 2,
        title: "Traffic Inspection Protocols & Ports Security",
        description: "Sniff packets with Wireshark, dissect TCP/IP handshakes, audit critical ports, and write custom firewall access rules.",
        duration: "Week 3-4",
        skillsAcquired: ["Wireshark Packet Dissection", "TCP/IP Protocol Suite", "Firewall Rule Construction", "Network Hub Auditing"],
        suggestedPrompt: "Explain how a 3-way TCP handshake works, and show me how a port scanner identifies whether port 22 or port 80 is open to public inquiries."
      },
      {
        id: "cyber-3",
        number: 3,
        title: "Federated Zero-Trust IAM & Multi-Factor Access",
        description: "Formulate zero-trust blueprints. Configure SAML integrations, federated identities, and cryptographic keys to protect corporate remote servers.",
        duration: "Week 5-6",
        skillsAcquired: ["Zero-Trust Architectures", "Security SAML Protocols", "Multi-Factor Access controls", "PKI Infrastructure Gateways"],
        suggestedPrompt: "Give me a simple, high-level executive summary explaining how 'Zero Trust' architecture differs from traditional 'Castle-and-Moat' perimeter security."
      },
      {
        id: "cyber-4",
        number: 4,
        title: "Incident Response Playbooks & System Encryption",
        description: "Draft disaster containment playbooks. Examine symmetrical vs asymmetrical encryption algorithms and secure remote log registries.",
        duration: "Week 7",
        skillsAcquired: ["Disaster Recovery Playbooks", "Symmetric/Asymmetric Encryption", "Event Log Auditing", "Remote Host Audits"],
        suggestedPrompt: "A company just detected a live ransomware attack in progress on their local servers. Draft a step-by-step containment checklist they must run immediately."
      },
      {
        id: "cyber-5",
        number: 5,
        title: "Compliance Governance & Cybersecurity Consulting",
        description: "Audit organization configurations against SOC2, GDPR, and HIPAA rules. Package compliance assessments into premium consulting contracts.",
        duration: "Week 8",
        skillsAcquired: ["Data Compliance (GDPR/HIPAA)", "Security Auditing Tactics", "Enterprise Risk Diagnostics", "Vulnerability Consulting Pricing"],
        suggestedPrompt: "Outline a compliance checklist for a startup that processes payment processing records to ensure they meet basic SOC2 security standards."
      }
    ]
  },
  {
    id: "cert-pm",
    name: "Agile Project Manager & Workflow Consultant",
    provider: "Google Project Management & PMI Professional License",
    difficulty: "Beginner",
    globalDemand: "High (90/100)",
    colorTheme: "emerald",
    modules: [
      {
        id: "pm-1",
        number: 1,
        title: "Project Management Foundations & Charters",
        description: "Identify client requirements, draft official project project charters, and write clear scopes of work that prevent margin scope-creep.",
        duration: "Week 1-2",
        skillsAcquired: ["Project Charter Designs", "Scope of Work formulation", "Risk Matrix Analysis", "Waterfall Methodologies"],
        suggestedPrompt: "Act as a Socratic Program Manager. I am creating a project charter for a remote software deployment client. Ask me questions one by one to test my understanding of milestones, boundaries, and stakeholder agreements."
      },
      {
        id: "pm-2",
        number: 2,
        title: "Agile Frameworks & Scrum Team Facilitation",
        description: "Master daily scrums, task grooming, sprint retrospectives, and calculate velocity parameters using digital task trackers.",
        duration: "Week 3-4",
        skillsAcquired: ["Scrum Master Principles", "Sprint Planning Systems", "Backlog Grooming Dynamics", "Velocity Calculations"],
        suggestedPrompt: "Explain the absolute difference between 'Sprint Planning' and 'Backlog Grooming' meetings, and what artifacts emerge from each for a remote design sprint."
      },
      {
        id: "pm-3",
        number: 3,
        title: "Interactive Gantt Tracking & Sinks Budgeting",
        description: "Model project progress using critical path estimations. Build responsive budgets tracking internal resource fees and software licensing expenses.",
        duration: "Week 5-6",
        skillsAcquired: ["Critical Path Models", "Interactive Gantt Charts", "Expense Allocation Strategies", "Blocker Resolution Steps"],
        suggestedPrompt: "Analyze this: A critical path component is delayed by 5 days. Illustrate how this delay cascades and what strategies a PM can use to make up lost schedule time."
      },
      {
        id: "pm-4",
        number: 4,
        title: "Remote Team Collaboration, Slack & Asana Setup",
        description: "Structure clear, high-productivity remote environments. Standardize status registers and automate communication loops.",
        duration: "Week 7",
        skillsAcquired: ["Digital Workspace Layouts", "Automated Progress Loops", "Stakeholder Communication Sheets", "SLA Guardrails"],
        suggestedPrompt: "Draft a modern SLA outline or custom Slack rules blueprint to secure 95%+ client transparency for a remote project agency working across timezone shifts."
      },
      {
        id: "pm-5",
        number: 5,
        title: "Strategic Client Retainers & Freelance PM Proposals",
        description: "Offer freelance Project Management services. Pitch executive leadership on fractional project coordination, audit waste, and charge premium retentive fees.",
        duration: "Week 8",
        skillsAcquired: ["Fractional Operations Pricing", "Corporate Waste Auditing", "Deliverable Audits", "Premium Remote retainer Contracts"],
        suggestedPrompt: "Produce a fractional project management retainer pitch for a remote agency struggling with delivery speeds, justifying a $3,000/month flat coordinating role."
      }
    ]
  }
];

export const CAREER_PATHS: CareerPath[] = [
  {
    id: "path-1",
    title: "AI Integration & Automation Consultant",
    roleType: "Freelance Advisor / Remote Agency Owner",
    averageIncome: "$8,000 - $16,000 / month ($130 - $260 / hour)",
    difficulty: "Beginner",
    skillsNeeded: ["Prompt Engineering", "Zapier & Make Automation", "Express Server Proxies", "Client Workflows Mapping"],
    description: "Audit current operations for traditional professional firms (legal, real estate, accounting) and deploy secure, robust LLM-powered systems to double their team productivity working fully remotely.",
    steps30Days: "Build 3 mock portfolios using public business profiles. Set up a simple remote website on Carrd/Webflow. Begin local outreach or post workflow breakdowns on subreddits and LinkedIn targeting local brokers and CPA companies.",
    steps60Days: "Secure your first 'Audit & Blueprint' client for $1,500. Formulate an AI automation plan detailing how tools can triage client inquiries and format listing logs. Upsell client on implementing it for a flat fee of $4,000.",
    steps90Days: "Establish ongoing remote maintenance retainers of $1,000-$2,000/month per client. Manage 5 clients simultaneously, working fully from your laptop from anywhere globally.",
    practicalProject: {
      title: "Real Estate Client AI Triage Auto-Responses",
      description: "Build a prototype that triages buyer inquiries coming to a generic real estate inbox and drafting custom, highly professional agent responses based on current listing descriptions.",
      instructions: [
        "Create a system prompt that models a polite, highly active estate broker.",
        "Pass sample customer input parameters (e.g., budget, pets, location constraints).",
        "Instruct the model to classify user intent (Urgent, Casual, Scheduled Visit) and outputs a structured client feedback document."
      ],
      starterPrompt: "System: You are an expert Real Estate AI response specialist. Take this listing description and buyer email. Generate a structured response addressing all buyer criteria specifically and label the urgency level in a bracketed format [URGENCY: HIGH/MEDIUM/LOW]."
    }
  },
  {
    id: "path-2",
    title: "Cloud Infrastructure Architect",
    roleType: "Remote Full-Time or Contract Specialist",
    averageIncome: "$10,500 - $18,500 / month ($125k - $220k / year)",
    difficulty: "Intermediate",
    skillsNeeded: ["AWS/Azure Custom VPCs", "Virtual Machine Auto-Scaling", "Serverless Lambdas", "Digital Endpoints Hardening"],
    description: "Architect secure, cost-effective global infrastructures for growing digital startups and SaaS companies. Specialize in cloud network partitioning, auto-scaling clusters, and migrating monoliths to cost-friendly serverless micro-architectures.",
    steps30Days: "Gain your AWS Solutions Architect associate knowledge. Deploy multiple secure VPC environments locally or in sandboxes, establishing proper NAT gateway configurations.",
    steps60Days: "Build a polished, professional GitHub project demonstrating a completely secure web backend deploying Lambda micro-routes with secure API Keys proxy.",
    steps90Days: "Apply to highly lucrative remote contracts on Toptal and Upwork, or remote startups via Wellfound and YCombinator jobs requesting Cloud Architecture talents.",
    practicalProject: {
      title: "Google AI Course Helper (Micro-SaaS Prototype)",
      description: "Build a companion that parses study notes, extracts core concepts, and auto-generates localized mock exam flashcards dynamically using JSON Schema outputs.",
      instructions: [
        "Incorporate a prompt that accepts raw text, extracts terms, and models them as flashcards.",
        "Request the model to return a structured JSON conforming to a specific React state format.",
        "Render the resulting flashcards sequentially in an elegant physical-flip style card component."
      ],
      starterPrompt: "Instruct the Gemini model to parse the upcoming text, isolate exactly 5 tricky keywords or formulas, and return them as a valid JSON array of objects, where each object has key: 'term', definition: '...' and a 'quizQuestion' parameter."
    }
  },
  {
    id: "path-3",
    title: "Interactive UX/UI Solutions Consultant",
    roleType: "Bespoke Digital Designer / Remote Contractor",
    averageIncome: "$7,500 - $14,000 / month ($100 - $180 / hour)",
    difficulty: "Beginner",
    skillsNeeded: ["Figma Design Systems", "High-Fidelity Interactive Prototypes", "Empathy Maps", "Remote Usability Studies Audits"],
    description: "Translate messy ideas into gorgeous, highly fluid digital user journeys. Build responsive master libraries, lead remote feedback loops, and design optimized landing page prototypes for tech startups.",
    steps30Days: "Create a spectacular visual Figma portolio including 3 highly unique app redesigns (telehealth, finance, or courier tracker) displaying rigorous typography grid scales.",
    steps60Days: "Conduct free UX/UI teardowns for real digital products and post interactive video breakdowns on LinkedIn to demonstrate your expert analysis and process.",
    steps90Days: "Sign custom contracts with agencies for fractional design roles at $3,500+/month flat, or find clients needing immediate high-fidelity wireframes ready for code integration.",
    practicalProject: {
      title: "Interactive Custom Dashboard Prototyping Blueprint",
      description: "Formulate a master blueprint defining precise UX flow stages and structural typography variables for a modern data dashboard platform.",
      instructions: [
        "Detail the research target criteria for analytical business interfaces.",
        "Identify the grid specifications, contrast guidelines, and responsive rules.",
        "Design a 30-second tester outline targeting key user interaction areas."
      ],
      starterPrompt: "Provide a detailed step-by-step UI UX Design audit and visual blueprint structure for a remote worker dashboard app. Outline critical spacing values, fonts, accessibility requirements, and outline three sample usability tests."
    }
  },
  {
    id: "path-4",
    title: "Cybersecurity Analyst Advisory Advisor",
    roleType: "Strategic remote Information Security Advisor",
    averageIncome: "$9,000 - $17,000 / month ($110k - $204k / year)",
    difficulty: "Advanced",
    skillsNeeded: ["Packet Forensics Analysis", "Compliance Rules (GDPR/SOC2)", "Zero-Trust Infrastructures", "Identity access Control Systems"],
    description: "Provide crucial security and compliance advisory support to remote tech teams. Audit active networks, configure zero-trust gateways, draft containment playbooks, and secure SOC2/HIPAA certifications for startups.",
    steps30Days: "Gain foundational Security+ cert or Google Security qualifications. Complete multi-sandbox packet logs analyses showing expert diagnostic capabilities.",
    steps60Days: "Create a downloadable compliance blueprint addressing 'Top 5 Security Flaws in API Gateways' and pitch startup founders directly on audit packages.",
    steps90Days: "Sign on with high-ticket advisory retainers as a fractional Cloud Security officer or secure dedicated full-time remote consulting gigs from platforms.",
    practicalProject: {
      title: "Corporate Anti-Halucination Blueprint Builder",
      description: "Instruct an LLM to take a customer response prompt draft and automatically harden it, adding negative constraints, structured roleplaying, and checking output against a provided database standard.",
      instructions: [
        "Define an adversarial prompt optimization routine.",
        "Include strict rules: do not invent company policies, output a standard disclaimer.",
        "Provide clear validation check tags for the manager review."
      ],
      starterPrompt: "Optimize the following prompt to prevent hallucinations and strictly forbid stating information not included in the 'Approved Knowledge Source' text block. Format output mathematically with clean tags."
    }
  },
  {
    id: "path-5",
    title: "Fractional Operations & Project Manager",
    roleType: "Remote Scrum Facilitator / Agile Consultant",
    averageIncome: "$7,000 - $13,500 / month ($90 - $160 / hour)",
    difficulty: "Beginner",
    skillsNeeded: ["Agile Methodologies", "Remote Sprint Coordination", "Asana/Jira Custom Systems Setup", "SOW Designs"],
    description: "Supercharge remote software and design teams. Coordinate sprints, optimize digital workspace tasks, audit product backlogs, and implement smooth communication automations to deliver items 2x faster.",
    steps30Days: "Build a public custom portfolio demonstrating complete Digital templates of sprints and backlogs in Asana/Jira designed for remote engineering teams.",
    steps60Days: "Offer low-ticket 'Operational Audits' for busy digital agencies, identifying bottlenecked tasks and designing automated status trackers.",
    steps90Days: "Sign with 3-4 active remote companies as a fractional project coordinator at $2,500-$4,000/month flat helper to lead their engineering sprints.",
    practicalProject: {
      title: "Mock Customer Order Support Agent",
      description: "Construct an agent that processes user support queries, determines if database lookups are needed, invokes dummy system functions securely, and outputs natural human speech/text updates.",
      instructions: [
        "Write a schema representing searchTickets function.",
        "Declare a function schema that takes ticketId and returns shipping updates.",
        "Demonstrate how the chatbot responds when the requested ticket is missing vs when it's found."
      ],
      starterPrompt: "Provide Gemini with a tool declaration for a function called 'lookupShipment' accepting an 'orderId'. Query 'Draft a status update for order #10852' to trigger the structured function-calling loop."
    }
  }
];

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: "prompt-socratic",
    title: "Socratic Mentor",
    description: "Guides you step-by-step through any tricky concept (sci-fi, code, math, history) by asking clever, curious questions.",
    category: "study",
    systemPrompt: "You are a warm, supportive, and brilliant Socratic educator. I will give you a topic or concept I am trying to understand. DO NOT explain it to me immediately. Instead, ask me 1 or 2 targeted, curious, and fun questions to test my prior assumptions, guide my focus, and let me discover the answers myself. Keep your responses short and friendly.",
    placeholderText: "e.g., Why is quantum computing different from traditional computing, or how do black holes form?"
  },
  {
    id: "prompt-blueprint",
    title: "Creative Catalyst",
    description: "Input any word, hobby, or project idea and receive 5 wild, futuristic, or highly innovative spin-off concepts.",
    category: "consulting",
    systemPrompt: "You are an imaginative creative conceptualist and futurist designer. I will describe a simple idea, hobby, or daily problem. Give me a structured pitch for 5 wild, funny, or incredibly innovative futuristic solution concepts. Include descriptive names, target audiences, and a playful estimation of the technological advancement required.",
    placeholderText: "e.g., Designing an app for dogs to gossip, or starting a cafe on Mars..."
  },
  {
    id: "prompt-objection",
    title: "Contrarian Bob Debate",
    description: "Test and practice your debating skills! Bob is a stubborn, funny contrarian who playfully critics any argument you make.",
    category: "freelance",
    systemPrompt: "We are roleplaying. You are Bob, an incredibly stubborn, dryly sarcastic, yet funny 60-year-old contrarian. You suspect all modern ideas are hyped up and over-engineered. I will propose an idea, opinion, or topic of debate, and you must critique it in character with typical realistic but funny doubts, keeping your responses brief and highly dramatic. Wait for my answers before raising your next objection.",
    placeholderText: "e.g., Arguing that pizza is the absolute best food, or that remote work is a brilliant idea..."
  },
  {
    id: "prompt-optimizer",
    title: "Elaborate Explainer",
    description: "Takes intimidating, complicated topics and breaks them down using hilarious analogies, memes, and clean layout formats.",
    category: "career",
    systemPrompt: "You are a friendly technical writer famous for making highly complex, intimidating subjects incredibly funny and easy to digest. Use hilarious metaphors, hypothetical pop-culture memes, and neat structure blocks (e.g., <the_basics>, <mind_blown_fact>, <how_it_scales>) to explain the core mechanics of what I provide.",
    placeholderText: "e.g., Explain dynamic programming, or describe how the blockchain ledger works under the hood."
  }
];

"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Zap, 
  Globe, 
  Server, 
  BarChart3, 
  Clock, 
  Users,
  ChevronRight,
  Check,
  X,
  Sparkles,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Info,
  HelpCircle,
  FileText,
  Layers,
  GitBranch,
  RefreshCw,
  Play,
  Upload,
  Terminal,
  MousePointer
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Key concepts data
type ConceptKey = 'ssg' | 'ssr' | 'isr' | 'cdn' | 'seo'

const concepts: Record<ConceptKey, {
  title: string
  abbrev: string
  icon: React.ReactNode
  summary: string
  details: string
  benefits: string[]
  useCases: string[]
}> = {
  ssg: {
    title: "Static Site Generation",
    abbrev: "SSG",
    icon: <Zap className="h-5 w-5" />,
    summary: "Pre-built pages for fast delivery",
    details: "Pages are generated at build time and served as static HTML files. No server processing needed for each request—just instant delivery from the CDN.",
    benefits: [
      "Fastest possible page loads",
      "Maximum security (no server vulnerabilities)",
      "Lowest hosting costs",
      "Perfect for SEO"
    ],
    useCases: [
      "Documentation sites",
      "Marketing pages",
      "Blogs with infrequent updates",
      "Portfolio websites"
    ]
  },
  ssr: {
    title: "Server-Side Rendering",
    abbrev: "SSR",
    icon: <Server className="h-5 w-5" />,
    summary: "Dynamic pages on each request",
    details: "Every page request triggers server-side code that can fetch fresh data, personalize content, and render a complete HTML page before sending it to the browser.",
    benefits: [
      "Always fresh, up-to-date content",
      "Personalized user experiences",
      "Database integration",
      "Real-time data display"
    ],
    useCases: [
      "User dashboards",
      "E-commerce product pages",
      "Social feeds",
      "Search results pages"
    ]
  },
  isr: {
    title: "Incremental Static Regeneration",
    abbrev: "ISR",
    icon: <Sparkles className="h-5 w-5" />,
    summary: "Static speed with dynamic freshness",
    details: "Pages are statically generated but can automatically rebuild in the background when data changes or after a time interval. Users always get fast static pages, but content stays fresh.",
    benefits: [
      "Static performance",
      "Content freshness without full rebuilds",
      "Reduced server load",
      "Scalable for large sites"
    ],
    useCases: [
      "News sites",
      "Product catalogs",
      "Content platforms",
      "Research publications"
    ]
  },
  cdn: {
    title: "Content Delivery Network",
    abbrev: "CDN",
    icon: <Globe className="h-5 w-5" />,
    summary: "Global distribution for speed",
    details: "CDNs cache your content on servers around the world. When someone visits your site, they're served from the nearest location—whether that's Minneapolis, Beijing, or Berlin.",
    benefits: [
      "Faster load times globally",
      "Reduced latency for international users",
      "Better uptime and reliability",
      "Protection against traffic spikes"
    ],
    useCases: [
      "Sites with international audiences",
      "Media-heavy content",
      "High-traffic applications",
      "Global research collaborations"
    ]
  },
  seo: {
    title: "Search Engine Optimization",
    abbrev: "SEO",
    icon: <BarChart3 className="h-5 w-5" />,
    summary: "Being found by search engines",
    details: "SEO determines how easily search engines discover and rank your website. For academic sites, this directly impacts research visibility, collaboration opportunities, and citation potential.",
    benefits: [
      "Higher search rankings",
      "More organic traffic",
      "Better research discoverability",
      "Increased collaboration opportunities"
    ],
    useCases: [
      "Research group websites",
      "Publication archives",
      "Academic portfolios",
      "Grant-funded project sites"
    ]
  }
}

// Comparison data: Static-only vs Full-featured platforms
const comparisonFeatures = [
  {
    category: "Typical Costs & Limits",
    features: [
      { name: "Free Tier", staticOnly: "Yes", fullFeatured: "Yes" },
      { name: "Bandwidth (Free)", staticOnly: "100 GB/mo", fullFeatured: "100 GB/mo" },
      { name: "Build Minutes (Free)", staticOnly: "2,000-3,000/mo", fullFeatured: "6,000+/mo" },
      { name: "Pro Tier Pricing", staticOnly: "$4-10/user/mo", fullFeatured: "$15-20/user/mo" },
    ]
  },
  {
    category: "Rendering Capabilities",
    features: [
      { name: "Static Generation (SSG)", staticOnly: true, fullFeatured: true },
      { name: "Server-Side Rendering (SSR)", staticOnly: false, fullFeatured: true },
      { name: "Incremental Static Regeneration", staticOnly: false, fullFeatured: true },
      { name: "API Routes / Serverless Functions", staticOnly: false, fullFeatured: true },
      { name: "Edge Functions", staticOnly: false, fullFeatured: true },
    ]
  },
  {
    category: "Developer Experience",
    features: [
      { name: "Git-based Deployments", staticOnly: true, fullFeatured: true },
      { name: "Preview Deployments", staticOnly: "Limited", fullFeatured: true },
      { name: "Instant Rollbacks", staticOnly: false, fullFeatured: true },
      { name: "Built-in Analytics", staticOnly: false, fullFeatured: true },
      { name: "Automatic Image Optimization", staticOnly: false, fullFeatured: true },
    ]
  },
  {
    category: "Infrastructure",
    features: [
      { name: "Global CDN", staticOnly: "Limited regions", fullFeatured: true },
      { name: "Global Firewall / DDoS Protection", staticOnly: true, fullFeatured: true },
      { name: "Custom Domains", staticOnly: true, fullFeatured: true },
      { name: "SSL Certificates", staticOnly: true, fullFeatured: true },
    ]
  }
]

// Platform options
const platformOptions = [
  { 
    name: "Vercel", 
    url: "https://vercel.com", 
    description: "Optimized for Next.js, excellent DX, generous free tier",
    strengths: ["Next.js optimization", "Global CDN & firewall", "Edge functions"],
    freeHighlight: "100GB bandwidth/mo"
  },
  { 
    name: "Netlify", 
    url: "https://netlify.com", 
    description: "Pioneer of JAMstack, excellent CI/CD and form handling",
    strengths: ["Global CDN & firewall", "Form handling", "Split testing"],
    freeHighlight: "100GB bandwidth/mo"
  },
  { 
    name: "Cloudflare Pages", 
    url: "https://pages.cloudflare.com", 
    description: "Global edge network with very generous free tier",
    strengths: ["Global CDN & firewall", "Unlimited bandwidth (free)", "Workers integration"],
    freeHighlight: "Unlimited bandwidth"
  },
  { 
    name: "AWS Amplify", 
    url: "https://aws.amazon.com/amplify", 
    description: "Full AWS integration, enterprise-grade security",
    strengths: ["AWS ecosystem", "Enterprise features", "Backend integration"],
    freeHighlight: "12 months free tier"
  },
  { 
    name: "GitHub Pages", 
    url: "https://pages.github.com", 
    description: "Simple static hosting, tight GitHub integration",
    strengths: ["Zero config for static", "GitHub Actions CI", "Free for public repos"],
    freeHighlight: "100GB bandwidth/mo"
  },
  { 
    name: "Render", 
    url: "https://render.com", 
    description: "Simple full-stack platform with database support",
    strengths: ["Easy databases", "Background workers", "Private networking"],
    freeHighlight: "Static sites free"
  },
]

// FAQ / Questions data
type FAQKey = 'justVercel' | 'quarto' | 'hybrid' | 'learning' | 'migration' | 'maintenance' | 'cms'

const faqItems: Record<FAQKey, {
  question: string
  icon: React.ReactNode
  shortAnswer: string
  details: string
  considerations: string[]
}> = {
  justVercel: {
    question: "Can we deploy our existing Quarto site to a modern platform?",
    icon: <Zap className="h-5 w-5" />,
    shortAnswer: "Yes! This is the simplest option—no code changes required.",
    details: "You don't need to adopt Next.js or any new framework. Quarto generates static HTML, and most modern platforms (Vercel, Netlify, Cloudflare Pages) can host static sites directly. The entire process takes under 10 minutes: connect your GitHub repo to the platform, and it automatically deploys whenever you push changes. You keep your exact same workflow, but gain a global CDN, automatic HTTPS, and preview deployments.",
    considerations: [
      "Setup time: under 10 minutes on most platforms",
      "No code changes to your Quarto project",
      "Automatic deployments on every git push",
      "Instant global CDN, SSL, and preview URLs for free",
      "Can always add framework features later if needed"
    ]
  },
  quarto: {
    question: "We already use Quarto. Do we have to give that up?",
    icon: <FileText className="h-5 w-5" />,
    shortAnswer: "No. Quarto works great on its own or alongside modern frameworks.",
    details: "Quarto excels at rendering Markdown, R Markdown, and Jupyter notebooks into polished HTML documents. Many teams use Quarto for research documentation, publications, and technical reports—and there's no reason to stop. You can deploy Quarto directly to Vercel, or use a hybrid approach where Quarto handles content while a framework like Next.js provides the site shell and interactive features.",
    considerations: [
      "Quarto outputs static HTML that can be served from any hosting platform",
      "You can host Quarto pages alongside Next.js pages on the same domain",
      "Team members can continue using familiar .qmd or .Rmd workflows",
      "No need to retrain everyone on React or TypeScript"
    ]
  },
  hybrid: {
    question: "How would a hybrid Quarto + Next.js site actually work?",
    icon: <Layers className="h-5 w-5" />,
    shortAnswer: "Quarto pages live in a subdirectory; the main site wraps around them.",
    details: "In a hybrid setup, you'd have your main Next.js site handling the homepage, navigation, team pages, and any interactive features. Quarto-generated content would live in a subdirectory (like /docs or /research) and be served as static HTML. Users experience one cohesive site, but content authors can work in whichever tool fits their needs.",
    considerations: [
      "Example structure: yoursite.edu (Next.js) + yoursite.edu/docs (Quarto)",
      "Shared navigation can link between both seamlessly",
      "Quarto pages can be rebuilt independently without touching the main site",
      "Both can be deployed together in a single CI/CD pipeline"
    ]
  },
  learning: {
    question: "Does the team need to learn React or TypeScript?",
    icon: <GitBranch className="h-5 w-5" />,
    shortAnswer: "Not necessarily. It depends on who maintains what.",
    details: "If the main site structure is built once and rarely changes, team members can focus on adding content through Quarto without touching React code. However, if you want to make frequent changes to the site's interactive features, someone would need basic React knowledge. Many teams designate one 'web lead' who handles the framework while others contribute content.",
    considerations: [
      "Content contributors can stick to Markdown/Quarto",
      "Site structure changes require React knowledge",
      "One technical team member can handle framework updates",
      "Many universities have web services teams who can assist"
    ]
  },
  migration: {
    question: "What would migrating from a Quarto-only site involve?",
    icon: <RefreshCw className="h-5 w-5" />,
    shortAnswer: "Your existing Quarto content stays intact; you add a framework layer around it.",
    details: "Migration doesn't mean rewriting your Quarto documents. Instead, you'd create a new Next.js project that becomes the 'shell' of your site—handling navigation, styling, and any new interactive pages. Your existing Quarto output gets moved into a subdirectory and linked from the main navigation. It's additive, not replacement.",
    considerations: [
      "Existing Quarto .qmd files remain unchanged",
      "You gain: modern navigation, better mobile experience, interactive features",
      "Timeline: basic hybrid setup can be done in a few days",
      "Can be done incrementally—start small, expand over time"
    ]
  },
  maintenance: {
    question: "Which approach is easier to maintain long-term?",
    icon: <Clock className="h-5 w-5" />,
    shortAnswer: "It depends on your team's workflow and future needs.",
    details: "A Quarto-only site is simpler if all you need is rendered documents. A hybrid approach adds some complexity but provides flexibility for growth. Consider: Will you need user authentication? Interactive model demos? Dynamic content? If yes, a hybrid approach now saves painful migrations later. If no, Quarto-only may be sufficient.",
    considerations: [
      "Quarto-only: Simpler, but limited to static content",
      "Hybrid: More setup, but room to grow",
      "Modern frameworks have excellent documentation and community support",
      "The 'right' choice depends on your 3-5 year roadmap"
    ]
  },
  cms: {
    question: "What if we want a content management system (CMS) later?",
    icon: <Layers className="h-5 w-5" />,
    shortAnswer: "Most modern platforms integrate natively with popular CMS options.",
    details: "If you ever want non-technical team members to edit content through a visual interface (instead of code), platforms like Vercel, Netlify, and others offer native integrations with headless CMS platforms. These let you manage content in a user-friendly dashboard while the site stays fast and developer-friendly.",
    considerations: [
      "Contentful — Enterprise-grade, great for structured content",
      "Sanity — Flexible, real-time collaboration features",
      "WordPress (headless) — Familiar interface, can use existing WP skills",
      "Strapi — Open-source, self-hosted option",
      "No commitment required now—can add a CMS anytime"
    ]
  }
}

export default function HostingComparisonPage() {
  const [selectedConcept, setSelectedConcept] = useState<ConceptKey | null>(null)

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="bg-[#7A0019] text-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 text-xs font-medium bg-white/10 rounded-full border border-white/20">
              Technical Reference
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hosting Platform Comparison
          </h1>
          
          <p className="text-xl text-white/90 max-w-2xl mb-4">
            Comparing static hosting (GitHub Pages) with modern full-featured platforms—what&apos;s the difference, and what might work best for NatCap TEEMs?
          </p>

          <p className="text-base text-white/70 max-w-2xl mb-8">
            This comparison uses GitHub Pages and Vercel as examples, but the concepts apply broadly. Platforms like Netlify, Cloudflare Pages, and AWS Amplify offer similar capabilities—explore all options before deciding.
          </p>

          {/* Both Free Banner */}
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-[#FFCC33] text-[#7A0019] rounded-lg font-semibold">
            <Check className="h-5 w-5" />
            <span>Most modern hosting platforms offer generous free tiers</span>
          </div>
        </div>
      </section>

      {/* Quick Overview Cards */}
      <section className="py-12 px-6 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* GitHub Pages */}
            <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700">
                  <svg viewBox="0 0 16 16" className="h-8 w-8 text-slate-800 dark:text-white" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">GitHub Pages</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">by Microsoft</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                Simple static hosting directly from your GitHub repository. Best for straightforward sites without dynamic features.
              </p>
              <div className="flex items-center gap-2 text-[#7A0019] dark:text-[#FFCC33] font-semibold text-sm">
                <Check className="h-4 w-4" />
                Free
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Pro tier: $4/user/month (GitHub Team)
              </p>
            </div>

            {/* Modern Platforms */}
            <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-100 dark:to-white">
                  <Sparkles className="h-8 w-8 text-white dark:text-slate-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Modern Platforms</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Vercel, Netlify, Cloudflare, etc.</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                Full-featured platforms with serverless functions, edge computing, global CDNs, and framework-specific optimizations.
              </p>
              <div className="flex items-center gap-2 text-[#7A0019] dark:text-[#FFCC33] font-semibold text-sm">
                <Check className="h-4 w-4" />
                Free tiers available
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Pro tiers: $15-20/user/month typically
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Feature Comparison
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              A detailed breakdown of capabilities across free and paid tiers.
            </p>
          </div>

          {/* Column Headers */}
          <div className="mb-4 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            <div className="grid grid-cols-3 gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300"></div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Server className="h-4 w-4 text-slate-700 dark:text-white" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">Static-Only Hosts</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  GitHub Pages, GitLab Pages
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Sparkles className="h-4 w-4 text-slate-900 dark:text-white" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">Full-Featured Platforms</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Vercel, Netlify, Cloudflare Pages
                </div>
              </div>
            </div>
          </div>

          {/* Comparison tables by category */}
          <div className="space-y-6">
            {comparisonFeatures.map((category) => (
              <div key={category.category} className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{category.category}</h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {category.features.map((feature) => (
                    <div 
                      key={feature.name} 
                      className="grid grid-cols-3 gap-2 px-4 py-3 items-center"
                    >
                      <div className="text-slate-700 dark:text-slate-300 font-medium text-xs">{feature.name}</div>
                      {/* Static-Only */}
                      <div className="text-center border-l border-slate-100 dark:border-slate-800">
                        {typeof feature.staticOnly === 'boolean' ? (
                          feature.staticOnly ? (
                            <Check className="h-4 w-4 mx-auto text-emerald-500" />
                          ) : (
                            <X className="h-4 w-4 mx-auto text-slate-300 dark:text-slate-600" />
                          )
                        ) : (
                          <span className="text-xs text-slate-600 dark:text-slate-400">
                            {feature.staticOnly}
                          </span>
                        )}
                      </div>
                      {/* Full-Featured */}
                      <div className="text-center">
                        {typeof feature.fullFeatured === 'boolean' ? (
                          feature.fullFeatured ? (
                            <Check className="h-4 w-4 mx-auto text-emerald-500" />
                          ) : (
                            <X className="h-4 w-4 mx-auto text-slate-300 dark:text-slate-600" />
                          )
                        ) : (
                          <span className="text-xs text-slate-600 dark:text-slate-400">
                            {feature.fullFeatured}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Table header legend */}
          <div className="mt-4 flex justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" />
              <span>Supported</span>
            </div>
            <div className="flex items-center gap-2">
              <X className="h-4 w-4 text-slate-300" />
              <span>Not available</span>
            </div>
          </div>
        </div>
      </section>

      {/* How Websites Work Section */}
      <section className="py-16 px-6 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              How Websites Get to You
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              A simple overview of what happens when someone visits a website.
            </p>
          </div>

          {/* Journey Steps */}
          <div className="grid md:grid-cols-5 gap-4 items-start">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#7A0019] text-white flex items-center justify-center font-bold text-lg">1</div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">You Write Code</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Developers create the website files on their computer using code, images, and content.
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center pt-6">
              <ChevronRight className="h-6 w-6 text-slate-300" />
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#7A0019] text-white flex items-center justify-center font-bold text-lg">2</div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">Push to Host</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                The code is uploaded to a hosting platform (like GitHub or Vercel) which stores it on powerful servers.
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center pt-6">
              <ChevronRight className="h-6 w-6 text-slate-300" />
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#7A0019] text-white flex items-center justify-center font-bold text-lg">3</div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">Build & Distribute</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                The host builds your site and copies it to servers around the world (the &quot;edge&quot;) for fast access.
              </p>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid md:grid-cols-5 gap-4 items-start mt-8">
            {/* Step 4 */}
            <div className="text-center md:col-start-2">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#FFCC33] text-[#7A0019] flex items-center justify-center font-bold text-lg">4</div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">Visitor Requests</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                When someone types your URL, their browser asks for the website from the nearest server.
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center pt-6">
              <ChevronRight className="h-6 w-6 text-slate-300" />
            </div>

            {/* Step 5 */}
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#FFCC33] text-[#7A0019] flex items-center justify-center font-bold text-lg">5</div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">Page Delivered</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                The server sends back the website files, and the browser displays the page. Done!
              </p>
            </div>
          </div>

          {/* Why This Matters - Expanded */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">Why Does This Matter?</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Speed & Caching */}
              <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-[#FFCC33]/20">
                    <Zap className="h-5 w-5 text-[#7A0019]" />
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Speed Through Caching</h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  When your site is &quot;cached&quot; on servers worldwide, visitors get pre-built pages instantly—like picking up a ready-made meal instead of waiting for it to be cooked.
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Without caching, every visitor&apos;s request would require the server to rebuild the page from scratch. For a collaborator in Beijing, this could mean waiting several seconds instead of milliseconds.
                </p>
              </div>

              {/* Server-Side Power */}
              <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-[#FFCC33]/20">
                    <Server className="h-5 w-5 text-[#7A0019]" />
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Server-Side Capabilities</h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Server-side rendering (SSR) lets you run code on the server before sending pages to users. This enables powerful features that static sites can&apos;t offer:
                </p>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-[#7A0019]">•</span>
                    <span>Personalized content based on who&apos;s logged in</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7A0019]">•</span>
                    <span>Real-time data from databases or APIs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7A0019]">•</span>
                    <span>Secure operations that can&apos;t be exposed to browsers</span>
                  </li>
                </ul>
              </div>

              {/* Model Hosting */}
              <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-[#FFCC33]/20">
                    <Globe className="h-5 w-5 text-[#7A0019]" />
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Hosting or Linking Models</h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  If NatCap TEEMs wants to showcase earth-economy models, a modern hosting platform offers flexibility:
                </p>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-[#7A0019]">•</span>
                    <span><strong>Embed interactive demos</strong> directly on your site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7A0019]">•</span>
                    <span><strong>Link to external models</strong> hosted on dedicated compute servers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7A0019]">•</span>
                    <span><strong>API routes</strong> can securely connect your site to model backends</span>
                  </li>
                </ul>
              </div>

              {/* Authentication & Commerce */}
              <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-[#FFCC33]/20">
                    <Users className="h-5 w-5 text-[#7A0019]" />
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Authentication & Access Control</h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Need to restrict access to certain content or charge for model access? Server-side platforms enable:
                </p>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-[#7A0019]">•</span>
                    <span><strong>User authentication</strong> — login systems for collaborators or subscribers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7A0019]">•</span>
                    <span><strong>Gated content</strong> — restrict model access to authorized users</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7A0019]">•</span>
                    <span><strong>Payment integration</strong> — if you ever need to sell access or accept donations</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Summary */}
            <div className="mt-6 p-4 rounded-lg bg-[#7A0019]/5 border border-[#7A0019]/20 text-center">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <strong className="text-[#7A0019] dark:text-[#FFCC33]">Bottom line:</strong> A static-only host like GitHub Pages works great for simple informational sites. 
                But if you anticipate needing user accounts, model integrations, real-time data, or e-commerce features, 
                a platform with server-side capabilities gives you room to grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Concepts Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Key Concepts
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Click any term to learn more about these web technologies.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {(Object.keys(concepts) as ConceptKey[]).map((key) => {
              const concept = concepts[key]
              return (
                <button
                  key={key}
                  onClick={() => setSelectedConcept(key)}
                  className="group p-5 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-[#7A0019] dark:hover:border-[#FFCC33] hover:shadow-md transition-all duration-200 text-left cursor-pointer"
                >
                  <div className="mb-3 text-slate-500 dark:text-slate-400 group-hover:text-[#7A0019] dark:group-hover:text-[#FFCC33] transition-colors">
                    {concept.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">{concept.abbrev}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{concept.summary}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs text-slate-400 group-hover:text-[#7A0019] dark:group-hover:text-[#FFCC33] transition-colors">
                    <Info className="h-3 w-3" />
                    <span>Click to learn more</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Concept Modal */}
      <Dialog open={selectedConcept !== null} onOpenChange={() => setSelectedConcept(null)}>
        <DialogContent className="max-w-2xl">
          {selectedConcept && (
            <>
              <DialogHeader>
                <div className="inline-flex items-center gap-2 mb-2 text-[#7A0019] dark:text-[#FFCC33]">
                  {concepts[selectedConcept].icon}
                  <span className="text-sm font-semibold">{concepts[selectedConcept].abbrev}</span>
                </div>
                <DialogTitle className="text-2xl font-bold">
                  {concepts[selectedConcept].title}
                </DialogTitle>
              </DialogHeader>
              <DialogDescription asChild>
                <div className="space-y-6">
                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {concepts[selectedConcept].details}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-emerald-500" />
                        Key Benefits
                      </h4>
                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        {concepts[selectedConcept].benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-slate-400 mt-0.5">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-slate-500" />
                        Best For
                      </h4>
                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        {concepts[selectedConcept].useCases.map((useCase, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-slate-400 mt-0.5">•</span>
                            <span>{useCase}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Project Considerations */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Considerations for NatCap TEEMs
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Factors to consider when choosing a hosting platform for this project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Project Profile */}
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                  <Users className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Project Profile</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5">•</span>
                  <span>Research group with international collaborators</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5">•</span>
                  <span>Image-heavy content (research visualizations)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5">•</span>
                  <span>Academic credibility and professional appearance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5">•</span>
                  <span>Potential future: publications database, model demos</span>
                </li>
              </ul>
            </div>

            {/* Benefits of Modern Platforms */}
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                  <Globe className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Benefits of Modern Hosting Platforms</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-slate-700 dark:text-slate-300">Global CDN:</strong> Fast for international collaborators</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-slate-700 dark:text-slate-300">Auto image optimization:</strong> Important for image-heavy sites</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-slate-700 dark:text-slate-300">ISR support:</strong> Update content without full rebuilds</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-slate-700 dark:text-slate-300">API routes:</strong> Future-proof for interactive features</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Things to Consider */}
          <div className="mt-6 p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Things to Consider</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>UMN IT policies may have specific hosting requirements</span>
              </div>
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>Free tier limits are generous but monitor usage</span>
              </div>
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>Custom domain setup works with UMN subdomains</span>
              </div>
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>Both platforms have excellent uptime guarantees</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Questions You Might Have */}
      <section className="py-16 px-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <HelpCircle className="h-6 w-6 text-[#7A0019] dark:text-[#FFCC33]" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Questions You Might Have
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Common concerns about content authoring, Quarto, and modern frameworks—addressed.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {(Object.keys(faqItems) as FAQKey[]).map((key) => {
              const faq = faqItems[key]
              return (
                <AccordionItem 
                  key={key} 
                  value={key}
                  className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-5 overflow-hidden data-[state=open]:border-[#7A0019] dark:data-[state=open]:border-[#FFCC33] transition-colors duration-300"
                >
                  <AccordionTrigger className="py-5 hover:no-underline group">
                    <div className="flex items-start gap-4 text-left">
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:bg-[#FFCC33]/20 group-hover:text-[#7A0019] dark:group-hover:text-[#FFCC33] group-data-[state=open]:bg-[#FFCC33]/20 group-data-[state=open]:text-[#7A0019] dark:group-data-[state=open]:text-[#FFCC33] transition-colors duration-300 flex-shrink-0">
                        {faq.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-[#7A0019] dark:group-hover:text-[#FFCC33] group-data-[state=open]:text-[#7A0019] dark:group-data-[state=open]:text-[#FFCC33] transition-colors duration-300">
                          {faq.question}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {faq.shortAnswer}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="pl-14 space-y-4">
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {faq.details}
                      </p>
                      
                      <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2 text-sm">
                          <Info className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          Key Considerations
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                          {faq.considerations.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#7A0019] dark:text-[#FFCC33] mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>

          {/* Quarto Info Box */}
          <div className="mt-8 p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-[#FFCC33]/20">
                <FileText className="h-5 w-5 text-[#7A0019]" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">What is Quarto?</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Quarto is an open-source scientific publishing system that lets you write content in Markdown, R Markdown, or Jupyter notebooks and render it to HTML, PDF, or other formats. It&apos;s popular in academic and research settings because it integrates code, data, and narrative seamlessly.
                </p>
                <a 
                  href="https://quarto.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#7A0019] dark:text-[#FFCC33] font-medium hover:underline"
                >
                  Learn more at quarto.org
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deploying a Quarto Site */}
      <section className="py-16 px-6 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <Upload className="h-6 w-6 text-[#7A0019] dark:text-[#FFCC33]" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Deploying a Quarto Site
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Here&apos;s what deploying to a modern platform looks like. The process is straightforward and doesn&apos;t require changes to your existing Quarto project.
            </p>
          </div>

          {/* Time Estimate Banner */}
          <div className="mb-8 p-4 rounded-lg bg-[#FFCC33]/10 border border-[#FFCC33]/30 flex items-center justify-center gap-3">
            <Clock className="h-5 w-5 text-[#7A0019] dark:text-[#FFCC33]" />
            <span className="font-medium text-slate-900 dark:text-white">
              Estimated time: <span className="text-[#7A0019] dark:text-[#FFCC33]">Under 10 minutes</span>
            </span>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#7A0019] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-lg">
                    Build your Quarto site
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Run the Quarto render command to generate your static HTML files. This creates a directory (usually <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-sm font-mono">_site</code> or <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-sm font-mono">_book</code>) containing your website.
                  </p>
                  <div className="p-3 rounded-lg bg-slate-900 dark:bg-slate-800 font-mono text-sm text-slate-100 flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-slate-400" />
                    <span>quarto render</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#7A0019] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-lg">
                    Configure the output directory
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Most platforms need a config file to know where your built files are. The format varies slightly by platform:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                      <div className="px-4 py-2 bg-slate-200 dark:bg-slate-700 border-b border-slate-300 dark:border-slate-600 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">vercel.json (Vercel)</span>
                      </div>
                      <pre className="p-4 bg-slate-900 dark:bg-slate-800 text-sm text-slate-100 overflow-x-auto">
                        <code>{`{
  "buildCommand": "quarto render",
  "outputDirectory": "_site"
}`}</code>
                      </pre>
                    </div>
                    <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                      <div className="px-4 py-2 bg-slate-200 dark:bg-slate-700 border-b border-slate-300 dark:border-slate-600 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">netlify.toml (Netlify)</span>
                      </div>
                      <pre className="p-4 bg-slate-900 dark:bg-slate-800 text-sm text-slate-100 overflow-x-auto">
                        <code>{`[build]
  command = "quarto render"
  publish = "_site"`}</code>
                      </pre>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                    <Info className="h-4 w-4 inline mr-1" />
                    Adjust the output directory based on where Quarto outputs your files—could be <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-xs font-mono">_site</code>, <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-xs font-mono">_book</code>, or <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-xs font-mono">docs</code>.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#7A0019] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-lg">
                    Connect and Deploy
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Most platforms offer similar deployment options:
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Option A */}
                    <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <GitBranch className="h-4 w-4 text-[#7A0019] dark:text-[#FFCC33]" />
                        <span className="font-semibold text-slate-900 dark:text-white text-sm">Git Integration</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                        Connect your GitHub/GitLab repo and auto-deploy on every push
                      </p>
                      <span className="inline-block px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
                        Recommended
                      </span>
                    </div>

                    {/* Option B */}
                    <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <Terminal className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        <span className="font-semibold text-slate-900 dark:text-white text-sm">CLI Tools</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                        Use platform CLI tools for quick deploys from the command line
                      </p>
                      <span className="inline-block px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs font-medium">
                        Quick deploys
                      </span>
                    </div>

                    {/* Option C */}
                    <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <MousePointer className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        <span className="font-semibold text-slate-900 dark:text-white text-sm">Drag & Drop</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                        Drag your built <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono">_site</code> folder to the platform dashboard
                      </p>
                      <span className="inline-block px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs font-medium">
                        One-time deploys
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What You Get */}
          <div className="mt-8 p-6 rounded-xl bg-[#7A0019]/5 border border-[#7A0019]/20">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Check className="h-5 w-5 text-emerald-500" />
              What you get immediately
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Globe className="h-4 w-4 text-[#7A0019] dark:text-[#FFCC33]" />
                <span>Global CDN</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Check className="h-4 w-4 text-[#7A0019] dark:text-[#FFCC33]" />
                <span>Automatic HTTPS</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Zap className="h-4 w-4 text-[#7A0019] dark:text-[#FFCC33]" />
                <span>Preview URLs</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <RefreshCw className="h-4 w-4 text-[#7A0019] dark:text-[#FFCC33]" />
                <span>Auto deploys on push</span>
              </div>
            </div>
          </div>

          {/* Video Tutorial */}
          <div className="mt-8 p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[#7A0019] text-white">
                <Play className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Video Walkthrough</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Watch a step-by-step tutorial</p>
              </div>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden border border-slate-300 dark:border-slate-600">
              <iframe
                src="https://www.youtube.com/embed/hAuyNf0Uk-w?start=379"
                title="Deploying Quarto to Vercel - Video Tutorial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Platform Options */}
      <section className="py-16 px-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Platform Comparison
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Each platform has its strengths. Here&apos;s a quick comparison to help you decide.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {platformOptions.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#7A0019] dark:hover:border-[#FFCC33] hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{platform.name}</h3>
                  <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-[#7A0019] dark:group-hover:text-[#FFCC33] transition-colors" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{platform.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {platform.strengths.map((strength) => (
                    <span key={strength} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-xs text-slate-600 dark:text-slate-400">
                      {strength}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                  <Check className="h-3 w-3" />
                  <span>{platform.freeHighlight}</span>
                </div>
              </a>
            ))}
          </div>
          
          <div className="mt-8 p-4 rounded-lg bg-[#7A0019]/5 border border-[#7A0019]/20 text-center">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <strong className="text-[#7A0019] dark:text-[#FFCC33]">Recommendation:</strong> For most academic projects, any of these platforms will work well. 
              Choose based on your team&apos;s familiarity, specific feature needs, and institutional preferences.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-[#7A0019] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Platform Documentation</h2>
          <p className="text-white/80 mb-8">
            Explore the official documentation for popular hosting platforms.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <a
              href="https://docs.github.com/pages"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-[#7A0019] font-semibold rounded-lg hover:bg-slate-100 transition-colors text-sm"
            >
              <BookOpen className="h-4 w-4" />
              GitHub Pages
              <ExternalLink className="h-3 w-3 opacity-50" />
            </a>
            <a
              href="https://vercel.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-colors text-sm"
            >
              <BookOpen className="h-4 w-4" />
              Vercel
              <ExternalLink className="h-3 w-3 opacity-50" />
            </a>
            <a
              href="https://docs.netlify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-colors text-sm"
            >
              <BookOpen className="h-4 w-4" />
              Netlify
              <ExternalLink className="h-3 w-3 opacity-50" />
            </a>
            <a
              href="https://developers.cloudflare.com/pages"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-colors text-sm"
            >
              <BookOpen className="h-4 w-4" />
              Cloudflare Pages
              <ExternalLink className="h-3 w-3 opacity-50" />
            </a>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}

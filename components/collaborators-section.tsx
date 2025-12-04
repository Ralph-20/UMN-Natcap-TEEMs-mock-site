"use client"

import { ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const collaborators = [
  {
    name: "WWF",
    fullName: "World Wildlife Fund",
    url: "https://www.worldwildlife.org",
    logo: "/images/wwf.png",
  },
  {
    name: "CAS",
    fullName: "Chinese Academy of Sciences",
    url: "https://english.cas.cn",
    logo: "/images/chinese-academy-of-sci.png",
  },
  {
    name: "Stanford",
    fullName: "Stanford University",
    url: "https://www.stanford.edu",
    logo: "/images/stanford.png",
  },
  {
    name: "TNC",
    fullName: "The Nature Conservancy",
    url: "https://www.nature.org",
    logo: "/images/thenatureconvervacy.png",
  },
  {
    name: "KVA",
    fullName: "Royal Swedish Academy",
    url: "https://www.kva.se",
    logo: "/images/kvawhite-0.png",
  },
  {
    name: "SRC",
    fullName: "Stockholm Resilience Centre",
    url: "https://www.stockholmresilience.org",
    logo: "/images/srcwhite.png",
  },
]

export function CollaboratorsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: "50px 0px" },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-12 sm:py-20 md:py-28 bg-muted/50 overflow-hidden relative">
      {/* Decorative background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7A0019]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#FFCC33]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10 sm:mb-16">
          <span
            className={`inline-block text-xs sm:text-sm font-semibold text-[#7A0019] uppercase tracking-wider px-3 sm:px-4 py-1 sm:py-1.5 bg-[#7A0019]/5 rounded-full transition-opacity ${
              isVisible ? "animate-fade-in-up" : "invisible"
            }`}
          >
            Our Network
          </span>
          <h3
            className={`text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-3 sm:mt-4 text-balance ${
              isVisible ? "animate-fade-in-up animation-delay-100" : "invisible"
            }`}
          >
            Meet Our Collaborators
          </h3>
          <p
            className={`text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed ${
              isVisible ? "animate-fade-in-up animation-delay-200" : "invisible"
            }`}
          >
            NatCap TEEMs is part of the Natural Capital Project, a global partnership pioneering science, technology,
            and partnerships that enable people and nature to thrive.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {collaborators.map((collab, index) => (
            <Link
              key={collab.name}
              href={collab.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 bg-card rounded-xl border border-border hover:border-[#7A0019]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#7A0019]/10 hover:-translate-y-3 hover:scale-105 active:scale-100 ${
                isVisible ? "animate-scale-in" : "invisible"
              }`}
              style={{ animationDelay: isVisible ? `${index * 100 + 300}ms` : "0ms" }}
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#7A0019]/0 to-[#FFCC33]/0 group-hover:from-[#7A0019]/10 group-hover:to-[#FFCC33]/10 transition-all duration-500" />

              <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-3 sm:mb-4 rounded-full overflow-hidden bg-white shadow-lg group-hover:shadow-2xl group-hover:shadow-[#7A0019]/30 transition-all duration-500 border-2 border-gray-100 group-hover:border-[#7A0019]/20 group-hover:scale-110 group-hover:rotate-6">
                <Image
                  src={collab.logo || "/placeholder.svg"}
                  alt={`${collab.fullName} logo`}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                />
              </div>

              <span className="relative font-bold text-foreground text-sm sm:text-base group-hover:text-[#7A0019] transition-colors duration-300">
                {collab.name}
              </span>
              <span className="relative text-[10px] sm:text-xs text-muted-foreground mt-1 text-center line-clamp-2 group-hover:text-foreground/70 transition-colors">
                {collab.fullName}
              </span>

              <div className="relative mt-2 sm:mt-3 hidden sm:flex items-center gap-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span>Visit</span>
                <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div
          className={`mt-10 sm:mt-16 text-center ${isVisible ? "animate-fade-in-up animation-delay-600" : "invisible"}`}
        >
          <Link
            href="https://naturalcapitalproject.stanford.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-[#7A0019] font-semibold bg-[#7A0019]/5 rounded-full hover:bg-[#7A0019]/10 transition-all duration-300"
          >
            Learn about the Natural Capital Project
            <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

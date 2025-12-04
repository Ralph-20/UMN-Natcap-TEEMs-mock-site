"use client"

import { ArrowRight, Users, BookOpen, Server } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export function CTASection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-12 sm:py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#7A0019]/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-[#FFCC33]/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {/* Who Are We Card */}
          <Link
            href="/people"
            className={`group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#7A0019] via-[#6a0016] to-[#5a0013] p-6 sm:p-8 text-white transition-all duration-700 hover:shadow-2xl hover:shadow-[#7A0019]/40 hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center mb-4 sm:mb-6 shadow-lg backdrop-blur-sm border border-white/10">
                <Users className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 drop-shadow-md">Who are we?</h4>
              <p className="text-white/85 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Meet the researchers and scientists behind our earth-economy models.
              </p>
              <span className="inline-flex items-center gap-2 font-semibold text-[#FFCC33] group-hover:gap-3 transition-all drop-shadow-md text-sm sm:text-base">
                Meet the team
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFCC33]/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
          </Link>

          {/* Learn More Card */}
          <Link
            href="/models"
            className={`group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FFCC33] via-[#f0c030] to-[#e6b800] p-6 sm:p-8 text-[#7A0019] transition-all duration-700 delay-100 hover:shadow-2xl hover:shadow-[#FFCC33]/40 hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#7A0019]/15 to-[#7A0019]/5 flex items-center justify-center mb-4 sm:mb-6 shadow-lg border border-[#7A0019]/10">
                <BookOpen className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 drop-shadow-sm">
                Want to learn more?
              </h4>
              <p className="text-[#7A0019]/85 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Explore our cutting-edge earth-economy models and research.
              </p>
              <span className="inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all text-sm sm:text-base">
                Check out our models
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
            </div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#7A0019]/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
          </Link>

          {/* Hosting Comparison Card */}
          <Link
            href="/hosting-comparison"
            className={`group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 p-6 sm:p-8 text-white transition-all duration-700 delay-200 hover:shadow-2xl hover:shadow-slate-500/40 hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center mb-4 sm:mb-6 shadow-lg backdrop-blur-sm border border-white/10">
                <Server className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 drop-shadow-md">
                Hosting Options
              </h4>
              <p className="text-white/85 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Compare GitHub Pages vs Vercel for hosting this website.
              </p>
              <span className="inline-flex items-center gap-2 font-semibold text-slate-200 group-hover:gap-3 transition-all drop-shadow-md text-sm sm:text-base">
                View comparison
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
          </Link>
        </div>
      </div>
    </section>
  )
}


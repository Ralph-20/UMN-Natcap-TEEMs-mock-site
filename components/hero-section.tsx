"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#7A0019] via-[#5a0013] to-[#7A0019]">
        {/* Decorative gradient orbs for visual interest */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFCC33]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#7A0019]/50 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full">
        <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
          <Image
            src="/images/hero-campus.jpg"
            alt="Aerial view of University of Minnesota St. Paul campus with agricultural research fields and greenhouses"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#7A0019]/90 via-[#7A0019]/60 to-[#7A0019]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#7A0019]/80 via-transparent to-[#7A0019]/20" />
          {/* Extra shadow at bottom for depth */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
            <div className="max-w-3xl">
              <div
                className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#FFCC33]/20 text-[#FFCC33] text-xs sm:text-sm font-medium mb-3 sm:mb-4 backdrop-blur-md border border-[#FFCC33]/30 shadow-lg transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#FFCC33] animate-pulse" />
                Natural Capital Project
              </div>

              <h2
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight text-balance drop-shadow-2xl transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                NatCap TEEMs
              </h2>
              <p
                className={`text-base sm:text-lg md:text-xl lg:text-2xl text-[#FFCC33] font-semibold mt-1 sm:mt-2 mb-3 sm:mb-4 drop-shadow-lg transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                The Earth-Economy Modelers
              </p>

              <p
                className={`text-sm sm:text-base md:text-lg text-white/95 leading-relaxed max-w-2xl drop-shadow-md transition-all duration-700 delay-300 hidden xs:block ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                Pioneering the integration of ecological, climate, and economic data to inform decision-making for
                sustainable development on a livable planet.
              </p>

              <div
                className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <Link
                  href="#mission"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#FFCC33] text-[#7A0019] font-bold rounded-xl hover:bg-[#FFDE7A] hover:shadow-2xl hover:shadow-[#FFCC33]/30 hover:scale-105 transition-all duration-300 group shadow-xl text-sm sm:text-base active:scale-100"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/models"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/60 text-white font-bold rounded-xl hover:bg-white/15 hover:border-white hover:shadow-xl hover:shadow-white/10 hover:scale-105 transition-all duration-300 backdrop-blur-md text-sm sm:text-base active:scale-100"
                >
                  Explore Our Models
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration with enhanced shadow */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-2xl"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="var(--background)"
          />
        </svg>
      </div>
    </section>
  )
}

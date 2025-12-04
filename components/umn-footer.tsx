"use client"

import Link from "next/link"
import { Linkedin, Mail, MapPin, Gift } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function UMNFooter() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className="border-t border-border">
      {/* Unit Footer */}
      <div className="bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 items-start">
            {/* Contact Info */}
            <div
              className={`space-y-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <h5 className="font-semibold text-foreground">Contact Us</h5>
              <div className="space-y-3 text-sm text-muted-foreground">
                <a
                  href="mailto:natcapteems@umn.edu"
                  className="flex items-center gap-2 hover:text-[#7A0019] hover:translate-x-1 transition-all"
                >
                  <Mail className="h-4 w-4" />
                  natcapteems@umn.edu
                </a>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <address className="not-italic">
                    337 Ruttan Hall
                    <br />
                    1994 Buford Avenue
                    <br />
                    Saint Paul, MN 55108
                  </address>
                </div>
              </div>
            </div>

            {/* Logo - Center on mobile, reorder for better flow */}
            <div
              className={`flex flex-col items-center justify-center order-first sm:order-none transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 40 40" className="h-8 w-8 sm:h-10 sm:w-10 text-[#7A0019]" fill="currentColor">
                  <path d="M0 0h40v40H0V0zm4 4v32h32V4H4zm4 4h8l4 16 4-16h8v24h-6V14l-4 18h-4l-4-18v18H8V8z" />
                </svg>
                <div>
                  <div className="font-bold text-foreground">NatCap TEEMs</div>
                  <div className="text-xs text-muted-foreground">The Earth-Economy Modelers</div>
                  <div className="text-xs text-[#7A0019] font-medium">University of Minnesota</div>
                </div>
              </div>
            </div>

            {/* Actions - Better mobile alignment */}
            <div
              className={`flex flex-col sm:items-end gap-4 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <Link
                href="https://give.umn.edu"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#7A0019] text-white font-semibold rounded-lg hover:bg-[#5a0013] hover:shadow-lg hover:shadow-[#7A0019]/30 hover:scale-105 active:scale-100 transition-all w-full sm:w-auto"
              >
                <Gift className="h-4 w-4" />
                Make a gift
              </Link>
              <div className="flex items-center justify-center sm:justify-end gap-3">
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-[#7A0019] hover:text-white hover:scale-110 active:scale-100 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Required University Footer */}
      <div className="bg-[#7A0019] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} Regents of the{" "}
              <Link href="https://umn.edu" className="underline hover:no-underline">
                University of Minnesota
              </Link>
              . All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-white/80">
              <span className="text-center">
                The University of Minnesota is an equal opportunity educator and employer.
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-3 sm:mt-4 text-xs sm:text-sm">
            <Link href="https://privacy.umn.edu" className="hover:underline">
              Privacy Statement
            </Link>
            <span className="text-white/40">|</span>
            <Link href="https://accessibility.umn.edu/report-issue" className="hover:underline">
              Report Web Accessibility Issues
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

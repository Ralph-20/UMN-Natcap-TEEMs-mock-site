"use client"

import { Globe, TrendingUp, Leaf, Users } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const features = [
  {
    icon: Globe,
    title: "Earth Systems Integration",
    description: "Advanced modeling that connects ecological and climate systems with economic activity.",
  },
  {
    icon: TrendingUp,
    title: "Economic Analysis",
    description: "Data-driven insights on how economic decisions impact our planet's natural capital.",
  },
  {
    icon: Leaf,
    title: "Sustainable Development",
    description: "Research enabling policymakers to balance prosperity with environmental stewardship.",
  },
  {
    icon: Users,
    title: "Global Partnership",
    description: "Collaborating with world-leading institutions to pioneer earth-economy solutions.",
  },
]

export function MissionSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="mission" ref={sectionRef} className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -right-32 w-96 h-96 bg-[#FFCC33]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-32 w-80 h-80 bg-[#7A0019]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Mission Text with entrance animation */}
          <div
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <span className="text-sm font-semibold text-[#7A0019] uppercase tracking-wider">Our Mission</span>
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-6 text-balance">
              Understanding the Integrated Earth-Economy System
            </h3>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">NatCap TEEMs</strong> (Natural Capital Project: The Earth-Economy
                Modelers) aims to improve our understanding of the integrated earth-economy system and to inform
                decision-making for sustainable development on a livable planet.
              </p>
              <p>
                Economic activity is the dominant force shaping Earth systems in the 21st century. Over the past two
                centuries, economic expansion has led to <em>unprecedented advancements</em> in standards of living and{" "}
                <em>unintended consequences</em> for the environment, including climate change and loss of biodiversity.
              </p>
              <p>
                TEEMs uses advanced modeling and foundational expertise to align economic systems with stewardship of
                earth systems to ensure sustainable prosperity.
              </p>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-[#FFCC33]/15 to-[#FFCC33]/5 border-l-4 border-[#FFCC33] rounded-r-xl shadow-lg shadow-[#FFCC33]/10">
              <p className="text-foreground font-medium">
                NatCap TEEMs integrates ecological, climate, and economic data in Earth-Economy models to inform
                decision-making for sustainable development.
              </p>
            </div>
          </div>

          {/* Right Column - Feature Cards with staggered entrance */}
          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group p-6 bg-card rounded-xl border border-border hover:border-[#7A0019]/30 shadow-sm hover:shadow-2xl hover:shadow-[#7A0019]/10 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] active:scale-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: isVisible ? `${index * 100 + 200}ms` : "0ms" }}
              >
                <div className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-[#7A0019]/30 group-hover:scale-110 group-hover:rotate-6 transition-[transform,box-shadow] duration-300 ease-out">
                  {/* Background layer that fades out */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#7A0019]/10 to-[#7A0019]/5 transition-opacity duration-700 ease-in-out group-hover:opacity-0" />
                  {/* Hover background layer that fades in */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#7A0019] to-[#5a0013] opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100" />
                  <feature.icon className="relative z-10 h-6 w-6 text-[#7A0019] group-hover:text-white group-hover:scale-110 transition-[transform] duration-300 ease-out [transition:transform_300ms_ease-out,color_700ms_ease-in-out]" />
                </div>
                <h4 className="font-semibold text-foreground mb-2 group-hover:text-[#7A0019] transition-colors duration-500 ease-in-out">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-500 ease-in-out">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

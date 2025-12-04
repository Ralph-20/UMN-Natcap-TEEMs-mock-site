import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Models | NatCap TEEMs | University of Minnesota",
  description: "Explore our cutting-edge earth-economy models and research.",
}

export default function ModelsPage() {
  return (
    <div className="min-h-[600px] flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FFCC33]/20 mb-4">
          <svg
            className="w-10 h-10 text-[#7A0019]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Models</h1>
        
        <div className="py-6">
          <p className="text-2xl text-muted-foreground font-medium">To be implemented</p>
        </div>

        <p className="text-muted-foreground max-w-md mx-auto">
          This page will showcase our earth-economy models and cutting-edge research.
        </p>

        <div className="pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#7A0019] text-white font-semibold rounded-lg hover:bg-[#5a0013] hover:shadow-lg hover:shadow-[#7A0019]/30 hover:scale-105 active:scale-100 transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}


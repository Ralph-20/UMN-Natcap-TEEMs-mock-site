import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "People | NatCap TEEMs | University of Minnesota",
  description: "Meet the researchers and scientists behind NatCap TEEMs earth-economy models.",
}

export default function PeoplePage() {
  return (
    <div className="min-h-[600px] flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#7A0019]/10 mb-4">
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-foreground">People</h1>
        
        <div className="py-6">
          <p className="text-2xl text-muted-foreground font-medium">To be implemented</p>
        </div>

        <p className="text-muted-foreground max-w-md mx-auto">
          This page will feature our team of researchers and scientists working on earth-economy models.
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


'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

const STORAGE_KEY = 'natcap-teems-disclaimer-acknowledged'

export function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if user has already acknowledged the disclaimer
    const hasAcknowledged = localStorage.getItem(STORAGE_KEY)
    if (!hasAcknowledged) {
      setIsOpen(true)
    }
  }, [])

  const handleAcknowledge = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setIsOpen(false)
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) return null

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent 
        showCloseButton={false}
        className="sm:max-w-md border-amber-500/50 bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/30 dark:to-background"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center sm:text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50">
            <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <DialogTitle className="text-xl">Important Notice</DialogTitle>
          <DialogDescription className="text-base text-foreground/80 pt-2">
            This is <span className="font-semibold">not associated with the University of Minnesota</span> currently in any way. 
            This is a <span className="font-semibold">mock test site</span> for proof of concept purposes only.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center pt-2">
          <Button 
            onClick={handleAcknowledge}
            className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white cursor-pointer"
          >
            I Understand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


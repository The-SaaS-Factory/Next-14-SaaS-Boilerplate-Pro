'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CalendarDaysIcon, Copy } from "lucide-react"
import { HandRaisedIcon } from "@heroicons/react/24/outline"

export default function PromoCTA() {
  const [usesLeft, setUsesLeft] = useState(10)
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState('')
  const discountCode = "MC1AVGQQ"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(discountCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    if (usesLeft > 0) {
      setUsesLeft(usesLeft - 1)
    }
  }

  useEffect(() => {
    const targetDate = new Date('2024-12-01T00:00:00').getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
      } else {
        setTimeLeft('Offer expired')
      }
    }

    const timer = setInterval(updateCountdown, 1000)
    updateCountdown()

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
              Launch Special Offer!
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              For the launch of our new membership that includes the
              boilerplate pro, we have launched a super discount
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <code className="bg-background text-white font-bold text-2xl text-foreground px-2 py-1 rounded">
                {discountCode}
              </code>
              <Button size="sm" variant="outline" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CalendarDaysIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-white"
                />
              </div>
              <dt className="mt-4 text-base font-semibold text-white">
                Limited time
              </dt>
              <dd className="mt-2 text-base/7 text-gray-400">
                Offer ends on December 1st
              </dd>
              <dd className="mt-2 text-base/7 text-white font-medium">
                Time left: {timeLeft}
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <HandRaisedIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-white"
                />
              </div>
              <dt className="mt-4 text-base font-semibold text-white">
                Limited use
              </dt>
              <dd className="mt-2 text-base/7 text-gray-400">
                Only for the first 100 users
              </dd>
             
            </div>
          </dl>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
    </div>
  )
}
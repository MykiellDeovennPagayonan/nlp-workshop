import { CircleChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function BackButton() {
  return (
    <Link href={"/"} className="absolute top-5 md:top-6 left-3 md:left-8 flex flex-row items-center gap-2 cursor-pointer rounded-lg">
      <CircleChevronLeft className="size-10" />
      <div className="text-xl">Go back</div>
    </Link>
  )
}
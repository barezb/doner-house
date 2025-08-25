'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/about', label: 'About Us' },
    { href: '/franchise', label: 'Franchise' },
  ]

  return (
    <header className="bg-doner-black sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <div className="text-white font-bronco text-2xl flex items-center gap-2">
              <div className="w-12 h-12 bg-doner-red rounded-lg flex items-center justify-center">
                <span className="text-3xl">🥙</span>
              </div>
              <span>DONER HOUSE</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-doner-white hover:text-doner-amber transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-doner-white text-3xl"
          >
            {isMenuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 px-4 text-doner-white hover:text-doner-amber transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
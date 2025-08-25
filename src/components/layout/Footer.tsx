import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-doner-black text-doner-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bronco text-2xl mb-4">DONER HOUSE</h3>
            <p className="text-sm">
              Authentic Mediterranean cuisine served with passion and tradition.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/menu" className="hover:text-doner-amber">Menu</Link></li>
              <li><Link href="/about" className="hover:text-doner-amber">About Us</Link></li>
              <li><Link href="/franchise" className="hover:text-doner-amber">Franchise</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-2xl hover:text-doner-amber transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl hover:text-doner-amber transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-2xl hover:text-doner-amber transition-colors">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 Doner House. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
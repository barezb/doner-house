import Image from 'next/image'
import Link from 'next/link'
import { FaFire, FaLeaf, FaClock } from 'react-icons/fa'

export default function HomePage() {
  return (
    <div>
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-doner-red to-doner-vermillion">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-bronco text-5xl md:text-7xl mb-4">
            WELCOME TO DONER HOUSE
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Authentic Mediterranean Flavors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/menu" className="btn-primary inline-block">
              View Menu
            </Link>
            <Link href="/franchise" className="btn-secondary inline-block">
              Franchise Opportunities
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-bronco text-4xl text-center mb-12">
            WHY CHOOSE DONER HOUSE?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl text-doner-vermillion mb-4 flex justify-center">
                <FaFire />
              </div>
              <h3 className="font-bronco text-2xl mb-2">FRESH & HOT</h3>
              <p>Made to order with the freshest ingredients</p>
            </div>
            <div className="text-center">
              <div className="text-5xl text-doner-vermillion mb-4 flex justify-center">
                <FaLeaf />
              </div>
              <h3 className="font-bronco text-2xl mb-2">QUALITY INGREDIENTS</h3>
              <p>Premium meats and locally sourced produce</p>
            </div>
            <div className="text-center">
              <div className="text-5xl text-doner-vermillion mb-4 flex justify-center">
                <FaClock />
              </div>
              <h3 className="font-bronco text-2xl mb-2">FAST SERVICE</h3>
              <p>Quick preparation without compromising quality</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-doner-white">
        <div className="container mx-auto px-4">
          <h2 className="font-bronco text-4xl text-center mb-12">
            FEATURED ITEMS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="h-48 bg-gradient-to-br from-doner-amber to-doner-vermillion"></div>
              <div className="p-6">
                <h3 className="font-bronco text-2xl mb-2">CLASSIC DONER</h3>
                <p className="text-gray-600 mb-4">
                  Our signature doner kebab with special sauce
                </p>
                <Link href="/menu" className="text-doner-vermillion font-bold hover:underline">
                  View Menu →
                </Link>
              </div>
            </div>
            <div className="card">
              <div className="h-48 bg-gradient-to-br from-doner-red to-doner-black"></div>
              <div className="p-6">
                <h3 className="font-bronco text-2xl mb-2">GOURMET BURGER</h3>
                <p className="text-gray-600 mb-4">
                  Juicy beef patty with Mediterranean spices
                </p>
                <Link href="/menu" className="text-doner-vermillion font-bold hover:underline">
                  View Menu →
                </Link>
              </div>
            </div>
            <div className="card">
              <div className="h-48 bg-gradient-to-br from-doner-vermillion to-doner-amber"></div>
              <div className="p-6">
                <h3 className="font-bronco text-2xl mb-2">STONE OVEN PIZZA</h3>
                <p className="text-gray-600 mb-4">
                  Traditional pizza with fresh toppings
                </p>
                <Link href="/menu" className="text-doner-vermillion font-bold hover:underline">
                  View Menu →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
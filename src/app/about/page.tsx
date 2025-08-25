export default function AboutPage() {
  return (
    <div className="min-h-screen bg-doner-white">
      <div className="bg-gradient-to-br from-doner-red to-doner-vermillion py-16">
        <h1 className="font-bronco text-5xl text-center text-white">ABOUT US</h1>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="font-bronco text-3xl mb-6 text-doner-black">OUR STORY</h2>
            <p className="text-gray-700 mb-4">
              Founded with a passion for authentic Mediterranean cuisine, Doner House brings 
              the rich flavors and traditions of the Mediterranean to your neighborhood. 
              Our journey began with a simple vision: to serve fresh, flavorful food made 
              with love and the finest ingredients.
            </p>
            <p className="text-gray-700 mb-4">
              Every dish at Doner House is crafted with care, from our signature doner kebabs 
              to our stone-oven pizzas. We believe in quality over quantity, ensuring each 
              meal is an experience to remember.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="card p-6">
              <h3 className="font-bronco text-2xl mb-4 text-doner-vermillion">OUR MISSION</h3>
              <p className="text-gray-700">
                To provide authentic, delicious Mediterranean cuisine in a warm, welcoming 
                atmosphere while maintaining the highest standards of quality and service.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-bronco text-2xl mb-4 text-doner-vermillion">OUR VALUES</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Fresh, quality ingredients</li>
                <li>• Authentic preparation methods</li>
                <li>• Exceptional customer service</li>
                <li>• Community engagement</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <h3 className="font-bronco text-2xl mb-4">VISIT US TODAY</h3>
            <p className="text-gray-700 mb-8">
              Experience the taste of the Mediterranean at Doner House. 
              We look forward to serving you!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default function FranchisePage() {
  return (
    <div className="min-h-screen bg-doner-white">
      <div className="bg-gradient-to-br from-doner-red to-doner-vermillion py-16">
        <h1 className="font-bronco text-5xl text-center text-white">FRANCHISE OPPORTUNITIES</h1>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-bronco text-3xl mb-6 text-doner-black">
              JOIN THE DONER HOUSE FAMILY
            </h2>
            <p className="text-gray-700 text-lg">
              Be part of a growing brand that's revolutionizing Mediterranean cuisine
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card p-6 text-center">
              <div className="text-4xl text-doner-vermillion mb-4">💼</div>
              <h3 className="font-bronco text-xl mb-2">PROVEN BUSINESS MODEL</h3>
              <p className="text-gray-600 text-sm">
                Established systems and processes for success
              </p>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl text-doner-vermillion mb-4">📈</div>
              <h3 className="font-bronco text-xl mb-2">GROWING MARKET</h3>
              <p className="text-gray-600 text-sm">
                Mediterranean cuisine is increasingly popular
              </p>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl text-doner-vermillion mb-4">🤝</div>
              <h3 className="font-bronco text-xl mb-2">FULL SUPPORT</h3>
              <p className="text-gray-600 text-sm">
                Training, marketing, and ongoing assistance
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h3 className="font-bronco text-2xl mb-6">WHAT WE OFFER</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-doner-vermillion mr-3">✓</span>
                <div>
                  <h4 className="font-bold mb-1">Comprehensive Training</h4>
                  <p className="text-gray-600">Complete training program for you and your staff</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-doner-vermillion mr-3">✓</span>
                <div>
                  <h4 className="font-bold mb-1">Marketing Support</h4>
                  <p className="text-gray-600">National and local marketing campaigns</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-doner-vermillion mr-3">✓</span>
                <div>
                  <h4 className="font-bold mb-1">Site Selection</h4>
                  <p className="text-gray-600">Help finding the perfect location</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-doner-vermillion mr-3">✓</span>
                <div>
                  <h4 className="font-bold mb-1">Ongoing Support</h4>
                  <p className="text-gray-600">Continuous operational and business support</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="font-bronco text-2xl mb-4">GET STARTED TODAY</h3>
            <p className="text-gray-700 mb-6">
              Contact us to learn more about franchise opportunities
            </p>
            <button className="btn-primary">
              Request Information
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
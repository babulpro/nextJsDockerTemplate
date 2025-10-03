import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="font-Geist ">
      <div className="p-3 ">
        

        {/* Why HouseRent? */}
        <div className="mx-auto w-full text-white p-6 md:p-8 shadow-2xl mt-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold md:mb-10 mb-2 underline text-center">
              Why Use HouseRent for Your Home & Room Needs?
            </h2>
            <p className="text-slate-200/90 mb-6">
              Save time and money by connecting directly with people in your
              area. Whether you want to rent or earn from your property,
              HouseRent gives you the tools to make it happen.
            </p>
          </div>

          {/* Key benefits */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="rounded-lg bg-white/10 p-4">
              <h3 className="font-semibold mb-1">Location-Based Search</h3>
              <p className="text-sm text-slate-200/80">
                Quickly find homes and rooms near your current location.
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-4">
              <h3 className="font-semibold mb-1">Direct Booking</h3>
              <p className="text-sm text-slate-200/80">
                Send booking requests instantly—no middleman.
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-4">
              <h3 className="font-semibold mb-1">Advertise Easily</h3>
              <p className="text-sm text-slate-200/80">
                List your home/room in a few clicks and start earning.
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-4">
              <h3 className="font-semibold mb-1">Safe & Transparent</h3>
              <p className="text-sm text-slate-200/80">
                Verified users and secure communication for peace of mind.
              </p>
            </div>
          </div>

          {/* Practical bullets */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">How It Works</h4>
            <div className="grid md:grid-cols-2 md:gap-5 md:min-h-64 min-h-80">
              <div>
                <ul className="list-disc pl-5 space-y-1 text-slate-100/90">
                  <li>Register and set up your profile.</li>
                  <li>Search nearby homes or rooms with map integration.</li>
                  <li>Send booking requests directly to owners.</li>
                  <li>Advertise your own property in simple steps.</li>
                  <li>Stay updated with confirmations & alerts.</li>
                </ul>
              </div>
              <div className="w-full h-32">
                <Image
                  src={`/Register.jpg`}
                  alt="Hero Image"
                  width={500}
                  height={400}
                  quality={100}
                  className="rounded-lg p-2"
                />
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-3 mt-10">
            <Link
              className="btn bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2"
              href={"/dashboard/pages/property/addProperty"}
            >
              List Your Property Now
            </Link>
            <span className="text-slate-200/80 text-sm">
              It takes 2 minutes to start renting.
            </span>
          </div>
        </div>
      </div>

      {/* Habit Section → Renting Benefits */}
      <div className="mx-auto w-full text-white p-6 md:p-12 shadow-2xl mt-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold md:mb-10 mb-4 underline text-center">
          Renting Made Simple & Effective
        </h2>
        <p className="text-slate-200/90 mb-10 text-center max-w-3xl mx-auto">
          HouseRent bridges the gap between tenants and homeowners. Post your
          listing, get visibility, and connect directly with people looking for
          homes in your area.
        </p>

        {/* Alternating Layout */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          {/* Left: Image */}
          <div className="w-full h-64">
            <Image
              src={`/rent1.webp`}
              alt="Property Search"
              width={500}
              height={400}
              quality={100}
              className="rounded-xl shadow-lg object-cover h-full w-full"
            />
          </div>

          {/* Right: Content */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Why Advertise Here?</h3>
            <p className="text-slate-300 mb-4">
              Listing your home with HouseRent means reaching people actively
              searching in your area. No need for agents, extra costs, or
              waiting.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-100/90">
              <li>Free & easy listing setup.</li>
              <li>Location-based reach.</li>
              <li>Direct booking requests.</li>
              <li>More visibility, less hassle.</li>
            </ul>
          </div>
        </div>

        {/* Reversed Layout */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          {/* Left: Content */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Benefits for Tenants</h3>
            <p className="text-slate-300 mb-4">
              Tenants can browse hundreds of verified listings near them and
              contact owners directly for bookings.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-100/90">
              <li>Search by area, budget, and availability.</li>
              <li>Contact owners directly.</li>
              <li>See property details & photos.</li>
              <li>Save favorites for later.</li>
            </ul>
          </div>

          {/* Right: Image */}
          <div className="w-full">
            <Image
              src={`/rent5.webp`}
              alt="Tenant Benefits"
              width={500}
              height={400}
              quality={100}
              objectFit="cover"
              className="rounded-xl shadow-lg object-cover h-full w-full"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center mt-12">
          <Link
            href={"/dashboard/pages/property"}
            className="btn bg-green-600 hover:bg-green-700 text-white rounded-lg px-6 py-3 text-lg shadow-lg transition"
          >
            Explore Properties Now
          </Link>
          <span className="text-slate-200/80 text-sm mt-3">
            Renting and advertising made effortless.
          </span>
        </div>
      </div>

      {/* Hero part */}
        <div className="grid lg:grid-cols-2 md:gap-5 shadow-2xl pb-5">
          <div>
            <Image
              src={`/rent4.webp`}
              alt="Hero Image"
              width={500}
              height={500}
              quality={100} 
              objectFit="cover"
              className="rounded-lg p-2"
            />
          </div>
          <div className="text-center text-slate-300 flex justify-center items-center py-14">
            <div>
              <h1 className="text-xl lg:text-2xl capitalize underline">
                Find Homes & Rooms Near You
              </h1>
              <h2 className="capitalize ">
                🌟 Search, Book, or Advertise with Ease
              </h2>
              <div className="mt-2 text-sm">
                <p>
                  Whether you’re looking to rent a place or list your own, our
                  platform makes it simple. <br />
                  Use location-based search to find nearby homes,
                  <br /> and advertise your property in minutes.
                </p>
              </div>

              <div className="mt-4 font-bold text-green-900 capitalize lg:mt-8 lg:mr-8">
                <Link
                  className="w-20 px-3 py-1 bg-green-200 rounded-lg lg:w-40 hover:bg-transparent hover:text-white hover:border"
                  href="/dashboard/pages/property/addProperty"
                >
                  Get Started Today →
                </Link>
              </div>
            </div>
          </div>
        </div>

      {/* Time Tracker → Booking Flow */}
      <div className="mx-auto w-full text-slate-900 p-6 md:p-12 shadow-2xl mt-10 bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-50 rounded-xl">
        {/* Heading */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold md:mb-10 mb-4 text-center text-indigo-900">
            How Booking Works ⏳
          </h2>
          <p className="text-slate-700 mb-10 text-center max-w-3xl mx-auto">
            Our process is simple: find, connect, and confirm. No long forms, no
            hidden costs—just straightforward renting.
          </p>
        </div>

        {/* Alternating Layout */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          {/* Left: Content */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-indigo-800">
              Why Book with HouseRent?
            </h3>
            <p className="text-slate-600 mb-4">
              We provide clarity and convenience for tenants. See availability,
              connect instantly, and move in faster.
            </p>
            <ul className="space-y-2 text-slate-700">
              <li>✔ Search verified listings.</li>
              <li>✔ Check details & availability.</li>
              <li>✔ Send a direct booking request.</li>
              <li>✔ Receive confirmation instantly.</li>
            </ul>
          </div>

          {/* Right: Image */}
          <div className="w-full h-64">
            <Image
              src={`/rent6.webp`}
              alt="Booking Process"
              width={500}
              height={400}
              quality={100}
              className="rounded-xl shadow-lg object-cover h-full w-full"
            />
          </div>
        </div>

        {/* Reversed Alternating Layout */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          {/* Left: Image */}
          <div className="w-full h-64">
            <Image
              src={`/rent7.webp`}
              alt="Booking Flow"
              width={500}
              height={400}
              quality={100}
              className="rounded-xl shadow-lg object-cover h-full w-full"
            />
          </div>

          {/* Right: Content */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-indigo-800">
              Booking Tips
            </h3>
            <p className="text-slate-600 mb-4">
              Make the most of your HouseRent booking experience:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li>⏱ Book early to get better choices.</li>
              <li>📊 Check property details carefully.</li>
              <li>🌙 Communicate clearly with the owner.</li>
              <li>🎯 Use saved favorites for quick access.</li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center mt-12">
          <Link
            href={"/dashboard/pages/booking"}
            className="btn bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-3 text-lg shadow-lg transition"
          >
            Start Booking Now
          </Link>
          <span className="text-slate-600 text-sm mt-3">
            Renting has never been this easy.
          </span>
        </div>
      </div>

      {/* Flow chart → Insights */}
      <div className="mx-auto w-full text-white p-6 md:p-12 shadow-2xl mt-10 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-xl">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-teal-400">
          Rental Insights 📊
        </h2>
        <p className="text-slate-300 mb-10 text-center max-w-3xl mx-auto">
          Understand your area’s rental market, get insights into average rents,
          and make smarter decisions whether renting or advertising.
        </p>

        {/* Chart Section */}
        <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 mb-12">
          <h3 className="text-lg font-semibold mb-4 text-teal-300 text-center">
            Average Rental Trends
          </h3>
          <div className="flex justify-center items-center h-64">
            <div className="text-slate-400 italic w-full h-64">
              <Image
                src={`/rent8.jpg`}
                alt="Rental Insights"
                width={500}
                height={400}
                quality={100}
                className="rounded-xl shadow-lg object-cover h-full w-full"
              />
            </div>
          </div>
        </div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-red-600 to-red-500 rounded-lg p-5 shadow-md text-center">
            <h4 className="font-bold text-xl">৳ 12,000</h4>
            <p className="text-sm text-slate-100">Avg. Rent in Dhaka</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-lg p-5 shadow-md text-center">
            <h4 className="font-bold text-xl">৳ 8,500</h4>
            <p className="text-sm text-slate-100">Avg. Room Rent</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-pink-500 rounded-lg p-5 shadow-md text-center">
            <h4 className="font-bold text-xl">25%</h4>
            <p className="text-sm text-slate-100">Cheaper in Suburbs</p>
          </div>
        </div>

        {/* Motivational Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h3 className="text-xl font-semibold mb-3 text-teal-300">
            Make Data-Driven Choices
          </h3>
          <p className="text-slate-300">
            With HouseRent insights, you can compare prices, evaluate options,
            and choose the right property for your needs.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center">
          <Link
            href={"/dashboard/pages/property"}
            className="btn bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-3 text-lg shadow-lg transition"
          >
            Start Exploring Homes
          </Link>
          <span className="text-slate-400 text-sm mt-3">
            Smarter renting starts with the right information.
          </span>
        </div>
      </div>
    </div>
  );
}

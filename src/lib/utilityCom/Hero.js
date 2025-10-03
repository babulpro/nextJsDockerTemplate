import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className=" py-8 font-Geist">
      <div className="m-auto p-3">
        <div className="grid lg:grid-cols-2 gap-5 min-h-1/2">
          {/* Left Image */}
          <div className="">
            <Image
              src={`/12.webp`}
              alt="HouseRent Hero"
              width={500}
              height={400}
              quality={100}
              className="rounded-lg object-cover h-full w-full py-4"
            />
          </div>

          {/* Right Content */}
          <div className="text-center text-slate-300 shadow-2xl flex justify-center items-center py-14">
            <div>
              <h1 className="text-2xl lg:text-3xl capitalize underline">
                Find Your Perfect Home Anywhere
              </h1>
              <h2 className="capitalize underline mt-2">
                HouseRent – Stay Where Life Takes You
              </h2>

              <div className="mt-2 text-sm">
                <p>
                  Whether you’re moving to Dhaka for work, studying in Chattogram,
                  or traveling abroad, HouseRent helps you find the right room or
                  house. <br /> Search, book, and live comfortably — anytime,
                  anywhere.
                </p>
              </div>

              <div className="mt-4 font-bold text-green-900 capitalize lg:mt-8 lg:mr-8">
                <Link
                  className="w-28 px-3 py-1 bg-green-200 rounded-lg lg:w-44 hover:bg-transparent hover:text-white hover:border"
                  href="/properties"
                >
                  Browse Homes →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

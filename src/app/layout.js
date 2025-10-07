
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; 
 
import { cookies } from 'next/headers'
import MainNavbar from "@/lib/utilityCom/MainNavbar";
import Navbar from "@/lib/utilityCom/Navbar";
import Footer from "@/lib/utilityCom/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HouseRent – Find Your Perfect Home for Rent Easily | Affordable Flats, Rooms & Apartments",
  description:
    "Discover your next home with HouseRent. Browse verified flats, rooms, and apartments for rent in your city. Enjoy a smooth renting experience with real-time listings, budget filters, and trusted landlords – all in one place.",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value 
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>

              <div>
                {
                  token?<MainNavbar/>:<Navbar/>
                } 
              </div> 
                                              
              
              {children}
              <div>
                <Footer/>
              </div>
        </div>
         
      </body>
    </html>
  );
}

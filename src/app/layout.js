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
  title: "Routine App – Plan Your Day, Build Better Habits, and Boost Productivity",
  description: "Organize your day with Routine App – the daily planner that tracks habits, manages tasks, and saves time. Stay focused, cut distractions, and achieve your goals with smart reminders.",
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

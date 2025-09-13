import "./globals.css";
import { Poppins, Montserrat } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["700", "900"] });

export const metadata = {
  title: "Ravindra Singh | Portfolio",
  description: "Personal portfolio website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} bg-gray-50 text-gray-900`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lexi Cart - Home",
  description: "Online Book Delivery Management System",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} light h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-slate-800">

        {children}

        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              iconTheme: {
                primary: "#ef0161",
                secondary: "#ffffff",
              },
            }
          }}
        />
      </body>
    </html>
  );
}

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { Inter, Fraunces } from "next/font/google"
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
   <html
  lang="en"
  suppressHydrationWarning
  className={cn(
    "antialiased",
    "font-sans",
    inter.variable,
    fraunces.variable
  )}
>
      <body>

        <ThemeProvider>
        <TooltipProvider>
        {children}
        <Toaster/>
        </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-white">
              Lumion<span className="text-gray-400 font-light">dev</span>
            </span>
          </div>
        </div>

        <div className="flex justify-center space-x-8 mb-8">
          <Link href="/#about" className="text-sm text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link href="/#services" className="text-sm text-muted-foreground hover:text-foreground">
            Services
          </Link>
          <Link href="/#portfolio" className="text-sm text-muted-foreground hover:text-foreground">
            Portfolio
          </Link>
          <Link href="/#contact" className="text-sm text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </div>

        <p className="text-center text-sm leading-5 text-muted-foreground">
          &copy; {new Date().getFullYear()} Lumion dev. All rights reserved.
        </p>
      </div>
    </footer>
  )
}


import Link from "next/link";
import { Github, Mail, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black/80 border-t border-blue-900 text-blue-300 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div className="flex lg:flex-col sm:flex-col space-y-3 text-center md:text-left lg:items-start sm:items-center sm:justify-center">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-600">
            Workable
          </h2>
          <p className="text-sm text-blue-400">
            Workable is fiscally sponsored by workable<br />
            Mollit exercitation excepteur aute laborum laborum est ipsum proident laborum aliqua.
          </p>
            <div className="flex justify-center md:justify-end gap-4">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Mail className="h-5 w-5 hover:text-blue-500" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 hover:text-blue-500" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5 hover:text-blue-500" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 hover:text-blue-500" />
            </a>
            </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-2 text-sm">
          <Link href="/homepage" className="hover:text-blue-500 transition-colors">Home</Link>
          <Link href="/profile" className="hover:text-blue-500 transition-colors">Profile</Link>
          <Link href="/blog" className="hover:text-blue-500 transition-colors">Blog</Link>
          <Link href="/resourceHub" className="hover:text-blue-500 transition-colors">Resource Hub</Link>
          <Link href="/jobSeek" className="hover:text-blue-500 transition-colors">Job Seek</Link>
          <Link href="/profile" className="hover:text-blue-500 transition-colors">Profile</Link>
        </div>

        <div className="space-y-4 text-center md:text-right flex flex-col">
          <div>
            <p className="text-sm text-blue-400">Want updates?</p>
            <form className="mt-2 flex flex-col sm:flex-row gap-2 items-center justify-center md:justify-end">
              <input
                type="email"
                placeholder="you@example.com"
                className="px-3 py-2 rounded-lg bg-black border border-blue-700 text-sm text-blue-200 placeholder-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors"
              >
                Message Us
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-blue-500">
        © {new Date().getFullYear()} WorkAble. All rights reserved.
      </div>
    </footer>
  );
}

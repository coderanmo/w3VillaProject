import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
      <div className="max-w-[1320px] mx-auto px-6 grid md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">W3.Polling</h2>
          <p className="text-sm text-gray-400">
            created by :Anmol Yadav
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="hover:text-white">Home</a></li>

          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-lg items-center">
            <MdOutlineEmail className="cursor-pointer text-red-600 text-[35px]" />
            <FaLinkedin className="cursor-pointer text-sky-600 text-[30px]"/>
          </div>
        </div>
      </div>

      {/* --- Bottom Line --- */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} w3.Villa. All rights reserved.
      </div>
    </footer>
  );
}

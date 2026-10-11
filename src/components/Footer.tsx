import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const footerLinks = [
    { name: "আমাদের সম্পর্কে", href: "/about" },
    { name: "যোগাযোগ", href: "/contact" },
    { name: "গোপনীয়তা নীতি", href: "/privacy-policy" },
    { name: "সম্পাদকীয় নীতিমালা", href: "/editorial-policy" },
    { name: "ব্যবহারের শর্তাবলি", href: "/terms" },
  ];

  return (
    <footer className="w-full mt-2">
      <div className="bg-black text-white rounded-md p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div>
            <Link href="/">
              <Image
                src="/logo.png"
                alt="DeshNews24 logo"
                height={150}
                width={250}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Footer Navigation */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-3 text-center md:text-left">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <div className="text-center text-gray-300 text-sm">
            <p>© ২০২৬ DeshNews24.</p>
            <p>সর্বস্বত্ব সংরক্ষিত।</p>
          </div>
        </div>

        <div className="border-t font-semibold border-gray-700 mt-6 pt-4 text-center text-gray-400 text-sm">
          সম্পাদক : আব্দুর রহমান নাঈম
          <p className="mb-2"></p>
          <p className="text-white  text-base"></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

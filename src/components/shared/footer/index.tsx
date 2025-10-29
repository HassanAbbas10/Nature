import prisma from "@/lib/db";
import {
  IconBrandTelegram,
  IconBrandThreads,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  MailIcon,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";

const socialIconMap = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  github: Github,
  telegram: IconBrandTelegram,
  whatsapp: IconBrandWhatsapp,
  email: MailIcon,
  phone: Phone,
  threads: IconBrandThreads,
};

interface SocialLink {
  icon: keyof typeof socialIconMap;
  url: string;
  value: string;
}

interface FooterData {
  socialLinks: SocialLink[];
  copyrightText: string;
  logoUrl: string;
}

export async function Footer() {
  const pageContent = await prisma.pageContent.findUnique({
    where: { pageType: "footer" },
  });

  if (!pageContent) {
    return null;
  }

  const footerData: FooterData = pageContent.content as any;

  return (
    <footer className="relative bg-white rounded-b-2xl mt-20 overflow-hidden border-t-2 border-black">
      
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-black rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-black rounded-full blur-3xl" />
      </div>

      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="relative">

        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-8">

          <div className="flex flex-col md:flex-row md:justify-between mb-12 gap-12">
            
            <div className="flex-1 min-w-[240px] flex flex-col">
              <div className="mb-6 group">
                <img
                  src={footerData.logoUrl || "/logo.png"}
                  alt="Logo"
                  className="h-10 transition-all duration-300 group-hover:scale-105"
                />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                Empowering growth through innovation and dedication to excellence.
              </p>
              
              
              <div className="mt-6 w-20 h-1 bg-black rounded-full" />
            </div>

            
            <div className="flex-[3] grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 w-full">

              <div className="group">
                <div className="font-bold text-sm text-black mb-5 tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  COMPANY
                </div>
                <ul className="space-y-3.5">
                  <li>
                    <Link 
                      href="/blogs"
                      className="text-sm text-gray-600 hover:text-black transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-2 group/link font-medium"
                    >
                      <span className="w-0 h-px bg-black group-hover/link:w-3 transition-all duration-200" />
                      BLOG
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/about"
                      className="text-sm text-gray-600 hover:text-black transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-2 group/link font-medium"
                    >
                      <span className="w-0 h-px bg-black group-hover/link:w-3 transition-all duration-200" />
                      ABOUT
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/contact"
                      className="text-sm text-gray-600 hover:text-black transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-2 group/link font-medium"
                    >
                      <span className="w-0 h-px bg-black group-hover/link:w-3 transition-all duration-200" />
                      CONTACT
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div className="group">
                <div className="font-bold text-sm text-black mb-5 tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  LEGAL
                </div>
                <ul className="space-y-3.5">
                  <li>
                    <Link 
                      href="/tos"
                      className="text-sm text-gray-600 hover:text-black transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-2 group/link font-medium"
                    >
                      <span className="w-0 h-px bg-black group-hover/link:w-3 transition-all duration-200" />
                      TERMS OF SERVICE
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/privacy"
                      className="text-sm text-gray-600 hover:text-black transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-2 group/link font-medium"
                    >
                      <span className="w-0 h-px bg-black group-hover/link:w-3 transition-all duration-200" />
                      PRIVACY POLICY
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          
          <div className="mb-10">
            <div className="bg-gray-50 rounded-2xl border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h3 className="text-black font-bold text-lg mb-2 flex items-center gap-2">
                    <span className="text-2xl">🌟</span>
                    Stay Connected
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Follow us on social media for the latest updates
                  </p>
                </div>
                
                {/* Social Links */}
                <div className="flex items-center flex-wrap gap-3">
                  {footerData.socialLinks?.map((link: SocialLink, index: number) => {
                    const IconComponent = socialIconMap[link.icon];
                    if (!IconComponent) return null;

                    return (
                      <Link
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative"
                        aria-label={link.icon}
                      >
                        <div className="relative w-12 h-12 rounded-xl bg-white border-2 border-black flex items-center justify-center text-black transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:scale-110 group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                          <IconComponent className="w-5 h-5" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>


          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-black border-dashed" />
            </div>
            <div className="relative flex justify-center">
              <div className="bg-white px-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-black" />
                  <div className="w-2 h-2 rounded-full border-2 border-black" />
                  <div className="w-2 h-2 rounded-full bg-black" />
                </div>
              </div>
            </div>
          </div>


          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <div className="text-xs text-gray-600 text-center font-medium">
              {footerData.copyrightText ||
                "© 2025 NATURE AND NURTURES COMPANY, INC. ALL RIGHTS RESERVED."}
            </div>
          </div>
        </div>

        
        <div className="h-1 bg-black" />
      </div>
    </footer>
  );
}
import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import truncate from "html-truncate"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import prisma from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TypingEffect } from "@/components/shared/texteffect/TypingEffect";
import { AboutSchema,BreadcrumbSchema } from "@/seo/Jsonld";
import { DOMAIN } from "@/utils/enums/Enums";
export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type TOSData = {
  title: string;
  content: string;
};

export const metadata: Metadata = {
  title: "About Us | Nature & Nurtures",
  description:
    "Discover the story behind Nature & Nurtures — our mission, values, and commitment to providing natural, eco-friendly, and sustainable products for a healthier world.",
  keywords: [
    "About Nature & Nurtures",
    "Our Story",
    "Eco-friendly Products",
    "Sustainability",
    "Organic Living",
  ],
  openGraph: {
    title: "About Us | Nature & Nurtures",
    description:
      "Learn more about Nature & Nurtures — a brand built on honesty, sustainability, and nature’s purest ingredients.",
    url: `${DOMAIN}/about`,
    siteName: "Nature & Nurtures",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${DOMAIN}/about-banner.jpg`,
        width: 1200,
        height: 630,
        alt: "About Nature & Nurtures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Nature & Nurtures",
    description:
      "Get to know the mission and values of Nature & Nurtures — promoting wellness through nature’s best.",
    images: [`${DOMAIN}/about-banner.jpg`],
  },
};

export default async function TOSPage() {
  const tosData = await prisma.pageContent.findUnique({
    where: { pageType: "ABOUT" },
  });

  console.log("About Page Data from Prisma:", tosData);
  if (!tosData) {
    notFound();
  }

  const data = tosData.content as TOSData;
  console.log("tos content", data)
  

 const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' },
  ];
  

  return (
    <div className="bg-white">
      <Header />
          <AboutSchema />
      <BreadcrumbSchema items={breadcrumbItems} />
      {/* Hero Section - Large Image Background */}
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Background Image/Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-white">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        {/* Content Overlay */}
        <div className="relative h-full flex items-center justify-center px-4 sm:px-6">
          <div className="text-center max-w-4xl w-full">
            <div className="inline-block mb-4 sm:mb-6">
              <div className="relative">
                <div className="absolute -inset-2 sm:-inset-3 bg-white/50 rounded-xl sm:rounded-2xl border-2 border-black transform -rotate-2" />
                <div className="relative bg-white rounded-xl sm:rounded-2xl border-2 border-black px-4 py-2 sm:px-6 sm:py-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                    Our Story
                  </span>
                </div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-4 sm:mb-6 leading-tight">
              {data.title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium px-2">
              Discover the journey, values, and passion that drive everything we do.
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <Breadcrumb>
          <BreadcrumbList className="text-xs sm:text-sm font-medium">
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-gray-600 hover:text-black transition-colors"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-400" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-black font-semibold">
                {data.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Main Content - Full Width Sections */}
      <div className="py-8 sm:py-12 md:py-16">
        {/* First Section - Image Left, Text Right */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            {/* Image Card - Brutalist Style */}
            <div className="group order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gray-50 rounded-2xl sm:rounded-3xl border-2 border-black transform -rotate-1 sm:-rotate-2 transition-transform duration-300 group-hover:-rotate-2 sm:group-hover:-rotate-3" />
                <div className="relative bg-white rounded-2xl sm:rounded-3xl border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:group-hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                  <img
                    src="https://tivznlumwrtoccouqrnm.supabase.co/storage/v1/object/public/ecom/1760472226507-3.webp"
                    alt="About Us"
                    width={100}
                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="order-1 lg:order-2">
              <div
                className="prose prose-sm sm:prose-lg max-w-none
                [&_h1]:text-2xl sm:[&_h1]:text-3xl md:[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:text-black [&_h1]:mb-4 sm:[&_h1]:mb-6 [&_h1]:leading-tight
                [&_h2]:text-xl sm:[&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-black [&_h2]:mb-3 sm:[&_h2]:mb-4 [&_h2]:leading-tight [&_h2]:flex [&_h2]:items-center [&_h2]:gap-2 sm:[&_h2]:gap-3 [&_h2]:before:content-[''] [&_h2]:before:w-1.5 sm:[&_h2]:before:w-2 [&_h2]:before:h-1.5 sm:[&_h2]:before:h-2 [&_h2]:before:rounded-full [&_h2]:before:bg-black
                [&_h3]:text-lg sm:[&_h3]:text-xl md:[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-black [&_h3]:mb-2 sm:[&_h3]:mb-3 [&_h3]:mt-4 sm:[&_h3]:mt-6
                [&_p]:text-sm sm:[&_p]:text-base md:[&_p]:text-lg [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4 sm:[&_p]:mb-6
                [&_ul]:my-4 sm:[&_ul]:my-6 [&_ul]:space-y-2 sm:[&_ul]:space-y-3
                [&_li]:text-sm sm:[&_li]:text-base md:[&_li]:text-lg [&_li]:text-gray-700 [&_li]:leading-relaxed [&_li]:pl-2
                [&_li]:relative [&_li]:before:content-['→'] [&_li]:before:absolute [&_li]:before:left-[-1rem] sm:[&_li]:before:left-[-1.5rem] [&_li]:before:text-black [&_li]:before:font-bold
                [&_strong]:text-black [&_strong]:font-bold
                [&_a]:text-black [&_a]:font-semibold [&_a]:underline [&_a]:decoration-2 [&_a]:underline-offset-2 [&_a]:transition-colors [&_a]:hover:text-gray-700
                [&_blockquote]:border-l-3 sm:[&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:pl-4 sm:[&_blockquote]:pl-6 [&_blockquote]:py-3 sm:[&_blockquote]:py-4 [&_blockquote]:my-6 sm:[&_blockquote]:my-8 [&_blockquote]:bg-gray-50 [&_blockquote]:rounded-r-lg sm:[&_blockquote]:rounded-r-xl [&_blockquote]:italic [&_blockquote]:text-gray-800
                [&_img]:hidden
                [&_hr]:my-8 sm:[&_hr]:my-12 [&_hr]:border-t-2 [&_hr]:border-dashed [&_hr]:border-black"
              >
                <h2>
                  <TypingEffect text="Our Beginning" />
                  </h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: truncate(data.content, 299, { ellipsis: "..." }),
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Second Section - Text Left, Image Right */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <div>
              <div
                className="prose prose-sm sm:prose-lg max-w-none
                [&_h1]:text-2xl sm:[&_h1]:text-3xl md:[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:text-black [&_h1]:mb-4 sm:[&_h1]:mb-6 [&_h1]:leading-tight
                [&_h2]:text-xl sm:[&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-black [&_h2]:mb-3 sm:[&_h2]:mb-4 [&_h2]:leading-tight [&_h2]:flex [&_h2]:items-center [&_h2]:gap-2 sm:[&_h2]:gap-3 [&_h2]:before:content-[''] [&_h2]:before:w-1.5 sm:[&_h2]:before:w-2 [&_h2]:before:h-1.5 sm:[&_h2]:before:h-2 [&_h2]:before:rounded-full [&_h2]:before:bg-black
                [&_h3]:text-lg sm:[&_h3]:text-xl md:[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-black [&_h3]:mb-2 sm:[&_h3]:mb-3 [&_h3]:mt-4 sm:[&_h3]:mt-6
                [&_p]:text-sm sm:[&_p]:text-base md:[&_p]:text-lg [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4 sm:[&_p]:mb-6
                [&_ul]:my-4 sm:[&_ul]:my-6 [&_ul]:space-y-2 sm:[&_ul]:space-y-3
                [&_li]:text-sm sm:[&_li]:text-base md:[&_li]:text-lg [&_li]:text-gray-700 [&_li]:leading-relaxed [&_li]:pl-2
                [&_li]:relative [&_li]:before:content-['→'] [&_li]:before:absolute [&_li]:before:left-[-1rem] sm:[&_li]:before:left-[-1.5rem] [&_li]:before:text-black [&_li]:before:font-bold
                [&_strong]:text-black [&_strong]:font-bold
                [&_a]:text-black [&_a]:font-semibold [&_a]:underline [&_a]:decoration-2 [&_a]:underline-offset-2 [&_a]:transition-colors [&_a]:hover:text-gray-700
                [&_blockquote]:border-l-3 sm:[&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:pl-4 sm:[&_blockquote]:pl-6 [&_blockquote]:py-3 sm:[&_blockquote]:py-4 [&_blockquote]:my-6 sm:[&_blockquote]:my-8 [&_blockquote]:bg-gray-50 [&_blockquote]:rounded-r-lg sm:[&_blockquote]:rounded-r-xl [&_blockquote]:italic [&_blockquote]:text-gray-800
                [&_img]:hidden
                [&_hr]:my-8 sm:[&_hr]:my-12 [&_hr]:border-t-2 [&_hr]:border-dashed [&_hr]:border-black"
              >
                <h2>
                  <TypingEffect text="Our Mission" />
                </h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.content?.slice(480, 804)
                  }}
                />
              </div>
            </div>

            {/* Image Card - Brutalist Style */}
            <div className="group">
              <div className="relative">
                <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gray-50 rounded-2xl sm:rounded-3xl border-2 border-black transform rotate-1 sm:rotate-2 transition-transform duration-300 group-hover:rotate-2 sm:group-hover:rotate-3" />
                <div className="relative bg-white rounded-2xl sm:rounded-3xl border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:group-hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                  <img
                    src="https://tivznlumwrtoccouqrnm.supabase.co/storage/v1/object/public/ecom/1760472239308-putinzalypa_16119_A_bottle_of_camelina_oil_on_dark_wooden_backg_028df4e6-077a-40db-96a1-71d772e4b3f6.webp"
                    alt="About Us"
                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values/Mission Section - Full Width Colored Background */}
        <div className="bg-gray-50 py-12 sm:py-16 md:py-20 border-y-2 border-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6">
                <TypingEffect text="What We Stand For" />
              </h2>
              <div className="flex items-center justify-center gap-2">
                <div className="w-12 sm:w-16 md:w-20 h-1 bg-black rounded-full" />
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-black" />
                <div className="w-12 sm:w-16 md:w-20 h-1 bg-black rounded-full" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  title: "Quality First",
                  description: "We never compromise on the quality of our products and services.",
                },
                {
                  title: "Customer Focus",
                  description: "Your satisfaction is at the heart of everything we do.",
                },
                {
                  title: "Innovation",
                  description: "We continuously evolve to bring you the best solutions.",
                },
              ].map((value, index) => (
                <div key={index} className="group">
                  <div className="relative">
                    <div className="absolute -inset-2 sm:-inset-3 bg-white rounded-xl sm:rounded-2xl border-2 border-black transform rotate-1 sm:rotate-2 transition-transform duration-300 group-hover:rotate-2 sm:group-hover:rotate-3" />
                    <div className="relative bg-white rounded-xl sm:rounded-2xl border-2 border-black p-6 sm:p-8 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                      <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 flex items-center gap-2">
                        <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-black" />
                        <TypingEffect text={value.title} />
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { number: "10+", label: "Years Experience" },
              { number: "5000+", label: "Happy Customers" },
              { number: "100+", label: "Products" },
              { number: "4.9", label: "Average Rating" },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="relative">
                  <div className="absolute -inset-1 sm:-inset-2 bg-gray-50 rounded-lg sm:rounded-2xl border-2 border-black transform rotate-2 sm:rotate-3 transition-transform duration-300 group-hover:rotate-3 sm:group-hover:rotate-6" />
                  <div className="relative bg-white rounded-lg sm:rounded-2xl border-2 border-black p-4 sm:p-6 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-1 sm:mb-2">
                      <TypingEffect text={stat.number} />
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section - Optional */}
        <div className="bg-white py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6">
                <TypingEffect text="Meet Our Team"/>
              </h2>
              <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto px-4">
                <TypingEffect text="The passionate people behind our success" />
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[1, 2, 3].map((member, index) => (
                <div key={index} className="group">
                  <div className="relative">
                    <div className="absolute -inset-2 sm:-inset-3 bg-gray-50 rounded-xl sm:rounded-2xl border-2 border-black transform -rotate-1 sm:-rotate-2 transition-transform duration-300 group-hover:-rotate-2 sm:group-hover:-rotate-3" />
                    <div className="relative bg-white rounded-xl sm:rounded-2xl border-2 border-black overflow-hidden shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <img
                        src={`https://images.pexels.com/photos/8117465/pexels-photo-8117465.jpeg`}
                        alt="Team Member"
                        className="w-full  h-60 sm:h-72 md:h-80 object-cover"
                      />
                      <div className="p-4 sm:p-6 bg-white border-t-2 border-black">
                        <h3 className="text-lg sm:text-xl font-bold text-black mb-1">
                          Team Member {member}
                        </h3>
                        <p className="text-gray-600 font-medium text-sm sm:text-base">Position</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="relative">
            <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl sm:rounded-3xl border-2 border-black transform -rotate-1" />

            <div className="relative bg-white rounded-2xl sm:rounded-3xl border-2 border-black p-6 sm:p-8 md:p-12 lg:p-16 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3 sm:mb-4">
                <TypingEffect text="Ready to Get Started?" />
              </h2>
              <p className="text-gray-700 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
                <TypingEffect text="Join thousands of satisfied customers and experience the difference." />
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <a href="/categories" className="group relative inline-block w-full sm:w-auto">
                  <div className="absolute inset-0 bg-black rounded-xl sm:rounded-2xl transform translate-x-1 translate-y-1 transition-transform duration-200 group-hover:translate-x-1.5 group-hover:translate-y-1.5 sm:group-hover:translate-x-2 sm:group-hover:translate-y-2" />
                  <div className="relative bg-white border-2 border-black rounded-xl sm:rounded-2xl px-6 py-3 sm:px-8 sm:py-4 font-bold uppercase tracking-wider text-sm sm:text-base transition-all duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 sm:group-hover:-translate-x-1 sm:group-hover:-translate-y-1 text-center">
                    Shop Now
                  </div>
                </a>

                <a href="/contact" className="group relative inline-block w-full sm:w-auto">
                  <div className="absolute inset-0 bg-gray-100 rounded-xl sm:rounded-2xl border-2 border-black transform translate-x-1 translate-y-1 transition-transform duration-200 group-hover:translate-x-1.5 group-hover:translate-y-1.5 sm:group-hover:translate-x-2 sm:group-hover:translate-y-2" />
                  <div className="relative bg-white border-2 border-black rounded-xl sm:rounded-2xl px-6 py-3 sm:px-8 sm:py-4 font-bold uppercase tracking-wider text-sm sm:text-base transition-all duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 sm:group-hover:-translate-x-1 sm:group-hover:-translate-y-1 text-center">
                    Contact Us
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}



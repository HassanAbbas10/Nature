import prisma from "@/lib/db";
import Link from "next/link";
import { TypingEffect } from "../texteffect/TypingEffect";

export const revalidate = 1;

export async function HeroSection() {
  const pageContent = await prisma.pageContent.findUnique({
    where: { pageType: "HERO" },
  });

  if (!pageContent) {
    return null;
  }

  const data = pageContent.content as any;

  return (
    <section className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Background Elements */}
      <div
        className="absolute inset-0 bg-[#E7D930] z-0 hidden md:block"
        style={{
          clipPath: "polygon(0 0, 50% 0, 30% 100%, 0 100%)",
        }}
      />

      {/* Mobile background alternative */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E7D930]/10 to-transparent z-0 md:hidden" />

      <div className="absolute inset-0 opacity-[0.02] z-10">
        <div className="absolute top-0 right-1/4 w-60 h-60 sm:w-80 sm:h-80 bg-black rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-60 h-60 sm:w-80 sm:h-80 bg-black rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:32px_32px] md:bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] z-10" />

      <div className="relative mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 w-full z-20">
        {/* Image/Video Section */}
        <div className="flex justify-center items-center order-1 lg:order-2 w-full group">
          <div className="relative w-full max-w-md lg:max-w-none">
            {/* Decorative border */}
            <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gray-50 rounded-2xl border-2 border-black transform rotate-2 sm:rotate-3 transition-transform duration-300 group-hover:rotate-3 sm:group-hover:rotate-4" />

            <div className="relative bg-white rounded-xl sm:rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:group-hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] md:group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              {data.videoUrl ? (
                <div className="w-full aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={data.videoUrl}
                    title="Video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  />
                </div>
              ) : (
                <img
                  src={data.imageUrl}
                  alt="Hero"
                  className="w-full h-auto object-cover"
                />
              )}
            </div>
          </div>
        </div>

        {/* Text Content Section */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8 order-2 lg:order-1 w-full text-center lg:text-left relative z-20">
          {/* Icon with decorative element */}
          {data.icon && (
            <div className="flex items-center justify-center lg:justify-start">
              <div className="relative">
                <div className="absolute -inset-1 sm:-inset-2 bg-gray-100 rounded-xl sm:rounded-2xl border-2 border-black transform -rotate-3 sm:-rotate-6" />
                <div className="relative bg-white rounded-xl sm:rounded-2xl border-2 border-black p-3 sm:p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                    {data.icon}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Title */}
          <div className="px-2 sm:px-0">
            <TypingEffect 
              html={data.title} 
              className="font-bold text-black prose 
                prose-lg sm:prose-xl lg:prose-2xl 
                max-w-none font-serif
                [&_*]:text-2xl [&_*]:sm:text-3xl [&_*]:md:text-4xl [&_*]:lg:text-5xl [&_*]:xl:text-6xl
                [&_*]:leading-tight [&_*]:sm:leading-snug [&_*]:lg:leading-normal" 
            />
          </div>

          {/* Decorative line */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-20 sm:w-24 md:w-32 h-0.5 sm:h-1 bg-black rounded-full" />
          </div>

          {/* Description */}
          <div
            className="prose 
              prose-sm sm:prose-base md:prose-lg 
              max-w-none px-2 sm:px-0
              [&_p]:text-sm [&_p]:sm:text-base [&_p]:md:text-lg [&_p]:lg:text-xl 
              [&_p]:leading-relaxed [&_p]:sm:leading-loose
              [&_p]:mb-3 [&_p]:sm:mb-4 
              [&_p]:text-gray-700 [&_p]:sm:text-gray-700
              [&_ul]:text-sm [&_ul]:sm:text-base [&_ul]:md:text-lg
              [&_li]:text-sm [&_li]:sm:text-base [&_li]:md:text-lg
              [&_ul]:text-gray-700 [&_li]:text-gray-700
              [&_ul]:space-y-1 [&_li]:space-y-1"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />

          {/* CTA Button */}
          <div className="pt-2 sm:pt-4 md:pt-6 flex justify-center lg:justify-start">
            <Link
              href="/products?search=oil"
              className="group relative inline-flex items-center"
            >
              {/* Button shadow/background */}
              <div className="absolute inset-0 bg-black rounded-full transform translate-x-0.5 translate-y-0.5 sm:translate-x-1 sm:translate-y-1 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1 sm:group-hover:translate-x-2 sm:group-hover:translate-y-2" />

              {/* Button */}
              <div
                className="relative bg-white border-2 border-black rounded-full 
                px-4 sm:px-6 md:px-8 lg:px-10 
                py-2 sm:py-3 md:py-4 
                text-xs sm:text-sm md:text-base lg:text-lg 
                font-bold uppercase tracking-wide sm:tracking-wider
                transition-all duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 sm:group-hover:-translate-x-1 sm:group-hover:-translate-y-1
                flex items-center gap-2 sm:gap-3"
              >
                {data.buttonText}

                {/* Arrow circle */}
                <span
                  className="inline-flex justify-center items-center 
                  w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 
                  bg-black text-white rounded-full 
                  text-xs sm:text-sm md:text-base font-bold
                  transition-transform duration-200 group-hover:translate-x-0.5 sm:group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
            </Link>
          </div>

          {/* Trust indicators - Optional */}
          {/* <div className="pt-4 sm:pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1 sm:-space-x-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gray-200 border-2 border-white" />
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gray-300 border-2 border-white" />
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gray-400 border-2 border-white" />
              </div>
              <span className="font-medium whitespace-nowrap">1000+ Happy Customers</span>
            </div>
          </div> */}
        </div>
      </div>

      {/* Mobile spacing helper */}
      <div className="h-4 sm:h-6 md:h-8 lg:hidden" />
    </section>
  );
}
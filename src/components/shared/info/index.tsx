import prisma from "@/lib/db";

export const revalidate = 1;

export async function InfoSection() {
  const pageContent = await prisma.pageContent.findUnique({
    where: { pageType: "INFO" },
  });

  if (!pageContent) {
    return null;
  }

  const data = pageContent.content as any;

  // --- ✂️ Shorten the description ---
  function shortenHTMLText(html: string, maxLength = 227) {
    // remove HTML tags
    const text = html.replace(/<[^>]*>?/gm, "");
    if (text.length <= maxLength) return html;

    const shortText = text.substring(0, maxLength).trim() + "...";
    return `<p>${shortText}</p>`;
  }

  const shortDescription = shortenHTMLText(data.description);

  return (
    <section
      className="relative py-20 sm:py-32 overflow-hidden"
      style={{ backgroundColor: data.backgroundColor || "#ffffff" }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-black rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-black rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-32">
        {/* First Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6">
            {/* Title */}
            <div
              className="prose prose-lg max-w-none
              [&_h1]:text-4xl [&_h1]:sm:text-5xl [&_h1]:md:text-6xl [&_h1]:font-bold [&_h1]:text-black [&_h1]:mb-6 [&_h1]:leading-tight
              [&_p]:text-lg [&_p]:text-black [&_p]:font-semibold"
              dangerouslySetInnerHTML={{ __html: data.title }}
            />

            {/* Line */}
            <div className="flex items-center gap-2">
              <div className="w-20 h-1 bg-black rounded-full" />
              <div className="w-2 h-2 rounded-full bg-black" />
              <div className="w-20 h-1 bg-black rounded-full" />
            </div>

            {/* ✂️ Short Description */}
            <div
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: shortDescription }}
            />
          </div>

          {/* Image Grid */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gray-50 rounded-3xl border-2 border-black transform rotate-1 transition-transform duration-300 group-hover:rotate-2" />
            <div className="relative bg-white rounded-3xl border-2 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="grid grid-cols-1 gap-4">
                {[data.image1].map(
                  (img, i) =>
                    img && (
                      <div
                        key={i}
                        className="relative w-80 h-80 mx-auto overflow-hidden rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <img
                          src={img}
                          alt={`Feature ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative group order-2 lg:order-1">
            <div className="absolute -inset-4 bg-gray-50 rounded-3xl border-2 border-black transform -rotate-1 transition-transform duration-300 group-hover:-rotate-2" />
            <div className="relative bg-white rounded-3xl border-2 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="grid grid-cols-1 gap-4">
                {[data.image4].map(
                  (img, i) =>
                    img && (
                      <div
                        key={i}
                        className="relative w-80 h-80 mx-auto overflow-hidden rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <img
                          src={img}
                          alt={`Feature ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    )
                )}
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="space-y-6 order-1 lg:order-2">
            <div
              className="prose prose-lg max-w-none
              [&_h1]:text-4xl [&_h1]:sm:text-5xl [&_h1]:md:text-6xl [&_h1]:font-bold [&_h1]:text-black [&_h1]:mb-6 [&_h1]:leading-tight"
              dangerouslySetInnerHTML={{ __html: data.title }}
            />
            <div className="flex items-center gap-2">
              <div className="w-20 h-1 bg-black rounded-full" />
              <div className="w-2 h-2 rounded-full bg-black" />
              <div className="w-20 h-1 bg-black rounded-full" />
            </div>

            {/* ✂️ Short Description */}
            <div
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: shortDescription }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

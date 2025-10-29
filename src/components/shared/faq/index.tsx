import prisma from "@/lib/db";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  title: string;
  content: string;
}

interface FAQData {
  headline: string;
  accordionItems: FAQItem[];
  imageUrl: string;
}

export async function FAQSection() {
  const pageContent = await prisma.pageContent.findUnique({
    where: { pageType: "FAQ" },
  });

  if (!pageContent) return null;

  const faqData: FAQData = pageContent.content as any;

  return (
    <section className="relative bg-white border-t-2 border-black mt-20 rounded-t-2xl overflow-hidden">
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-black rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-black rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="flex justify-center">
            <div className="relative w-80 h-80 rounded-2xl overflow-hidden border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group">
              <img
                src={faqData.imageUrl}
                alt="FAQ Image"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right: Headline + Accordion */}
          <div className="relative">
            {/* Headline */}
            <div
              className="prose prose-sm sm:prose-base max-w-none text-black mb-6"
              dangerouslySetInnerHTML={{ __html: faqData.headline }}
            ></div>

            {/* Accordion */}
            <div className="bg-gray-50 rounded-2xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 p-6 sm:p-8">
              <Accordion
                type="multiple"
                defaultValue={
                  faqData.accordionItems[0]?.title
                    ? [faqData.accordionItems[0].title]
                    : []
                }
                className="space-y-4"
              >
                {faqData.accordionItems.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={item.title}
                    className="border-b-2 border-black last:border-none"
                  >
                    <AccordionTrigger className="text-lg font-bold text-left text-black tracking-tight hover:text-gray-800 transition-colors duration-200">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-black rounded-full"></span>
                        {item.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 text-base leading-relaxed mt-2 pl-4">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="relative mt-16">
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
      </div>
    </section>
  );
}

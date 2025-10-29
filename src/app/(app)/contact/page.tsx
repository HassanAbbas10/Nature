import { ContactPreview } from "@/components/contact-preview";
import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { supabaseClient } from "@/lib/supabase/client";
import { ContactSchema } from "@/seo/Jsonld";
import { DOMAIN } from "@/utils/enums/Enums";
export const revalidate = 0;

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Nature & Nurtures",
  description: "Get in touch with Nature & Nurtures for inquiries, product information, or customer support.",
  openGraph: {
    title: "Contact Us | Nature & Nurtures",
    description: "Reach out to Nature & Nurtures for product inquiries, collaborations, or support.",
    url: `${DOMAIN}/contact`,
    siteName: "Nature & Nurtures",
    images: [
      {
        url: `${DOMAIN}/og-contact.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact Nature & Nurtures",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Nature & Nurtures",
    description: "We’d love to hear from you. Contact Nature & Nurtures for assistance or inquiries.",
    images: [`${DOMAIN}/og-contact.jpg`],
  },
};

export default async function ContactPage() {
  const { data } = await supabaseClient
    .from("PageContent")
    .select("*")
    .eq("pageType", "CONTACT")
    .single();

  console.log("Getting the data from the contact Page 🌻",data)
  
    return (
    <div>
      <Header />
      <ContactSchema />
      <main className="min-h-screen flex flex-col justify-center items-center p-6">
        <ContactPreview data={data.content} />
      </main>
      <Footer />
    </div>
  );
}

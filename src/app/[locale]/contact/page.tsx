import { getMessages } from "next-intl/server";
import { PageHeader, ContactCards, BranchCards } from "../_components/components";
import ContactForm from "../_components/Forms/ContactForm";

// ---------- SEO
import arSEO from "@/seo/ar.json";
import enSEO from "@/seo/en.json";
import { SITE_URL } from "@/lib/constants";
import { getSeoImages } from "@/lib/seo";

// SEO for Contact Page
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = locale === "ar" ? arSEO : enSEO;
  const imageUrl = SITE_URL + t.contactPage.image;

  return {
    title: t.contactPage.title,
    description: t.contactPage.description,

    alternates: {
      canonical: `${SITE_URL}/${locale}/contact`,
      languages: {
        en: `${SITE_URL}/en/contact`,
        ar: `${SITE_URL}/ar/contact`,
      },
    },

    openGraph: {
      title: t.contactPage.title,
      description: t.contactPage.description,
      url: `${SITE_URL}/${locale}/contact`,
      images: getSeoImages(imageUrl, "Contact Page"),
    },

    twitter: {
      card: "Prolo - Contact Page",
      title: t.contactPage.title,
      description: t.contactPage.description,
      images: getSeoImages(imageUrl, "Contact Page"),
    },
  };
}
// --------------
type PageTitle = {
  heading: string;
  description: string;
  image: string;
  icon: string;
};

export type ContactPageMessages = {
  pageTitle: PageTitle;
  contactForm: {
    title: string;
    para: string;
  };
  branches: {
    title: string;
    branches: {
      name: string;
      location: string;
      phone: string;
      email: string;
    }[];
  };
};

export default async function ContactPage() {
  const messages = await getMessages();
  const contactPageMessages = messages.contactPage as ContactPageMessages;

  return (
    <div>
      <PageHeader
        heading={contactPageMessages.pageTitle.heading}
        description={contactPageMessages.pageTitle.description}
        image={contactPageMessages.pageTitle.image}
        icon={contactPageMessages.pageTitle.icon}
      />

      {/* Contact Cards */}
      <ContactCards />
      <div className="prolo-container my-8">
        <div>
          <h4 className="section-heading">{contactPageMessages.contactForm.title}</h4>
          <p className="mt-2 mb-6">{contactPageMessages.contactForm.para}</p>
          <ContactForm />
        </div>
      </div>

      {/* Branches */}
      <BranchCards
        title={contactPageMessages.branches.title}
        branches={contactPageMessages.branches.branches}
      />
    </div>
  );
}

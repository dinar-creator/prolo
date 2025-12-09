import { getMessages } from "next-intl/server";
import {
  ServicePageHeader,
  TestimonialSlider,
  FlowDiagram,
  NotFound,
} from "../../_components/components";
import { Overview, ChallengeVsSolution, PageSection } from "../../_components/sections/sections";
import IndustryFlowDiagram from "../../_components/IndustryFlowDiagram";

const INDUSTRY_SLUGS_ARRAY = [
  "e-commerce-sector",
  "food-sector",
  "factories-and-goods-suppliers-sector",
  "hospitality-sector",
];

type Industry = {
  title: string;
  description: string;
  image: string;
};
// ---------- SEO
import arSEO from "@/seo/ar.json";
import enSEO from "@/seo/en.json";
import { SITE_URL } from "@/lib/constants";
import { getSeoImages } from "@/lib/seo";
// SEO for Industry Page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; industry: string }>;
}) {
  const { locale, industry } = await params;
  const t = locale === "ar" ? arSEO : enSEO;
  const url = `${SITE_URL}/${locale}/industries/${industry}`;
  const industries = t.industries as Record<string, Industry>;

  if (INDUSTRY_SLUGS_ARRAY.includes(industry)) {
    const imageUrl = SITE_URL + industries[industry].image;
    const title = industries[industry].title;
    const description = industries[industry].description;

    return {
      title: title,
      description: description,

      alternates: {
        canonical: url,
        languages: {
          en: `${SITE_URL}/en/industries/${industry}`,
          ar: `${SITE_URL}/ar/industries/${industry}`,
        },
      },

      openGraph: {
        title: title,
        description: description,
        url: url,
        images: getSeoImages(imageUrl, "Industry Page"),
      },

      twitter: {
        card: "Prolo - Industry Page",
        title: title,
        description: description,
        images: getSeoImages(imageUrl, "Industry Page"),
      },
    };
  } else {
    const imageUrl = SITE_URL + t.notFound.image;
    const title = t.notFound.title;
    const description = t.notFound.description;
    return {
      title: title,
      description: description,

      alternates: {
        canonical: url,
        languages: {
          en: `${SITE_URL}/en/industries/${industry}`,
          ar: `${SITE_URL}/ar/industries/${industry}`,
        },
      },

      openGraph: {
        title: title,
        description: description,
        url: url,
        images: getSeoImages(imageUrl, "404 Page Not Found"),
      },

      twitter: {
        card: "Prolo - Industry Page",
        title: title,
        description: description,
        images: getSeoImages(imageUrl, "404 Page Not Found"),
      },
    };
  }
}

type Props = {
  params: Promise<{ industry: string }>;
};

type FlowSegement = {
  text: string;
  icon: string;
};

type FlowDiagram = {
  title?: string;
  subtitle?: string;
  flow: FlowSegement[];
  footer?: FlowSegement[];
};

type IndustrySection = {
  title: string;
  heading: string;
  image: string;
  content: string[];
  flowDiagram?: FlowDiagram;
};

type IndustryPage = {
  slug: string;
  pageTitle: {
    heading: string;
    description: string;
    image: string;
    icon?: string;
  };
  overview: {
    title: "Industry Overview";
    heading: string;
    description: string;
    features?: {
      title: string;
      description?: string;
      features: string[];
    };
    image: string;
  };
  flowDiagram?: FlowDiagram;
  sections: IndustrySection[];
  industryChallengesVsSolutions?: {
    title: {
      challenge: string;
      solution: string;
    };
    list: {
      challenge: string;
      solution: string;
    }[];
  };
};

export default async function IndustryPage({ params }: Props) {
  const { industry } = await params;
  const messages = await getMessages();
  const industryPages = messages.industries as IndustryPage[];
  const industryPage = industryPages.find(page => page.slug === industry);

  if (!industryPage) {
    return <NotFound />;
  }

  return (
    <>
      <ServicePageHeader
        textCenter={false}
        heading={industryPage.pageTitle.heading}
        image={industryPage.pageTitle.image}
      />

      {/* Overview Section */}
      <Overview overview={industryPage.overview} />

      {/* Flow Diagram */}
      <div>
        {industryPage?.flowDiagram && (
          <IndustryFlowDiagram flowDiagram={industryPage.flowDiagram} />
        )}
      </div>

      {/* Challenges Section */}
      {industryPage.industryChallengesVsSolutions !== undefined && (
        <div className="hidden">
          <ChallengeVsSolution
            industryChallengesVsSolutions={industryPage.industryChallengesVsSolutions}
          />
        </div>
      )}

      {/* Sections */}
      {industryPage.sections.map((section, ind) => {
        return (
          <div key={ind} className="mb-6">
            {/* Section Content */}
            <PageSection
              ind={ind}
              title={section.title}
              heading={section.heading}
              content={section.content}
              image={section.image}
            />
            {/* Flow Diagram */}
            {section?.flowDiagram && <IndustryFlowDiagram flowDiagram={section.flowDiagram} />}
          </div>
        );
      })}

      {/* Testimonials */}
      <div className="prolo-container">
        <TestimonialSlider showHeading={true} />
      </div>
    </>
  );
}

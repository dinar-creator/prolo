import { getMessages } from "next-intl/server";
import { ServicePageHeader, TargetUserCard, NotFound } from "../../../_components/components";
import { SectionTitle, TestimonialSlider } from "@/app/[locale]/_components/components";
import { Overview, FeaturesGrid } from "../../../_components/sections/sections";
import ProcessSlider from "@/app/[locale]/_components/ProcessSlider";

type ServiceSeo = {
  title: string;
  description: string;
  image: string; // /seo/[serviceType]/[service].png
};

type ServicesSeo = Record<string, ServiceSeo>;

// ---------- SEO
import arSEO from "@/seo/ar.json";
import enSEO from "@/seo/en.json";
import { SITE_URL } from "@/lib/constants";
import { getSeoImages } from "@/lib/seo";
// SEO for Service Page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; serviceType: string; service: string }>;
}) {
  const { locale, serviceType, service } = await params;
  const t = locale === "ar" ? arSEO : enSEO;
  const url = `${SITE_URL}/${locale}/services/${serviceType}/${service}`;
  const services: ServicesSeo =
    serviceType === "individual-services"
      ? t.services.individualServices
      : t.services.commercialSectorServices;

  function isServiceExists() {
    return Object.keys(services).includes(service);
  }

  if (isServiceExists()) {
    const title = services[service].title;
    const description = services[service].description;
    const imageUrl = SITE_URL + services[service].image;

    return {
      title: title,
      description: description,

      alternates: {
        canonical: url,
        languages: {
          en: `${SITE_URL}/en/services/${serviceType}/${service}`,
          ar: `${SITE_URL}/ar/services/${serviceType}/${service}`,
        },
      },

      openGraph: {
        title: title,
        description: description,
        url: url,
        images: getSeoImages(imageUrl, ""),
      },

      twitter: {
        card: `Prolo`,
        title: title,
        description: description,
        images: getSeoImages(imageUrl, ""),
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
          en: `${SITE_URL}/en/services/${serviceType}/${service}`,
          ar: `${SITE_URL}/ar/services/${serviceType}/${service}`,
        },
      },

      openGraph: {
        title: title,
        description: description,
        url: url,
        images: getSeoImages(imageUrl, "404 Page Not Found"),
      },

      twitter: {
        card: "Prolo - App Download Page",
        title: title,
        description: description,
        images: getSeoImages(imageUrl, "404 Page Not Found"),
      },
    };
  }
}

type Overview = {
  title: string;
  heading: string;
  description: string;
  features: {
    title: string;
    features: string[];
  };
  image: string;
};

type ServicePageProps = {
  params: Promise<{
    serviceType: "individual-services" | "commercial-sector-services";
    service: string;
  }>;
};

// Service Page Types

type Feature = {
  text: string; // max 4 words
  image: string; // 3D icon
};

type SectionTitle = {
  title: string; // short title 2-4 words
  heading: string;
  description?: string; // if needed
};

type TargetUser = {
  icon: string; // icon name from iconify
  text: string; // user title, industry title for which this service is best
};

type ServicePage = {
  slug: string;
  uniqueSlug: string;
  slogan?: string;
  pageTitle: {
    heading: string;
    description: string; // short description 1-2 lines
    image: string; // background image
  };

  overview: {
    title: "Industry Overview";
    heading: string;
    description: string;
    features: {
      title: string; // i.e 'Features', 'Our Key Features'
      features: string[];
    };
    image: string;
  };

  mainFeatures: Feature[];
  process: {
    sectionTitle: SectionTitle; //for  heading : i.e 'Our Process', 'Process We Follow' or any best line by you
    steps: string[]; // add each step string
  };

  targetUsers: {
    sectionTitle: SectionTitle; // for heading : i.e 'Target Users', 'This service best suit to' or any best line by you
    users: TargetUser[]; // max 4 users
  };
  why: {
    sectionTitle: SectionTitle; //for heading: i.e Why choose prolo?, Why are the best or diff from others.
  };
};

type ServicesMessages = {
  individualServices: ServicePage[];
  commercialSectorServices: ServicePage[];
};
export default async function ServicePage({ params }: ServicePageProps) {
  const { serviceType, service } = await params;

  const servicesMessages = (await getMessages()).services as ServicesMessages;

  function getServicePage(services: ServicePage[], slug: string): ServicePage | undefined {
    return services.find(service => service.slug === slug);
  }

  const page: ServicePage | undefined =
    serviceType === "individual-services"
      ? getServicePage(servicesMessages.individualServices, service)
      : serviceType === "commercial-sector-services"
        ? getServicePage(servicesMessages.commercialSectorServices, service)
        : undefined;

  if (page === undefined) {
    return <NotFound />;
  }

  return (
    <div>
      {/* Page Header */}
      <ServicePageHeader
        heading={page.pageTitle.heading}
        description={page.pageTitle.description}
        image={page.pageTitle.image}
        slug={page.uniqueSlug}
      />
      {/* Overview Section */}
      <Overview overview={page.overview} />
      {/* Slogan */}
      {page.slogan && (
        <div className="prolo-container mt-4 mb-8">
          <h4 className="text-theme-blue text-3xl font-bold">{page.slogan}</h4>
        </div>
      )}
      <div className="mt-4 mb-[30px]">
        <FeaturesGrid features={page.mainFeatures} />
      </div>

      {/* Process Slider */}
      <div className="mb-6">
        <section className="bg-base1 section-spacing w-full py-8">
          <div className="prolo-container">
            <SectionTitle
              title={page.process.sectionTitle.title}
              heading={page.process.sectionTitle.heading}
              description={page.process.sectionTitle.description}
            />
            <div className="md:-mt-[30px]">
              <ProcessSlider process={page.process.steps} />
            </div>
          </div>
        </section>
      </div>

      {/* Target Audience */}
      <section className="prolo-container section-spacing">
        <SectionTitle
          title={page.targetUsers.sectionTitle.title}
          heading={page.targetUsers.sectionTitle.heading}
          description={page.targetUsers.sectionTitle.description}
        />

        {/* Cards */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-4">
          {page.targetUsers.users.map((user, ind) => (
            <TargetUserCard key={ind} icon={user.icon} title={user.text} />
          ))}
        </div>
      </section>

      {/* Why Choose Prolo */}
      <section className="section-spacing">
        <div className="prolo-container">
          <SectionTitle
            title={page.why.sectionTitle.title}
            heading={page.why.sectionTitle.heading}
            description={page.why.sectionTitle.description}
          />
        </div>
        <div className="prolo-container md:-mt-[30px]">
          <TestimonialSlider showHeading={false} />
        </div>
      </section>
    </div>
  );
}

import Image from "next/image";
import BlogSection from "../../_components/sections/BlogSection";
import { NotFound } from "../../_components/components";
import { getMessages } from "next-intl/server";

// ---------- SEO
type BlogSeo = {
  title: string;
  description: string;
  image: string;
};
import arSEO from "@/seo/ar.json";
import enSEO from "@/seo/en.json";
import { SITE_URL } from "@/lib/constants";
import { getSeoImages } from "@/lib/seo";
// SEO for Blog Page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = locale === "ar" ? arSEO : enSEO;
  const url = `${SITE_URL}/${locale}/blogs/${slug}`;
  const blogs = t.blogs as Record<string, BlogSeo>;

  if (Object.keys(blogs).includes(slug)) {
    const imageUrl = SITE_URL + blogs[slug].image;
    const title = blogs[slug].title;
    const description = blogs[slug].description;

    return {
      title: title,
      description: description,

      alternates: {
        canonical: url,
        languages: {
          en: `${SITE_URL}/en/blogs/${slug}`,
          ar: `${SITE_URL}/ar/blogs/${slug}`,
        },
      },

      openGraph: {
        title: title,
        description: description,
        url: url,
        images: getSeoImages(imageUrl, "Blog Page"),
      },

      twitter: {
        card: "Prolo - Blog Page",
        title: title,
        description: description,
        images: getSeoImages(imageUrl, "Blog Page"),
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
          en: `${SITE_URL}/en/blogs/${slug}`,
          ar: `${SITE_URL}/ar/blogs/${slug}`,
        },
      },

      openGraph: {
        title: title,
        description: description,
        url: url,
        images: getSeoImages(imageUrl, "404 Page Not Found"),
      },

      twitter: {
        card: "Prolo - Blog Page",
        title: title,
        description: description,
        images: getSeoImages(imageUrl, "404 Page Not Found"),
      },
    };
  }
}

type Props = {
  params: Promise<{ slug: string }>;
};

type BlogSection = {
  heading: string;
  content: string[];
  image?: string;
};

export type Blog = {
  slug: string;
  title: string;
  image: string;
  date: string;
  description: string;
  sections: BlogSection[];
  finalThoughts?: {
    heading: string;
    description: string;
  };
};

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const allBlogs = (await getMessages()).blogs as Blog[];
  const blog: Blog | undefined = allBlogs.find(blog => blog.slug === slug);

  if (blog === undefined) {
    return <NotFound />;
  }

  return (
    <div className="prolo-container">
      <article className="mt-[100px] w-full">
        {/* Title */}
        <div>
          <h3 className="mb-1 w-full text-3xl/tight font-medium md:text-4xl/tight">{blog.title}</h3>
        </div>
        {/* Metadata */}
        <div className="mt-3 mb-6">
          <span className="bg-base1 w-fit rounded-md px-3 py-1 text-xs">🗓️ {blog.date}</span>
        </div>
        {/* Preview Image */}
        <div className="bg-base1 aspect-2/1 w-full rounded-xl md:rounded-2xl">
          <Image
            src={blog.image}
            alt={`Image which represents ${blog.title.toLowerCase()}`}
            width={400}
            height={200}
            className="h-full w-full rounded-xl object-cover md:rounded-2xl"
          />
        </div>
        {/* Blog Body */}
        <div className="mx-auto my-6 max-w-[600px]">
          {/* Description para */} <p>{blog.description}</p>
          {/* Sections Here */}
          {blog.sections.map((section, ind) => (
            <BlogSection
              key={ind}
              heading={section.heading}
              content={section.content}
              image={section.image}
            />
          ))}
          {/* Final Thoughts */}
          {blog.finalThoughts !== undefined && (
            <div>
              <h4 className="mb-3 text-xl font-medium">{blog.finalThoughts.heading}</h4>
              <p>{blog.finalThoughts.description}</p>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

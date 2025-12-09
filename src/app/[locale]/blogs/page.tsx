import { BlogCardSub } from "@/app/[locale]/_components/components";
import { getMessages } from "next-intl/server";
// ---------- SEO
import arSEO from "@/seo/ar.json";
import enSEO from "@/seo/en.json";
import { SITE_URL } from "@/lib/constants";
import { getSeoImages } from "@/lib/seo";

// SEO for Blogs Page
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = locale === "ar" ? arSEO : enSEO;
  const imageUrl = SITE_URL + t.blogsPage.image;

  return {
    title: t.blogsPage.title,
    description: t.blogsPage.description,

    alternates: {
      canonical: `${SITE_URL}/${locale}/blogs`,
      languages: {
        en: `${SITE_URL}/en/blogs`,
        ar: `${SITE_URL}/ar/blogs`,
      },
    },

    openGraph: {
      title: t.blogsPage.title,
      description: t.blogsPage.description,
      url: `${SITE_URL}/${locale}/blogs`,
      images: getSeoImages(imageUrl, "Blogs"),
    },

    twitter: {
      card: "Prolo - Blogs",
      title: t.blogsPage.title,
      description: t.blogsPage.description,
      images: getSeoImages(imageUrl, "Blogs"),
    },
  };
}

export type BlogCardTypes = {
  thumbnail: string;
  heading: string;
  slug: string;
  date: string;
};

export default async function BlogsPage() {
  const blogCards = (await getMessages()).blogCards as BlogCardTypes[];

  return (
    <div className="mt-[75px] w-full">
      {/* Blog Header */}
      <div className="prolo-container">
        <div className="flex w-full flex-col gap-8">
          {blogCards.map(blogCard => (
            <BlogCardSub
              key={blogCard.slug}
              thumbnail={blogCard.thumbnail}
              date={blogCard.date}
              heading={blogCard.heading}
              slug={blogCard.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Pre strucutre
//   {/* Blog Header */}
//   <div className="prolo-container">
//     <div className="grid w-full grid-cols-1 gap-4 sm:gap-6 md:grid-cols-8">
//       {/* left */}
//       <div className="md:col-span-3">
//         {/* Main blog card */}{" "}
//         {mainBlog && (
//           <BlogCardMain
//             heading={mainBlog.heading}
//             slug={mainBlog.slug}
//             date={mainBlog.date}
//             thumbnail={mainBlog.thumbnail}
//           />
//         )}
//       </div>

//       {/* Right */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:col-span-5 md:grid-cols-1">
//         {/* Main Blog Card 2 */}
//         {subBlog1 && (
//           <BlogCardSub
//             thumbnail={subBlog1.thumbnail}
//             date={subBlog1.date}
//             heading={subBlog1.heading}
//             slug={subBlog1.slug}
//           />
//         )}
//         {subBlog2 && (
//           <BlogCardSub
//             thumbnail={subBlog2.thumbnail}
//             date={subBlog2.date}
//             heading={subBlog2.heading}
//             slug={subBlog2.slug}
//           />
//         )}
//       </div>
//     </div>
//   </div>
//   {/* Blogs Lower Body */}
//   <div className="prolo-container my-8">
//     <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
//       {blogCards.map(blog => (
//         <BlogPageCard
//           key={blog.slug}
//           thumbnail={blog.thumbnail}
//           date={blog.date}
//           heading={blog.heading}
//           slug={blog.slug}
//         />
//       ))}
//       {blogCards.map(blog => (
//         <BlogPageCard
//           key={blog.slug}
//           thumbnail={blog.thumbnail}
//           date={blog.date}
//           heading={blog.heading}
//           slug={blog.slug}
//         />
//       ))}
//     </div>
//   </div>
// </div >

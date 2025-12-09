import { SectionTitle, BlogCard } from "../components";
import { getLocale, getMessages, getTranslations } from "next-intl/server";

type BlogCard = {
  thumbnail: string;
  date: string;
  heading: string;
  slug: string;
};

export default async function Blog() {
  const locale = await getLocale();
  const blogsText = await getTranslations("homepage.blogs.pageTitle");
  const messages = await getMessages();
  const blogCards = messages.blogCards as BlogCard[];

  return (
    <section className="section-spacing bg-base1 my-8 py-8">
      {/* Section Title */}
      <div className="prolo-container">
        <SectionTitle
          title={blogsText("title")}
          heading={blogsText("heading")}
          description={blogsText("description")}
          link={`/${locale}${blogsText("link")}`}
          linkText={blogsText("linkText")}
        />
      </div>

      {/* Blog Cards */}
      <div className="prolo-container">
        <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
          {blogCards.map(blogCard => (
            <BlogCard
              key={blogCard.slug}
              title={blogCard.heading}
              link={`/${locale}/blogs/${blogCard.slug}`}
              image={blogCard.thumbnail}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

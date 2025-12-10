import { getTranslations } from "next-intl/server";
import TestimonialLazySlider from "../optimized/TestimonialLazySlider";
export default async function Testimonials() {
  const testimonialsText = await getTranslations("homepage.testimonials");

  return (
    <section className="section-spacing">
      {/* Uppr Section */}
      <div className="prolo-container">
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start">
          <h2 className="section-heading">{testimonialsText("pageTitle.heading")}</h2>
        </div>
      </div>

      {/* Lower Slider */}
      <div className="prolo-container">
        <TestimonialLazySlider />
      </div>
    </section>
  );
}

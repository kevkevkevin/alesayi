"use client";

import { useState } from "react";
import { featuredProducts, whatsapp } from "./content";
import { Arrow, TextileImage } from "./ui";

export function FeaturedProducts({ copy, locale }) {
  const [active, setActive] = useState(0);

  return (
    <section id="featured-products" className="featured-products gutter" aria-labelledby="featured-products-title">
      <div className="section-heading" data-reveal>
        <h2 id="featured-products-title">{copy.featuredTitle}</h2>
      </div>
      <div className="featured-cards">
        {featuredProducts.map((product, index) => {
          const [name, description] = product[locale];
          const inquiry = encodeURIComponent(`${copy.productMessage} ${name}`);

          return (
            <article key={product.image} className="featured-card" data-active={active === index} data-reveal>
              <button
                className="featured-preview"
                type="button"
                aria-label={`${copy.productPreview} ${name}`}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
                onFocus={(event) => {
                  if (event.currentTarget.matches(":focus-visible")) setActive(index);
                }}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setActive(index);
                }}
              >
                <TextileImage image={product.image} position={product.position} />
                <span className="featured-expand circle" aria-hidden="true">+</span>
              </button>
              <div className="featured-meta">
                <h3>{name}</h3>
                <p>{description}</p>
                <a
                  className="text-link featured-inquiry"
                  href={`${whatsapp}?text=${inquiry}`}
                  aria-label={`${copy.productInquiry} · ${name}`}
                >
                  {copy.productInquiry}<Arrow />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

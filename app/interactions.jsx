"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { collectionMedia, email, phoneLink } from "./content";
import { Arrow, TextileImage } from "./ui";

export function Navigation({ copy, locale }) {
  const dialog = useRef(null);
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const home = locale === "ar" ? "/ar/" : "/";
  const otherLanguage = locale === "ar" ? "en" : "ar";
  const translatedHome = otherLanguage === "ar" ? "/ar/" : "/";

  useEffect(() => {
    const hero = document.querySelector(".hero");
    const update = () => setCondensed(hero.getBoundingClientRect().bottom < 100);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <header className="header gutter" data-condensed={condensed}>
        <button className="header-menu" type="button" aria-haspopup="dialog" aria-controls="site-menu" aria-expanded={open} onClick={() => {
          dialog.current.showModal();
          setOpen(true);
        }}>
          <span className="menu-glyph" aria-hidden="true"><i /><i /></span>
          {copy.menu}
        </button>
        <a href={`${home}#top`} className="brand" aria-label={copy.company}>
          <span className="brand-mark" aria-hidden="true" />
          <span>{copy.brand}</span>
        </a>
        <div className="header-actions">
          <a className="language" href={translatedHome} hrefLang={otherLanguage} lang={otherLanguage}>{copy.language}</a>
          <a className="header-visit" href="#showrooms">{copy.visit}<Arrow /></a>
        </div>
      </header>

      <dialog id="site-menu" className="menu-dialog" ref={dialog} aria-label={copy.menu} onClose={() => setOpen(false)} onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}>
        <div className="menu-sheet">
          <div className="menu-body">
            <div className="menu-top">
              <p className="eyebrow section-mark"><span className="dot" />{copy.company}</p>
              <button className="button close-button" type="button" onClick={() => dialog.current.close()}>
                {copy.close}<span aria-hidden="true">×</span>
              </button>
            </div>
            <nav aria-label={copy.menu}>
              {copy.nav.map(([id, label], index) => (
                <a href={`#${id}`} key={id} onClick={() => dialog.current.close()}>
                  <span className="eyebrow">{String(index + 1).padStart(2, "0")}</span>
                  {label}<Arrow />
                </a>
              ))}
            </nav>
            <div className="menu-bottom">
              <a href={`mailto:${email}`}>{email}</a>
              <a className="language" href={translatedHome} hrefLang={otherLanguage} lang={otherLanguage}>{copy.language}</a>
            </div>
          </div>
          <div className="menu-picture" aria-hidden="true"><TextileImage image="banner-13" /></div>
        </div>
      </dialog>
    </>
  );
}

export function CollectionPanels({ copy }) {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(0);
  const dialog = useRef(null);
  const [name, , description] = copy.collections[selected];
  const current = collectionMedia[selected];

  function openCollection(index) {
    setSelected(index);
    dialog.current.showModal();
  }

  return (
    <>
      <div className="collection-stage" data-interacting={hovered !== null} onPointerLeave={() => setHovered(null)}>
        <div className="collection-backdrops" aria-hidden="true">
          {collectionMedia.map(({ image, position }, index) => (
            <TextileImage key={image} image={image} position={position} className={hovered === index ? "is-active" : ""} />
          ))}
        </div>
        {copy.collections.map(([title, subtitle], index) => {
          const { image, position } = collectionMedia[index];
          return (
            <button key={title} className="collection-card" type="button" aria-haspopup="dialog" aria-label={`${copy.view} — ${title}`} data-active={hovered === index} onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setHovered(index);
            }} onFocus={() => setHovered(index)} onBlur={() => setHovered(null)} onClick={() => openCollection(index)}>
              <TextileImage image={image} className="collection-image" position={position} />
              <span className="collection-index eyebrow">0{index + 1} / 03</span>
              <span className="collection-info">
                <span className="collection-title">{title}</span>
                <span className="eyebrow">{copy.collectionTag}</span>
                <span className="collection-description">{subtitle}</span>
                <span className="collection-cta"><span>{copy.view}</span><span className="circle"><Arrow /></span></span>
              </span>
            </button>
          );
        })}
      </div>
      <dialog className="collection-dialog" ref={dialog} aria-labelledby="collection-detail-title" onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}>
        <div className="collection-sheet">
          <div className="collection-detail-image"><TextileImage image={current.image} position={current.position} /></div>
          <div className="collection-detail">
            <button className="button close-button" type="button" onClick={() => dialog.current.close()}>{copy.close}<span aria-hidden="true">×</span></button>
            <p className="eyebrow section-mark"><span className="dot" />{copy.collectionTag}</p>
            <h2 id="collection-detail-title">{name}</h2>
            <p>{description}</p>
            <a href="#showrooms" className="button" onClick={() => dialog.current.close()}>{copy.visit}<Arrow /></a>
          </div>
        </div>
      </dialog>
    </>
  );
}

export function Showrooms({ copy, locations, locale }) {
  const [active, setActive] = useState(0);
  const showroom = locations[active];
  const number = new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en", { minimumIntegerDigits: 2 });

  return (
    <div className="showroom-browser" data-reveal>
      <ul className="showroom-list" aria-label={copy.locationList}>
        {locations.map(({ city, name }, index) => (
          <li key={name}>
            <button type="button" aria-pressed={index === active} aria-controls="showroom-details" onClick={() => setActive(index)}>
              <span className="eyebrow">{number.format(index + 1)}</span>
              <span><strong>{city}</strong><small>{name}</small></span>
              <Arrow />
            </button>
          </li>
        ))}
      </ul>
      <div className="showroom-detail" id="showroom-details" aria-live="polite">
        <div className="showroom-pattern" aria-hidden="true" />
        <p className="eyebrow">{number.format(active + 1)} / {number.format(locations.length)}</p>
        <div className="showroom-address">
          <p>{showroom.city}</p>
          <h3>{showroom.name}</h3>
          <p>{showroom.address}</p>
          <div className="showroom-phones">
            {showroom.phones.map((phone) => <a key={phone} href={phoneLink(phone)} dir="ltr">{phone}</a>)}
          </div>
          <a href={showroom.map} className="button">{copy.directions}<Arrow /></a>
        </div>
      </div>
    </div>
  );
}

export function Motion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".hero-content h1 .title-line", {
        yPercent: 28, opacity: 0, duration: 1, stagger: 0.14, ease: "power3.out",
      });
      gsap.from(".hero-label, .hero-scroll", { opacity: 0, duration: 0.8, delay: 0.3 });

      gsap.to(".hero-image", {
        scale: 1.16, yPercent: 8, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });

      gsap.from(".statement-word", {
        color: "#777066", stagger: 0.07, ease: "none",
        scrollTrigger: { trigger: ".statement", start: "top 78%", end: "center 45%", scrub: true },
      });

      gsap.fromTo(".feature-window", { clipPath: "inset(8% 14% 8% 14%)" }, {
        clipPath: "inset(0% 0% 0% 0%)", ease: "none",
        scrollTrigger: { trigger: ".feature", start: "top 85%", end: "top 12%", scrub: 0.5 },
      });
      gsap.from(".feature-image", {
        scale: 1.18, ease: "none",
        scrollTrigger: { trigger: ".feature", start: "top bottom", end: "bottom top", scrub: true },
      });

      gsap.utils.toArray("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 30, opacity: 0, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 91%", once: true },
        });
      });

      gsap.utils.toArray(".quality-image img").forEach((image) => {
        gsap.fromTo(image, { scale: 1.15, yPercent: -4 }, {
          scale: 1.15, yPercent: 4, ease: "none",
          scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });
    return () => media.revert();
  }, []);

  return null;
}

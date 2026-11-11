"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { collectionMedia, email, phoneLink } from "./content";
import { Arrow, TextileImage } from "./ui";

const desktopCollections = "(min-width: 831px) and (hover: hover)";
const stripOffsets = [0, 0.2, 0.4, 0.6, 0.8];
const backdropMedia = [{ image: "banner-16" }, ...collectionMedia.slice(1)];

function useViewportPlayback(video, source, userPaused) {
  useEffect(() => {
    const player = video.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;

    function syncPlayback() {
      if (!inView || reducedMotion.matches || userPaused?.current) {
        player.pause();
        return;
      }
      if (!player.hasAttribute("src")) player.src = source;
      player.play().catch(() => {});
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(player.closest("section"));
    reducedMotion.addEventListener("change", syncPlayback);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
      player.pause();
    };
  }, [source, userPaused, video]);
}

export function HeroMedia({ children, playLabel, pauseLabel }) {
  const video = useRef(null);
  const userPaused = useRef(false);
  const [hasFrame, setHasFrame] = useState(false);
  const [playing, setPlaying] = useState(false);

  useViewportPlayback(video, "/media/hero.mp4", userPaused);

  function togglePlayback() {
    const player = video.current;
    userPaused.current = !player.paused;
    if (userPaused.current) {
      player.pause();
    } else {
      player.play().catch(() => {});
    }
  }

  return (
    <>
      <div className="hero-media" aria-hidden="true">
        <TextileImage image="banner-16" className="hero-image" eager />
        <video
          ref={video}
          className="background-video"
          data-ready={hasFrame}
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setHasFrame(true)}
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => {
            setHasFrame(false);
            setPlaying(false);
          }}
        />
      </div>
      <div className="hero-controls">
        {children}
        <button
          className="circle hero-video-control"
          type="button"
          aria-label={playing ? pauseLabel : playLabel}
          disabled={!hasFrame}
          onClick={togglePlayback}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            {playing
              ? <path d="M7 5v10m6-10v10" fill="none" stroke="currentColor" strokeWidth="2" />
              : <path d="m7 4 8 6-8 6z" fill="currentColor" />}
          </svg>
        </button>
      </div>
    </>
  );
}

export function FeatureVideo() {
  const video = useRef(null);
  const [hasFrame, setHasFrame] = useState(false);

  useViewportPlayback(video, "/media/in-every-thread.mp4");

  return (
    <div className="feature-media" aria-hidden="true">
      <TextileImage image="banner-9" />
      <video
        ref={video}
        className="background-video"
        data-ready={hasFrame}
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setHasFrame(true)}
        onError={() => setHasFrame(false)}
      />
    </div>
  );
}

export function Navigation({ copy, locale }) {
  const dialog = useRef(null);
  const menuAnimation = useRef(null);
  const destination = useRef(null);
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
      menuAnimation.current?.revert();
    };
  }, []);

  function finishClose() {
    const nextSection = destination.current;
    destination.current = null;
    dialog.current.close();
    const animation = menuAnimation.current;
    menuAnimation.current = null;
    animation?.revert();
    setOpen(false);

    if (nextSection && window.location.hash === `#${nextSection}`) {
      document.getElementById(nextSection)?.scrollIntoView();
    } else if (nextSection) {
      window.location.hash = nextSection;
    }
  }

  function openMenu() {
    const menu = dialog.current;
    menu.showModal();
    setOpen(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animation = gsap.timeline({ onReverseComplete: finishClose });
    menuAnimation.current = animation;
    animation
      .from(menu.querySelector(".menu-backdrop"), { opacity: 0, duration: 0.4 }, 0)
      .from(menu.querySelector(".menu-sheet"), {
        xPercent: locale === "ar" ? 105 : -105,
        duration: 0.58,
        ease: "power3.out",
      }, 0)
      .from(menu.querySelectorAll(".menu-close .menu-glyph i"), {
        rotation: 0, opacity: 0, duration: 0.34, ease: "power2.out",
      }, 0.12)
      .from(menu.querySelectorAll(".menu-body > p, .menu-body nav a"), {
        opacity: 0, y: 14, duration: 0.36, stagger: 0.07, ease: "power2.out",
      }, 0.16)
      .from(menu.querySelector(".menu-bottom"), {
        opacity: 0, y: 10, duration: 0.34, ease: "power2.out",
      }, 0.4);
  }

  function closeMenu(nextSection = null) {
    const animation = menuAnimation.current;
    if (animation?.reversed()) return;
    destination.current = nextSection;
    if (animation?.progress() && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animation.timeScale(1.8).reverse();
    } else {
      finishClose();
    }
  }

  return (
    <>
      <header className="header gutter" data-condensed={condensed}>
        <button className="header-menu" type="button" aria-haspopup="dialog" aria-controls="site-menu" aria-expanded={open} onClick={openMenu}>
          <span className="menu-glyph" aria-hidden="true"><i /><i /></span>
          {copy.menu}
        </button>
        <a href={`${home}#top`} className="brand" aria-label={copy.company}>
          <span className="brand-mark" aria-hidden="true" />
        </a>
        <a className="language header-language" href={translatedHome} hrefLang={otherLanguage} lang={otherLanguage}>{copy.language}</a>
      </header>

      <dialog id="site-menu" className="menu-dialog" ref={dialog} aria-label={copy.menu} onCancel={(event) => {
        event.preventDefault();
        closeMenu();
      }} onClick={(event) => {
        if (event.target === event.currentTarget) closeMenu();
      }}>
        <div className="menu-backdrop" aria-hidden="true" />
        <div className="menu-sheet">
          <button className="menu-close" type="button" aria-label={copy.close} onClick={() => closeMenu()}>
            <span className="menu-glyph" aria-hidden="true"><i /><i /></span>
          </button>
          <div className="menu-body">
            <p className="eyebrow">{copy.menu}</p>
            <nav aria-label={copy.menu}>
              {copy.nav.map(([id, label]) => (
                <a href={`#${id}`} key={id} onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  closeMenu(id);
                }}>{label}</a>
              ))}
            </nav>
          </div>
          <div className="menu-bottom">
            <div className="menu-contact">
              <p className="eyebrow">{copy.company}</p>
              <a href={`mailto:${email}`}>{email}</a>
              <a className="language" href={translatedHome} hrefLang={otherLanguage} lang={otherLanguage}>{copy.language}</a>
            </div>
            <span className="menu-brand brand-mark" aria-hidden="true" />
          </div>
        </div>
      </dialog>
    </>
  );
}

export function CollectionPanels({ copy }) {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(0);
  const dialog = useRef(null);
  const backdrops = useRef(null);
  const visibleBackdrop = useRef(0);
  const wipe = useRef(null);
  const [name, , description] = copy.collections[selected];
  const current = collectionMedia[selected];

  useEffect(() => () => wipe.current?.kill(), []);

  function previewCollection(index) {
    setHovered(index);
    if (index === visibleBackdrop.current || !window.matchMedia(desktopCollections).matches) return;

    wipe.current?.progress(1).kill();
    const previous = backdrops.current.querySelector(`[data-backdrop="${visibleBackdrop.current}"]`);
    const incoming = backdrops.current.querySelector(`[data-backdrop="${index}"]`);
    const strips = backdrops.current.querySelectorAll(`#collection-wipe-${index} rect`);
    visibleBackdrop.current = index;

    gsap.set(previous, { zIndex: 0 });
    gsap.set(incoming, { zIndex: 1, visibility: "visible" });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(strips, { attr: { width: 0.201 } });
      gsap.set(previous, { visibility: "hidden" });
      return;
    }
    wipe.current = gsap.fromTo(strips, { attr: { width: 0 } }, {
      attr: { width: 0.201 },
      duration: 0.52,
      stagger: 0.055,
      ease: "power2.inOut",
      onComplete: () => gsap.set(previous, { visibility: "hidden" }),
    });
  }

  function openCollection(index) {
    setSelected(index);
    dialog.current.showModal();
  }

  return (
    <>
      <div className="collection-stage">
        <div className="collection-canvas">
          <div className="collection-backdrops" aria-hidden="true" ref={backdrops}>
            <svg className="collection-masks" width="0" height="0" aria-hidden="true">
              <defs>
                {backdropMedia.map(({ image }, index) => (
                  <clipPath key={image} id={`collection-wipe-${index}`} clipPathUnits="objectBoundingBox">
                    {stripOffsets.map((x) => <rect key={x} x={x} y="0" width="0.201" height="1" />)}
                  </clipPath>
                ))}
              </defs>
            </svg>
            {backdropMedia.map(({ image, position }, index) => (
              <div className="collection-backdrop" key={image} data-backdrop={index} style={{ clipPath: `url(#collection-wipe-${index})` }}>
                <TextileImage image={image} position={position} />
              </div>
            ))}
          </div>
          <div className="collection-options" onPointerLeave={() => setHovered(null)}>
            {copy.collections.map(([title, subtitle], index) => {
              const { image, position } = collectionMedia[index];
              return (
                <button key={title} className="collection-card" type="button" aria-haspopup="dialog" aria-label={`${copy.view} — ${title}`} data-active={hovered === index} onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") previewCollection(index);
                }} onFocus={() => previewCollection(index)} onBlur={() => setHovered(null)} onClick={() => openCollection(index)}>
                  <TextileImage image={image} className="collection-image" position={position} />
                  <span className="collection-info">
                    <span className="collection-title">{title}</span>
                    <span className="collection-tag eyebrow">{copy.collectionTag}</span>
                    <span className="collection-plus" aria-hidden="true">+</span>
                    <span className="collection-more">
                      <span className="collection-description">{subtitle}</span>
                      <span className="collection-cta">{copy.view}<Arrow /></span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
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
    media.add(`${desktopCollections} and (prefers-reduced-motion: no-preference)`, () => {
      const stage = document.querySelector(".collection-stage");
      const canvas = stage.querySelector(".collection-canvas");
      const fabric = stage.querySelector(".collection-backdrops");
      const options = stage.querySelector(".collection-options");
      // Align the top of the centered preview with the space below the heading.
      gsap.set(stage, { marginTop: "-35svh" });
      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => `+=${stage.offsetHeight * 0.9}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
        },
      });
      reveal
        .fromTo(canvas, { clipPath: "inset(35% 38.75% 35% 38.75% round 6px)" }, {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          duration: 0.9,
          ease: "power1.inOut",
        })
        .fromTo(fabric, { scale: 0.3 }, { scale: 1, duration: 0.9, ease: "power1.inOut" }, 0)
        .fromTo(options, { opacity: 0, pointerEvents: "none" }, { opacity: 1, duration: 0.16 }, 0.84)
        .set(options, { pointerEvents: "auto" }, 0.94);

      function revealFocusedOption(event) {
        if (event.target.matches(":focus-visible") && reveal.progress() < 1) {
          window.scrollTo({ top: reveal.scrollTrigger.end, behavior: "instant" });
          ScrollTrigger.update();
        }
      }
      options.addEventListener("focusin", revealFocusedOption);
      return () => options.removeEventListener("focusin", revealFocusedOption);
    });

    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".hero-content h1 .title-line", {
        yPercent: 28, opacity: 0, duration: 1, stagger: 0.14, ease: "power3.out",
      });
      gsap.from(".hero-label, .hero-scroll", { opacity: 0, duration: 0.8, delay: 0.3 });

      gsap.to(".hero-media", {
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
      gsap.from(".feature-media", {
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
    // Let the initial anchor resolve after ScrollTrigger adds its pin spacing.
    const anchor = document.getElementById(window.location.hash.slice(1));
    const frame = anchor && requestAnimationFrame(() => anchor.scrollIntoView({ behavior: "instant" }));
    return () => {
      if (frame) cancelAnimationFrame(frame);
      media.revert();
    };
  }, []);

  return null;
}

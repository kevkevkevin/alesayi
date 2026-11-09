import { CollectionPanels, HeroMedia, Navigation, Showrooms, Motion } from "./interactions";
import { copy, email, getLocations, instagram, phoneLink, tiktok, whatsapp } from "./content";
import { Arrow, TextileImage } from "./ui";

function TitleLines({ lines }) {
  return lines.map((line) => <span key={line} className="title-line">{line}</span>);
}

export default function Home({ locale }) {
  const c = copy[locale];
  const arabic = locale === "ar";

  return (
    <div id="top" className="site" lang={locale} dir={arabic ? "rtl" : "ltr"}>
      <a className="skip" href="#main">{c.skip}</a>
      <Navigation copy={c} locale={locale} />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-shade" />
          <div className="hero-content gutter">
            <p className="eyebrow hero-label">{c.heroLabel}</p>
            <h1 id="hero-title"><TitleLines lines={c.hero} /></h1>
          </div>
          <HeroMedia playLabel={c.playVideo} pauseLabel={c.pauseVideo}>
            <a href="#introduction" className="hero-scroll" aria-label={c.scroll}>
              <span className="circle"><Arrow direction="down" /></span>
              <span className="eyebrow">{c.scroll}</span>
            </a>
          </HeroMedia>
        </section>

        <section id="introduction" className="statement gutter" aria-labelledby="intro-title">
          <p className="eyebrow section-mark"><span className="dot" />{c.introLabel}</p>
          <h2 id="intro-title">
            <span className="sr-only">{c.intro}</span>
            <span aria-hidden="true">{c.intro.split(" ").map((word, index) => (
              <span className="statement-word" key={index}>{word}{" "}</span>
            ))}</span>
          </h2>
          <span className="statement-thread" aria-hidden="true">✳</span>
        </section>

        <section id="collections" className="collections" aria-labelledby="collections-title">
          <div className="section-heading gutter" data-reveal>
            <p className="eyebrow section-mark"><span className="dot" />{c.collectionLabel}</p>
            <h2 id="collections-title">{c.collectionTitle}</h2>
          </div>
          <CollectionPanels copy={c} />
        </section>

        <section id="story" className="story gutter" aria-labelledby="story-title">
          <p className="eyebrow section-mark" data-reveal><span className="dot" />{c.storyLabel}</p>
          <div className="story-intro" data-reveal>
            <h2 id="story-title">{c.storyTitle}</h2>
            <p>{c.storyBody}</p>
          </div>
          <dl className="story-facts" data-reveal>
            {c.facts.map(([number, label]) => (
              <div className="story-fact" key={label}>
                <dt className="eyebrow">{label}</dt>
                <dd>{number}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="feature" aria-labelledby="feature-title">
          <div className="feature-window">
            <TextileImage image="banner-9" className="feature-image" />
            <div className="feature-shade" />
          </div>
          <div className="feature-content gutter">
            <p className="eyebrow section-mark" data-reveal><span className="dot" />{c.featureLabel}</p>
            <h2 id="feature-title" data-reveal><TitleLines lines={c.featureTitle} /></h2>
            <a className="text-link" href="#showrooms">{c.featureLink}<Arrow /></a>
          </div>
        </section>

        <section className="quality gutter" aria-labelledby="quality-title">
          <div className="quality-copy" data-reveal>
            <p className="eyebrow section-mark"><span className="dot" />{c.qualityLabel}</p>
            <h2 id="quality-title">{c.qualityTitle}</h2>
            <p>{c.qualityBody}</p>
          </div>
          <figure className="quality-image quality-image-tall">
            <TextileImage image="banner-8" position="center 53%" />
          </figure>
          <figure className="quality-image quality-image-small">
            <TextileImage image="banner-6" />
          </figure>
        </section>

        <section id="showrooms" className="showrooms gutter" aria-labelledby="showrooms-title">
          <div className="section-heading showroom-heading" data-reveal>
            <p className="eyebrow section-mark"><span className="dot" />{c.showroomLabel}</p>
            <h2 id="showrooms-title">{c.showroomTitle}</h2>
            <p>{c.showroomBody}</p>
          </div>
          <Showrooms copy={c} locations={getLocations(locale)} locale={locale} />
        </section>
      </main>

      <footer id="contact" className="footer gutter">
        <div className="footer-media" aria-hidden="true"><TextileImage image="banner-16" /></div>
        <div className="footer-content">
          <p className="eyebrow section-mark" data-reveal><span className="dot" />{c.contactLabel}</p>
          <div className="footer-hero" data-reveal>
            <h2><TitleLines lines={c.contactTitle} /></h2>
            <div className="footer-actions">
              <a href={`mailto:${email}`} className="button button-light">{c.emailUs}<Arrow /></a>
              <a href={whatsapp} className="button button-ghost">WhatsApp<Arrow /></a>
            </div>
          </div>
          <div className="footer-details">
            <div>
              <p className="eyebrow">{c.company}</p>
              <a href={`mailto:${email}`}>{email}</a>
              <a dir="ltr" href={phoneLink("0126433364")}>+966 12 643 3364</a>
            </div>
            <div>
              <p className="eyebrow">{c.hq}</p>
              <p>{c.hqAddress}</p>
              <p>{c.hqPost}</p>
            </div>
            <div>
              <p className="eyebrow">{c.social}</p>
              <a href={instagram}>Instagram</a>
              <a href={tiktok}>TikTok</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} {c.brand}. {c.copyright}.</p>
            <a href="#top">{c.back}<Arrow direction="up" /></a>
          </div>
        </div>
      </footer>
      <Motion />
    </div>
  );
}

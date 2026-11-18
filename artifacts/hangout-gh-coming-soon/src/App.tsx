import { useEffect, useState } from 'react';
import {
  SiFacebook,
  SiInstagram,
  SiX,
  SiYoutube,
} from 'react-icons/si';
import { socialLinks } from '@/config/socialLinks';

const launchTimestamp = Date.UTC(2027, 0, 1, 0, 0, 0);
const socialIcons = {
  Facebook: SiFacebook,
  Instagram: SiInstagram,
  YouTube: SiYoutube,
  X: SiX,
} as const;
const units = [
  { key: 'days', label: 'Days', size: 86_400_000 },
  { key: 'hours', label: 'Hours', size: 3_600_000 },
  { key: 'minutes', label: 'Minutes', size: 60_000 },
  { key: 'seconds', label: 'Seconds', size: 1_000 },
] as const;

function getRemaining(now: number) {
  let remaining = Math.max(0, launchTimestamp - now);
  const result: Record<(typeof units)[number]['key'], number> = {
    days: 0, hours: 0, minutes: 0, seconds: 0,
  };
  for (const unit of units) {
    result[unit.key] = Math.floor(remaining / unit.size);
    remaining %= unit.size;
  }
  return result;
}

function App() {
  const [now, setNow] = useState(() => Date.now());
  const remaining = getRemaining(now);
  const isLive = now >= launchTimestamp;

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="hero-title">
        <header className="topbar">
          <img className="brand-logo" src="/hangout-gh-logo.png" alt="Hangout-GH logo" />
          <div className="top-note">Launching 01 January 2027</div>
        </header>
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="eyebrow">WEBSITE LAUNCHING SOON<br />A NEW GHANAIAN, AFRICA, DIASPORA EXPERIENCE</div>
            <h1 id="hero-title">Something <span>exciting</span> is coming.</h1>
            <p className="lead">Hangout-GH is getting ready to go live. Your next destination for entertainment, lifestyle, media, events, and exciting connections is on its way.</p>
            <div className="hero-actions">
              <a className="action action-primary" href="#socials" data-testid="link-follow-journey">FOLLOW OUR JOURNEY <span aria-hidden="true">↗</span></a>
              <a className="action action-secondary" href="#countdown" data-testid="link-launch-countdown">LAUNCH COUNTDOWN <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className="emblem-wrap" aria-hidden="true">
            <div className="emblem-ring" />
            <img className="emblem-logo" src="/hangout-gh-logo.png" alt="" />
            <div className="orbit-label">GHANA · AFRICA<br />DIASPORA</div>
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i}>ENTERTAINMENT <b className="ticker-dot">/</b> LIFESTYLE <b className="ticker-dot">/</b> TRAVEL <b className="ticker-dot">/</b> COMMUNITY <b className="ticker-dot">/</b> </span>
          ))}
        </div>
      </div>

      <section className="story" aria-label="About Hangout-GH">
        <div className="story-inner">
          <div className="section-marker">01 / THE JOURNEY</div>
          <div className="story-content">
            <h2>Something special is taking <em>shape.</em></h2>
            <p>We're working behind the scenes to bring you something special. Stay connected and be part of the journey.</p>
            <div className="slogan">ENTERTAINMENT. LIFESTYLE. TRAVEL. COMMUNITY.</div>
          </div>
        </div>
      </section>

      <section className="countdown-section" id="countdown" aria-labelledby="countdown-title">
        <div className="countdown-inner">
          <div>
            <div className="section-marker">02 / THE MOMENT</div>
            <h2 className="countdown-title" id="countdown-title">{isLive ? "We're live." : 'The wait is on.'}</h2>
            <div className="countdown-sub">01 JANUARY 2027 · 12:00 AM · GHANA TIME</div>
          </div>
          {isLive ? (
            <div className="live-message" role="status" data-testid="status-live">WE'RE LIVE! WELCOME TO HANGOUT-GH.</div>
          ) : (
            <div className="timer" role="timer" aria-label="Countdown to launch" data-testid="countdown-timer">
              {units.map((unit) => (
                <div className="time-unit" key={unit.key}>
                  <div key={remaining[unit.key]} className="time-number" data-testid={`countdown-${unit.key}`}>{String(remaining[unit.key]).padStart(2, '0')}</div>
                  <div className="time-label">{unit.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="socials" id="socials" aria-labelledby="social-title">
        <div className="social-inner">
          <div>
            <div className="section-marker">03 / KEEP CLOSE</div>
            <div className="social-content">
              <div className="eyebrow">JOIN US ON SOCIAL MEDIA</div>
              <h2 id="social-title">LET'S STAY <span>CONNECTED</span></h2>
              <p>Follow along for updates, sneak peeks, announcements, and launch news.</p>
            </div>
          </div>
          <div className="social-list">
            {socialLinks.map((social) => (
              <a
                className="social-link"
                href={social.url}
                key={social.name}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`link-social-${social.name.toLowerCase()}`}
              >
                <span className="social-platform">
                  {(() => {
                    const Icon = socialIcons[social.name];
                    return <Icon className="social-icon" aria-hidden="true" />;
                  })()}
                  <span>{social.name}</span>
                </span>
                <span className="social-meta">{social.handle}<span className="social-arrow" aria-hidden="true">↗</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-brand">HANGOUT-GH</div>
            <div className="footer-slogan">ENTERTAINMENT. LIFESTYLE. TRAVEL. COMMUNITY.</div>
          </div>
          <nav className="footer-socials" aria-label="Hangout-GH social media">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.name];
              return (
                <a
                  className="footer-social"
                  href={social.url}
                  key={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.name} ${social.handle} (opens in a new tab)`}
                  data-testid={`link-social-${social.name.toLowerCase()}-footer`}
                >
                  <Icon aria-hidden="true" />
                </a>
              );
            })}
          </nav>
          <div className="copyright">© Hangout-GH. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}

export default App;

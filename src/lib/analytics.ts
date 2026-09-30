import posthog from 'posthog-js';

const POSTHOG_HOST = 'https://eu.i.posthog.com';
const STORAGE_KEY = 'pgb_first_touch';
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const SEARCH_ENGINES = ['google', 'bing', 'duckduckgo', 'yahoo', 'ecosia', 'startpage', 'yandex'];
const REGISTRATION_SELECTOR = 'a[href^="https://app.pgbplanner.nl/registreer"]';
const BLOG_CTA_SELECTOR = '.article-content .product-cta a[data-position], .sticky-cta a[data-position]';
const INLINE_CTA_SELECTOR = '.article-content .product-cta';

type FirstTouch = {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  first_seen_at: number;
};

let ready = false;
const viewedBlogCtaPositions = new Set<string>();

function getStoredFirstTouch(): FirstTouch | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FirstTouch) : null;
  } catch {
    return null;
  }
}

function deriveFirstTouch(): FirstTouch {
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source');

  if (utmSource) {
    return {
      source: utmSource,
      medium: params.get('utm_medium') ?? '',
      campaign: params.get('utm_campaign') ?? '',
      content: params.get('utm_content') ?? '',
      first_seen_at: Date.now(),
    };
  }

  const referrer = document.referrer;
  if (!referrer) {
    return { source: 'direct', medium: 'direct', campaign: '', content: '', first_seen_at: Date.now() };
  }

  try {
    const referrerHostname = new URL(referrer).hostname.replace(/^www\./, '');
    const currentHostname = window.location.hostname.replace(/^www\./, '');

    if (referrerHostname === currentHostname) {
      return { source: 'direct', medium: 'direct', campaign: '', content: '', first_seen_at: Date.now() };
    }

    const engine = SEARCH_ENGINES.find((e) => referrerHostname.includes(e));
    return {
      source: engine ?? referrerHostname,
      medium: engine ? 'organic' : 'referral',
      campaign: '',
      content: '',
      first_seen_at: Date.now(),
    };
  } catch {
    return { source: 'direct', medium: 'direct', campaign: '', content: '', first_seen_at: Date.now() };
  }
}

export function ensureFirstTouch(): void {
  const stored = getStoredFirstTouch();
  if (stored && Date.now() - stored.first_seen_at < THIRTY_DAYS_MS) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deriveFirstTouch()));
  } catch {
    // localStorage unavailable (private mode etc.) — first-touch context is skipped, not fatal
  }
}

export function applyUtmsToRegistrationLinks(): void {
  const ft = getStoredFirstTouch();
  if (!ft) return;

  const mapping: Array<[string, string]> = [
    ['utm_source', ft.source],
    ['utm_medium', ft.medium],
    ['utm_campaign', ft.campaign],
    ['utm_content', ft.content],
  ];

  document.querySelectorAll<HTMLAnchorElement>(REGISTRATION_SELECTOR).forEach((el) => {
    try {
      const url = new URL(el.href);
      mapping.forEach(([key, value]) => {
        if (value) url.searchParams.set(key, value);
      });
      el.href = url.toString();
    } catch {
      // malformed href — leave untouched
    }
  });
}

function registerSuperProperties(): void {
  const ft = getStoredFirstTouch();
  if (!ft) return;

  const props: Record<string, string> = {};
  if (ft.source) props.first_source = ft.source;
  if (ft.medium) props.first_medium = ft.medium;
  if (ft.campaign) props.first_campaign = ft.campaign;
  if (ft.content) props.first_content = ft.content;

  posthog.register(props);
}

export function initPostHog(): void {
  if (import.meta.env.DEV) return;

  const key = import.meta.env.PUBLIC_POSTHOG_KEY;
  if (!key) {
    console.warn('[PostHog] PUBLIC_POSTHOG_KEY is not set: PostHog will not initialise.');
    return;
  }

  posthog.init(key, {
    api_host: POSTHOG_HOST,
    disable_session_recording: true,
    person_profiles: 'identified_only',
    cross_subdomain_cookie: false,
    autocapture: false,
    capture_pageview: false,
  });

  registerSuperProperties();
  posthog.capture('$pageview');
  ready = true;
}

export function bindRegistrationCtaTracking(): void {
  document
    .querySelectorAll<HTMLAnchorElement>(`${REGISTRATION_SELECTOR}[data-position]`)
    .forEach((el) => {
      el.addEventListener('click', () => {
        if (!ready) return;
        posthog.capture('product_cta_clicked', {
          page_type: document.body.dataset.pageType,
          page_slug: document.body.dataset.pageSlug,
          position: el.dataset.position,
        });
      });
    });
}

function blogCtaProperties(el: HTMLAnchorElement): Record<string, string | undefined> {
  const href = el.getAttribute('href') ?? '';
  return {
    page_type: document.body.dataset.pageType,
    page_slug: document.body.dataset.pageSlug,
    position: el.dataset.position,
    destination: href.split(/[?#]/)[0],
  };
}

export function bindBlogCtaTracking(): void {
  document.querySelectorAll<HTMLAnchorElement>(BLOG_CTA_SELECTOR).forEach((el) => {
    el.addEventListener('click', () => {
      if (!ready) return;
      posthog.capture('blog_cta_clicked', blogCtaProperties(el));
    });
  });
}

// Once per page view per position; later calls (e.g. the sticky bar reappearing) are ignored.
// Returns true once the position is recorded (now or earlier), false if nothing could be captured yet.
export function trackBlogCtaViewed(el: HTMLAnchorElement): boolean {
  const position = el.dataset.position;
  if (!ready || !position) return false;
  if (viewedBlogCtaPositions.has(position)) return true;
  viewedBlogCtaPositions.add(position);
  posthog.capture('blog_cta_viewed', blogCtaProperties(el));
  return true;
}

export function observeInlineCtaImpression(): void {
  const blocks = document.querySelectorAll<HTMLElement>(INLINE_CTA_SELECTOR);
  if (!blocks.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.5) return;
        const link = entry.target.querySelector<HTMLAnchorElement>('a[data-position]');
        if (link && trackBlogCtaViewed(link)) observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 },
  );

  blocks.forEach((block) => observer.observe(block));
}

export function bindShareTracking(): void {
  document.querySelectorAll<HTMLElement>('.blog-post__share [data-channel]').forEach((el) => {
    el.addEventListener('click', () => {
      if (!ready) return;
      posthog.capture('share_clicked', {
        page_type: document.body.dataset.pageType,
        page_slug: document.body.dataset.pageSlug,
        position: el.dataset.position,
        channel: el.dataset.channel,
      });
    });
  });
}

export function trackContactFormSubmitted(): void {
  if (!ready) return;
  posthog.capture('contact_form_submitted', {
    page_type: document.body.dataset.pageType,
    page_slug: document.body.dataset.pageSlug,
    position: 'section',
  });
}

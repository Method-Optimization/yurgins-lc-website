/**
 * Yurgin's motion engine — modeled on casperscaviar.com (GSAP + ScrollTrigger
 * + SplitText + Lenis). Data-attribute driven, desktop-only, reduced-motion &
 * no-JS safe.
 *
 * Effects:
 *   [data-split]            masked line/word heading reveal
 *   [data-reveal-group]     staggered fade-up of direct children
 *   [data-reveal]           single fade-up
 *   [data-parallax]         subtle scroll parallax
 *   [data-showcase]         pinned panel whose copy swaps per slide
 *
 * (The homepage intro overlay fades itself out — see Hero.astro — and is not
 * driven by this engine.)
 *
 * Gating: all transform animations run only on (min-width:768px) with motion
 * allowed. On mobile / reduced-motion nothing is hidden and nothing animates.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const root = document.documentElement;
const revealAll = () => root.classList.add('motion-ready');
const EASE = 'expo.out';

/* ---------------------------------------------------------------- Lenis */
function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Allow [data-scroll-to] anchors to use Lenis
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -90 });
      }
    });
  });
  return lenis;
}

/* --------------------------------------------------- Heading reveals */
function setupHeadingReveals() {
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
    const type = (el.dataset.splitReveal as 'lines' | 'words' | 'chars') || 'lines';
    const split = SplitText.create(el, {
      type,
      mask: type === 'chars' ? 'chars' : type,
      linesClass: 'split-line',
      wordsClass: 'split-word',
      charsClass: 'split-char',
    });
    const targets =
      type === 'lines' ? split.lines : type === 'words' ? split.words : split.chars;

    gsap.set(el, { autoAlpha: 1 });
    gsap.set(targets, { yPercent: 110 });

    const duration = type === 'lines' ? 0.95 : type === 'words' ? 0.8 : 0.6;
    const stagger = type === 'lines' ? 0.12 : type === 'words' ? 0.06 : 0.02;
    const delay = parseFloat(el.dataset.splitDelay || '0');

    const anim = { yPercent: 0, duration, ease: EASE, stagger };

    if (el.hasAttribute('data-split-hero')) {
      gsap.to(targets, { ...anim, delay });
    } else {
      gsap.to(targets, {
        ...anim,
        delay,
        scrollTrigger: { trigger: el, start: el.dataset.splitStart || 'top 82%', once: true },
      });
    }
  });
}

/* --------------------------------------------------- Content reveals */
function setupContentReveals() {
  gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = gsap.utils.toArray<HTMLElement>(group.children);
    if (!items.length) return;
    const stagger = parseFloat(group.dataset.stagger || '120') / 1000;
    const distance = group.dataset.distance || '2rem';

    gsap.set(items, { opacity: 0, y: distance });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: EASE,
      stagger,
      clearProps: 'transform',
      scrollTrigger: { trigger: group, start: group.dataset.start || 'top 80%', once: true },
    });
  });

  gsap.utils
    .toArray<HTMLElement>('[data-reveal]')
    .filter((el) => !el.closest('[data-reveal-group]'))
    .forEach((el) => {
      gsap.set(el, { opacity: 0, y: el.dataset.distance || '1.5rem' });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: EASE,
        delay: parseFloat(el.dataset.delay || '0'),
        clearProps: 'transform',
        scrollTrigger: { trigger: el, start: el.dataset.start || 'top 85%', once: true },
      });
    });
}

/* --------------------------------------------------------- Parallax */
function setupParallax() {
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || '0.18');
    const bounds = (el.closest('[data-parallax-bounds]') as HTMLElement) || el;
    gsap.fromTo(
      el,
      { yPercent: -speed * 50 },
      {
        yPercent: speed * 50,
        ease: 'none',
        scrollTrigger: { trigger: bounds, start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );
  });
}

/* ------------------------------------------- Pinned showcase panel */
function setupShowcase() {
  document.querySelectorAll<HTMLElement>('[data-showcase]').forEach((section) => {
    const panels = gsap.utils.toArray<HTMLElement>('[data-showcase-copy]', section);
    const slides = gsap.utils.toArray<HTMLElement>('[data-showcase-slide]', section);
    if (panels.length < 2 || slides.length !== panels.length) return;

    gsap.set(panels.slice(1), { autoAlpha: 0, yPercent: 20 });
    gsap.set(panels[0], { autoAlpha: 1, yPercent: 0 });

    let current = 0;
    const show = (i: number) => {
      if (i === current) return;
      const incoming = panels[i];
      const outgoing = panels[current];
      current = i;
      gsap.to(outgoing, { autoAlpha: 0, yPercent: -20, duration: 0.35, ease: 'power2.in' });
      gsap.fromTo(
        incoming,
        { autoAlpha: 0, yPercent: 20 },
        { autoAlpha: 1, yPercent: 0, duration: 0.45, ease: 'power2.out', delay: 0.08 }
      );
    };

    slides.forEach((slide, i) => {
      ScrollTrigger.create({
        trigger: slide,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => self.isActive && show(i),
      });
    });
  });
}

/* --------------------------------------------------------------- init */
function initMotion() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) initSmoothScroll();

  const mm = gsap.matchMedia();
  mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
    setupHeadingReveals();
    setupContentReveals();
    setupParallax();
    setupShowcase();
  });

  ScrollTrigger.refresh();
  revealAll();
}

let booted = false;
function boot() {
  if (booted) return;
  booted = true;
  try {
    initMotion();
  } catch (err) {
    console.error('[motion] init failed — revealing content', err);
    revealAll();
  }
}

if (document.fonts && 'ready' in document.fonts) {
  document.fonts.ready.then(boot);
  // Hard safety: never let content stay hidden if fonts hang.
  window.setTimeout(boot, 1800);
} else {
  boot();
}

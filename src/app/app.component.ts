import { AfterViewInit, Component, OnDestroy, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Subscription } from 'rxjs';

import { About } from './components/about/about.component';
import { Contact } from './components/contact/contact.component';
import { Footer } from './components/footer/footer.component';
import { Header } from './components/header/header.component';
import { Hero } from './components/hero/hero.component';
import { PersonalInfo } from './components/personal-info/personal-info.component';
import { Projects } from './components/projects/projects.component';
import { Skills } from './components/skills/skills.component';
import { LanguageService } from './core/services/app/language.service';
import { IconsComponent } from './shared/icons/icons.component';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  imports: [Header, Hero, About, Projects, Skills, Contact, PersonalInfo, Footer, IconsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App implements AfterViewInit, OnDestroy {
  private static readonly prefersReducedMotion =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  private readonly languageService: LanguageService = inject(LanguageService);
  private readonly translate: TranslateService = inject(TranslateService);
  private readonly languageRefreshSubscription: Subscription;

  public constructor() {
    // The translated text (and therefore the layout) only changes once
    // translate.use() has loaded the new language file, so refresh the
    // ScrollTriggers after the DOM has re-rendered with the new strings.
    // Otherwise reveal triggers keep positions measured from the previous
    // language's layout and can never fire when scrolling from the top.
    this.languageRefreshSubscription = this.translate.onLangChange.subscribe(() => {
      requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
    });
  }

  public ngOnDestroy(): void {
    this.languageRefreshSubscription.unsubscribe();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  public ngAfterViewInit(): void {
    this.setupSmoothScrollGuard();
    this.animateHero();
    this.setupScrollReveals();
    this.scheduleScrollTriggerRefreshes();
    ScrollTrigger.refresh();
  }

  private animateHero(): void {
    // Pro-hero entrance: badge, name, role, tagline and CTAs cascade in, then
    // the scroll cue fades in and starts bobbing forever. clearProps makes sure
    // no element can linger in a from-state (e.g. if the animation is
    // interrupted or a CSS transition fights the transform).
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'transform,opacity' } });
    tl.from('.hero-badge', { y: 24, opacity: 0, duration: 0.5 })
      .from('.hero-name', { y: 60, opacity: 0, duration: 0.9 }, '-=0.25')
      .from('.hero-role', { y: 32, opacity: 0, duration: 0.7 }, '-=0.65')
      .from('.hero-tagline', { y: 24, opacity: 0, duration: 0.6 }, '-=0.55')
      .from('.hero-cta > *', { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.45')
      .from('.hero-scroll', { y: -16, opacity: 0, duration: 0.5 }, '-=0.25')
      .add(() => {
        // Perpetual motion is skipped for reduced-motion users. The bob is
        // never killed: the hero is a permanent root-level section.
        if (App.prefersReducedMotion) {
          return;
        }
        gsap.to('.hero-scroll-icon', {
          y: 6,
          duration: 1.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.3,
        });
      });
  }

  private setupScrollReveals(): void {
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        y: 48,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });

    gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
      const children = Array.from(group.children);
      if (!children.length) return;
      gsap.from(children, {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: group, start: 'top 85%' },
      });
    });
  }

  /**
   * Re-measure ScrollTrigger positions once the layout settles (webfonts,
   * external assets, async translations). Without this, reveal triggers keep
   * their initial positions and can never fire when scrolling from the top,
   * leaving sections like the projects cards stuck hidden (opacity 0).
   */
  private scheduleScrollTriggerRefreshes(): void {
    const refresh = (): void => ScrollTrigger.refresh();

    if (document.fonts) {
      document.fonts.ready.then(refresh).catch(() => undefined);
    }
    if (document.readyState === 'complete') {
      requestAnimationFrame(refresh);
    } else {
      window.addEventListener('load', refresh, { once: true });
    }
  }

  /**
   * Native `scroll-behavior: smooth` (see styles.css) animates ScrollTrigger's
   * internal scroll resets during refresh(), so trigger positions get measured
   * mid-scroll and can end up never firing. Force instant scrolling for the
   * duration of each refresh cycle, then restore the CSS behavior.
   */
  private setupSmoothScrollGuard(): void {
    const html = document.documentElement;

    ScrollTrigger.addEventListener('refreshInit', () => {
      html.style.scrollBehavior = 'auto';
    });
    ScrollTrigger.addEventListener('refresh', () => {
      requestAnimationFrame(() => {
        html.style.scrollBehavior = '';
      });
    });
  }
}

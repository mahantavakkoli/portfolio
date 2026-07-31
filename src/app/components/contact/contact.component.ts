import { AfterViewInit, Component, ElementRef, OnDestroy, effect, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { gsap } from 'gsap';

import { LanguageService } from '../../core/services/app/language.service';
import { ProfileService } from '../../core/services/app/profile.service';

@Component({
  selector: 'app-contact',
  imports: [TranslatePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class Contact implements AfterViewInit, OnDestroy {
  public readonly profileService: ProfileService = inject(ProfileService);

  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly languageService: LanguageService = inject(LanguageService);
  private readonly hoverTimelines: gsap.core.Timeline[] = [];

  /** Respect users who prefer reduced motion by skipping hover animations. */
  private static readonly prefersReducedMotion =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  public constructor() {
    // Keep the arrow/text nudge direction in sync with the live EN/FA
    // direction toggle (the language service flips `dir` on the root element).
    effect(() => {
      this.languageService.currentLang();
      this.hoverTimelines.forEach((tl) => {
        const nudge = this.arrowNudgeDistance();
        tl.getById('arrow-nudge')?.resetTo('x', nudge);
        tl.getById('text-nudge')?.resetTo('x', nudge * 0.4);
      });
    });
  }

  public ngAfterViewInit(): void {
    this.setupCardHovers();
  }

  public ngOnDestroy(): void {
    this.hoverTimelines.forEach((tl) => tl.kill());
  }

  private setupCardHovers(): void {
    if (Contact.prefersReducedMotion) {
      return;
    }
    const cards = this.elementRef.nativeElement.querySelectorAll<HTMLElement>('.contact-card');

    cards.forEach((card) => {
      const icon = card.querySelector<HTMLElement>('.contact-icon');
      const text = card.querySelector<HTMLElement>('.contact-text');
      const arrow = card.querySelector<HTMLElement>('.contact-arrow');
      if (!icon || !text || !arrow) {
        return;
      }

      gsap.set(icon, { transformOrigin: 'center center' });

      const tl = gsap
        .timeline({
          paused: true,
          defaults: { ease: 'power3.out' },
          // When a hover fully reverses, drop ALL of GSAP's inline styles so
          // the theme's CSS classes (dark:border-slate-800, icon tints) regain
          // control. Otherwise GSAP's captured inline values stick and the
          // border/icon stop following the dark/light toggle.
          onReverseComplete: () => {
            gsap.set([card, icon, text, arrow], {
              clearProps: 'transform,borderColor,boxShadow,backgroundColor,color',
            });
          },
        })
        // Card lifts and gains an indigo glow, icon pops with a springy scale
        // while flipping to solid indigo, text nudges toward the arrow.
        .to(
          card,
          {
            y: -6,
            scale: 1.02,
            boxShadow: '0 20px 35px -12px rgba(99, 102, 241, 0.45)',
            borderColor: 'rgba(99, 102, 241, 0.35)',
            duration: 0.4,
          },
          0,
        )
        .to(
          icon,
          {
            scale: 1.18,
            rotation: 8,
            backgroundColor: '#6366f1',
            color: '#ffffff',
            duration: 0.5,
            ease: 'back.out(1.8)',
          },
          0,
        )
        .to(text, { x: this.arrowNudgeDistance() * 0.4, id: 'text-nudge', duration: 0.35 }, 0)
        .to(arrow, { x: this.arrowNudgeDistance(), id: 'arrow-nudge', duration: 0.35 }, 0);

      this.hoverTimelines.push(tl);

      // invalidate() before each play re-reads the current computed styles, so
      // a theme change between hovers never animates from stale start values.
      const play = (): void => {
        tl.invalidate().play();
      };

      card.addEventListener('mouseenter', play);
      card.addEventListener('mouseleave', () => tl.reverse());
      card.addEventListener('focusin', play);
      card.addEventListener('focusout', () => tl.reverse());
    });
  }

  /** +x in LTR (arrow points away), -x in RTL (mirrored layout). */
  private arrowNudgeDistance(): number {
    return getComputedStyle(this.elementRef.nativeElement).direction === 'rtl' ? -6 : 6;
  }
}

import { AfterViewInit, Component, ElementRef, OnDestroy, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProfileService } from '../../core/services/app/profile.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  imports: [TranslatePipe],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class Hero implements AfterViewInit, OnDestroy {
  private static readonly prefersReducedMotion =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  public readonly profileService: ProfileService = inject(ProfileService);

  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly listeners: Array<() => void> = [];
  private context?: gsap.Context;

  public ngAfterViewInit(): void {
    // All animations created below are scoped to a context so they (and their
    // ScrollTriggers) are reverted together on destroy.
    this.context = gsap.context(() => {
      this.setupMouseTilt();
      this.setupScrollParallax();
    });
  }

  public ngOnDestroy(): void {
    this.listeners.forEach((remove) => remove());
    this.context?.revert();
    // quickTo tweens are created lazily on the first pointer move, outside the
    // context function, so sweep them up explicitly as well.
    const stage = this.elementRef.nativeElement.querySelector('.hero-tilt');
    if (stage) {
      gsap.killTweensOf(stage);
    }
  }

  /**
   * Subtle 3D tilt: the hero stage rotates toward the cursor while the
   * .hero-depth-* layers (translateZ) pop apart, creating a layered parallax
   * feel. Desktop only — skipped for touch/trackpad-coarse pointers and
   * reduced motion.
   */
  private setupMouseTilt(): void {
    if (Hero.prefersReducedMotion) {
      return;
    }
    if (typeof window.matchMedia !== 'function' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const host = this.elementRef.nativeElement;
    const section = host.querySelector<HTMLElement>('section');
    const stage = host.querySelector<HTMLElement>('.hero-tilt');
    if (!section || !stage) {
      return;
    }

    // quickTo returns a smooth setter: every pointer move eases toward the new
    // value instead of snapping, keeping the tilt buttery without jank.
    const maxTilt = 5; // degrees
    const maxShift = 8; // pixels
    const rotateX = gsap.quickTo(stage, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const rotateY = gsap.quickTo(stage, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    const moveX = gsap.quickTo(stage, 'x', { duration: 0.6, ease: 'power3.out' });
    const moveY = gsap.quickTo(stage, 'y', { duration: 0.6, ease: 'power3.out' });

    // The hero's rect is viewport-relative, so it moves while the user
    // scrolls — cache it lazily and invalidate on scroll/resize, instead of
    // forcing a layout reflow via getBoundingClientRect() on every pointermove.
    // Scroll fires at most once per frame, far less often than pointermove.
    let sectionRect: DOMRect | null = null;
    const invalidateRect = (): void => {
      sectionRect = null;
    };
    window.addEventListener('scroll', invalidateRect, { passive: true });
    window.addEventListener('resize', invalidateRect);
    this.listeners.push(() => window.removeEventListener('scroll', invalidateRect));
    this.listeners.push(() => window.removeEventListener('resize', invalidateRect));

    const onPointerMove = (event: PointerEvent): void => {
      if (!sectionRect) {
        sectionRect = section.getBoundingClientRect();
      }
      if (sectionRect.width === 0 || sectionRect.height === 0) {
        return;
      }
      // Cursor position normalized to -0.5 … 0.5 around the section center.
      const px = (event.clientX - sectionRect.left) / sectionRect.width - 0.5;
      const py = (event.clientY - sectionRect.top) / sectionRect.height - 0.5;
      rotateY(px * maxTilt * 2);
      rotateX(-py * maxTilt * 2);
      moveX(px * maxShift * 2);
      moveY(py * maxShift * 2);
    };

    const onPointerLeave = (): void => {
      rotateX(0);
      rotateY(0);
      moveX(0);
      moveY(0);
    };

    section.addEventListener('pointermove', onPointerMove);
    section.addEventListener('pointerleave', onPointerLeave);
    this.listeners.push(() => section.removeEventListener('pointermove', onPointerMove));
    this.listeners.push(() => section.removeEventListener('pointerleave', onPointerLeave));
  }

  /**
   * Gentle scroll parallax: the hero copy drifts down a touch slower than the
   * page while the section scrolls out, adding depth without stealing focus.
   */
  private setupScrollParallax(): void {
    if (Hero.prefersReducedMotion) {
      return;
    }

    const host = this.elementRef.nativeElement;
    const section = host.querySelector<HTMLElement>('section');
    const wrapper = host.querySelector<HTMLElement>('.hero-parallax');
    if (!section || !wrapper) {
      return;
    }

    gsap.to(wrapper, {
      y: 80,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    });
  }
}

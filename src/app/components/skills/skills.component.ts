import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  WritableSignal,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { Category, SkillCategory } from '../../core/types/category.type';
import { ProfileService } from '../../core/services/app/profile.service';

@Component({
  selector: 'app-skills',
  imports: [TranslatePipe],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class Skills implements AfterViewInit, OnDestroy {
  public readonly profileService: ProfileService = inject(ProfileService);
  public readonly activeCategory: WritableSignal<Category> = signal<Category>(SkillCategory.all);

  /**
   * Reserved height for the pills area, measured from an invisible copy of the
   * full skill set. Keeps the layout stable when switching categories so the
   * section (and everything below it) doesn't jump as the pill count changes.
   */
  public readonly pillsMinHeight = signal(0);

  private readonly fullSetPills = viewChild.required<ElementRef<HTMLElement>>('fullSetPills');
  private resizeObserver: ResizeObserver | null = null;

  /** Respect users who prefer reduced motion by skipping entrance animations. */
  private static readonly prefersReducedMotion =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  public readonly filteredSkills = computed(() => {
    const category = this.activeCategory();
    const skills = this.profileService.skills();
    return category === SkillCategory.all ? skills : skills.filter((s) => s.categories.includes(category));
  });

  public ngAfterViewInit(): void {
    this.measureFullSetHeight();
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.measureFullSetHeight());
      this.resizeObserver.observe(this.fullSetPills().nativeElement);
    }
  }

  public ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  private measureFullSetHeight(): void {
    this.pillsMinHeight.set(this.fullSetPills().nativeElement.offsetHeight);
  }

  public filterSkills(category: Category): void {
    if (category === this.activeCategory()) {
      return;
    }
    this.activeCategory.set(category);
    this.animateSkills();
  }

  private animateSkills(): void {
    const container = this.fullSetPills().nativeElement.parentElement;
    // Rapid category switches can leave a tween mid-flight; start clean. The
    // selector-based kill also covers pills that are about to be replaced.
    gsap.killTweensOf('.skill-pill');
    container && gsap.killTweensOf(container);

    // Wait for Angular to commit the new pill list, THEN grab the targets —
    // change detection is async (zoneless), so querying earlier would capture
    // the old, about-to-be-detached pills and the new ones would never animate.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const targets = gsap.utils.toArray<HTMLElement>('.skill-pill');
        if (!targets.length) {
          return;
        }
        if (Skills.prefersReducedMotion) {
          // Never clearProps 'all' on the container: it would wipe the inline
          // min-height that Angular binds, breaking the layout-stability fix.
          gsap.set(targets, { clearProps: 'all' });
          container && gsap.set(container, { clearProps: 'transform,opacity' });
          return;
        }
        // Mask the instant DOM swap with a quick lift-in of the whole block.
        container &&
          gsap.fromTo(
            container,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'transform,opacity' },
          );

        // Focus-in: pills rise from below, sharpen from a blur, and settle with
        // a slight springy tilt, radiating outward from the center pill.
        gsap.fromTo(
          targets,
          { scale: 0.4, y: 40, opacity: 0, filter: 'blur(4px)', rotation: () => gsap.utils.random(-4, 4) },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            rotation: 0,
            duration: 0.7,
            ease: 'back.out(1.7)',
            stagger: { each: 0.06, from: 'center' },
            clearProps: 'transform,opacity,filter',
          },
        );
      }),
    );
  }
}

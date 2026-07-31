import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { gsap } from 'gsap';

import { LanguageService } from '../../core/services/app/language.service';
import { ThemeService } from '../../core/services/app/theme.service';
import { ProfileService } from '../../core/services/app/profile.service';
import { AppLanguage } from '../../core/types/lang.type';
import { ThemeMode } from '../../core/types/theme.type';

@Component({
  selector: 'app-header',
  imports: [TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class Header implements AfterViewInit, OnDestroy {
  public readonly profileService: ProfileService = inject(ProfileService);
  public readonly AppLanguage: typeof AppLanguage = AppLanguage;
  public readonly ThemeMode: typeof ThemeMode = ThemeMode;
  public readonly themeService: ThemeService = inject(ThemeService);
  public readonly languageService: LanguageService = inject(LanguageService);

  public readonly isMenuOpen = signal(false);

  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly mobileMenu = viewChild.required<ElementRef<HTMLElement>>('mobileMenu');
  private menuTl: gsap.core.Timeline | null = null;
  private readonly desktopHoverTls: gsap.core.Timeline[] = [];
  private readonly navUnderlines: HTMLElement[] = [];

  public constructor() {
    // Keep the underline sweep direction in sync with the live EN/FA direction
    // toggle (the language service flips `dir` on the root element).
    effect(() => {
      this.languageService.currentLang();
      const origin = this.desktopNavOrigin();
      this.navUnderlines.forEach((underline) => gsap.set(underline, { transformOrigin: origin }));
    });
  }

  public ngAfterViewInit(): void {
    this.setupMenuAnimations();
    this.setupDesktopNavHover();
  }

  public ngOnDestroy(): void {
    this.menuTl?.kill();
    this.desktopHoverTls.forEach((tl) => tl.kill());
  }

  public toggleMenu(): void {
    if (this.isMenuOpen()) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  public openMenu(): void {
    if (this.isMenuOpen()) {
      return;
    }
    this.isMenuOpen.set(true);
    this.menuTl?.play();
  }

  public closeMenu(): void {
    if (!this.isMenuOpen()) {
      return;
    }
    this.isMenuOpen.set(false);
    this.menuTl?.reverse();
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: Event): void {
    if (!this.isMenuOpen()) {
      return;
    }
    if (this.elementRef.nativeElement.contains(event.target as Node)) {
      return;
    }
    this.closeMenu();
  }

  @HostListener('window:keydown.escape')
  public onEscape(): void {
    if (!this.isMenuOpen()) {
      return;
    }
    this.closeMenu();
  }

  private setupMenuAnimations(): void {
    const host = this.elementRef.nativeElement;
    const panel = this.mobileMenu().nativeElement;
    const links = panel.querySelectorAll('nav a');
    const openIcon = host.querySelector('.menu-icon--open')!;
    const closeIcon = host.querySelector('.menu-icon--close')!;

    // Icon morph: the hamburger flips away while the close icon springs in.
    gsap.set(openIcon, { autoAlpha: 1, rotation: 0, scale: 1 });
    gsap.set(closeIcon, { autoAlpha: 0, rotation: -90, scale: 0.4 });

    // Panel drop with a staggered link reveal + icon morph, all in one timeline
    // so open/close plays and reverses everything in sync.
    gsap.set(panel, { height: 0, autoAlpha: 0 });
    this.menuTl = gsap
      .timeline({ paused: true })
      .to(panel, { height: 'auto', autoAlpha: 1, duration: 0.5, ease: 'power3.inOut' })
      .from(links, { y: 24, autoAlpha: 0, stagger: 0.07, duration: 0.45, ease: 'back.out(1.4)' }, '-=0.3')
      .to(openIcon, { rotation: 90, scale: 0.4, autoAlpha: 0, duration: 0.3, ease: 'power2.in' }, 0)
      .to(closeIcon, { rotation: 0, scale: 1, autoAlpha: 1, duration: 0.4, ease: 'back.out(1.7)' }, 0);
  }

  private setupDesktopNavHover(): void {
    const links = this.elementRef.nativeElement.querySelectorAll<HTMLElement>('.nav-link');

    links.forEach((link) => {
      const underline = link.querySelector<HTMLElement>('.nav-link-underline')!;
      const text = link.querySelector<HTMLElement>('.nav-link-text')!;

      this.navUnderlines.push(underline);
      gsap.set(underline, { scaleX: 0, transformOrigin: this.desktopNavOrigin() });

      const tl = gsap
        .timeline({ paused: true })
        .to(underline, { scaleX: 1, duration: 0.45, ease: 'back.out(1.7)' })
        .to(text, { y: -2, duration: 0.4, ease: 'power3.out' }, 0);

      link.addEventListener('mouseenter', () => tl.play());
      link.addEventListener('mouseleave', () => tl.reverse());
      link.addEventListener('focusin', () => tl.play());
      link.addEventListener('focusout', () => tl.reverse());

      this.desktopHoverTls.push(tl);
    });
  }

  private desktopNavOrigin(): string {
    return getComputedStyle(this.elementRef.nativeElement).direction === 'rtl' ? 'right center' : 'left center';
  }
}

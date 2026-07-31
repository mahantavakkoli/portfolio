import { TestBed } from '@angular/core/testing';
import {
  provideTranslateLoader,
  provideTranslateService,
  TranslateNoOpLoader,
} from '@ngx-translate/core';

import { Hero } from './hero.component';

describe('Hero', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
      providers: [
        provideTranslateService({
          loader: provideTranslateLoader(TranslateNoOpLoader),
          lang: 'en',
        }),
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Hero);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the name and role', () => {
    const fixture = TestBed.createComponent(Hero);
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1');
    const role = fixture.nativeElement.querySelector('.hero-role');
    expect(h1?.textContent).toBeTruthy();
    expect(role?.textContent).toBeTruthy();
  });

  it('should render CTA links to contact and projects', () => {
    const fixture = TestBed.createComponent(Hero);
    fixture.detectChanges();
    const hrefs = Array.from(fixture.nativeElement.querySelectorAll('a')).map(
      (a: HTMLAnchorElement) => a.getAttribute('href'),
    );
    expect(hrefs).toContain('#contact');
    expect(hrefs).toContain('#projects');
  });

  it('should render the parallax and tilt layers', () => {
    const fixture = TestBed.createComponent(Hero);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.hero-parallax')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.hero-tilt')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.hero-tilt > .hero-depth-2')).toBeTruthy();
  });
});

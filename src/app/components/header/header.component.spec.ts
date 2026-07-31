import { TestBed } from '@angular/core/testing';
import { provideTranslateLoader, provideTranslateService, TranslateNoOpLoader } from '@ngx-translate/core';

import { Header } from './header.component';

describe('Header', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideTranslateService({ loader: provideTranslateLoader(TranslateNoOpLoader), lang: 'en' })],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Header);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render navigation links', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('nav a');
    expect(links.length).toBe(8);
  });

  it('should toggle the mobile menu', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('[aria-controls="mobile-menu"]');
    button.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.isMenuOpen()).toBe(true);
    button.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.isMenuOpen()).toBe(false);
  });

  it('should close the mobile menu when a link is clicked', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('[aria-controls="mobile-menu"]').click();
    fixture.detectChanges();
    fixture.nativeElement.querySelector('#mobile-menu nav a').click();
    fixture.detectChanges();
    expect(fixture.componentInstance.isMenuOpen()).toBe(false);
  });

  it('should close the mobile menu when clicking outside the header', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('[aria-controls="mobile-menu"]').click();
    fixture.detectChanges();
    expect(fixture.componentInstance.isMenuOpen()).toBe(true);

    document.body.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.isMenuOpen()).toBe(false);
  });

  it('should not close the mobile menu when clicking inside the header', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('[aria-controls="mobile-menu"]').click();
    fixture.detectChanges();

    fixture.nativeElement.querySelector('header a').click();
    fixture.detectChanges();
    expect(fixture.componentInstance.isMenuOpen()).toBe(true);
  });
});

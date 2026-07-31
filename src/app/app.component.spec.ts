import { TestBed } from '@angular/core/testing';
import { provideTranslateLoader, provideTranslateService, TranslateNoOpLoader } from '@ngx-translate/core';

import { App } from './app.component';
import { LanguageService } from './core/services/app/language.service';
import { AppLanguage } from './core/types/lang.type';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideTranslateService({ loader: provideTranslateLoader(TranslateNoOpLoader), lang: 'en' })],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the hero name heading', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toBeTruthy();
  });

  it('should apply RTL direction for Persian', async () => {
    TestBed.createComponent(App);
    const languageService = TestBed.inject(LanguageService);
    languageService.useLang(AppLanguage.fa);
    expect(languageService.currentLang()).toBe(AppLanguage.fa);
    expect(document.documentElement.dir).toBe('rtl');
  });
});

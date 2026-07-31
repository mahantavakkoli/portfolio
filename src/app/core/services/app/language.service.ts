import { TranslateService } from '@ngx-translate/core';
import { AppLanguage, Language } from '../../types/lang.type';
import { Service, WritableSignal, inject, signal } from '@angular/core';

@Service()
export class LanguageService {
  private readonly storageKey: string = 'portfolio-lang';
  private readonly translate: TranslateService = inject(TranslateService);
  public readonly currentLang: WritableSignal<Language> = signal<Language>(AppLanguage.en);

  public constructor() {
    const saved = this.load();
    this.currentLang.set(saved);
    this.applyDirection(saved);
    if (saved !== AppLanguage.en) {
      this.translate.use(saved);
    }
  }

  public useLang(lang: Language): void {
    if (lang === this.currentLang()) {
      return;
    }
    this.currentLang.set(lang);
    this.translate.use(lang);
    localStorage.setItem(this.storageKey, lang);
    this.applyDirection(lang);
  }

  private load(): Language {
    const stored = localStorage.getItem(this.storageKey) as Language | null;
    return stored === AppLanguage.fa ? AppLanguage.fa : AppLanguage.en;
  }

  private applyDirection(lang: Language): void {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === AppLanguage.fa ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-fa', lang === AppLanguage.fa);
  }
}

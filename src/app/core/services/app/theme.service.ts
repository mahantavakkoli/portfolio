import { Service, WritableSignal, effect, signal } from '@angular/core';
import { Theme, ThemeMode } from '../../types/theme.type';

@Service()
export class ThemeService {
  private readonly storageKey: string = 'portfolio-theme';
  public readonly theme: WritableSignal<Theme> = signal<Theme>(this.load());

  public constructor() {
    effect(() => {
      const t = this.theme();
      document.documentElement.classList.toggle('dark', t === ThemeMode.dark);
      localStorage.setItem(this.storageKey, t);
    });
  }

  public toggle(): void {
    this.theme.update((t) => (t === ThemeMode.dark ? ThemeMode.light : ThemeMode.dark));
  }

  private load(): Theme {
    const stored = localStorage.getItem(this.storageKey) as Theme | null;
    if (stored === ThemeMode.dark || stored === ThemeMode.light) return stored;
    try {
      return window.matchMedia('(prefers-color-scheme: light)').matches ? ThemeMode.light : ThemeMode.dark;
    } catch {
      return ThemeMode.dark;
    }
  }
}

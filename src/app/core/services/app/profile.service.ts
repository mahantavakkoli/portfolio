import { LanguageService } from './language.service';
import { Service, computed, inject } from '@angular/core';
import { ProfileData, PROFILE_DATA } from '../../consts/profile.data';

@Service()
export class ProfileService {
  private readonly languageService = inject(LanguageService);

  /** Signal that tracks the current language */
  private readonly lang = this.languageService.currentLang;

  /** The full profile data for the current language – reactive computed */
  readonly data = computed<ProfileData>(() => PROFILE_DATA[this.lang()]);

  // ── Convenience accessors (still reactive) ────────────────────────
  readonly name = computed(() => this.data().name);

  readonly heroGreeting = computed(() => this.data().hero.greeting);
  readonly heroTagline = computed(() => this.data().hero.tagline);
  readonly heroTitle = computed(() => this.data().hero.title);
  readonly heroDescription = computed(() => this.data().hero.description);
  readonly heroSubDescription = computed(() => this.data().hero.subDescription);

  readonly job = computed(() => this.data().info.job);
  readonly location = computed(() => this.data().info.location);
  readonly experience = computed(() => this.data().info.experience);

  readonly personalInfo = computed(() => ({
    age: this.data().personal.age,
    ageSuffix: this.data().personal.ageSuffix,
    education: this.data().personal.education,
  }));

  readonly skills = computed(() => this.data().skills);
  readonly categories = computed(() => this.data().categories);
  readonly projects = computed(() => this.data().projects);
  readonly contactLinks = computed(() => this.data().contactLinks);
  readonly spokenLanguages = computed(() => this.data().spokenLanguages);

  /** Expose the current language signal for components that need it */
  get currentLanguage() {
    return this.languageService.currentLang;
  }
}

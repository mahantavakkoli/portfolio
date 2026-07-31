import { Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProfileService } from '../../core/services/app/profile.service';

@Component({
  selector: 'app-about',
  imports: [TranslatePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class About {
  public readonly profileService: ProfileService = inject(ProfileService);

  /** GitHub contact link sourced from the profile data (contactLinks → GITHUB) */
  readonly githubLink = computed(() => this.profileService.contactLinks().find((link) => link.key === 'GITHUB'));

  /** About info cards with i18n label keys and profile-data values */
  readonly info = computed(() => [
    { key: 'JOB', icon: 'briefcase', labelKey: 'INFO.JOB_LABEL', value: this.profileService.job() },
    { key: 'LOCATION', icon: 'map-pin', labelKey: 'INFO.LOCATION_LABEL', value: this.profileService.location() },
    { key: 'EXPERIENCE', icon: 'clock', labelKey: 'INFO.EXPERIENCE_LABEL', value: this.profileService.experience() },
  ]);
}

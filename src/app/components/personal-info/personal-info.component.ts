import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProfileService } from '../../core/services/app/profile.service';

@Component({
  selector: 'app-personal-info',
  imports: [TranslatePipe],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
})
export class PersonalInfo {
  public readonly profileService: ProfileService = inject(ProfileService);
}

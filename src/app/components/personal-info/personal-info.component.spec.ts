import { TestBed } from '@angular/core/testing';
import { provideTranslateLoader, provideTranslateService, TranslateNoOpLoader } from '@ngx-translate/core';

import { PersonalInfo } from './personal-info.component';

describe('PersonalInfo', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalInfo],
      providers: [provideTranslateService({ loader: provideTranslateLoader(TranslateNoOpLoader), lang: 'en' })],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PersonalInfo);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render both spoken languages', () => {
    const fixture = TestBed.createComponent(PersonalInfo);
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('h3');
    expect(rows.length).toBe(2);
  });
});

import { TestBed } from '@angular/core/testing';
import { provideTranslateLoader, provideTranslateService, TranslateNoOpLoader } from '@ngx-translate/core';

import { Skills } from './skills.component';
import { SkillCategory } from '../../core/types/category.type';

describe('Skills', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Skills],
      providers: [provideTranslateService({ loader: provideTranslateLoader(TranslateNoOpLoader), lang: 'en' })],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Skills);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show all skills by default', () => {
    const fixture = TestBed.createComponent(Skills);
    fixture.detectChanges();
    const pills = fixture.nativeElement.querySelectorAll('.skill-pill');
    expect(pills.length).toBe(fixture.componentInstance.skills.length);
  });

  it('should filter skills by category', () => {
    const fixture = TestBed.createComponent(Skills);
    fixture.componentInstance.filterSkills(SkillCategory.android);
    fixture.detectChanges();
    const pills = fixture.nativeElement.querySelectorAll('.skill-pill');
    expect(pills.length).toBe(3);
  });
});

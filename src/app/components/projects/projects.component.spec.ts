import { TestBed } from '@angular/core/testing';
import { provideTranslateLoader, provideTranslateService, TranslateNoOpLoader } from '@ngx-translate/core';

import { Projects } from './projects.component';

describe('Projects', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
      providers: [provideTranslateService({ loader: provideTranslateLoader(TranslateNoOpLoader), lang: 'en' })],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Projects);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render all project cards', () => {
    const fixture = TestBed.createComponent(Projects);
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('article');
    expect(cards.length).toBe(fixture.componentInstance.projects.length);
  });
});

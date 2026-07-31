import { TestBed } from '@angular/core/testing';
import { provideTranslateLoader, provideTranslateService, TranslateNoOpLoader } from '@ngx-translate/core';

import { About } from './about.component';

describe('About', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
      providers: [provideTranslateService({ loader: provideTranslateLoader(TranslateNoOpLoader), lang: 'en' })],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(About);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the name heading and three info cards', () => {
    const fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    const h3 = fixture.nativeElement.querySelector('.about-name');
    const infoCards = fixture.nativeElement.querySelectorAll('.about-info > *');
    expect(h3?.textContent).toBeTruthy();
    expect(infoCards.length).toBe(3);
  });

  it('should expose the GitHub contact link from the profile service', () => {
    const fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    const github = fixture.componentInstance.githubLink();
    expect(github?.key).toBe('GITHUB');
    expect(github?.href).toBe('https://github.com/mahantavakkoli');
  });
});

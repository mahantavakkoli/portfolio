import { TestBed } from '@angular/core/testing';
import {
  provideTranslateLoader,
  provideTranslateService,
  TranslateNoOpLoader,
} from '@ngx-translate/core';

import { Contact } from './contact.component';

describe('Contact', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [
        provideTranslateService({
          loader: provideTranslateLoader(TranslateNoOpLoader),
          lang: 'en',
        }),
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Contact);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render a link for every contact method', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('a[href]');
    expect(links.length).toBe(fixture.componentInstance);
  });
});

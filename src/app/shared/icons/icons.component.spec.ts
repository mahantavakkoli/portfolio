import { TestBed } from '@angular/core/testing';

import { IconsComponent } from './icons.component';

describe('IconsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(IconsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the hidden icon sprite', () => {
    const fixture = TestBed.createComponent(IconsComponent);
    fixture.detectChanges();
    const sprite = fixture.nativeElement.querySelector('svg');
    expect(sprite?.querySelectorAll('symbol').length).toBeGreaterThan(0);
  });
});

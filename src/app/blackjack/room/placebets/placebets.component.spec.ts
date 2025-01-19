import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacebetsComponent } from './placebets.component';

describe('PlacebetsComponent', () => {
  let component: PlacebetsComponent;
  let fixture: ComponentFixture<PlacebetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacebetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacebetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

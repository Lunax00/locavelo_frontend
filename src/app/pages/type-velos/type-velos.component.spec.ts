import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeVelosComponent } from './type-velos.component';

describe('TypeVelosComponent', () => {
  let component: TypeVelosComponent;
  let fixture: ComponentFixture<TypeVelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeVelosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeVelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

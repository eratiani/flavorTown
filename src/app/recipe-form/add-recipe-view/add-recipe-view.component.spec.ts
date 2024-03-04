import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipeViewComponent } from './add-recipe-view.component';

describe('AddRecipeViewComponent', () => {
  let component: AddRecipeViewComponent;
  let fixture: ComponentFixture<AddRecipeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecipeViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecipeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

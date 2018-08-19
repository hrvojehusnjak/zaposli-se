import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOglasComponent } from './new-oglas.component';

describe('NewOglasComponent', () => {
  let component: NewOglasComponent;
  let fixture: ComponentFixture<NewOglasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOglasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOglasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

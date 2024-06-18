import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAgriculteurComponent } from './dashboard-agriculteur.component';

describe('DashboardAgriculteurComponent', () => {
  let component: DashboardAgriculteurComponent;
  let fixture: ComponentFixture<DashboardAgriculteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAgriculteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardAgriculteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

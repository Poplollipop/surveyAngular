import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyThanksComponent } from './reply-thanks.component';

describe('ReplyThanksComponent', () => {
  let component: ReplyThanksComponent;
  let fixture: ComponentFixture<ReplyThanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplyThanksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplyThanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

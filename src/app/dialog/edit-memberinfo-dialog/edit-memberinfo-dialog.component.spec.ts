import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberinfoDialogComponent } from './edit-memberinfo-dialog.component';

describe('EditMemberinfoDialogComponent', () => {
  let component: EditMemberinfoDialogComponent;
  let fixture: ComponentFixture<EditMemberinfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMemberinfoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMemberinfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

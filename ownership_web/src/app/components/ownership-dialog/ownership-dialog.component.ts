import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-ownership-dialog',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
  ],
  templateUrl: './ownership-dialog.component.html',
  styleUrl: './ownership-dialog.component.scss',
})
export class OwnershipDialogComponent implements OnInit, OnDestroy {
  action: string = 'EDIT';
  ownershipForm = this.fb.group({
    hn: [''],
    first_name: [''],
    last_name: [''],
    phone: [''],
    email: [''],
  });

  get hn(): FormControl {
    return this.ownershipForm.get('hn') as FormControl;
  }
  get firstName(): FormControl {
    return this.ownershipForm.get('first_name') as FormControl;
  }
  get lastName(): FormControl {
    return this.ownershipForm.get('last_name') as FormControl;
  }
  get phone(): FormControl {
    return this.ownershipForm.get('phone') as FormControl;
  }
  get email(): FormControl {
    return this.ownershipForm.get('email') as FormControl;
  }

  constructor(
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initFormValue();
  }

  initFormValue() {
    if (!!this.dialogConfig.data) {
      const ownership = this.dialogConfig.data.ownership;
      if (Object.keys(ownership).length > 0) {
        this.ownershipForm.patchValue(ownership);
        this.hn.disable();
      } else {
        this.action = 'NEW';
      }
    }
  }

  close(action: string) {
    this.dialogRef.close({
      action,
      ownership: this.ownershipForm.getRawValue(),
    });
  }

  ngOnDestroy(): void {
    this.dialogRef.destroy();
  }
}

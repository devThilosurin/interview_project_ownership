import { Component, OnDestroy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Ownership, OwnershipResponse } from '@domain/ownership';
import { OwnershipService } from '@services/ownership.service';
import { BehaviorSubject, Subject, switchMap, takeUntil } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { OwnershipDialogComponent } from '@components/ownership-dialog/ownership-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

interface DialogData {
  ownership: Ownership;
  action: 'SAVE' | 'DELETE' | 'CANCEL' | 'ADD';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    HttpClientModule,
    ButtonModule,
    TableModule,
    DynamicDialogModule,
    OwnershipDialogComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [DialogService, OwnershipService],
})
export class HomeComponent implements OnDestroy {
  ref: DynamicDialogRef | undefined;
  // ownerships$ = new BehaviorSubject<OwnershipResponse>({
  //   items: [],
  //   total: 0,
  //   page: 0,
  //   size: 0,
  //   pages: 0,
  // });
  ownerships$ = new BehaviorSubject<Ownership[]>([]);
  first = 0;
  rows = 10;
  private _onDestroy = new Subject<void>();

  constructor(
    private dialogService: DialogService,
    private ownershipService: OwnershipService
  ) {
    this.ownershipService
      .getOwnerships({ offset: this.first, limit: this.rows })
      .pipe(takeUntil(this._onDestroy))
      .subscribe((ownerships) => {
        this.ownerships$.next(ownerships);
      });
  }

  edit(ownership: Ownership) {
    this.ref = this.dialogService.open(OwnershipDialogComponent, {
      header: 'เจ้าของ',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: { ownership },
    });

    this.ref.onClose
      .pipe(takeUntil(this._onDestroy))
      .subscribe((result: DialogData) => {
        const { hn, ...ownershipForm } = result.ownership;
        switch (result.action) {
          case 'ADD':
            this.ownershipService
              .addOwnership(ownershipForm)
              .pipe(this._getOwnerships)
              .subscribe((ownerships) => {
                this.ownerships$.next(ownerships);
              });
            break;
          case 'SAVE':
            this.ownershipService
              .updateOwnership(hn, ownershipForm)
              .pipe(this._getOwnerships)
              .subscribe((ownerships) => {
                this.ownerships$.next(ownerships);
              });
            break;
          case 'DELETE':
            this.ownershipService
              .deleteOwnership(hn)
              .pipe(this._getOwnerships)
              .subscribe((ownerships) => {
                this.ownerships$.next(ownerships);
              });
            break;
          default:
            break;
        }
      });
  }

  show() {
    this.ref = this.dialogService.open(OwnershipDialogComponent, {
      header: 'เจ้าของ',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: { ownership: {} },
    });

    this.ref.onClose
      .pipe(takeUntil(this._onDestroy))
      .subscribe((result: DialogData) => {
        if (result.action === 'ADD') {
          const { hn, ...ownershipForm } = result.ownership;
          this.ownershipService
            .addOwnership(ownershipForm)
            .pipe(this._getOwnerships)
            .subscribe((ownerships) => {
              this.ownerships$.next(ownerships);
            });
        }
      });
  }

  private _getOwnerships = switchMap((_) =>
    this.ownershipService.getOwnerships({
      offset: this.first,
      limit: this.rows,
    })
  );

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    console.log(event);
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}

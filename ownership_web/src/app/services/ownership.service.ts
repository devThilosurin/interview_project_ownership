import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OwnershipResponse, Ownership, OwnershipForm } from '@domain/ownership';
import { environment } from '@env/environment';

@Injectable()
export class OwnershipService {
  constructor(private http: HttpClient) {}

  // getOwnerships({
  //   limit = 10,
  //   offset = 1,
  // }: {
  //   limit: number;
  //   offset: number;
  // }): Observable<OwnershipResponse> {
  //   return this.http.get<OwnershipResponse>(
  //     `${environment.api}/ownership/all?limit=${limit}&offset=${offset}`
  //   );
  // }

  getOwnerships({
    limit = 10,
    offset = 1,
  }: {
    limit: number;
    offset: number;
  }): Observable<Ownership[]> {
    return this.http.get<Ownership[]>(`${environment.api}/ownership/all`);
  }

  addOwnership(ownership: OwnershipForm): Observable<Ownership> {
    return this.http.post<Ownership>(
      `${environment.api}/ownership/add`,
      ownership
    );
  }

  deleteOwnership(hn: string): Observable<Ownership> {
    return this.http.delete<Ownership>(
      `${environment.api}/ownership/delete/${hn}`
    );
  }

  updateOwnership(hn: string, ownership: OwnershipForm): Observable<Ownership> {
    return this.http.patch<Ownership>(
      `${environment.api}/ownership/update/${hn}`,
      ownership
    );
  }
}

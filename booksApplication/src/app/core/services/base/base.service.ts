import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export class BaseService<R,W> {

  public constructor(
    protected _http: HttpClient,
    protected baseUrl: string,
  ) {

  }

  public getAll(): Observable<R[]> {
    return this._http.get<R[]>(this.baseUrl);
  }

  public findbyId(id: any): Observable<R> {
    return this._http.get<R>(`${this.baseUrl}/${id}`);
  }

  public insert(item: W): Observable<W> {
    return this._http.post<W>(`${this.baseUrl}`, item);
  }

  public update(id: number, item: any): Observable<R> {
    return this._http.put<R>(`${this.baseUrl}/${id}/`, item);
  }

  public delete(id: number): Observable<W> {
    return this._http.delete<W>(`${this.baseUrl}/${id}`);
  }

}

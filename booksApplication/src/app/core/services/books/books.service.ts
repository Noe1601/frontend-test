import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base/base.service';

const serverUrl: string = 'http://localhost:7030/api/Book/';

@Injectable()
export class BooksService extends BaseService<any, any> {


  constructor(private httpClient: HttpClient) {
      super(httpClient, serverUrl)
  }


}

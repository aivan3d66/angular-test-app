import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get('https://openexchangerates.org/api/latest.json?app_id=537572f59ace483aa2229ffb040427fe')
  }
}

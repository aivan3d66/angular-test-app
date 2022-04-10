import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  getData() {
    const myHeaders = new HttpHeaders().set('X-RapidAPI-Key', 'b128bf2c40msh02bc0681c229b65p17d27ajsnfd4d3f82091e');
    return this.http.get('https://fixer-fixer-currency-v1.p.rapidapi.com/latest?base=UAH&symbols=USD%2CEUR%2CBYN%2CUAH', {headers: myHeaders})
  }
}

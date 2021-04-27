import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DefisService {

  private defisUrl = 'https://ttg-xi.herokuapp.com/api/defis/';

  constructor(private http: HttpClient) {
  }

  getDefisByidDefi(idDefi: string) {
    const url = `${this.defisUrl}${idDefi}`;

    return this.http.get<Defi>(url);
  }

  getAllDefis() {
    return this.http.get<Defi[]>(this.defisUrl);
  }
}

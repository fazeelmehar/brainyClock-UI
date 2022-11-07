import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public getData = (route: string, id?: number) => {
    if (id) {
      return this.http.get(this.createCompleteRoute(route + '?id=' + id, this.envUrl.urlAddress));
    }
    else {
      return this.http.get(this.createCompleteRoute(route, this.envUrl.urlAddress));
    }
  }
  public post = (route: string, body) => {
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress), body, this.generateHeaders());
  }
  public file = (route: string, body) => {
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress), body);
  }
  public update = (route: string, id, body) => {
    return this.http.put(this.createCompleteRoute(route + '?id=' + id, this.envUrl.urlAddress), body, this.generateHeaders());
  }
  public delete = (route: string, id: number) => {
    return this.http.delete(this.createCompleteRoute(route + '?id=' + id, this.envUrl.urlAddress));
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
}

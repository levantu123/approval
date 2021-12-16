import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { 
  }
  getAll(){
      return this.http.get(`api/projects`)
  }
  create(project: any){
    return this.http.post(`api/projects`,project)
  }
}

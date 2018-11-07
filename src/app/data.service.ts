import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jobsData}    from './jobs/jobs.component';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

  getJobs() {
    return this.http.get('https://ghibliapi.herokuapp.com/films');
  }

  getJobs2(){
    return this.http.get<jobsData[]>('https://ghibliapi.herokuapp.com/films');
  }

  getBuilds() {
    return this.http.get('https://ghibliapi.herokuapp.com/people');
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jobsData}    from './jobs/jobs.component';
import { buildsData}    from './builds/builds.component';

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

  getBuilds2() {
    return this.http.get<buildsData[]>('https://ghibliapi.herokuapp.com/people');
  }

}

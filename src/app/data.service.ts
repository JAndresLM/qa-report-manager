import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { jobsData}    from './jobs/jobs.component';
import { buildsData}    from './builds/builds.component';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  /*httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS'
    })
  };*/

  constructor(private http: HttpClient) { }

  getJobs(){
    return this.http.get<jobsData[]>('http://192.168.189.23:8080/job/');
  }

  getBuilds(jobId) {
    return this.http.get<buildsData[]>('http://192.168.189.23:8080/job/'+jobId+'/builds');
  }

}

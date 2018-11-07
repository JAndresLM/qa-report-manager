import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

  getJobs() {
    return this.http.get('https://ghibliapi.herokuapp.com/films')
    //return this.http.get('http://dev-jenkins.spongecell.net/view/QA%20-%20Full%20Regression/api/json?tree=jobs[name,color,builds[id,fullDisplayName,result,url,timestamp,duration,actions[failCount,totalCount]{8,9}]]')
  }

  getBuilds() {
    return this.http.get('https://ghibliapi.herokuapp.com/people')
  }

}
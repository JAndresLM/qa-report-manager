import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})

export class JobsComponent implements OnInit {
  displayedColumns = ['color', 'name', 'date', 'duration', 'results', 'actions'];
  dataSource: MatTableDataSource<jobsData>;

  jobs$: Object;
  jobsListData:jobsData[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.getJobs().subscribe(
      data => {
        this.jobs$ = data;
        this.createDataForJobsTable(data);
        this.dataSource = new MatTableDataSource(this.jobsListData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  toHHMM(totalSeconds){
    var hours = Math.floor(totalSeconds / 1000 / 60 / 60);
    var minutes = Math.floor(totalSeconds / 1000 / 60 % 60);
    var content = hours + " hr - " + minutes + " min";
   	return content;
  }

  getPassRate(total, failed){
    var passRate = Math.floor(((total-failed) * 100) / total);
    if (total==0)
      passRate=0;
    return passRate;
  }

  getNameStatus(color){
    var newStatus ;
    if (color=='blue')
      newStatus = 'SUCCESS'
    else if (color=='yellow')
      newStatus = 'UNSTABLE'
    else if (color=='red')
      newStatus = 'FAILURE'
    else if (color=='disabled')
      newStatus = 'DISABLED'
    else
      newStatus = 'PROCESSING'
    return newStatus;
  }

  createDataForJobsTable(data){
    data.forEach(element => {
      var jobData:jobsData = {
        id: element.id,
        color: this.getNameStatus(element.color),
        name: element.name,
        date: new Date(element.builds[0].date),
        duration: this.toHHMM(element.builds[0].duration),
        total: element.builds[0].buildReport.totalTests,
        passed: element.builds[0].buildReport.totalTests - element.builds[0].buildReport.failedTests,
        failed: element.builds[0].buildReport.failedTests,
        pass_rate: this.getPassRate(element.builds[0].buildReport.totalTests, element.builds[0].buildReport.failedTests),
      };
      this.jobsListData.push(jobData);
    });
    console.log(this.jobsListData);
  }

}

export interface jobsData {
  id: string;
  color: string;
  name: string;
  date: Date;
  duration: string;
  total: Number;
  passed: Number;
  failed: Number;
  pass_rate: Number;
}

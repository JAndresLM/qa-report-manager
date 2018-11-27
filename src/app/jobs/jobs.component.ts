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
        this.jobsListData = data;
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
    return passRate+"%";
  }

  getNameStatus(color){
    var newStatus ;
    if (color=='blue')
      newStatus = 'SUCCESS'
    else if (color=='yellow')
      newStatus = 'UNSTABLE'
    else if (color=='red')
      newStatus = 'FAILURE'
    else
      newStatus = 'PROCESSING'
    return newStatus;
  }

}

export interface jobsData {
  id: string;
  color: string;
  name: string;
  date: string;
  duration: string;
}

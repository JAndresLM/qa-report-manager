import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})

export class JobsComponent implements OnInit {
  displayedColumns = ['id', 'title', 'description', 'director'];
  dataSource: MatTableDataSource<jobsData>;

  jobs$: Object;
  jobsListData:jobsData[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private data: DataService) {
    /*this.jobsListData = [
      {
        id: "1",
        title: "1",
        description: "1",
        director: "1",
      }
    ]
    this.dataSource = new MatTableDataSource(this.jobsListData);*/
  }

  ngOnInit() {
    console.log("On init");
    this.data.getJobs2().subscribe(
      data => {
        this.jobs$ = data;
        this.jobsListData = data;
        this.dataSource = new MatTableDataSource(this.jobsListData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

export interface jobsData {
  id: string;
  title: string;
  description: string;
  director: string;
}

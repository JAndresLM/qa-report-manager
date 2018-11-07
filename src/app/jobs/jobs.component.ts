import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})

export class JobsComponent implements OnInit {
  displayedColumns = ['status', 'name', 'last_execution', 'duration', 'results', 'actions'];
  dataSource: MatTableDataSource<jobsData>;

  jobs$: Object;
  jobsListData:jobsData[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private data: DataService) {}

  ngOnInit() {
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}

export interface jobsData {
  id: string;
  title: string;
  description: string;
  director: string;
}

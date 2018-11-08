import { Component, OnInit, ViewChild} from '@angular/core';
import { DataService } from '../data.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.scss']
})

export class BuildsComponent implements OnInit {

  displayedColumns = ['status', 'build_number', 'date', 'duration', 'total_tcs', 'passed_tcs', 'failed_tcs', 'pass_rate', 'reports'];
  dataSource: MatTableDataSource<buildsData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  builds$: Object;
  buildsListData:buildsData[] = [];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getBuilds2().subscribe(
      data => {
        this.builds$ = data
        this.buildsListData = data;
        this.dataSource = new MatTableDataSource(this.buildsListData);
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

export interface buildsData {
  status: string;
  build_number: string;
  date: string;
  duration: string;
  total_tcs: string;
  passed_tcs: string;
  failed_tcs: string;
  pass_rate: string;
  reports: string;
}

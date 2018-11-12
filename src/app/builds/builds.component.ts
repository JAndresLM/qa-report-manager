import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  DataService
} from '../data.service';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import {
  Chart
} from 'chart.js';

@Component({
  selector: 'app-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.scss']
})

export class BuildsComponent implements OnInit {

  displayedColumns = ['status', 'build_number', 'date', 'duration', 'total_tcs', 'passed_tcs', 'failed_tcs', 'pass_rate', 'reports'];
  dataSource: MatTableDataSource < buildsData > ;

  timeLapses: timeLapse[] = [{
      value: 'allTime',
      viewValue: 'All Time'
    },
    {
      value: 'lastYear',
      viewValue: 'Last Year'
    },
    {
      value: 'lastMonth',
      viewValue: 'Last Month'
    },
    {
      value: 'lastWeek',
      viewValue: 'Last Week'
    },
    {
      value: 'lastDay',
      viewValue: 'Last Day'
    },
    {
      value: 'today',
      viewValue: 'Today '
    }
  ];

  group_value: string = "table";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  builds$: Object;
  buildsListData: buildsData[] = [];

  chart = [];

  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.getBuilds2().subscribe(
      data => {
        this.builds$ = data
        this.buildsListData = data;
        this.dataSource = new MatTableDataSource(this.buildsListData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.createChart();
      }
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  selectTableView() {
    this.group_value = "table";
  }

  selectGraphView() {
    this.group_value = "graph";
  }

  isGraphDisplayed(): boolean {
    var isDisplayed = this.group_value === "graph";
    //console.log(isDisplayed);
    return isDisplayed;
  }

  createChart() {
    var labels = ["Nov 01", "Nov 02", "Nov 03", "Nov 04", "Nov 05", "Nov 06", "Nov 07", "Nov 08", "Nov 09", "Nov 10", "Nov 11", "Nov 12"]
    var passing = [40, 90, 70, 98, 63, 45, 85, 30, 21, 85, 94, 67]
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: "Pass Rate Percentage (%)",
          data: passing,
          borderColor: "#e67fb9",
          backgroundColor: "#f7d4e5",
          fill: true
        }, ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              steps: 5,
              stepValue: 5,
              max: 100
            }
          }],
        },
        elements: {
          line: {
            tension: 0,
          }
        }
      }
    });
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

export interface timeLapse {
  value: string;
  viewValue: string;
}

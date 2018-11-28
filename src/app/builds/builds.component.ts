import {Component,OnInit,ViewChild} from '@angular/core';
import {DataService} from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import {MatPaginator,MatSort,MatTableDataSource} from '@angular/material';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.scss']
})

export class BuildsComponent implements OnInit {

  displayedColumns = ['status', 'name', 'date', 'duration', 'totalTests', 'passed_tcs', 'failedTests', 'pass_rate', 'reports'];
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
  job$: Object;
  buildsListData: buildsData[] = [];

  chart = new Chart('canvas',{});
  newPassing = [50, 80, 75, 98, 33, 45, 75, 40, 11, 75, 44, 37]

  constructor(private route: ActivatedRoute, private data: DataService) {
    this.route.params.subscribe( params => this.job$ = params.id );
  }

  ngOnInit() {
    this.data.getBuilds(this.job$).subscribe(
      data => {
        this.builds$ = data
        this.createDataForTable(data);
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
          borderColor: "#339966",
          backgroundColor: "#9fdfbf",
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

  updateGraph(){
    this.chart.data.datasets[0].data = this.newPassing;
    this.chart.update();
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
    return passRate+"%";
  }

  createDataForTable(data){
    data.forEach(element => {
      var buildData:buildsData = {
        status: element.result,
        name: element.name.substr(element.name.indexOf('#')),
        date: String(new Date(element.date)).replace(' GMT-0600 (Central Standard Time)',''),
        duration: this.toHHMM(element.duration),
        totalTests: element.buildReport.totalTests,
        passed_tcs: String(element.buildReport.totalTests - element.buildReport.failedTests),
        failedTests: element.buildReport.failedTests,
        pass_rate: this.getPassRate(element.buildReport.totalTests, element.buildReport.failedTests),
        reports: element.url,
      };
      this.buildsListData.push(buildData);
    });
    console.log(this.buildsListData);
  }

}

export interface buildsData {
  status: string;
  name: string;
  date: string;
  duration: string;
  totalTests: string;
  passed_tcs: string;
  failedTests: string;
  pass_rate: string;
  reports: string;
}

export interface timeLapse {
  value: string;
  viewValue: string;
}

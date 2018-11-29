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

  job$: Object;
  jobName = "";
  buildsListData: buildsData[] = [];

  chart = new Chart('canvas',{});
  chartLabelsDate = [];
  chartDataPassRates = [];
  newPassing = [50, 80, 75, 98, 33, 45, 75, 40, 11, 75, 44, 37]

  constructor(private route: ActivatedRoute, private data: DataService) {
    this.route.params.subscribe( params => this.job$ = params.id );
  }

  ngOnInit() {
    this.data.getBuilds(this.job$).subscribe(
      data => {
        this.createDataForTable(data);
        this.dataSource = new MatTableDataSource(this.buildsListData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.createDataForGraph();
        this.createChart();
        this.jobName = String(data[0].name);
        this.jobName = this.jobName.substr(0, this.jobName.indexOf(' #'));
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
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.chartLabelsDate,
        datasets: [{
          label: "Pass Rate Percentage (%)",
          data: this.chartDataPassRates,
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
            display: true,
            ticks:{
              autoSkip: false
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              steps: 1,
              stepValue: 1,
              max: 100,
              autoSkip: false
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
    return passRate;
  }

  createDataForTable(data){
    data.forEach(element => {
      var buildData:buildsData = {
        status: element.result,
        name: element.name.substr(element.name.indexOf('#')+1),
        date: new Date(element.date),
        duration: this.toHHMM(element.duration),
        totalTests: element.buildReport.totalTests,
        passed_tcs: element.buildReport.totalTests - element.buildReport.failedTests,
        failedTests: element.buildReport.failedTests,
        pass_rate: this.getPassRate(element.buildReport.totalTests, element.buildReport.failedTests),
        reports: element.url,
      };
      this.buildsListData.push(buildData);
    });
  }

  createDataForGraph(){
    this.chartLabelsDate = [];
    this.chartDataPassRates = [];
    var temporalLabelsDate = [];

    this.buildsListData.forEach(element => {
      temporalLabelsDate.push(element.date);
      var strDate = String(element.date);
      var shortDate = strDate.substr(0,strDate.indexOf(' GMT'));
      shortDate = shortDate.substr(3);
      this.chartLabelsDate.push(shortDate);
      this.chartDataPassRates.push(element.pass_rate);
    });

    /*temporalLabelsDate.sort();
    this.chartLabelsDate.sort();
    this.chartDataPassRates.sort();

    temporalLabelsDate.forEach(element => {
      var strDate = String(element);
      var shortDate = strDate.substr(0,strDate.indexOf(' GMT'));
      shortDate = shortDate.substr(3);
      this.chartLabelsDate.push(shortDate);
    });*/

  }

}

export interface buildsData {
  status: string;
  name: Number;
  date: Date;
  duration: string;
  totalTests: Number;
  passed_tcs: Number;
  failedTests: Number;
  pass_rate: Number;
  reports: string;
}

export interface timeLapse {
  value: string;
  viewValue: string;
}

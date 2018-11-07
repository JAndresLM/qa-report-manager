import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})

export class JobsComponent implements OnInit {

  jobs$: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getJobs().subscribe(
      data => this.jobs$ = data 
    );
    console.log(this.jobs$);
  }

}

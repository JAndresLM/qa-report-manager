import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.scss']
})

export class BuildsComponent implements OnInit {

  builds$: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getBuilds().subscribe(
      data => this.builds$ = data 
    );
  }

}

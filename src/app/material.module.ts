import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, MatSortModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule],
  exports: [MatButtonModule, MatToolbarModule, MatIconModule, MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule],
})
export class MaterialModule { }
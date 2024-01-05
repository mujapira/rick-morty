// pagination.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  imports: [NgIcon]
})
export class PaginationComponent {
  
  @Input() paginationInfo: any;
  @Output() handlePageNumber = new EventEmitter<string>();
}

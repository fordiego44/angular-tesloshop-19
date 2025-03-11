import { ChangeDetectionStrategy, Component, computed, input, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [
    RouterLink
  ],
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {

  pages = input<number>(0);
  currentPage = input<number>(1);

  activatePage = linkedSignal(this.currentPage);

  getPageList = computed(()=>{
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  });

 }

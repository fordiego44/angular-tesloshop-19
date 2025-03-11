import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'not-found-page',
  imports: [],
  templateUrl: './not-found-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent { }

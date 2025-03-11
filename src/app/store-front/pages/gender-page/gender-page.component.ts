import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { map } from 'rxjs';
import { ProductCarouselComponent } from "../../../products/components/product-carousel/product-carousel.component";
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { PaginationService } from '@shared/components/pagination/pagination.service';

@Component({
  selector: 'gender-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './gender-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenderPageComponent {


  productService = inject(ProductsService);
  paginationService = inject(PaginationService);

  route = inject(ActivatedRoute);
  gender = toSignal(this.route.params.pipe(map(({gender})=>gender)));


  productsResource = rxResource({
    request: () => ({
      gender: this.gender(),
      page: this.paginationService.currentPage() - 1
    }),
    loader: ({ request})=> {
      console.log({gender:request.gender});

      return this.productService.getProducts({
        gender:request.gender,
        offset: request.page * 9,
      })
    }
  });
}

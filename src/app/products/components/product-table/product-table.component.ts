import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'app-product-table',
  imports: [
    ProductImagePipe,
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './product-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTableComponent {
  products = input.required<Product[]>();
 }

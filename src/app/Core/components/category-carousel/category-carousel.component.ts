import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Category } from '@product/interfaces/category';
import { CategoryService } from '@product/services/category.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-category-carousel',
  imports: [RouterLink],
  templateUrl: './category-carousel.component.html',
  styleUrl: './category-carousel.component.scss'
})
export class CategoryCarouselComponent implements OnInit {
  @ViewChild('carousel', { static: false }) carousel?: ElementRef<HTMLDivElement>;
  categoryService = inject(CategoryService);
  categories: Category[] = [];
  readonly scrollAmount = 320;

  ngOnInit() {
    this.categoryService.Get().subscribe(c => this.categories = c);
  }


  scrollLeft() {
    this.carousel?.nativeElement.scrollBy({
      left: -this.scrollAmount,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.carousel?.nativeElement.scrollBy({
      left: this.scrollAmount,
      behavior: 'smooth'
    });
  }

}

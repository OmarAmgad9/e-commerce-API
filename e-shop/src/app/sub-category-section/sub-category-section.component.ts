import { Component } from '@angular/core';
import { Subcategories } from '../interface/subcategories';
import { SubCategoryServiceService } from '../services/sub-category-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sub-category-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sub-category-section.component.html',
  styleUrl: './sub-category-section.component.scss'
})
export class SubCategorySectionComponent {
  subCategories:Subcategories[]=[];
  subscription:any;
  sort:string='-createdAt'
  filterSubCategories:string=''
  catParams:any = {}
  constructor(private _subCategoriesService: SubCategoryServiceService,private _route:ActivatedRoute){}

  loadCategories(){
    this.subscription = this._subCategoriesService.getAllFilter(this.filterSubCategories).subscribe({
      next:(value)=> {
        this.subCategories=value.data;
        console.log(this.subCategories);
        // this.pagination = value.pagination
      },
      error:(error)=>{}
    })
  }

  ngOnInit():void{
    this.loadCategories()
    this.catParams = this._route.snapshot.params
      if(this.catParams.id){
        console.log("Section")
        console.log(this.catParams.id)
        this.filterUsingCat(this.catParams.id)
      }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  filterUsingCat(subCategoryId:string){
    this.filterSubCategories = subCategoryId
    this.loadCategories()
  }
}

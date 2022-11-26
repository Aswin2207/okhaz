import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { GridModel } from 'src/app/models/grid.model';
import { TreeView,FlatNode } from 'src/app/models/tree.mode';
import { AppconstantsService } from 'src/app/service/appconstants.service';
import { HttpUtilityService } from 'src/app/service/httputility.service';

import { Input  as InputModel} from 'src/app/models/input.model';
import { HelperService } from 'src/app/service/helper.service';
import { SelectionModel } from '@angular/cdk/collections';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})


export class ProductCategoriesComponent implements OnInit {
  
  CategoryImage: any;
  showAddView: boolean = false;
  categoryData:any = {};
  categoryTreeView: any[] = [];
  @Input() set showActionButtons(val) {
    this.tableData.tableToolbar = val;
  };
  @Input() showTreeView:boolean = false;
  @Output("onRowClick") onRowClick: EventEmitter<any> = new EventEmitter();

  tableData: GridModel={
    EnableSearch:false,
    tableHeader:'Products',
    columns:[] = [
      {
        name:'',
        type:'checkbox',
        id:'checkbox',
      },
      {
        name:'',
        type:'button',
        id:'subCatExist',
        iconClass:'chevron_right',
        compareVal:'false',
        activeClass:'d-none',
        usedefaultIcon:false
      },
      {
        name:'Category Name',
        type:'string',
        id:'CategoryName',
        showSubRowIcon:true
      },
      {
        name:'Products',
        type:'string',
        id:'catProductCount'
      },
      {
        name:'Products In Sub Cats',
        type:'string',
        id:'subProdCount'
      },
      {
        name:'Visible In Menu?',
        type:'string',
        id:'Visbile'
      }
    ],
    data:[]=[],
    currentPageSize:20,
    totalRows : 0,
    sortCol :'',
    sortOrder: 1,
    tableToolbar: true,
    enablePagination: false
  }

  catInputDetails1:InputModel[] =[
    {
      fieldId :  "item_subCatName",
      label:  "Name",
      fieldValue:  "",
      type: "text",
      isValid: true,
      errorMesg: "Please enter category name",
      styleClass:"",
      required:true
    },
    {
      fieldId :  "category_url",
      label:  "URL",
      fieldValue:  "",
      type: "text",
      isValid: true,
      errorMesg: "",
      styleClass:"",
      required:true
    },
    {
      fieldId :  "Description",
      label:  "Description",
      fieldValue:  "",
      type: "text",
      isValid: true,
      errorMesg: "",
      styleClass:"",
      required:false
    },
   
  ]
  catInputDetails2:InputModel[] =[
    {
      fieldId :  "SubCATSequence",
      label:  "Sort Order",
      fieldValue:  "",
      type: "number",
      isValid: true,
      errorMesg: "",
      styleClass:"",
      required:false
    },
   
  ]
 
  constructor(private http:HttpUtilityService,private helper:HelperService) { this.getCategoryDetails(null);}

  removeSubCategoryToTable(categoryId: any,index:number) {
    for(var i=index;i< this.tableData.data.length;i++){
      if(categoryId == this.tableData.data[i].ParentCategoryId) {
        this.tableData.data.splice(i,1);
        i--;
      }
    }
    this.tableData.data[index].subCatExist = "chevron_right";
  }

  onMouseOut(node:any){
    setTimeout(()=>{node.show = false;},100);
  }

  onMouseHover(node:any){
    node.show = true;
  }
  
  addNewCategoryPressed(node:any){
    node.newChildVal ='';
    this.treeControl.expand(node);
    node.showInput = true;
  }

  CancelCategoryAdd(node:any){
    node.showInput = false;
  }
  
  SaveCategoryName(node:any){
    if(node && node.newChildVal){
      const parentNode = this.flatNodeMap.get(node);
      var json = {
        item_subCatName:node.newChildVal,
        CategoryId: parentNode?.id
      };
      this.http.post(AppconstantsService.CategoryAPIs.addSubCategory,json).then((data)=>{
        if(data.success){
          node.showInput = false;
          data.Data.prodCount = 0;
          data.Data.subProdCount = 0;
          data.Data.subCatExist = "";
          data.Data.parentId = data.Data.CategoryId;
          this.categoryData.subCatList.push(data.Data);
          var pNodeRef = this.GetParentNodeRecusively(this.categoryTreeView, data.Data.CategoryId);
          if(pNodeRef){
            pNodeRef.children?.unshift({
              name:data.Data.item_subCatName,
              children:[],
              parentId:data.Data.CategoryId,
              id:data.Data.item_subCatID
            });
            console.log(this.categoryTreeView);
            //this.treeControl.expand(node);
            this.dataSource.data = this.categoryTreeView;
          }
          else{
            this.GenerateTreeView(this.categoryData);
          }
        }
        else{
          this.helper.showErrorTostMessage( data.errorMessage ? data.errorMessage : "Failed adding new category");
        }
      },(error)=>{});
    }
   
  }

  addSubCategoryToTable(categoryId: any,index:number) {
    this.tableData.data[index].subCatExist = "expand_more";
    for(var i=0;i< this.categoryData.subCatList.length;i++){
      if(categoryId == this.categoryData.subCatList[i].CategoryId) {
        var subCat = {
          BrachCode: this.categoryData.subCatList[i].BranchCode,
          CategoryDesc: this.categoryData.subCatList[i].Description,
          CategoryId: this.categoryData.subCatList[i].item_subCatID,
          CategoryName:this.categoryData.subCatList[i].item_subCatName,
          CategoryNameArabic: this.categoryData.subCatList[i].item_subCatNameArabic,
          Vatrate: this.categoryData.subCatList[i].Vatrate,
          prodCount:this.categoryData.subCatList[i].prodCount,
          subCatExist: this.categoryData.subCatList[i].subCatExist,
          subProdCount: this.categoryData.subCatList[i].subProdCount,
          ParentCategoryId:categoryId,
          childRow:true
        }
        this.tableData.data.splice(index+1,0,subCat);
      }
    }
  }

  unflatten(arr:any[],cat:any[]) {
    var tree:any[] = [];
    var mappedArr:any = {};
    var arrElem;
    var mappedElem;
    for(var i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      mappedArr[arrElem.id] = arrElem;
      mappedArr[arrElem.id]['children'] = [];
    }

    for (var id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        if (mappedElem.parentId) {
          if(!mappedArr[mappedElem.parentId]){
            mappedArr[mappedElem.parentId] = {};
            mappedArr[mappedElem.parentId]['children'] = [];
          }
          mappedArr[mappedElem.parentId]['children'].push(mappedElem);
        }
      }
    }
    cat.forEach(element => {
      tree.push(mappedArr[element.CategoryId])
    });
    return tree;
  }

  nestedNodeMap = new Map<TreeView, FlatNode>();
  flatNodeMap = new Map<FlatNode, TreeView>();
  
  private _transformer = (node: TreeView, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.name === node.name
        ? existingNode
        : new FlatNode()
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.expandable = !!node.children && node.children.length > 0;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  GenerateTreeView(data: any) {
    let tree:any[] = [];
    for(var i=0;i< data.subCatList.length;i++ ){
      tree.push({
        name:data.subCatList[i].item_subCatName,
        children:[],
        parentId:data.subCatList[i].parentId,
        id:data.subCatList[i].item_subCatID
      });
    }
    for(var i=0;i<data.categories.length;i++){
      tree.push({
        name:data.categories[i].CategoryName,
        children:[],
        parentId:"",
        id:data.categories[i].CategoryId
      });
    }
    this.categoryTreeView = this.unflatten(tree,data.categories)
    this.dataSource.data = this.categoryTreeView;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  getCategoryDetails(gridModel: any) {
    this.http.get(AppconstantsService.CategoryAPIs.getCategory).then((data)=>{
      if(data){
        for(var i=0;i< data.subCatList.length;i++){
          data.subCatList[i].prodCount = 0;
          data.subCatList[i].subProdCount = 0;
          data.subCatList[i].subCatExist = "";
          data.subCatList[i].parentId = data.subCatList[i].CategoryId;
        }

        for(var i=0;i<data.categories.length;i++){
          data.categories[i].prodCount = 0;
          data.categories[i].subProdCount = 0;
          data.categories[i].subCatExist = "";
          data.subCatList[i].parentId = "";
        }

         //map item count
        for(var i=0;i< data.itemsCount.length;i++){
          var matched = false;
          for(var j=0;j< data.subCatList.length;j++){
            if(data.subCatList[j].item_subCatID == data.itemsCount[i].itemSubCategory) {
              data.subCatList[j].prodCount = data.itemsCount[i].Count;
              matched = true;
              break;
            }
          }
          if(!matched){
            for(var k=0;k< data.categories.length;k++){
              if(data.categories[k].CategoryId == data.itemsCount[i].itemSubCategory) {
                data.categories[k].prodCount = data.itemsCount[i].Count;
                break;
              }
            }
          }
        }
        
        //map sub category
        for(var i=0;i< data.subCatList.length;i++){
          var matched = false;
          for(var j=0;j< data.categories.length;j++){
            if(data.categories[j].CategoryId == data.subCatList[i].CategoryId) {
              data.categories[j].subCatExist = "chevron_right";
              data.categories[j].subProdCount += data.subCatList[i].prodCount;
              matched = true;
              break;
            }
          }
          if(!matched){
            for(var j=0;j< data.subCatList.length;j++){
              if(data.subCatList[i].item_subCatID == data.subCatList[j].item_subCatID) {
                data.subCatList[j].subCatExist = "chevron_right";
                data.subCatList[j].subProdCount += data.subCatList[i].prodCount;
                break;
              }
            }
          }
        }
        this.categoryData = data;
        this.tableData.data = data.categories;
       
        this.GenerateTreeView(data);
      }
    },
    (error)=>{

    })
  }

  GetParentNodeRecusively(treeView:any[],id:string):any{
    for(var i=0;i<treeView.length;i++){
      if(treeView[i].id == id){
        return treeView[i];
      }
      else if(treeView[i].children && treeView[i].children.length>0){
        var retVal = this.GetParentNodeRecusively(treeView[i].children,id);
        if(retVal){
          return retVal;
        }
      }
    }
  }
  
  ngOnInit(): void {
  }

  deleteCategoryClicked(row:any[]){
    var subCategoryJson:any[] = [];
    var categoryJson:any[] = [];
    if(row && row.length > 0){
      for(var i=0;i<row.length;i++){
        if(row[i].ParentCategoryId){
          subCategoryJson.push(row[i].CategoryId);
        }
        else{
          categoryJson.push(row[i].CategoryId);
        }
      }
      
      // if(row.item)
      // json.push(row)
    }
    this.http.post(AppconstantsService.CategoryAPIs.deletSubCategory,subCategoryJson).then((data)=>{
      if(data == 'success'){
        this.getCategoryDetails(null);
      }
    });
    console.log(row);

  }

  addCategoryClick(e:any){
    this.showAddView = true;
  }
		
  onAnyAction(e:any){
    console.log(e);
    switch(e.action){
      case "click":
        var categoryId = e.row.CategoryId;
        if(e.columnHeader.id =="subCatExist"){
         if(e.row.subCatExist =="chevron_right"){
          this.addSubCategoryToTable(categoryId,e.index);
         }
         else{
          this.removeSubCategoryToTable(categoryId,e.index);
         }
        }
        break;
      case "edit":
        break;
      case 'rowSelected':
        if (this.onRowClick) {
          this.onRowClick.emit(e);
        }
        break;
    }
  }

  getLevel = (node: FlatNode) => node.level;
  checklistSelection = new SelectionModel<FlatNode>(false);
   /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: FlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: FlatNode): void {
    let parent: FlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: FlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: FlatNode): FlatNode | null {
    const currentLevel = this.getLevel(node);
    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  SaveCategoryDetails(){
    if(this.helper.isFormValid(this.catInputDetails1) && this.helper.isFormValid(this.catInputDetails2)){
      var json;
      this.helper.getDataJsonMapped(this.catInputDetails1,json);
      this.helper.getDataJsonMapped(this.catInputDetails2,json);
      if(this.CategoryImage){
        this.uploadFile(this.CategoryImage);
      }
      this.http.post(AppconstantsService.CategoryAPIs.addSubCategory,json).then((data)=>{
        if(data.success){
          this.getCategoryDetails(null);
          this.showAddView = false;
        }
      });
    }
    
  }

  uploadFile(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    this.http.uploadFileWithProgress("post", environment.imageUploadServerAddr, formData).subscribe((data)=>{
       console.log(data);
    },
    (error)=>{
       console.log(error);
    });
  }
  
  onFileUploaded(event:any) {
    var file = event.target.files;
  let fileReader = new FileReader();
  fileReader.onload = (e) => {
     if(fileReader.result){
     }
  }
  fileReader.readAsDataURL(file[0]);
  this.CategoryImage = file[0];
 }
  
}

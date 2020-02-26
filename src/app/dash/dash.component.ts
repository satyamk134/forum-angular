import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { debounceTime, distinctUntilChanged, map, startWith, tap, switchMap,mergeMap, concatMap, timeout,delay } from 'rxjs/operators';
import { Subject, Subscription, Observable,fromEvent, of,from } from 'rxjs';
import { ApiCallService} from '../api-call.service'
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  constructor(private apicall:ApiCallService) { }

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  formData = new FormData();
  displayedColumns = [
  'Date',
  'No_of_Shares',
  'Open_Price',
  'High_Price',
  'Low_Price',
  'Close_Price',
  'No__of_Trades',
  'Total_Turnover__Rs__',
  'Deliverable_Quantity',
  '__Deli__Qty_to_Traded_Qty',
  'WAP',
  'Spread_Close_Open',
  'Spread_High_Low',
  'edit'
]
  pageSizeOptions = [6,20,50];
  totalNoOfItemsPaged:number = 0;
  pageIndex:number = 0 
  pageSize:number=  this.pageSizeOptions[0];
  previousPageIndex:number = 0;
  activeSort:string="";
  sortDirection:string="";
  toDate:string;
  fromDate:string;
  dataLoaded:boolean = false;
  serchKey:string=""
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchInput') searchText: ElementRef;
 
  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
   
    this.dataSource = new MatTableDataSource<PeriodicElement>([]);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.pageIndex = 0;
    this.pageSize =  this.pageSizeOptions[0];
    this.totalNoOfItemsPaged = 0;
    this.activeSort = 'Date';
    this.sortDirection = '';
    const terms$ = fromEvent<any>(this.searchText.nativeElement, 'keyup')
    .pipe(
         map(event => event.target.value),
         startWith(''),
         debounceTime(400),
         distinctUntilChanged(),
         switchMap(text=>{
             console.log("search text is"+text)
            return of(text)

        
     }) 

     
    )
    terms$.subscribe((res:any) => {
    
      this.serchKey = res;  
      console.log("search text isssssssssss",this.searchText);
      this.pageIndex = 0;
      this.pageSize =  this.pageSizeOptions[0];
      this.totalNoOfItemsPaged = 0;
      console.log("search text is"+this.searchText)
      this.getSpiceJetData();

    })

}

  getSpiceJetData = () => {
    console.log("search text is",this.searchText)
    this.dataLoaded = false;
      let getSpiceJetDataReq:any = {}; 
      getSpiceJetDataReq.pageSize = this.pageSize;
      getSpiceJetDataReq.length = this.totalNoOfItemsPaged;
      getSpiceJetDataReq.pageIndex = this.pageIndex;
      getSpiceJetDataReq.activeSort =  this.activeSort;
      getSpiceJetDataReq.sortDirection = this.sortDirection;
      getSpiceJetDataReq.searchText = this.serchKey;
      getSpiceJetDataReq.toDate = this.toDate;
      getSpiceJetDataReq.fromDate = this.fromDate;
      this.apicall.getSpiceJetData(getSpiceJetDataReq).subscribe(getSpiceJetDataRes=>{

        if(getSpiceJetDataRes.status == "success") {
          this.dataLoaded = true;
          this.totalNoOfItemsPaged = getSpiceJetDataRes.totalCount; 
          this.dataSource = new MatTableDataSource(getSpiceJetDataRes.data);
        } else {
          alert("No record Found");
        }
          
      })
  }

  changePageHandler = (pageEvent) => {
    
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize  = pageEvent.pageSize;
    this.previousPageIndex = pageEvent.previousPageIndex;
    
    this.getSpiceJetData();
  }

  sortChangeHandler = (event) => {
    console.log("event details are",event);
    this.activeSort = event.active;
    this.sortDirection = event.direction;
    this.getSpiceJetData();
   

  }

  dateFileHandler = ()=>{
   
    this.getSpiceJetData();
  }

  uploadSpicejetFile = (event)=>{
    this.formData = new FormData();
   
    this.formData.append("myfile", event.target.files[0]);
    this.apicall.uploadAssignmentFile(this.formData)
    .subscribe(response=>{
      alert("file uploaded successfully");
      this.getSpiceJetData();
    })
  }

  updateStock = (element) => {

      let updateStockReq:any = {};
      updateStockReq.filter = {};
      updateStockReq.filter.No_of_Shares = element.No_of_Shares;

      updateStockReq.update = {};
      updateStockReq.update.Open_Price = element.Open_Price;


      this.apicall.updateStockPrice(updateStockReq)
      .subscribe(response=>{
        if(response.status == "success"){
            console.log("record updated");
        }else{
          console.log("Error in updating the record");
        } 
      })
  }



}

export interface PeriodicElement {
  

}

const ELEMENT_DATA: PeriodicElement[] = []

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

  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
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
  'Spread_Close-Open',
  'Spread_High-Low'
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
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchInput') searchText: ElementRef;
 
  ngOnInit() {

    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
   
    this.dataSource = new MatTableDataSource<PeriodicElement>([]);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.pageIndex = 0;
    this.pageSize =  this.pageSizeOptions[0];
    this.totalNoOfItemsPaged = 0;
    this.activeSort = 'Date';
    this.sortDirection = 'asc';
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
     // console.log("search text is",res);
      this.searchText = res;  
      this.pageIndex = 0;
      this.pageSize =  this.pageSizeOptions[0];
      this.totalNoOfItemsPaged = 0;
      console.log("search text is"+this.searchText)
      this.getSpiceJetData();

    })
}

  getSpiceJetData = () => {
      let getSpiceJetDataReq:any = {}; 
      getSpiceJetDataReq.pageSize = this.pageSize;
      getSpiceJetDataReq.length = this.totalNoOfItemsPaged;
      getSpiceJetDataReq.pageIndex = this.pageIndex;
      getSpiceJetDataReq.activeSort =  this.activeSort;
      getSpiceJetDataReq.sortDirection = this.sortDirection;
      getSpiceJetDataReq.searchText = this.searchText;
      getSpiceJetDataReq.toDate = this.toDate;
      getSpiceJetDataReq.fromDate = this.fromDate;
      this.apicall.getSpiceJetData(getSpiceJetDataReq).subscribe(getSpiceJetDataRes=>{
          this.totalNoOfItemsPaged = getSpiceJetDataRes.totalCount;
          this.dataSource = new MatTableDataSource(getSpiceJetDataRes.data);
      })
  }

  changePageHandler = (pageEvent) => {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize  = pageEvent.pageSize;
    this.previousPageIndex = pageEvent.previousPageIndex;
    //this.totalNoOfItemsPaged = this.totalNoOfItemsPaged;
    this.getSpiceJetData();
  }

  sortChangeHandler = (event) => {
    console.log("event details are",event);
    this.activeSort = event.active;
    this.sortDirection = event.direction;
    this.getSpiceJetData();
   

  }

  submit = ()=>{
    console.log("to and from date are",this.toDate+"and from date",this.fromDate);

  }



}

export interface PeriodicElement {
  Date: string;
  'Open_Price': number;
  'High_Price': number;
  'Low_Price': number;
  'WAP':Number;
  'Spread_Close-Open':Number

}

const ELEMENT_DATA: PeriodicElement[] = []

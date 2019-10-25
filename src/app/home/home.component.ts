import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  options: string[] = ['test', 'test2'];
  constructor() { }
  
  ngOnInit() {
  }

  filterOptions(inputValue: string) {
    console.log()
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  onSubmit(form: NgForm) {
    console.log('form', form.value);
  }
}

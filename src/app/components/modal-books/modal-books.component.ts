import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-books',
  templateUrl: './modal-books.component.html',
  styleUrls: ['./modal-books.component.css']
})
export class ModalBooksComponent implements OnInit {

  @Input() book: any;

  constructor() { }

  ngOnInit(): void {
  }

}

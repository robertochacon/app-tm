import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-author',
  templateUrl: './modal-author.component.html',
  styleUrls: ['./modal-author.component.css']
})
export class ModalAuthorComponent implements OnInit {

  @Input() author: any;

  constructor() { }

  ngOnInit(): void {
  }

}

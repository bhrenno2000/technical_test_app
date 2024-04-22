import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/_services/content.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(public content: ContentService) { }

  ngOnInit() { }

}

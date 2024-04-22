import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/_services/content.service';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss'],
})
export class TrainingListComponent implements OnInit {
  public list_training: any = [];

  constructor(private service: ContentService) { }

  ngOnInit() {
    this.getListTraining();
  }

  public async getListTraining() {
    let resp = await this.service.getFireData('training-list');
    this.list_training = resp;
  }

}

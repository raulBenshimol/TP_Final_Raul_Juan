import { Component, OnInit } from '@angular/core';
import { JourneyService } from './service/journey.service';
import { JourneyViewModel } from './model/journey-view-model.interface';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css'],
})
export class JourneyPageComponent implements OnInit {
  constructor(private readonly journeyService: JourneyService) {}

  ngOnInit(): void {
    this.journeyService.initialize();
  }

  get viewModel(): JourneyViewModel {
    return this.journeyService.getViewModel();
  }
}
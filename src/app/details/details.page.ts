import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from '../services/apicall.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  details: any;

  constructor(private route: ActivatedRoute, private apicall :ApicallService) { }

  ngOnInit() {
    let index = this.route.snapshot.paramMap.get('index');
    this.apicall.getPokeDetails(index).subscribe(details => {
      console.log('Details', details);
      this.details = details;
    })
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Object } from '../objects/object';
import { ObjectService } from '../objects/object.service';

@Component({
  selector: 'app-object-detail',
  templateUrl: './object-detail.component.html',
  styleUrls: ['./object-detail.component.css']
})
export class ObjectDetailComponent implements OnInit {
  object: Object | undefined;
  constructor(
    private route: ActivatedRoute,
    private objectService: ObjectService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getObject();
  }

  getObject(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.objectService.getObject(id)
      .subscribe(object => this.object = object);
  }

  save(): void {
    if (this.object) {
      this.objectService.updateObject(this.object)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}

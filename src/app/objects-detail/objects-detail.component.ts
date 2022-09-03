import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Object } from '../object';
import { ObjectService } from '../object.service';


@Component({
  selector: 'app-objects-detail',
  templateUrl: './objects-detail.component.html',
  styleUrls: ['./objects-detail.component.css']
})
export class ObjectsDetailComponent implements OnInit {
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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.objectService.getObject(id)
      .subscribe(object => this.object = object);
  }
  goback(): void {
    this.location.back();

  }
  save(): void {
    if (this.object) {
      this.objectService.updateObject(this.object)
        .subscribe(() => this.goback());
    }
  }

}

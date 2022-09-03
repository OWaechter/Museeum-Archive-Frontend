import { Component, OnInit } from '@angular/core';
import { Object } from '../object';
import { ObjectService } from '../object.service';

@Component({
  selector: 'app-objects-list',
  templateUrl: './objects-list.component.html',
  styleUrls: ['./objects-list.component.css']
})
export class ObjectsListComponent implements OnInit {
  objects: Object[] = [];


  constructor(private objectService: ObjectService) { }

  ngOnInit(): void {
    this.getObjects();

  }
  getObjects(): void {
    this.objectService.getObjects()
      .subscribe(objects => this.objects = objects);

  }

  add(name: string): void {

    name = name.trim();
    if (!name) { return; }
    this.objectService.addObject({ name } as Object)
      .subscribe(object => {
        this.objects.push(object);
      });
  }

  delete(object: Object): void {
    this.objects = this.objects.filter(h => h !== object);
    this.objectService.deleteObject(object.id).subscribe();
  }

}

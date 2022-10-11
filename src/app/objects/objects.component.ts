import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Object } from './object';
import { ObjectService } from './object.service';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  providers: [ObjectService],
  styleUrls: ['./objects.component.css']
})
export class ObjectsComponent implements OnInit {
  objects: Object[] = [];
  editObjects: Object | undefined; // the object currently being edited
  objectName = '';

  constructor(private objectService: ObjectService) {}

  @ViewChild('object')
  set objectEditInput(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }

  ngOnInit() {
     this.getObjects();
  }

  getObjects(): void {
    this.objectService.getObjects()
      .subscribe(objects => (this.objects = objects));
  }

  add(name: string): void {
    this.editObjects = undefined;
    name = name.trim();
    if (!name) {
      return;
    }

    // The server will generate the id for this new Object
    const newObject: Object = { name } as Object;
    this.objectService
      .addObject(newObject)
      .subscribe(object => this.objects.push(object));
  }

  delete(object: Object): void {
    this.objects = this.objects.filter(o => o !== object);
    this.objectService
      .deleteObject(object.id)
      .subscribe();
    /*
    // oops ... subscribe() is missing so nothing happens
    this.objectsService.deleteObject(object.id);
    */
  }

  edit(objectName: string) {
    this.update(objectName);
    this.editObjects = undefined;
  }

  search(searchTerm: string) {
    this.editObjects = undefined;
    if (searchTerm) {
      this.objectService
        .searchObjects(searchTerm)
        .subscribe(objects => (this.objects = objects));
    } else {
      this.getObjects();
    }
  }

  update(objectName: string) {
    if (objectName && this.editObjects && this.editObjects.name !== objectName) {
      this.objectService
        .updateObject({...this.editObjects, name: objectName})
        .subscribe(object => {
        // replace the object in the objects list with update from server
        const ix = object ? this.objects.findIndex(o => o.id === object.id) : -1;
        if (ix > -1) {
          this.objects[ix] = object;
        }
      });
      this.editObjects = undefined;
    }
  }
}
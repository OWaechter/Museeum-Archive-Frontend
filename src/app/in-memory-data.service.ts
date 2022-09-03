import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Object } from './object';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const objects = [
      { id: 1, name: 'Altes Ding 1' },
      { id: 2, name: 'Altes Ding 2', description: 'Voll alt besser nicht fallen lassen', },

    ];
    return { objects };
  }


  genId(objects: Object[]): number {
    return objects.length > 0 ? Math.max(...objects.map(object => object.id)) + 1 : 1;
  }
}

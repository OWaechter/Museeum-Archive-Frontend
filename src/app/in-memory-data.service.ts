import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const objects = [
      {"modifiedFrom":null,"barcode":null,"createdFrom":null,"id":"BAFBE48B-2F90-40BD-ADF9-4F1B294027C2","description":null,"searchTerm":"altes ding1","createdAt":null,"modifiedAt":null,"text":null,"name":"Altes Ding1","location":null},
      {"modifiedFrom":null,"barcode":null,"createdFrom":null,"id":"CDF34F52-51CD-4D9C-87D2-69A18B2B2B55","description":null,"searchTerm":"altes ding2","createdAt":null,"modifiedAt":null,"text":null,"name":"Altes Ding2","location":null},
      {"modifiedFrom":null,"barcode":null,"createdFrom":null,"id":"6C70373F-B6DF-4B3D-9B0B-8C44A78BA81B","description":null,"searchTerm":"altes ding3","createdAt":null,"modifiedAt":null,"text":null,"name":"Altes Ding3","location":null}
    ]
    const query = [
      { name: '@angular/core', version: '20.1.0', description: 'angular core package' },
      { name: '@angular/common', version: '20.1.0', description: 'angular common package' },
      { name: '@angular/material', version: '20.1.5', description: 'angular material package' },
    ];
    return {objects, query};
  }
}

export interface Object {
  id: number;
  name: string;
  description: string;
  text: string;
  createdAt: Date;
  createdFrom: string;
  changedAt: Date;
  changedFrom: string;
  locatedAt: string;
  barcode: Blob;
  picture: Blob;
}

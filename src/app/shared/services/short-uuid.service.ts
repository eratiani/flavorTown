import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShortUuidService {
  private mapping: Map<string, string> = new Map();

  constructor() {}
  setUuid(shortId: string, uuid: string): string | undefined {
    this.mapping.set(shortId, uuid);
    return shortId;
  }
  getActualUuid(shortId: string): string | undefined {
    return this.mapping.get(shortId);
  }
}

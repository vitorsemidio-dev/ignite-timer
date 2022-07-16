export class LocalStorageManager {
  private static appName = "ignite-timer";
  private static appVerson = "1.0.0";
  constructor() {}

  private static makeKey(keyParam: string): string {
    return `@${this.appName}:${keyParam}:v${this.appVerson}`;
  }

  static getItem<T>(keyParam: string): T | null {
    const key = this.makeKey(keyParam);
    const data = localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data);
  }

  static setItem<T>(keyParam: string, data: T) {
    const key = this.makeKey(keyParam);
    const dataStringify = JSON.stringify(data);
    localStorage.setItem(key, dataStringify);
  }

  static removeItem(keyParam: string) {
    const key = this.makeKey(keyParam);
    localStorage.removeItem(key);
  }
  static copy<T>(fromKeyParam: string, toKeyParam: string) {
    const fromKey = this.makeKey(fromKeyParam);
    const itemFrom = this.getItem<T>(fromKey);
    if (!itemFrom) return;
    const toKey = this.makeKey(toKeyParam);
    this.setItem<T>(toKey, itemFrom);
  }
}

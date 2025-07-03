class AsyncStorageMock
{
    private valids: any; 
    private invalids: any; 
    private initValids: any; 
    private initInvalids: any; 
    public getItem: any;
    public setItem: any;
    public removeItem: any;
    public  constructor(values: any = {}, errors : any = {}) {
        this.initValids = values
        this.initInvalids = errors;
        this.clean();
        this.getItem = jest.fn(this.mockGetItem.bind(this));
        this.setItem = jest.fn(this.mockSetItem.bind(this));
        this.removeItem = jest.fn(this.mockRemoveItem.bind(this));
    }
    public state(values: any = {}, errors : any = {})
    {
        this.valids = {...values};
        this.valids['item-list'] = this.valids['item-list'] ?? [];
        this.invalids = {...errors};
    }
    public clean()
    {
        this.state(this.initValids, this.initInvalids);
    }
    private mockGetItem(k: string): Promise<string|null> {
      if (this.valids[k]) {
        return Promise.resolve(this.valids[k]);
      }
      if (this.invalids[k]) {
        return Promise.reject(this.invalids[k]);
      }
      return Promise.resolve(null);
    };
    private mockSetItem(k: string, v: string): Promise<void> {
      this.valids[k] = v;
      return Promise.resolve();
    }
    private mockRemoveItem(k: string): Promise<void> {
      if (this.valids[k]) {
          delete this.valids[k];
          let list = <string[]>JSON.parse(this.valids['item-list']);
          list = list.filter((v) => v !== k);
          this.setItem('item-list', JSON.stringify(list));
      }
      if (this.initValids[k]) {
        return Promise.reject();
      }
      return Promise.resolve();
    }
}
const mockInstance =  new AsyncStorageMock();
import{ jest } from '@jest/globals';
jest.mock('@react-native-async-storage/async-storage', () => ({
    default: mockInstance,
    __esModule: true
}));
export default mockInstance;

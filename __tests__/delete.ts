const log = console.log;

import{ jest, expect,  describe, beforeEach, it, afterEach} from '@jest/globals';
// Mock the async-storage module  const mockItem = 'test-item';
const mockItemList = ['test-item', 'item2', 'item3'];

const mockItem = 'test-item';
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
    private state(values: any = {}, errors : any = {})
    {
        this.valids = {...values};
        this.invalids = {...errors};
    }
    public clean()
    {
        this.state(this.initValids, this.initInvalids);
    }
    private mockGetItem(k: string): Promise<string|null> {
      if (this.valids[k]) {
        return Promise.resolve(JSON.stringify(this.valids[k]));
      }
      if (this.invalids[k]) {
        return Promise.reject(new Error('Storage error'));
      }
      return Promise.resolve(null);
    };
    private mockSetItem(k: string, v: string): Promise<string|null> {
      this.valids[k] = v;
      return Promise.resolve(null);
    }
    private mockRemoveItem(k: string): Promise<string|null> {
      if (this.valids[k]) {
        delete this.valids[k];
        return Promise.resolve(null);
      }
      return Promise.reject(new Error('Storage error'));
    }
}

const mockInstance =  new AsyncStorageMock({
    'item-list': mockItemList
  });

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: mockInstance,
}));

import asyncStorage from "@react-native-async-storage/async-storage";
import { deleteItem } from '../helpers/delete'; // Adjust the import path
log( "\n----------------------\n", asyncStorage, "\n----------------------\n");
describe('deleteItem function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => mockInstance.clean());
  it('should get the item list from storage', async () => {
    await deleteItem(mockItem);
    
    expect(asyncStorage.getItem).toHaveBeenCalledWith(mockItem);
  });

  it('should handle empty storage by creating empty array', async () => {

    
    await deleteItem(mockItem);
    
    expect(asyncStorage.setItem).toHaveBeenCalledWith('item-list', JSON.stringify([]));
  });

  it('should remove the specified item from storage', async () => {
    
    await deleteItem(mockItem);
    
    expect(asyncStorage.removeItem).toHaveBeenCalledWith(mockItem);
    expect(asyncStorage.setItem).toHaveBeenCalledWith(
      'item-list', 
      JSON.stringify(['item2', 'item3'])
    );
  });

  it('should not modify the list if item is not found', async () => {
    const nonExistentItem = 'non-existent-item';
    
    await deleteItem(nonExistentItem);
    
    expect(asyncStorage.setItem).toHaveBeenCalledWith(
      'item-list', 
      JSON.stringify(mockItemList)
    );
  });

  it('should log success message when item is removed', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    await deleteItem(mockItem);
    
    expect(consoleSpy).toHaveBeenCalledWith('item removed!');
    consoleSpy.mockRestore();
  });

  it('should handle errors from asyncStorage', async () => {
    const error = new Error('Storage error');
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    await expect(deleteItem(mockItem)).rejects.toThrow(error);
    
    consoleSpy.mockRestore();
  });
});

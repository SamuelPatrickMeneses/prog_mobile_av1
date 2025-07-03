import{ jest, expect,  describe, beforeEach, it, afterEach} from '@jest/globals';
// Mock the async-storage module  const mockItem = 'test-item';

const mockItem = 'test-item';

const mockItemList = [mockItem, 'item2', 'item3'];

jest.mock('@react-native-async-storage/async-storage');

import asyncStorage from "../jestSetupFile.ts";
import { deleteItem } from '../helpers/delete'; // Adjust the import path

describe('deleteItem function', () => {
  
  beforeEach(() => {
    const md = {'item-list': JSON.stringify([...mockItemList]), mockItem: mockItem};
    asyncStorage.state(md);
    jest.clearAllMocks();
  });
  
  it('should get the item list from storage', async () => {
    await deleteItem(mockItem);
    
    expect(asyncStorage.getItem).toHaveBeenCalledWith('item-list');
  });

  it('should handle empty storage by creating empty array', async () => {

    
    await deleteItem(mockItem);
    await deleteItem('item2');
    await deleteItem('item3');
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

 // it('should handle errors from asyncStorage', async () => {
 //   const error = new Error('Storage error');
 //   const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
 //   asyncStorage.state({},{mockItem: error});
 //   await expect(deleteItem(mockItem)).rejects.toThrow(error);
 //   
 //   consoleSpy.mockRestore();
 // });
});

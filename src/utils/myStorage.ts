/**
 * @description Storage data with expiration time
 */
import { AsyncStorage } from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Set storage
 * @param {string} key storage key
 * @param {any} value storage data
 * @param {number} expire expiration time(second)
 */
const setItem = async (key: string, value: any, expire = 0): Promise<void> => {
  try {
    const expireDate = createExpiredDate(expire);
    const saveData = {
      saveTime: new Date(),
      expireDate,
      value,
    };

    return await AsyncStorage.setItem(key, JSON.stringify(saveData));
  } catch (e) {
    return e;
  }
};

/**
 * Merge storage
 * @param {string} key storage key
 * @param {any} value storage data
 * @param {number} expire expiration time(second)
 */
const mergeItem = async (
  key: string,
  value: any,
  expire = 0,
): Promise<void> => {
  try {
    const prevCache = await AsyncStorage.getItem(key);
    const prevData = JSON.parse(prevCache || '');
    const expireDate = expire ? createExpiredDate(expire) : prevData.expireDate;
    const saveData = {
      saveTime: new Date(),
      expireDate,
      value,
    };

    return await AsyncStorage.mergeItem(key, JSON.stringify(saveData));
  } catch (e) {
    return e;
  }
};

/**
 * Get storage
 * @param {string} key storage key
 */
const getItem = async (key: string): Promise<string | null> => {
  try {
    const result = await AsyncStorage.getItem(key);

    return checkCacheData(result, key);
  } catch (e) {
    return e;
  }
};

/**
 * Remove storage
 * @param {string} key storage key
 */
const removeItem = async (key: string): Promise<void> => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (e) {
    return e;
  }
};

/**
 * Clear all storage
 */
const clear = async (): Promise<void> => {
  try {
    return await AsyncStorage.clear();
  } catch (e) {
    return e;
  }
};

/**
 * Get all keys of storage
 */
const getAllKeys = async (): Promise<string[]> => {
  try {
    return AsyncStorage.getAllKeys();
  } catch (e) {
    return e;
  }
};

/**
 * Check storage data
 * @param {object} result
 * @param {string} key
 */
function checkCacheData(result: string | null, key: string): any {
  if (!result) {
    return null;
  }

  try {
    const data = JSON.parse(result);

    // is expired
    if (checkExpireDate(data.expireDate)) {
      // remove data
      removeItem(key);
      return null;
    }

    return data.value;
  } catch (e) {
    return e;
  }
}

/**
 * Check expireDate
 * @param {string} expireDate
 */
function checkExpireDate(expireDate: string): boolean {
  if (!expireDate) {
    return false;
  }

  const currentTime = new Date().getTime();
  const expiredTime = new Date(expireDate).getTime();

  return expiredTime < currentTime;
}

/**
 * Create expire time
 * @param {numner} expire
 */
function createExpiredDate(expire: number): null | Date {
  // if expire is 0 or undefined or null, return null
  if (!expire) {
    return null;
  }

  const seconds = expire * 1000; // transfer second to millisecond
  const expiredTime = new Date().getTime() + seconds;

  return new Date(expiredTime);
}

export default {
  setItem,
  getItem,
  mergeItem,
  removeItem,
  clear,
  getAllKeys,
  AsyncStorage,
};

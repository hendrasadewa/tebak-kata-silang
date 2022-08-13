import { useEffect, useState } from 'react';

function useLocalstorage() {
  const [isLocalstorageAvailable, setLocalstorageAvailable] =
    useState<boolean>(false);

  useEffect(() => {
    if (window) {
      setLocalstorageAvailable(true);
    }
  }, []);

  const storeObject = (key: string, content: any) => {
    if (!isLocalstorageAvailable) {
      return;
    }
    window.localStorage.setItem(key, content);
  }

  const getObject = (key: string) => {
    if (!isLocalstorageAvailable) {
      return null;
    }
    return window.localStorage.getItem(key);
  }

  const remove = (key: string) => {
    if (!isLocalstorageAvailable) {
      return;
    }
    window.localStorage.removeItem(key);
  }

  return { isLocalstorageAvailable, storeObject, getObject, remove };
}

export default useLocalstorage;

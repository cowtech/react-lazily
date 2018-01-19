export function loadFromLocalStorage<T>(key: string, def: T = null): T{
  try{
    const serialized: string = localStorage.getItem(key);

    return serialized && serialized !== 'undefined' ? JSON.parse(serialized) : def;
  }catch(e){
    return def;
  }
}

export function saveToLocalStorage(key: string, value: any): void{
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeFromLocalStorage<T = any>(key: string, def: T = null): T{
  const value: any = loadFromLocalStorage<T>(key, def);
  localStorage.removeItem(key);

  return value;
}

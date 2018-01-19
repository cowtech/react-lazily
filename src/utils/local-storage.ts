export function load<T>(key: string, def: T = null): T{
  try{
    const serialized: string = localStorage.getItem(key);

    return serialized && serialized !== 'undefined' ? JSON.parse(serialized) : def;
  }catch(e){
    return def;
  }
}

export function save(key: string, value: any): void{
  localStorage.setItem(key, JSON.stringify(value));
}

export function remove<T = any>(key: string, def: T = null): T{
  const value: any = load<T>(key, def);
  localStorage.removeItem(key);

  return value;
}

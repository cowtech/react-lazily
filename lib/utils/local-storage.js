export function loadFromLocalStorage(key, def = null) {
    try {
        const serialized = localStorage.getItem(key);
        return serialized && serialized !== 'undefined' ? JSON.parse(serialized) : def;
    }
    catch (e) {
        return def;
    }
}
export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
export function removeFromLocalStorage(key, def = null) {
    const value = loadFromLocalStorage(key, def);
    localStorage.removeItem(key);
    return value;
}

export function load(key, def = null) {
    try {
        const serialized = localStorage.getItem(key);
        return serialized && serialized !== 'undefined' ? JSON.parse(serialized) : def;
    }
    catch (e) {
        return def;
    }
}
export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
export function remove(key, def = null) {
    const value = load(key, def);
    localStorage.removeItem(key);
    return value;
}

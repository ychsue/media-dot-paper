export default function getArray2FromObj(obj: Object) {
    if (!!!obj || Object.keys(obj).length === 0) return;

    // 1. Get the keyvalue object
    const keyValue = toKeyValue24(obj);

    // 2. dump them into an array
    const result = [];
    for (const key in keyValue) {
        if (Object.prototype.hasOwnProperty.call(keyValue, key)) {
            const element = keyValue[key];
            if (Object.keys(element).length === 0) continue;
            // const isArray = (/\[\]$/.test(key));
            // const keyRow = [key].concat((isArray) ? Object.values(element) : Object.keys(element));
            const keyRow = [key].concat(...Object.keys(element));
            result.push(keyRow);
            // if (!!!isArray) {
            const valueRow = ['' as any].concat(...Object.values(element));
            result.push(valueRow);
            // }
            result.push([]);
        }
    }

    return result;
}

function toKeyValue24(obj: Object, mainKey?: string) {
    const keys = Object.keys(obj);
    let result = {};

    const tmpObj = (!!mainKey) ? (result[mainKey] = {}) : (result["THIS"] = {});

    for (let i0 = 0; i0 < keys.length; i0++) {
        const key = keys[i0];
        const value = obj[key];
        const type = typeof value;
        const ext = (Array.isArray(value)) ? '[]' :
            ((type === 'object') ? '{}' : '');
        if (type !== 'object' && type !== 'symbol') {
            tmpObj[key] = value;
        } else {
            const rKey = ((!!mainKey) ? `${mainKey}.` : '') + `${key}${ext}`;
            result = { ...result, ...toKeyValue24(value, rKey) };
        }
    }

    // if (Object.keys(result[(!!mainKey) ? mainKey : "THIS"]).length === 0) return {};
    return result;
}
export default function getObjFromArray2(array: any[][]) {
    if (!!!array) return;

    // 1. Get keys' position
    const position = array.reduce((pre, cur, _iR) => {
        if (cur.length > 1 && !!cur[0] && isNaN(Number(cur[0]))) {
            pre[cur[0]] = { _iR };
        }
        return pre;
    }, {});

    // 2. Get each Key's KeyValue pair
    var keyValue = {};
    for (const mainKey in position) {
        if (Object.prototype.hasOwnProperty.call(position, mainKey)) {
            const bufPos = position[mainKey];
            const ind = bufPos["_iR"];
            const keys = array[ind];
            keyValue[mainKey] = {};
            for (let i0 = 1; i0 < keys.length; i0++) {
                const key = keys[i0];
                const value = (array[ind + 1].length <= i0) ? undefined : array[ind + 1][i0];
                keyValue[mainKey][key] = value;
                bufPos[key] = i0;
            }
        }
    }

    // 3. Get the result
    let result = {};
    for (const key in keyValue) {
        if (Object.prototype.hasOwnProperty.call(keyValue, key)) {
            const element = keyValue[key];
            getObjRecursively(key, result, element);

        }
    }

    // 3. degrade "THIS"
    if (!!result["THIS"]) {
        result = { ...result, ...result["THIS"] };
        delete result["THIS"];
    }

    return { position, result };
}

function getObjRecursively(keyChain: string, srcObj: Object, inObj: Object) {
    const indDot = keyChain.indexOf('.');
    const currentKey = (indDot > 0) ? keyChain.slice(0, indDot) :
        ((indDot < 0) ? keyChain : '');
    const restKeyChain = (indDot >= 0) ? keyChain.slice(indDot + 1) : '';

    const type = (Array.isArray(srcObj)) ? 'array' : 'object';

    const bufMatch = currentKey.match(/(.*)(?:\[\]|\{\})$/);
    const trueKey = (!!bufMatch) ? bufMatch[1] : currentKey;

    let nextObj = (/\[\]$/.test(currentKey)) ? [] : (
        (/\{\}$/.test(currentKey)) ? {} : undefined
    );
    if (!!!restKeyChain) {
        if (typeof nextObj !== 'object') {
            srcObj[trueKey] = inObj;
        } else {
            (!!srcObj[trueKey]) ? (nextObj = srcObj[trueKey]) : (srcObj[trueKey] = nextObj);
            for (const key in inObj) {
                if (Object.prototype.hasOwnProperty.call(inObj, key)) {
                    const value = inObj[key];
                    nextObj[key] = value;
                }
            }
        }
    } else if (!!!currentKey) {
        getObjRecursively(restKeyChain, srcObj, inObj);
    } else {
        // generate that object at correct position
        if (!!srcObj[trueKey]) {
            nextObj = srcObj[trueKey];
        } else {
            srcObj[trueKey] = nextObj;
        }

        getObjRecursively(restKeyChain, nextObj, inObj);
    }
}

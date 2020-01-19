# 常用操作 json 方法

---

> 根据指定 key 查找 node，parentNode，index

```
let parentNode = null;
let node = null;
let index = 0;
let getNode = (json, name, id) => {
    for (let i = 0; i < json.length; i++) {
        index = i;
        let obj = json[i];
        if (node) break;
        if (!obj || !obj[id]) continue;
        if (obj[id] == name) {
            node = obj;
            break;
        } else {
            if (obj.children) {
                parentNode = obj;
                getNode(obj.children, name);
            } else {
                continue
            }
        }
    }
    node || (parentNode = null);
    return {
        index: index,
        parentNode: parentNode,
        node: node
    }
};
let obj = getNode(json, name, "id");
```

> json 按照指定 key 去重

```
uniqueArray(array, key) {
    let result = [array[0]];
    for (let i = 1; i < array.length; i++) {
        let item = array[i];
        let repeat = false;
        for (let j = 0; j < result.length; j++) {
            if (item[key] == result[j][key]) {
                repeat = true;
                break;
            }
        }
        repeat || result.push(item)
    }
    return result
}
```

> 数组找不同

```
function getArrDifference(arr1, arr2) {
    return arr1.concat(arr2).filter(function (v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v);
    });
}
```

> 数组找相同

```
function getArrEqual(arr1, arr2) {
    let newArr = [];
    for (let i = 0; i < arr2.length; i++) {
        for (let j = 0; j < arr1.length; j++) {
            if (arr1[j] === arr2[i]) {
                newArr.push(arr1[j]);
            }
        }
    }
    return newArr;
}
```

> 一维数组分割指定长度二维数组

```
let chunk = (array, length) => {
    let len = a.length;
    let n = length;
    let lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1);
    let res = [];
    for (let i = 0; i < lineNum; i++) {
        let temp = a.slice(i * n, i * n + n);
        res.push(temp);
    }
    return res
}
```

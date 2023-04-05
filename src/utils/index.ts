// 随机打乱数组
export function shuffle(arr: Array<any>) {
  let _arr = arr.slice();
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i);
    let t = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = t;
  }
  return _arr;
}

// 随机获取一个范围内的整数
export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//给定一个概率值，有此概率返回true
export function getRandomBool(p: number) {
  return Math.random() < p;
}

// 数组去重
export const unique = (arr: Array<any>) => {
	return [...new Set(arr)];
}


// 从数组中随机取出几个元素
export const getRandomItems = (arr: Array<any>, count: number) => {
	const _arr = arr.slice();
	const result = [];
	for (let i = 0; i < count; i++) {
		const index = getRandomInt(0, _arr.length - 1);
		result.push(_arr[index]);
		_arr.splice(index, 1);
	}
	return result;
}
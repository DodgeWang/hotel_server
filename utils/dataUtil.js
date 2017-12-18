exports.strToArray = str => {
	let arrayList = str.split("_&_");
    for(let i = 0; i<arrayList.length;i++){
    	arrayList[i] = JSON.parse(arrayList[i]);
    }
    return arrayList;
}
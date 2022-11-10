//Find Sum of Values in array
function Sum(array){
    let res = 0;
    for(let i = 0; i<array.length; i++){
        res += array[i];
    }

    return res;
}

function avg(numerator, denominator){
    let result = numerator/denominator * 100;
    return result;
}
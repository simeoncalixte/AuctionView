
const isBetween = ( number: number, start: number, end: number)=>{
    console.log(number >= start && number <= end);
    console.log(number, start, end);
    return number > start && number < end
}

export default {isBetween};
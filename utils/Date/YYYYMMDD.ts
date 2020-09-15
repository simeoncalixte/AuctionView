function parse(str:string,timeZone: string) {
    if(!/^(\d){8}$/.test(str)) return  new Date("NaN");
    const theString = String(str);
    var y = theString.substr(0,4),
        m = theString.substr(4,2),
        d = theString.substr(6,2),
        newString = `${y}-${m}-${d}`;

    const ddd = new Date(newString);
    console.log({ddd,newString,timeZone},ddd.getMilliseconds())
    return ddd;
}


export default parse;
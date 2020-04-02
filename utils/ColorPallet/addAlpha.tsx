/**
 * @description Adds transparency to a standard color
 * @argument color : standard hex color code (i.e #0000, #FFFF)
 * @argument opacity:  A numerical value 0 >= n <=1;
 * @return void if opacity is given an invalid value else the value would be 
 * a Hex value with an alpha/opacity value;
 */
export default (hexValue: string, opactiy: number ) : string => {
   if (!(opactiy >= 0 && opactiy <= 1)) {
        return hexValue+Math.round(opactiy).toString(16);
    }
    return "";
}
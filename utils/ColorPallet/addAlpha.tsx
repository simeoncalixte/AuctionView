/**
 * @description Adds transparency to a standard color
 * @argument color : standard hex color code (i.e #0000, #FFFF)
 * @argument opacity:  A numerical value 0 >= n <=1;
 * @return void if opacity is given an invalid value else the value would be
 * a Hex value with an alpha/opacity value;
 */
export default (hexValue: string, opactiy: number): string => {
  //check if alpha already exist remove assigned alpha
  //if so trim to 6 digit without alpha

  if (hexValue.length > 6) {
    hexValue = hexValue.slice(0, 7);
  }

  let alpha = Math.round(opactiy * 255)
    .toString(16)
    .toUpperCase();

  if (alpha.length < 2) {
    alpha = `0${alpha}`;
  }

  if (opactiy >= 0 && opactiy <= 1) {
    return hexValue + alpha;
  } else {
    console.error("invalid opacity provided");
  }
};

import {Dimensions} from 'react-native';
const BigcardMargin = 8;
const smallcardMargin = 4;
const screenWidth = Dimensions.get('window').width;
const mealsContWidth=screenWidth -(2*BigcardMargin) 
const mealWidth=Math.floor((mealsContWidth - smallcardMargin * 8) / 2);

export const headerHeigth=90;
export const sizes = ["8px", "16px", "32px", "64px", "128px"];

export const mealsCardSize = mealsContWidth.toString();
export const mealCardSize= mealWidth.toString();

import { useFonts } from 'expo-font';
import fontConfig from '../configs/font.js';

export const useFontsPersonalized = (fonts) => {
    const fontsObject = fonts.reduce((obj, font) => {
        if (fontConfig[font]) {
            obj[font] = fontConfig[font];
        }
        return obj;
    }, {});

    const [fontsLoaded] = useFonts(fontsObject);

    return [fontsLoaded];
}
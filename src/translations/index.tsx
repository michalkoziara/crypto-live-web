import en from './en.json';
import pl from './pl.json';

// Language without region code.
const language = navigator.language.split(/[-_]/)[0];

const translations: Record<string, any> = {
    en: en,
    pl: pl,
};

export { language };
export default translations;

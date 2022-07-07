export type Color =
    '#c4d8bb' |
    '#9dbe8e' |
    '#75a361' |
    '#58903f' |
    '#3a7c1d' |
    '#34741a' |
    '#2c6915' |
    '#255f11' |
    '#184c0a';

export const colorScheme: { [key: string]: Color } = {
    100: '#c4d8bb',
    200: '#9dbe8e',
    300: '#75a361',
    400: '#58903f',
    500: '#3a7c1d',
    600: '#34741a',
    700: '#2c6915',
    800: '#255f11',
    900: '#184c0a'
};

export const outline = `2px solid ${colorScheme['400']}`;
const boxShadow = 'none;'

export const focus = {
    outline,
    boxShadow
};

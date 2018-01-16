export const trunc = (str) => {
  if (str.length > 250) {
    const subStr = str.substr(0, 250);
    return subStr.substr(0, subStr.lastIndexOf(' ')) + '...';
  }
  return str; 
};

export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1);
}
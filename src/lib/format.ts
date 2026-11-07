export const fmt = (n: number) => n.toLocaleString('en-US');
export const tzs = (n: number) => 'TZS ' + fmt(n);

const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_SW = ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ago', 'Sep', 'Okt', 'Nov', 'Des'];

export function niceDate(iso: string, lang: 'en' | 'sw' = 'en') {
  const [y, m, d] = iso.split('-').map(Number);
  const months = lang === 'sw' ? MONTHS_SW : MONTHS_EN;
  return `${d} ${months[m - 1]} ${y}`;
}

/** SMS parts the way the networks count them: 160 for one part, 153 per part after. */
export const smsParts = (len: number) => (len <= 160 ? 1 : Math.ceil(len / 153));
export const SMS_RATE = 18;

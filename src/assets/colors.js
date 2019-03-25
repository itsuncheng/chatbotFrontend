const colors = {
  dayta: {
    violet: '#606fe7',
    gray: '#ebebeb',
    navy: '#34495e',
    orange: '#f97f59'
  },
  twitter: {
    black: '#14171a',
    gray: '#aab8c2',
    white: '#f5f8fa'
  },
  facebook: {
    navy: '#16223b',
    blue: '#3b5998',
    gray: '#6e6e6e',
    darkGray: '#898f9c',
    black: '#1d2129',
    lightGray: '#f3f4f7'
  },
  instagram: {
    violet: '#7232bd',
    blue: '#4c5fd7',
    magenta: '#c32aa3'
  },
  slack: {
    purple: '#4d394b',
    charcoal: '#3b434b'
  },
  createGradient: (start, end) =>
    `linear-gradient(135deg, ${start} 0%, ${end} 100%)`
};

export default colors;

const NAVS = [
  { label: 'Find Rooms', href: '/' },
  { label: 'Sign Up', href: '/signup' },
  { label: 'Login', href: '/login' },
];

function getNavs(except) {
  if (!except) {
    return NAVS;
  }

  return NAVS.filter(({ href }) => href !== except);
}

module.exports = getNavs;
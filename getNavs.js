const NAVS = [
  { label: 'Find Rooms', href: '/' },
  { label: 'Sign Up', href: '/signup' },
  { label: 'Login', href: '/login' },
];

function getNavs(currentPath) {
  if (!currentPath) {
    return NAVS;
  }

  return NAVS.map(
    (nav) => nav.href === currentPath
      ? { ...nav, current: true }
      : nav
  );
}

module.exports = getNavs;
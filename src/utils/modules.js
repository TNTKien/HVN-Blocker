export function isAutoLoadOn() {
  return document.cookie
    .split(';')
    .find((cookie) => cookie.includes('view1=0'));
}

export function btnHandler(btn) {
  const server1 = document.getElementsByClassName('buttonhide-1')[0];
  const server2 = document.getElementsByClassName('buttonhide-2')[0];

  server1.onclick = () => {
    if (btn.classList.contains('selected-server'))
      btn.classList.remove('selected-server');
  };
  server2.onclick = () => {
    if (btn.classList.contains('selected-server'))
      btn.classList.remove('selected-server');
  };
}

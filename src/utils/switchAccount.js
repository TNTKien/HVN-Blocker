import { CookieParser } from './relogin';

export function SwitchAcc() {
  const cookie = CookieParser();
  chrome.storage.sync.get('acc_list', function (res) {
    const dropMenu = document.getElementsByClassName('drop-menu drop-3')[0];
    if (!dropMenu) return;

    const switchAccBtn = document.createElement('li');
    const switchAccMenu = document.createElement('a');
    switchAccMenu.href = 'javascript:;';
    switchAccMenu.textContent = 'Đổi tài khoản';

    const switchAccImg = document.createElement('img');
    switchAccImg.src = 'https://t.htvncdn.net/images/300/1727192561-sw.png';
    switchAccImg.style.paddingLeft = '2px';
    switchAccImg.style.paddingRight = '2px';
    switchAccMenu.appendChild(switchAccImg);
    switchAccBtn.appendChild(switchAccMenu);

    switchAccBtn.addEventListener('click', function () {
      alert('Tính năng vẫn đang phát triển =)))');
    });
    dropMenu.insertBefore(switchAccBtn, dropMenu.lastElementChild);
  });
}

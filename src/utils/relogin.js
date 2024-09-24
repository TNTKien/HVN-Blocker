export async function ReLogin() {
  const cookie = CookieParser();

  chrome.storage.sync.get(
    ['user_name', 'user_id', 'user_pass', 'user_ava', 'auto_login'],
    function (res) {
      if (res.auto_login === undefined) {
        chrome.storage.sync.set({ auto_login: 'off' });
      }
      console.log(`Auto login is ${res.auto_login}`);

      if (!cookie.user_id && res.auto_login === 'on') {
        autoLogin(res);
      }

      const dropMenu = document.getElementsByClassName('drop-menu drop-3')[0];
      if (!dropMenu) return;

      const reloginBtn = document.createElement('li');
      const reloginLink = document.createElement('a');

      reloginLink.href = 'javascript:;';
      reloginLink.textContent = 'Lưu đăng nhập';

      const reloginImg = document.createElement('img');
      reloginImg.src =
        res.auto_login === 'on'
          ? 'https://t.htvncdn.net/images/300/1727188000-on.png'
          : 'https://t.htvncdn.net/images/300/1727188028-off.png';
      reloginImg.style.paddingLeft = '2px';
      reloginImg.style.paddingRight = '2px';
      reloginLink.appendChild(reloginImg);

      reloginBtn.appendChild(reloginLink);

      reloginBtn.addEventListener('click', function () {
        if (res.auto_login === 'on') {
          chrome.storage.sync.set({ auto_login: 'off' }, function () {
            reloginImg.src =
              'https://t.htvncdn.net/images/300/1727188028-off.png';
          });
          alert('Đã tắt lưu đăng nhập');
        } else {
          chrome.storage.sync.set(
            {
              auto_login: 'on',
              user_name: cookie.user_name,
              user_id: cookie.user_id,
              user_pass: cookie.user_pass,
              user_ava: cookie.user_ava,
            },
            function () {
              reloginImg.src =
                'https://t.htvncdn.net/images/300/1727188000-on.png';
            }
          );
          alert('Đã bật lưu đăng nhập');
        }
      });

      dropMenu.insertBefore(reloginBtn, dropMenu.lastElementChild);
    }
  );
}

export function CookieParser() {
  const cookies = document.cookie.split(';');
  let obj = {};
  for (let cookie of cookies) {
    const [key, value] = cookie.split('=');
    obj[key.trim()] = value;
  }
  return obj;
}

function autoLogin(c) {
  document.cookie = `user_name=${c.user_name}; path=/`;
  document.cookie = `user_id=${c.user_id}; path=/`;
  document.cookie = `user_pass=${c.user_pass}; path=/`;
  document.cookie = `user_ava=${c.user_ava}; path=/`;
  window.location.reload();
}

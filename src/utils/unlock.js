import { btnHandler, isAutoLoadOn } from './modules';

export function UnlockHD() {
  if (!window.location.href.includes('-xem-truyen-')) return;
  const btnRow = document.getElementsByClassName('buttonhide')[0];

  if (isAutoLoadOn()) {
    const title_bar = document.getElementsByClassName('bar-title-episode')[0];
    const message = document.createElement('p');
    message.style.cssText = `width: 750px;font-size: 14px;text-align: center;color: #000;margin: 10px auto 0px;border-radius: 4px;background-image: -webkit-gradient(linear, left top, left bottom, from(#e2eef5), to(#ffffff));`;
    message.innerHTML = `⚠️Bạn đang bật chế độ <b>Auto Load</b>, hãy tắt đi nếu muốn xem Server HD hoặc dùng chế độ đọc từng trang nhé!`;

    title_bar.parentNode.insertBefore(message, title_bar.nextSibling);
  }

  const btnHD = document.createElement('b');
  btnHD.className = 'buttonhide-3';

  const a = document.createElement('a');
  a.href = 'javascript:;';
  a.textContent = '🔓 Server HD';
  a.onclick = () => {
    if (isAutoLoadOn())
      return alert('Hãy tắt chế độ Auto Load trước khi chuyển sang Server HD!');
    btnHD.classList.add('selected-server');
    getAndReplaceImgs();
  };
  btnHD.appendChild(a);

  btnRow.insertBefore(btnHD, btnRow.firstChild);

  btnHandler(btnHD);
}

function getAndReplaceImgs() {
  const OriginImgs = document.querySelectorAll('#image img');
  for (let img of OriginImgs) {
    let newSrc = img.src.split('?')[0];
    if (newSrc.includes('/1200/')) newSrc = newSrc.replace('/1200/', '/9999/');

    img.src = newSrc;
  }
}

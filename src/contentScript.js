'use strict';

import { Waifu } from './utils/waifu';
import { Downloader } from './utils/downloader';

let BlockedTags = [];
let BlockedUsers = [];
let mode = 'blur';

chrome.storage.sync.get(
  ['blockedTags', 'blockedUsers', 'mode'],
  async function (result) {
    BlockedTags = result.blockedTags || [];
    BlockedUsers = result.blockedUsers || [];
    mode = result.mode || 'blur';

    console.log(
      'Blocked Tags:',
      BlockedTags.length ? BlockedTags : 'No blocked Tags found'
    );
    console.log(
      'Blocked Users:',
      BlockedUsers.length ? BlockedUsers : 'No blocked Users found'
    );
    console.log('Current mode is ' + mode);

    if (isIdExist('main-ajax')) {
      const mainAjax = document.getElementById('main-ajax');
      const message = document.createElement('p');
      message.style.cssText =
        'width: 615px; font-size: 15px; text-align: center; background: #f1efef; color: #000; margin: 10px auto 0px; border: 0px solid #ccc; border-radius: 4px; font-weight: bold;';
      message.innerHTML = `
            <span style="background: #2a9fe2;color: #fff;padding: 4px;border-radius: 4px;line-height: 30px;margin-right: 5px;">
                <b>HVN Blocker</b>
            </span>
            Bạn đang dùng chế độ xem [Ngang], hãy đổi sang chế độ <a href="javascript:;" onclick="clickActionz1('1');" style="color: darkcyan;">[Dọc]</a> để mình có thể hoạt động nhé!
        `;
      mainAjax.parentNode.insertBefore(message, mainAjax);

      const br = document.createElement('br');
      mainAjax.parentNode.insertBefore(br, mainAjax);
    }

    processElements('block-top', 'ul', mode);
    processElements('item', 'a', mode);
    processElements('search-li', 'a', mode);
  }
);

Waifu();
Downloader();

async function processElements(className, tagName, mode) {
  if (!IsClassExist(className)) return;

  const elements = document.getElementsByClassName(className);
  // console.log(className, elements);
  for (let element of elements) {
    if (className === 'block-top') {
      const ul = element.getElementsByTagName(tagName)[0];
      for (let child of ul.children) {
        const url = child.getElementsByTagName('a')[0].href;
        await Blocker(mode, child, url);
      }
    } else {
      const url = element.getElementsByTagName(tagName)[0].href;
      await Blocker(mode, element, url);
    }
  }
}

async function Blocker(mode, element, url) {
  if (mode === 'remove') {
    await RemoveBlocked(element, url);
  } else {
    await BlurBlocked(element, url);
  }
}

async function RemoveBlocked(li, url) {
  let doc = await fetchDocument(url);
  if (checkBlocked(doc, li)) {
    li.style.display = 'none';
  }
}

async function BlurBlocked(li, url) {
  let doc = await fetchDocument(url);
  if (checkBlocked(doc, li)) {
    li.style.filter = 'blur(5px)';
    restoreOnHover(li);
  }
}

async function fetchDocument(url) {
  let res = await fetch(url);
  let text = await res.text();
  return new DOMParser().parseFromString(text, 'text/html');
}

function checkBlocked(doc, li) {
  if (BlockedTags.length > 0) {
    let tags = doc.getElementsByClassName('tag');
    for (let tag of tags) {
      if (BlockedTags.includes(tag.innerText)) {
        return true;
      }
    }
  }

  if (BlockedUsers.length > 0) {
    let uploader = doc.getElementsByClassName('name-uploader')[0];
    let userId = uploader.getElementsByTagName('a')[0].href.split('-')[1];
    if (BlockedUsers.includes(userId)) {
      return true;
    }
  }

  return false;
}

function IsClassExist(className) {
  return document.getElementsByClassName(className).length > 0;
}

function isIdExist(id) {
  return document.getElementById(id) !== null;
}

function restoreOnHover(li) {
  li.addEventListener('mouseover', function () {
    li.style.filter = 'none';
  });
  li.addEventListener('mouseout', function () {
    li.style.filter = 'blur(5px)';
  });
}

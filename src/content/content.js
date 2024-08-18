let BlockedTags = [];
let BlockedUsers = [];
let mode = "blur";

window.onload = async function On() {
  chrome.storage.sync.get(
    ["blockedTags", "blockedUsers", "mode"],
    async function (result) {
      BlockedTags = result.blockedTags || [];
      BlockedUsers = result.blockedUsers || [];
      mode = result.mode || "blur";

      console.log(
        "Blocked Tags:",
        BlockedTags.length ? BlockedTags : "No blocked Tags found"
      );
      console.log(
        "Blocked Users:",
        BlockedUsers.length ? BlockedUsers : "No blocked Users found"
      );
      console.log("Current mode is " + mode);

      if (isIdExist("main-ajax")) {
        const mainAjax = document.getElementById("main-ajax");
        const message = document.createElement("p");
        message.style.cssText =
          "width: 615px; font-size: 15px; text-align: center; background: #f1efef; color: #000; margin: 10px auto 0px; border: 0px solid #ccc; border-radius: 4px; font-weight: bold;";
        message.innerHTML = `
            <span style="background: #2a9fe2;color: #fff;padding: 4px;border-radius: 4px;line-height: 30px;margin-right: 5px;">
                <b>HVN Blocker</b>
            </span>
            Bạn đang dùng chế độ xem [Ngang], hãy đổi sang chế độ <a href="javascript:;" onclick="clickActionz1('1');" style="color: darkcyan;">[Dọc]</a> để mình có thể hoạt động nhé!
        `;
        mainAjax.parentNode.insertBefore(message, mainAjax);

        const br = document.createElement("br");
        mainAjax.parentNode.insertBefore(br, mainAjax);
      }

      processElements("block-top", "ul", mode);
      processElements("item", "a", mode);
      processElements("search-li", "a", mode);
    }
  );

  if (!window.location.href.includes("my_waifu.php")) return;

  const allWaifu = document.createElement("ol");
  allWaifu.className = "prizesLOL2";
  allWaifu.style.cssText = "padding-bottom: 0;";
  document
    .getElementsByClassName("prizesMid")[0]
    .insertBefore(
      allWaifu,
      document.getElementsByClassName("prizesMid")[0].firstChild
    );
  const waifuImgDiv = document.createElement("div");
  const img = document.createElement("img");
  img.src = "https://i.ibb.co/FBD1Q93/doro-think.png ";
  img.height = 100;
  waifuImgDiv.style.cssText = "float: left;height: 100px;";
  waifuImgDiv.appendChild(img);
  allWaifu.appendChild(waifuImgDiv);

  const waifuInfoDiv = document.createElement("div");
  waifuInfoDiv.style.cssText = "margin-left: 110px;";

  const waifuName = document.createElement("span");
  waifuName.innerHTML = "Doro";
  waifuInfoDiv.appendChild(waifuName);

  const br = document.createElement("br");
  waifuInfoDiv.appendChild(br);

  const waifuDesc = document.createElement("b");
  waifuDesc.innerHTML =
    "Doro là waifu siuuuuu cấp vippro, chỉ cần vuốt ve và tắm cho Doro là đủ!";
  waifuInfoDiv.appendChild(waifuDesc);

  const vuotveProgress = document.createElement("div");
  const vuotveProgressText = document.createElement("b");
  vuotveProgressText.innerHTML = "ㅤㅤㅤㅤ";
  vuotveProgress.appendChild(vuotveProgressText);
  waifuInfoDiv.appendChild(vuotveProgress);

  const progressBar = document.createElement("progress");
  progressBar.max = 100;
  progressBar.value = 0;
  progressBar.style.display = "none"; // Hide initially
  vuotveProgress.appendChild(progressBar);

  allWaifu.appendChild(waifuInfoDiv);

  const btnDiv = document.createElement("div");
  btnDiv.style.cssText = "gap: 5px; display: flex;";

  const vuotveBtn = document.createElement("button");
  vuotveBtn.innerHTML = "👋Vuốt ve All";
  vuotveBtn.style.cssText = "padding: 1px 5px; ";

  const tamBtn = document.createElement("button");
  tamBtn.innerHTML = "💦Tắm All";
  tamBtn.style.cssText = "padding: 1px 5px; ";

  btnDiv.appendChild(vuotveBtn);
  btnDiv.appendChild(tamBtn);

  waifuInfoDiv.appendChild(btnDiv);

  const diviner = document.createElement("div");
  diviner.style.cssText = "width: 100%;height: 1px;background: #B6B6B6;";
  allWaifu.parentNode.insertBefore(diviner, allWaifu.nextSibling);

  vuotveBtn.addEventListener("click", async function () {
    let elements = document.querySelectorAll('input[value="👋Vuốt ve"]');
    vuotveProgressText.innerHTML = "Đang vuốt ve...";
    progressBar.style.display = "block"; // Show progress bar
    progressBar.max = elements.length;
    progressBar.value = 0;

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      const formData = new FormData();
      formData.append(el.name, "👋Vuốt ve");
      await fetch("https://hentaihvn.tv/forum/my_waifu.php", {
        method: "POST",
        body: formData,
      });
      progressBar.value = i + 1; // Update progress bar
    }
    vuotveProgressText.innerHTML = "Xong!";
    //progressBar.style.display = "none";
    location.reload();
  });

  tamBtn.addEventListener("click", async function () {
    let elements = document.querySelectorAll('input[value="💦Tắm"]');
    vuotveProgressText.innerHTML = "Đang tắm...";
    progressBar.style.display = "block";
    progressBar.max = elements.length;
    progressBar.value = 0;

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      const formData = new FormData();
      formData.append(el.name, "💦Tắm");
      await fetch("https://hentaihvn.tv/forum/my_waifu.php", {
        method: "POST",
        body: formData,
      });
      progressBar.value = i + 1;
    }
    vuotveProgressText.innerHTML = "Xong!";
    //progressBar.style.display = "none";
    location.reload();
  });
};

async function processElements(className, tagName, mode) {
  if (!IsClassExist(className)) return;

  const elements = document.getElementsByClassName(className);
  console.log(className, elements);
  for (let element of elements) {
    if (className === "block-top") {
      const ul = element.getElementsByTagName(tagName)[0];
      for (let child of ul.children) {
        const url = child.getElementsByTagName("a")[0].href;
        await Blocker(mode, child, url);
      }
    } else {
      const url = element.getElementsByTagName(tagName)[0].href;
      await Blocker(mode, element, url);
    }
  }
}

async function Blocker(mode, element, url) {
  if (mode === "remove") {
    await RemoveBlocked(element, url);
  } else {
    await BlurBlocked(element, url);
  }
}

async function RemoveBlocked(li, url) {
  let doc = await fetchDocument(url);
  if (checkBlocked(doc, li)) {
    li.style.display = "none";
  }
}

async function BlurBlocked(li, url) {
  let doc = await fetchDocument(url);
  if (checkBlocked(doc, li)) {
    li.style.filter = "blur(5px)";
    restoreOnHover(li);
  }
}

async function fetchDocument(url) {
  let res = await fetch(url);
  let text = await res.text();
  return new DOMParser().parseFromString(text, "text/html");
}

function checkBlocked(doc, li) {
  if (BlockedTags.length > 0) {
    let tags = doc.getElementsByClassName("tag");
    for (let tag of tags) {
      if (BlockedTags.includes(tag.innerText)) {
        return true;
      }
    }
  }

  if (BlockedUsers.length > 0) {
    let uploader = doc.getElementsByClassName("name-uploader")[0];
    let userId = uploader.getElementsByTagName("a")[0].href.split("-")[1];
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
  li.addEventListener("mouseover", function () {
    li.style.filter = "none";
  });
  li.addEventListener("mouseout", function () {
    li.style.filter = "blur(5px)";
  });
}

// async function getVuotve() {
//   let elements = document.querySelectorAll('input[value="👋Vuốt ve"]');
//   const formData = new FormData();
//   for (let el of elements) {
//     formData.append(el.name, "👋Vuốt ve");
//   }
//   console.log(formData);
// }

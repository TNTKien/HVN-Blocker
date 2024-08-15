let BlockedTags = [];
let BlockedUsers = [];
let mode = "blur";

window.onload = async function On() {
  chrome.storage.sync.get(
    ["blockedTags", "blockedUsers", "mode"],
    function (result) {
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

      processElements("block-top", "ul", mode);
      processElements("item", "a", mode);
      processElements("search-li", "a", mode);
    }
  );
};

async function processElements(className, tagName, mode) {
  const elements = document.getElementsByClassName(className);

  for (let element of elements) {
    if (className === "block-top" && IsClassExist(className)) {
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

function restoreOnHover(li) {
  li.addEventListener("mouseover", function () {
    li.style.filter = "none";
  });
  li.addEventListener("mouseout", function () {
    li.style.filter = "blur(5px)";
  });
}

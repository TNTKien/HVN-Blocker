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

      //mobile

      processElements("item_2", "a", mode);

      await new Promise((resolve) => setTimeout(resolve, 3000));

      processElements("item_3", "a", mode);
      processElements("content-images", "a", mode);
    }
  );
};

async function processElements(className, tagName, mode) {
  const elements = document.getElementsByClassName(className);
  console.log(className, elements);
  for (let element of elements) {
    if (className === "item_2" || className === "item_3") {
      const url = element.getElementsByTagName(tagName)[0].href;
      const tagUrl =
        "https://hentaihvn.tv/" + (await extractUrlFromScript(url));
      await Blocker(mode, element, tagUrl);
    } else if (className === "content-images") {
      const url = element.getElementsByTagName(tagName)[0].href;
      const tagUrl =
        "https://hentaihvn.tv/" + (await extractUrlFromScript(url));
      await Blocker(mode, element.parentElement.parentElement, tagUrl);
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

async function extractUrlFromScript(url) {
  const doc = await fetchDocument(url);
  const scriptTag = doc.querySelector(".lazy-listinfotheloaimobile script");
  if (scriptTag) {
    const scriptContent = scriptTag.textContent;
    const urlMatch = scriptContent.match(
      /xhttp\.open\("GET",\s*"([^"]+)",\s*true\)/
    );
    if (urlMatch && urlMatch[1]) {
      return urlMatch[1];
    }
  }
  return null;
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

  //   if (BlockedUsers.length > 0) {
  //     let uploader = doc.getElementsByClassName("name-uploader")[0];
  //     let userId = uploader.getElementsByTagName("a")[0].href.split("-")[1];
  //     if (BlockedUsers.includes(userId)) {
  //       return true;
  //     }
  //   }

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

let BlockedTags = [];
let BlockedUsers = [];

window.onload = async function On() {
    chrome.storage.sync.get('blockedTags', function(result) {
        BlockedTags = result.blockedTags;
        if(BlockedTags) {
            console.log(BlockedTags); 
        } else {
            console.log('No blocked Tags found');
        }
    });
    chrome.storage.sync.get('blockedUsers', function(result) {
        BlockedUsers = result.blockedUsers;
        if(BlockedUsers) {
            console.log(BlockedUsers); 
        } else {
            console.log('No blocked Users found');
        }
    });

    let mode = 'blur';
    chrome.storage.sync.get(['mode'], function(result) {
        if(result.mode){
            mode = result.mode;
        }
        console.log('Current mode is ' + mode);
    });

    //thịnh hành
    if(IsClassExist("block-top")){
        const trending = document.getElementsByClassName("block-top")[0];
        const ulTrending = trending.getElementsByTagName("ul")[0];
        for (let i = 0; i < ulTrending.children.length; i++) {
            const url = ulTrending.children[i].getElementsByTagName("a")[0].href;
            await Blocker(mode, ulTrending.children[i], url);
        };
    };

    //mới cập nhật
    if(IsClassExist("item")){
        const items = document.getElementsByClassName("item");
        for (let i = 0; i < items.length; i++) {
            const url = items[i].getElementsByTagName("a")[0].href;
            await Blocker(mode, items[i], url);
        };
    };

    //tìm kiếm nâng cao
    if(IsClassExist("search-li")){
        const searchli = document.getElementsByClassName("search-li");
        if(searchli.length == 0) return;
        for (let i = 0; i < searchli.length; i++) {
            const url = searchli[i].getElementsByTagName("a")[0].href;
            //await BlurBlocked(searchli[i], url);
            await Blocker(mode, searchli[i], url);
        };
    };
    
    //truyện mới đăng
    if(IsClassExist("page-new")){
        const pageNew = document.getElementsByClassName("page-new")[0];
        const liPageNew = pageNew.getElementsByTagName("li");
        for (let i = 0; i < liPageNew.length; i++) {
            const url = liPageNew[i].getElementsByTagName("a")[0].href;
            await Blocker(mode, liPageNew[i], url);
        };

        const pageRandom = document.getElementsByClassName("page-new")[1];
        const liPageRandom = pageRandom.getElementsByTagName("li");
        for (let i = 0; i < liPageRandom.length; i++) {
            const url = liPageRandom[i].getElementsByTagName("a")[0].href;
            await Blocker(mode, liPageRandom[i], url);
        };
    };
};  

async function Blocker(mode, element, url) {
    if (mode === 'remove') {
        await RemoveBlocked(element, url);
    } else {
        await BlurBlocked(element, url);
    }
};

async function RemoveBlocked(li, url) {
    let res = await fetch(url);
    let text = await res.text();
    let doc = new DOMParser().parseFromString(text, "text/html");

    if (BlockedTags && BlockedTags.length > 0) {
        let tags = doc.getElementsByClassName("tag");
        for (let tag of tags) {
            if (BlockedTags.includes(tag.innerText)) {
                li.style.display = "none";
                return;
            }
        }
    }

    if (BlockedUsers && BlockedUsers.length > 0) {
        let uploader = doc.getElementsByClassName("name-uploader")[0];
        let userId = uploader.getElementsByTagName("a")[0].href.split("-")[1];
        if (BlockedUsers.includes(userId)) {
            li.style.display = "none";
        }
    }
};

async function BlurBlocked(li, url) {
    let res = await fetch(url);
    let text = await res.text();
    let doc = new DOMParser().parseFromString(text, "text/html");

    if (BlockedTags && BlockedTags.length > 0) {
        let tags = doc.getElementsByClassName("tag");
        for (let tag of tags) {
            if (BlockedTags.includes(tag.innerText)) {
                li.style.filter = "blur(5px)"; 
                return;
            }
        }
    }

    if (BlockedUsers && BlockedUsers.length > 0) {
        let uploader = doc.getElementsByClassName("name-uploader")[0];
        let userId = uploader.getElementsByTagName("a")[0].href.split("-")[1];
        if (BlockedUsers.includes(userId)) {
            li.style.filter = "blur(5px)"; 
        }
    }
};

function IsClassExist(className) {
    return document.getElementsByClassName(className).length > 0;
};
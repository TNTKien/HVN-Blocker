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
            console.log('No blocked users found');
        }
    });
    
    //thịnh hành
    if (document.getElementsByClassName("block-top").length > 0) {
        const trending = document.getElementsByClassName("block-top")[0];
        const ulTrending = trending.getElementsByTagName("ul")[0];
        for (let i = 0; i < ulTrending.children.length; i++) {
            const url = ulTrending.children[i].getElementsByTagName("a")[0].href;
            await RemoveBlocked(ulTrending.children[i], url);
        }
    }

    //mới cập nhật
    const items = document.getElementsByClassName("item");
    for (let i = 0; i < items.length; i++) {
        const url = items[i].getElementsByTagName("a")[0].href;
        await RemoveBlocked(items[i], url);
    };
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
}

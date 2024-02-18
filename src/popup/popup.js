function showNotification(text) {
    var notification = document.getElementById('notification');
    notification.textContent = text;
    notification.style.display = 'block';
    notification.style.backgroundColor = '#4CAF50';
    setTimeout(function() {
        notification.style.display = 'none';
    }, 3000);
}
function showErrNotification(text) {
    var notification = document.getElementById('notification');
    notification.textContent = text;
    notification.style.display = 'block';
    notification.style.backgroundColor = '#d42222';
    setTimeout(function() {
        notification.style.display = 'none';
    }, 3000);
}

document.getElementById('addId').addEventListener('click', function() {
    var id = document.getElementById('id').value;
    if (id === '') {
        showErrNotification('Không được để trống!');
        return;
    }
    if (isNaN(id)) {
        showErrNotification('ID phải là số!');
        return;
    }

    chrome.storage.sync.get('blockedUsers', function(result) {
        var blockedUsers = result.blockedUsers;
        if (!blockedUsers) {
            blockedUsers = [];
        }
        blockedUsers.push(id);
        chrome.storage.sync.set({blockedUsers: blockedUsers}, function() {
            showNotification('Thêm thành công!');
        });
    });
});

document.getElementById('addString').addEventListener('click', function() {
    var string = document.getElementById('string').value.trim();
    if (string === '') {
        showErrNotification('Không được để trống!');
        return;
    }

    chrome.storage.sync.get('blockedTags', function(result) {
        var blockedTags = result.blockedTags;
        if (!blockedTags) {
            blockedTags = [];
        }
        blockedTags.push(string);
        chrome.storage.sync.set({blockedTags: blockedTags}, function() {
            showNotification('Thêm thành công!');
        });
    });
});

document.getElementById('clear').addEventListener('click', function() {
    chrome.storage.sync.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        } else {
            showNotification('Xóa thành công!');
        }
    });
});

let suggestions = [
    "3D Hentai",
    "Action",
    "Adult",
    "Adventure",
    "Ahegao",
    "Anal",
    "Angel",
    "Ảnh động",
    "Animal",
    "Animal girl",
    "Áo Dài",
    "Apron",
    "Armpit",
    "Artist CG",
    "Based Game",
    "BBM",
    "BBW",
    "BDSM",
    "Bestiality",
    "Big Ass",
    "Big Boobs",
    "Big Penis",
    "Blackmail",
    "Bloomers",
    "BlowJobs",
    "Body Swap",
    "Bodysuit",
    "Bondage",
    "Breast Sucking",
    "BreastJobs",
    "Brocon",
    "Brother",
    "Business Suit",
    "Catgirls",
    "Che ít",
    "Che nhiều",
    "Cheating",
    "Chikan",
    "Chinese Dress",
    "Có che",
    "Comedy",
    "Comic",
    "Condom",
    "Cosplay",
    "Cousin",
    "Crotch Tattoo",
    "Cunnilingus",
    "Dark Skin",
    "Daughter",
    "Deepthroat",
    "Demon",
    "DemonGirl",
    "Devil",
    "DevilGirl",
    "Dirty",
    "Dirty Old Man",
    "DogGirl",
    "Double Penetration",
    "Doujinshi",
    "Drama",
    "Drug",
    "Ecchi",
    "Elder Sister",
    "Elf",
    "Exhibitionism",
    "Fantasy",
    "Father",
    "Femdom",
    "Fingering",
    "Footjob",
    "Foxgirls",
    "Full Color",
    "Furry",
    "Futanari",
    "GangBang",
    "Garter Belts",
    "Gender Bender",
    "Ghost",
    "Glasses",
    "Gothic Lolita",
    "Group",
    "Guro",
    "Hairy",
    "Handjob",
    "Harem",
    "HentaiVN",
    "Historical",
    "Horror",
    "Housewife",
    "Humiliation",
    "Idol",
    "Imouto",
    "Incest",
    "Insect (Côn Trùng)",
    "Invisible",
    "Isekai",
    "Không che",
    "Kimono",
    "Kissing",
    "Kuudere",
    "Lolicon",
    "Maids",
    "Manhua",
    "Manhwa",
    "Masturbation",
    "Mature",
    "Miko",
    "Milf",
    "Mind Break",
    "Mind Control",
    "Mizugi",
    "Monster",
    "Monstergirl",
    "Mother",
    "Nakadashi",
    "Netori",
    "Non-hen",
    "NTR",
    "Nun",
    "Nurse",
    "Old Man",
    "Oneshot",
    "Oral",
    "Osananajimi",
    "Paizuri",
    "Pantyhose",
    "Ponytail",
    "Pregnant",
    "Prostitution",
    "Rape",
    "Rimjob",
    "Romance",
    "Ryona",
    "Scat",
    "School Uniform",
    "SchoolGirl",
    "Series",
    "Sex Toys",
    "Shimapan",
    "Short Hentai",
    "Shota",
    "Shoujo",
    "Siscon",
    "Sister",
    "Slave",
    "Sleeping",
    "Small Boobs",
    "Son",
    "Sports",
    "Stockings",
    "Supernatural",
    "Sweating",
    "Swimsuit",
    "Tall Girl",
    "Teacher",
    "Tentacles",
    "Time Stop",
    "Tomboy",
    "Tracksuit",
    "Transformation",
    "Trap",
    "Truyện Việt",
    "Tsundere",
    "Twins",
    "Twintails",
    "Vampire",
    "Vanilla",
    "Virgin",
    "Webtoon",
    "X-ray",
    "Yandere",
    "Yaoi",
    "Yuri",
    "Zombie"
];

document.getElementById('string').addEventListener('input', function() {
    let input = this.value.toLocaleLowerCase();
    let datalist = document.getElementById('autocomplete');

    datalist.innerHTML = "";

    let filteredSuggestions = suggestions.filter(suggestion => suggestion.toLocaleLowerCase().includes(input));

    filteredSuggestions.forEach(suggestion => {
        let option = document.createElement('option');
        option.value = suggestion;
        datalist.appendChild(option);
    });
});
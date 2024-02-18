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

let suggestions = ["Anal", "Yaoi", "Yuri"]; 

document.getElementById('string').addEventListener('input', function() {
    let input = this.value;
    let datalist = document.getElementById('autocomplete');

    datalist.innerHTML = "";

    let filteredSuggestions = suggestions.filter(suggestion => suggestion.toLocaleLowerCase().includes(input));

    filteredSuggestions.forEach(suggestion => {
        let option = document.createElement('option');
        option.value = suggestion;
        datalist.appendChild(option);
    });
});
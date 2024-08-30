export function Waifu() {
  if (!window.location.href.includes('my_waifu.php')) return;

  chrome.storage.sync.get(
    ['waifuName', 'waifuDesc', 'waifuImg'],
    function (res) {
      console.log(res);
      const allWaifu = document.createElement('ol');
      allWaifu.className = 'prizesLOL2';
      allWaifu.style.cssText = 'padding-bottom: 0;';
      document
        .getElementsByClassName('prizesMid')[0]
        .insertBefore(
          allWaifu,
          document.getElementsByClassName('prizesMid')[0].firstChild
        );

      const waifuImgDiv = document.createElement('div');
      const img = document.createElement('img');
      img.src =
        res.waifuImg ||
        'https://raw.githubusercontent.com/TNTKien/HVN-Blocker/main/public/icons/doro_think.png';
      img.height = 100;
      img.style.cssText = `max-width: 100px; object-fit: cover;`;
      waifuImgDiv.style.cssText = 'float: left;height: 100px;';
      waifuImgDiv.appendChild(img);
      allWaifu.appendChild(waifuImgDiv);

      const waifuInfoDiv = document.createElement('div');
      waifuInfoDiv.style.cssText = 'margin-left: 110px;';

      const waifuName = document.createElement('span');
      const editBtn = document.createElement('a');
      editBtn.href = 'javascript:;';
      editBtn.innerHTML = '[Sửa]';
      waifuName.innerHTML = res.waifuName || 'Doro';
      waifuInfoDiv.appendChild(waifuName);
      const space = document.createTextNode(' ');
      waifuName.appendChild(space);
      waifuName.appendChild(editBtn);

      const br = document.createElement('br');
      waifuInfoDiv.appendChild(br);

      const waifuDesc = document.createElement('b');
      waifuDesc.innerHTML =
        res.waifuDesc ||
        'Doro là waifu siuuuuu cấp vippro, chỉ cần vuốt ve và tắm cho Doro là đủ!';
      waifuInfoDiv.appendChild(waifuDesc);

      const vuotveProgress = document.createElement('div');
      const vuotveProgressText = document.createElement('b');
      vuotveProgressText.innerHTML = 'ㅤㅤㅤㅤ';
      vuotveProgress.appendChild(vuotveProgressText);
      waifuInfoDiv.appendChild(vuotveProgress);

      const progressBar = document.createElement('progress');
      progressBar.max = 100;
      progressBar.value = 0;
      progressBar.style.display = 'none'; // Hide initially
      vuotveProgress.appendChild(progressBar);

      allWaifu.appendChild(waifuInfoDiv);

      const btnDiv = document.createElement('div');
      btnDiv.style.cssText = 'gap: 5px; display: flex;';

      const vuotveBtn = document.createElement('button');
      vuotveBtn.innerHTML = '👋Vuốt ve All';
      vuotveBtn.style.cssText = 'padding: 1px 5px; ';

      const tamBtn = document.createElement('button');
      tamBtn.innerHTML = '💦Tắm All';
      tamBtn.style.cssText = 'padding: 1px 5px; ';

      btnDiv.appendChild(vuotveBtn);
      btnDiv.appendChild(tamBtn);

      waifuInfoDiv.appendChild(btnDiv);

      const diviner = document.createElement('div');
      diviner.style.cssText = 'width: 100%;height: 1px;background: #B6B6B6;';
      allWaifu.parentNode.insertBefore(diviner, allWaifu.nextSibling);

      vuotveBtn.addEventListener('click', async function () {
        TakeAction('👋Vuốt ve');
      });

      tamBtn.addEventListener('click', async function () {
        TakeAction('💦Tắm');
      });

      async function TakeAction(action) {
        let elements = document.querySelectorAll(`input[value="${action}"]`);
        vuotveProgressText.innerHTML =
          action == '👋Vuốt ve' ? 'Đang vuốt ve...' : 'Đang tắm...';
        progressBar.style.display = 'block';
        progressBar.max = elements.length;
        progressBar.value = 0;

        for (let i = 0; i < elements.length; i++) {
          const el = elements[i];
          const formData = new FormData();
          formData.append(el.name, `${action}`);
          await fetch('https://hentaihvn.tv/forum/my_waifu.php', {
            method: 'POST',
            body: formData,
          });
          progressBar.value = i + 1;
        }
        vuotveProgressText.innerHTML = 'Xong!';
        //progressBar.style.display = "none";
        location.reload();
      }

      editBtn.addEventListener('click', async function () {
        EditWaifu();
      });

      async function EditWaifu() {
        editBtn.style.display = 'none';
        // Create and append the style element
        const style = document.createElement('style');
        style.textContent = `
          .styled-form {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f9f9f9;
            margin: 20px auto;
          }
      
          .styled-input,
          .styled-textarea,
          .styled-file-input {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
          }
      
          .styled-textarea {
            height: 50px;
            resize: vertical;
          }
      
          .button-container {
            display: flex;
            justify-content: space-between;
          }
      
          .styled-button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            flex: 1;
            margin: 5px;
          }
      
          .submit-button {
            background-color: #4CAF50;
            color: white;
          }
      
          .cancel-button {
            background-color: #f44336;
            color: white;
          }
        `;
        document.head.appendChild(style);

        // Create form element
        const form = document.createElement('form');
        form.id = 'editWaifuForm';
        form.classList.add('styled-form');

        form.addEventListener('submit', async function (event) {
          const uploadUrrl =
            'https://cors.iamneyk.workers.dev/?url=https://t.htvncdn.net/upload.php';
          event.preventDefault();

          const formData = new FormData();
          formData.append('fileupload', form.image.files[0]);
          await fetch(uploadUrrl, {
            method: 'POST',
            body: formData,
          })
            .then(async (response) => {
              const resText = await response.text();
              const ImgUrl =
                resText == 'upload fail'
                  ? ''
                  : 'https://t.htvncdn.net/images/300/' + resText;

              chrome.storage.sync.set({
                waifuName: form.name.value,
                waifuDesc: form.description.value,
                waifuImg: ImgUrl,
              });
              alert('Đã lưu waifu thành công!');
              location.reload();
            })
            .catch((error) => {
              console.log('Error:', error);
              alert('Đã xảy ra lỗi, vui lòng thử lại!');
            });
        });

        // Create name input field
        const nameField = document.createElement('input');
        nameField.type = 'text';
        nameField.name = 'name';
        nameField.placeholder = 'Tên (Bỏ trống để sử dụng mặc định)';
        nameField.classList.add('styled-input');
        form.appendChild(nameField);

        // Create description input field
        const descriptionField = document.createElement('textarea');
        descriptionField.name = 'description';
        descriptionField.placeholder = 'Mô tả (Bỏ trống để sử dụng mặc định)';
        descriptionField.classList.add('styled-textarea');
        form.appendChild(descriptionField);

        // Create image upload field
        const imageField = document.createElement('input');
        imageField.type = 'file';
        imageField.name = 'image';
        imageField.classList.add('styled-file-input');
        form.appendChild(imageField);

        // Create image preview element
        const imagePreview = document.createElement('img');
        imagePreview.classList.add('image-preview');
        imagePreview.style.display = 'none'; // Hide initially
        imagePreview.style.maxWidth = '120px';
        imagePreview.style.marginTop = '10px';
        form.appendChild(imagePreview);

        imageField.addEventListener('change', function (event) {
          const file = event.target.files[0];
          if (file) {
            if (!file.type.startsWith('image/')) {
              alert('Vui lòng upload ảnh hợp lệ.');
              imageField.value = ''; // Clear the input
              imagePreview.style.display = 'none'; // Hide preview
            } else if (file.size > 2 * 1024 * 1024) {
              // 2MB in bytes
              alert('Dung lượng ảnh phải nhỏ hơn 2MB.');
              imageField.value = ''; // Clear the input
              imagePreview.style.display = 'none'; // Hide preview
            } else {
              const reader = new FileReader();
              reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block'; // Show preview
              };
              reader.readAsDataURL(file);
            }
          }
        });

        // Create button container
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        // Create submit button
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Lưu';
        submitButton.classList.add('styled-button', 'submit-button');
        buttonContainer.appendChild(submitButton);

        // Create cancel button
        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.textContent = 'Huỷ';
        cancelButton.classList.add('styled-button', 'cancel-button');
        cancelButton.addEventListener('click', function () {
          form.remove();
          editBtn.style.display = 'inline';
        });
        buttonContainer.appendChild(cancelButton);

        // Append button container to form
        form.appendChild(buttonContainer);

        // Append form to the body or a specific container
        allWaifu.appendChild(form);
      }
    }
  );
}

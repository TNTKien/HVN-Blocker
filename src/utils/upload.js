export function Upload() {
  if (!window.location.href.includes('hentaihvn.tv/forum/')) return;

  const originUploadBtn = document.getElementById('buttonups');
  if (!originUploadBtn) return;
  originUploadBtn.style.marginTop = '280px';

  const codebox = document.getElementsByClassName('codebox')[0];

  const uploadBtn = document.createElement('a');
  uploadBtn.href = 'javascript:;';
  const bgIcon = document.createElement('div');
  bgIcon.style.cssText =
    'background: url(https://static.htvncdn.net/icon/info-1.png);height: 24px;width: 24px;border: 1px solid #999;margin-bottom: 5px';
  bgIcon.style.backgroundSize = 'cover';
  uploadBtn.appendChild(bgIcon);
  codebox.insertBefore(uploadBtn, codebox.children[0]);

  uploadBtn.onclick = () => {
    OpenUploadSection();
  };
}

function OpenUploadSection() {
  if (document.getElementById('upload-section')) return;
  const selectedFiles = [];
  const uploadSection = document.createElement('div');
  uploadSection.id = 'upload-section';
  uploadSection.style.cssText =
    'background: white; padding: 10px; border: 2px solid #ccc; border-radius: 4px; margin-top: 5px; margin-bottom: 10px;';

  // Drag & Drop area
  const dropArea = document.createElement('div');
  dropArea.style.cssText =
    'border: 2px dashed #ccc; padding: 30px; text-align: center; margin-top: 10px;';
  dropArea.textContent = 'Drag & Drop images here or click to select';
  uploadSection.appendChild(dropArea);

  // Image preview container
  const imagePreviewContainer = document.createElement('div');
  imagePreviewContainer.style.cssText =
    'margin-top: 10px; display: flex; flex-wrap: wrap; gap: 10px;';
  uploadSection.appendChild(imagePreviewContainer);

  // Result field
  const resultField = document.createElement('pre');
  resultField.style.cssText = `
  display: none;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  font-size: 14px;
  color: #333;
  white-space: pre-wrap;
`;
  uploadSection.appendChild(resultField);

  // Btn group
  const btnGroup = document.createElement('div');
  btnGroup.style.cssText = `display: flex; justify-content: space-between; gap: 5px;`;
  uploadSection.appendChild(btnGroup);

  // Left button container (for copy button)
  const leftBtnContainer = document.createElement('div');
  leftBtnContainer.style.cssText = `display: flex; gap: 5px;`;
  btnGroup.appendChild(leftBtnContainer);

  // Right button container (for submit, clear, cancel buttons)
  const rightBtnContainer = document.createElement('div');
  rightBtnContainer.style.cssText = `display: flex; gap: 5px;`;
  btnGroup.appendChild(rightBtnContainer);

  // Copy button
  const copyBtn = document.createElement('div');
  copyBtn.textContent = 'Copy';
  copyBtn.style.cssText = `
  margin-top: 10px;
  cursor: pointer;
  color: white;
  background-color: #21dc6d;
  padding: 5px 10px;
  border-radius: 4px;
  text-align: center;
  display: none;
  transition: background-color 0.3s;`;
  copyBtn.addEventListener('mouseover', () => {
    copyBtn.style.backgroundColor = '#1f944e';
  });
  copyBtn.addEventListener('mouseout', () => {
    copyBtn.style.backgroundColor = '#21dc6d';
  });
  copyBtn.addEventListener('click', () => {
    const text = resultField.textContent;
    if (text) {
      navigator.clipboard.writeText(text);
      alert('Copied!');
    }
  });
  leftBtnContainer.appendChild(copyBtn);

  // Submit button
  const submitBtn = document.createElement('div');
  submitBtn.textContent = 'Upload';
  submitBtn.style.cssText = `
  margin-top: 10px;
  cursor: pointer;
  color: white;
  background-color: #03a9f4;
  padding: 5px 10px;
  border-radius: 4px;
  text-align: center;
  display: inline-block;
  transition: background-color 0.3s;
`;

  submitBtn.addEventListener('mouseover', () => {
    submitBtn.style.backgroundColor = '#156891';
  });
  submitBtn.addEventListener('mouseout', () => {
    submitBtn.style.backgroundColor = '#03a9f4';
  });

  rightBtnContainer.appendChild(submitBtn);

  // Clear button
  const clearBtn = document.createElement('div');
  clearBtn.textContent = 'Clear';
  clearBtn.style.cssText = `
  margin-top: 10px;
  cursor: pointer;
  color: white;
  background-color: #afaeaa;
  padding: 5px 10px;
  border-radius: 4px;
  text-align: center;
  display: inline-block;
  transition: background-color 0.3s;
`;

  clearBtn.addEventListener('mouseover', () => {
    clearBtn.style.backgroundColor = '#4c5052';
  });
  clearBtn.addEventListener('mouseout', () => {
    clearBtn.style.backgroundColor = '#afaeaa';
  });

  rightBtnContainer.appendChild(clearBtn);

  // Cancel button
  const cancelBtn = document.createElement('div');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.style.cssText = `
  margin-top: 10px;
  cursor: pointer;
  color: white;
  background-color: #f64949;
  padding: 5px 10px;
  border-radius: 4px;
  text-align: center;
  display: inline-block;
  transition: background-color 0.3s;
`;
  // Hover effect
  cancelBtn.addEventListener('mouseover', () => {
    cancelBtn.style.backgroundColor = '#c62f2f';
  });
  cancelBtn.addEventListener('mouseout', () => {
    cancelBtn.style.backgroundColor = '#f64949';
  });
  rightBtnContainer.appendChild(cancelBtn);

  // Hidden file input
  const hiddenFileInput = document.createElement('input');
  hiddenFileInput.type = 'file';
  hiddenFileInput.accept = 'image/*';
  hiddenFileInput.multiple = true;
  hiddenFileInput.style.display = 'none';
  uploadSection.appendChild(hiddenFileInput);

  // Event listeners
  hiddenFileInput.addEventListener('change', function (event) {
    handleFiles(event.target.files);
  });

  dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.style.backgroundColor = '#f1f1f1';
  });

  dropArea.addEventListener('dragleave', () => {
    dropArea.style.backgroundColor = 'white';
  });

  dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.style.backgroundColor = 'white';
    const files = event.dataTransfer.files;
    handleFiles(files);
  });

  dropArea.addEventListener('click', () => {
    hiddenFileInput.click();
  });

  uploadSection.addEventListener('paste', (event) => {
    const items = event.clipboardData.items;
    const files = [];
    for (const item of items) {
      if (item.kind === 'file' && item.type.startsWith('image/')) {
        files.push(item.getAsFile());
      }
    }
    handleFiles(files);
  });

  submitBtn.addEventListener('click', async function () {
    if (selectedFiles.length === 0) {
      alert('Bạn chưa chọn ảnh nào.');
      return;
    }
    resultField.textContent = `Uploading...0/${selectedFiles.length}`;
    resultField.style.display = 'block';
    let imageBBcode = [];
    for (const file of selectedFiles) {
      const res = await postUpAnhtv(file);
      resultField.textContent = `Uploading...${imageBBcode.length + 1}/${
        selectedFiles.length
      }`;
      imageBBcode.push(res);
    }
    resultField.textContent = imageBBcode.join('\n');
    copyBtn.style.display = 'block';
  });

  cancelBtn.addEventListener('click', function () {
    selectedFiles.length = 0;
    uploadSection.remove();
  });

  clearBtn.addEventListener('click', function () {
    selectedFiles.length = 0;
    hiddenFileInput.value = '';
    imagePreviewContainer.innerHTML = '';
    resultField.style.display = 'none';
    copyBtn.style.display = 'none';
  });

  const gui_bl = document.getElementsByClassName('gui_bl')[0];
  const form = document.getElementsByTagName('form')[0];
  form.insertBefore(uploadSection, gui_bl);

  function handleFiles(files) {
    if (files.length + imagePreviewContainer.childElementCount > 5) {
      alert('Bạn chỉ có thể upload tối đa 5 ảnh/lần.');
      return;
    }

    //filter image files
    files = Array.from(files).filter((file) => file.type.startsWith('image/'));

    for (const file of files) {
      selectedFiles.push(file);
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgWrapper = document.createElement('div');
        imgWrapper.style.cssText = 'position: relative; display: inline-block;';

        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.cssText =
          'max-width: 120px; max-height: 120px; display: block; object-fit: cover;';

        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '&times;'; // Use HTML entity for a better "x" symbol
        removeBtn.style.cssText = `
            position: absolute;
            top: 0px;
            right: 0px;
            background: rgba(255, 0, 0, 0.7);
            color: white;
            border: none;
            width: 20px;
            height: 20px;
            font-size: 16px;
            line-height: 20px;
            text-align: center;
            cursor: pointer;
            transition: background 0.3s;
          `;
        removeBtn.addEventListener('mouseover', () => {
          removeBtn.style.background = 'rgba(255, 0, 0, 1)';
        });
        removeBtn.addEventListener('mouseout', () => {
          removeBtn.style.background = 'rgba(255, 0, 0, 0.7)';
        });
        removeBtn.addEventListener('click', () => {
          const index = selectedFiles.indexOf(file);
          if (index > -1) {
            selectedFiles.splice(index, 1);
          }
          imgWrapper.remove();
        });

        imgWrapper.appendChild(img);
        imgWrapper.appendChild(removeBtn);
        imagePreviewContainer.appendChild(imgWrapper);
      };
      reader.readAsDataURL(file);
    }
  }
}

async function postUpAnhtv(file) {
  try {
    const formData = new FormData();
    formData.append('source', file);
    formData.append('type', 'file');
    formData.append('action', 'upload');

    const response = await fetch('https://imgbb.com/json', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.status_code !== 200) {
      return 'upload failed';
    }

    const imageUrl = data.image.url;
    const bbcode = `[img]${imageUrl}[/img]`;
    return bbcode;
  } catch (e) {
    console.error(e);
    return 'upload failed';
  }
}

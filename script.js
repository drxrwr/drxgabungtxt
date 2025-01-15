const fileInput = document.getElementById('fileInput');
const fileNameInput = document.getElementById('fileName');
const mergeButton = document.getElementById('mergeButton');
const saveButton = document.getElementById('saveButton');
const outputDiv = document.getElementById('output');

let mergedContent = "";

fileInput.addEventListener('change', () => {
    const files = Array.from(fileInput.files);
    const fileListContainer = document.createElement('ul');
    fileListContainer.id = 'fileList';
    fileListContainer.style.listStyle = 'none';
    fileListContainer.style.padding = '0';
    fileListContainer.innerHTML = '';

    files.forEach((file, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${file.name}`;
        listItem.style.marginBottom = '5px';
        fileListContainer.appendChild(listItem);
    });

    const existingList = document.getElementById('fileList');
    if (existingList) {
        existingList.replaceWith(fileListContainer);
    } else {
        mergeButton.insertAdjacentElement('beforebegin', fileListContainer);
    }
});

mergeButton.addEventListener('click', async () => {
    const files = Array.from(fileInput.files);
    mergedContent = "";

    if (files.length === 0) {
        alert('Pilih minimal satu file untuk digabungkan!');
        return;
    }

    for (const file of files) {
        const text = await file.text();
        mergedContent += text; // Gabungkan isi file tanpa newline
    }

    outputDiv.style.display = 'block';
    outputDiv.textContent = mergedContent;
    saveButton.disabled = false;
});

saveButton.addEventListener('click', () => {
    const fileName = fileNameInput.value.trim();

    if (!fileName) {
        alert('Masukkan nama file baru!');
        return;
    }

    const blob = new Blob([mergedContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName.endsWith('.txt') ? fileName : `${fileName}.txt`;
    link.click();
});

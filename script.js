const fileInput = document.getElementById('fileInput');
const fileNameInput = document.getElementById('fileName');
const mergeButton = document.getElementById('mergeButton');
const saveButton = document.getElementById('saveButton');
const outputDiv = document.getElementById('output');

let mergedContent = "";

mergeButton.addEventListener('click', async () => {
    const files = Array.from(fileInput.files);
    mergedContent = "";

    if (files.length === 0) {
        alert('Pilih minimal satu file untuk digabungkan!');
        return;
    }

    for (const file of files) {
        const text = await file.text();
        mergedContent += text + "\\n"; // Gabungkan isi file dengan newline
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

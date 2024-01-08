const userInput = document.querySelector('.qr-code-generator__input');

const imgBox = document.querySelector('.qr-code-generator__img-box');
const qrImage = document.querySelector('.qr-code-generator__code-img');

const btnBox = document.querySelector('.qr-code-generator__button-box');
const generateBtn = document.querySelector('.qr-code-generator__generate-button');
const saveBtn = document.querySelector('.qr-code-generator__save-button');
const copyBtn = document.querySelector('.qr-code-generator__copy-button');

const tooltip = document.querySelector('.qr-code-generator__tooltip');

async function copyImgToClipboard(url) {
  try {
    const data = await fetch(url);
    const blob = await data.blob();
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
  } catch (err) {
    console.error(err);
  }
}

function generateQR() {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${userInput.value}`;

  if (userInput.value.length > 0) {
    qrImage.src = url;
    imgBox.classList.add('qr-code-generator__img-box_visible');

    saveBtn.setAttribute('href', url);
    saveBtn.setAttribute('download', 'image.png');

    btnBox.style.display = 'flex';

  } else {
    userInput.classList.add('qr-code-generator__input__err');
    setTimeout(() => {
      userInput.classList.remove('qr-code-generator__input__err');
    }, 500)
  }
}

generateBtn.addEventListener('click', generateQR);
copyBtn.addEventListener('click', () => {
  copyImgToClipboard(qrImage.src);
  tooltip.classList.add('qr-code-generator__tooltip_visible');
  setTimeout(() => {
    tooltip.classList.remove('qr-code-generator__tooltip_visible');
  }, 1500)
})
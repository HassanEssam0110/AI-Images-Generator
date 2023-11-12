const baseURL = 'https://api.openai.com/v1/images/generations';
const    apiKey = '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';

const inputKeywords = document.getElementById('input-keywords'),
    imgsCont = document.getElementById('imgs'),
    spinner = document.getElementById('spinner')

const infoObj = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
        // "model": "dall-e-3",
        "prompt": inputKeywords.value,
        "n": 3,
        "size": "512x512"
        // "size": "1024x1024"
    })
}


alertify.set('notifier', 'position', 'top-center');

// ?=============== Main Function Generate Images ===============
const generateImages = async () => {
    if (inputKeywords.value) {
        try {
            clearImages();
            showSpinner();
            const res = await fetch(baseURL, infoObj)

            if (res.status === 200) {
                const data = await res.json();  //parse data
                renderImages(data.data);
            } else {
                removeSpinner();
                alertify.notify('Wait 5 mins,Too many requests.', 'error', 5);
            }

        } catch (err) {
            showErrorMsg(err);
            removeSpinner();
            alertify.notify('Error occurred', 'error', 5);
        }
    } else {
        alertify.message('Please enter text input.');
    }
}

// ?=============== Show Images ===============
function renderImages(arr) {
    removeSpinner();
    for (let i = 0; i < arr.length; i++) {
        imgsCont.innerHTML += `<div class="img-card col-sm-6 col-md-4  ">
        <a href="${arr[i].url}" target="_blank">
        <img class="img-fluid rounded-2 shadow-lg img-gen"
        src="${arr[i].url}" alt="${arr.revised_prompt}">
        </a>
    </div>`
    }
}

// ?=============== clear imgs Contanier ===============
function clearImages() {
    imgsCont.innerHTML = "";
}
// ?=============== Show error message ===============
function showErrorMsg(err) {
    imgsCont.innerHTML = `
    <p class="text-danger fs-3">
    <i class="fa-solid fa-triangle-exclamation"></i> ${err.message}</p> `;
}
// ?=============== Show Spinner ===============
function showSpinner() {
    spinner.classList.remove('d-none')
}
// ?=============== Remove Spinner ===============
function removeSpinner() {
    spinner.classList.add('d-none')
}

// ?=============== SCROLL REVEAL ANIMATION ===============
const sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})

// sr.reveal(`.main-section`, { delay: 400, origin: 'top' })
sr.reveal(`.main-title`, { delay: 600, origin: 'top' })
sr.reveal(`.main-info`, { delay: 600 })
sr.reveal(`.prompt`, { delay: 900 })
sr.reveal(`.img-card`, { delay: 100, origin: 'top', interval: 400 })

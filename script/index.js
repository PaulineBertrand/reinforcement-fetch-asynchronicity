const ageBaseUrl = "https://api.agify.io?name=";
const genderizeBaseUrl = "https://api.genderize.io?name=";

const submitButton = document.querySelector(".okBtn");
const nameInput = document.querySelector(".nameInput");

function getInfoWithThenNesting(event) {
    event.preventDefault();
    const name = nameInput.value;
    let gender = "unknown";

    fetch(genderizeBaseUrl + name)
        .then(response => {
            response.json().then(jsonData => {
                gender = jsonData.gender;
                fetch(ageBaseUrl + name).then(response => {
                    response.json().then(jsonData => {
                        document.querySelector(
                            "#result p"
                        ).textContent = `${name}, your predicted age is ${jsonData.age} years old and you are probably a ${gender}`;
                    });
                });
            });
        })
        .catch(err => console.error(err));
}

function getInfoWithThenChaining(event) {
    event.preventDefault();
    const name = nameInput.value;
    let gender = "unknown";

    fetch(genderizeBaseUrl + name)
        .then(response => {
            return response.json();
        })
        .then(jsonData => {
            gender = jsonData.gender;
            return fetch(ageBaseUrl + name);
        })
        .then(response => {
            return response.json();
        })
        .then(jsonData => {
            document.querySelector(
                "#result p"
            ).textContent = `${name}, your predicted age is ${jsonData.age} years old and you are probably a ${gender}`;
        })
        .catch(err => console.error(err));
}

async function getInfoWithAsyncAwait(event) {
    try {
        event.preventDefault();
        const name = nameInput.value;

        const genderResponse = await fetch(genderizeBaseUrl + name);
        const genderJsonData = await genderResponse.json();
        const gender = genderJsonData.gender;

        const ageResponse = await fetch(ageBaseUrl + name);
        const ageJsonData = await ageResponse.json();
        const age = ageJsonData.age;

        document.querySelector(
            "#result p"
        ).textContent = `${name}, your predicted age is ${age} years old and you are probably a ${gender}`;
    } catch (err) {
        document.querySelector("#result p").textContent =
            "Change your name pls";
        console.error(err);
    }
}

submitButton.addEventListener("click", getInfoWithThenNesting);

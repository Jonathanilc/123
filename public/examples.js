const activity = document.getElementById("activity");
const date = document.getElementById("date");
const scalar = document.getElementById("time");
const units = document.getElementById("unit");

date.setAttribute('max', (new Date()).toISOString().split('T')[0]);


document.getElementById("future_new_button").onclick = function () {
    document.getElementById("future_new_button").style.display = "none";
    document.getElementById("future_menu").style.display = "flex";

    document.querySelector('.past_activity .message').remove();
}

document.getElementById("future_submit_button").onclick = function () {

    if(!scalar.value) {
        return alert('time/distance must not be null.');
    }

    document.getElementById("future_new_button").style.display = "";
    document.getElementById("future_menu").style.display = "none";

    const el = createElementFromHTML(`
        <div class="message">Got it! <span class="bold">${activity.value} for ${scalar.value} ${units.value}.</span> Keep it up !</div>
    `);

    insertAfter(el, document.getElementById("future_new_button"));

    

    post('http://localhost:3000/', {
            "activity": activity.value,
            "date": date.value,
            "scalar": scalar.value,
            "units": units.value
        })
        .then(res => console.log(res));
}

document.getElementById("past_new_button").onclick = function () {
    document.getElementById("past_new_button").style.display = "none";
    document.getElementById("past_menu").style.display = "flex";
}

document.getElementById("past_submit_button").onclick = function () {
    document.getElementById("past_new_button").style.display = "";
    document.getElementById("past_menu").style.display = "none";
}

// select on change listener
document.getElementById('activity').onchange = function (e) {
    const val = e.target.value;

    if (['Walk', 'Run', 'Bike'].includes(val)) {
        return units.setAttribute('value', 'km');
    }

    if (['Basketball', 'Soccer', 'Yoga'].includes(val)) {
        return units.setAttribute('value', 'minutes');
    }

    return units.setAttribute('value', 'laps')

}



//  helper functions
const post = (url, payload) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(payload);

    console.log(payload)

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return new Promise((resolve, reject) => {
        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => resolve(result))
            .catch(error => reject(error));
    });
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
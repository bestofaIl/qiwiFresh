const url = "https://www.cbr-xml-daily.ru/daily_json.js"

let select = document.querySelector("#valutes");
let container = document.querySelector(".container");

let date = await fetchDate();
fillSelect(date.Valute);

select.onchange = async ({target}) => {
    date = await fetchDate();
    let valute = findValuteById(target.value, date.Valute);
    if (container.lastChild.nodeType === 1) {
        container.removeChild(container.lastChild);
    }
    let div = document.createElement("div");
    div.className = "window"
    div.innerHTML = `
    <h1>${valute.ID + " - " + valute.Name}</h1>
    <div>
        <p>${convertDate(date.Date) + " - " + valute.Value}</p>
        <p>${convertDate(date.PreviousDate) + " - " + valute.Previous}</p>
    </div>
`;
    container.appendChild(div);
}

async function fetchDate() {
    let response = await fetch(url);
    return await response.json();
}

function fillSelect(valutes) {
    for (let valute in valutes) {
        let text = `${valutes[valute].ID} - ${valutes[valute].Name}`;
        let value = valutes[valute].ID;
        let newOption = document.createElement("option");
        newOption.text = text;
        newOption.value = value;
        select.appendChild(newOption);
    }
}

function findValuteById(id, valutes) {
    for (let valute in valutes) {
        if (valutes[valute].ID === id) return valutes[valute];
    }
}

function convertDate(string) {
    let date = new Date(string);
    return date.toLocaleString();
}













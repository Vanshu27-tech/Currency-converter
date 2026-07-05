const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// for(let code in countryList){
//     console.log(code , countryList[code]);
// }
for(let select of dropdown){
    for(let currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        
        if(select.name === "from" && currcode === "USD"){
            newoption.selected = "selected";
        }else if(select.name === "to" && currcode === "INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change" , (evt) => {
        updateflag(evt.target);
    });
}
const updateflag = (element) =>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}
button.addEventListener("click" , async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector("form input");
    let amtval = amount.value;
    if(amtval === "" || amtval<1){
        amtval = 1;
        amount.value = "1";
    }
    


const url = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;

let response = await fetch(url);
let data = await response.json();

let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
let finalamount = amtval * rate;
msg.innerText = `${amtval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`


 })

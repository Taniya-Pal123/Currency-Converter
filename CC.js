const BASE_URL = "https://api.currencyapi.com/v3/latest?apikey=cur_live_3H4z8D9NWhBZIoW32YGgxqCi0uvPgubgN0GspKb1";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for (let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = parseFloat(amount.value);

    if (isNaN(amtVal) || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const base = fromCurr.value;
    const target = toCurr.value;

    const url = `${BASE_URL}&base_currency=${base}&currencies=${target}`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        const rate = data.data[target].value;
        const finalAmount = (amtVal * rate).toFixed(2);

        msg.innerText = `${amtVal} ${base} = ${finalAmount} ${target}`;
    } catch (error) {
        console.error("Fetch error:", error);
        msg.innerText = "Error fetching exchange rate.";
    }
};


const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    
});

window.addEventListener("load",()=>{
    updateExchangeRate();
});
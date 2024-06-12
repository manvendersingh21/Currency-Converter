const BASE_URL =" https://api.currencyapi.com/v3/latest?apikey=cur_live_UYZQgz9uo25niAF4fbKXU4Y2mj0Ccro8AsoC4DUy&";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#exg");
const fromcurr= document.querySelector(".from select");
const tocurr= document.querySelector(".to select");
const text=document.querySelector(".msg");
const amount=document.querySelector("form input");
const EnterAmt=document.querySelector("form p");

console.log(dropdowns);

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;

        if(currCode=="USD" && select.name=="from"){
            newOption.selected="selected";
        }else if(currCode=="INR" && select.name=="to"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updatFlag(evt.target);

    })

}
const updateExchangeRate=async()=>{
    const baseCurr=`base_currency=${fromcurr.value}`;
    const curr=`currencies=${tocurr.value}&`;
    let URL = `${BASE_URL}/${curr}/${baseCurr}`
    let response=await fetch(URL);
    let data =(await response.json())["data"];
    let rate=data[tocurr.value]["value"];
    let finalAmount=amount.value*rate;
    text.innerText=`${amount.value} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;

}
const updatFlag=(element)=>{
    const currCode=element.value;
    const countryCode= countryList[currCode];
    const newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    const img=element.parentElement.querySelector("img");
    img.src=newSrc;
    EnterAmt.innerText=`Enter amount in ${element.value}`;


}
updateExchangeRate();

btn.addEventListener("click", (e)=>{
    e.preventDefault();
    
    if(amount.value===""||amount.value<1){
        amount.value=1;
        
    }
    updateExchangeRate();
    

   
})


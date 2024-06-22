let drop = document.querySelectorAll("select");

for(let opt of drop){
    for(let c in countryList){
        let newOpt = document.createElement("option");
        fullname[c];
        newOpt.innerText = c + " _" + fullname[c] ;
        newOpt.value = c ;
        if(opt.name === "from" && c === "USD"){
            newOpt.selected = "selected";
        }else if(opt.name === "to" && c === "INR"){
            newOpt.selected = "selected";
        }
        opt.append(newOpt);
    }
    opt.addEventListener("change" , (evt)=>{
        setFlag(evt.target) ;
    })
}
document.querySelector("i").addEventListener("click" , ()=>{
    let to = document.querySelector(".to select").value ;
    document.querySelector(".to select").value = document.querySelector(".from select").value ;
    document.querySelector(".from select").value = to ;
    setFlag(document.querySelector(".from select"));
    setFlag(document.querySelector(".to select")) ;

});

let getRate =async (from , to)=>{
    
    let result = await fetch("https://open.er-api.com/v6/latest/"+from);
    let r = await result.json() ;
    return r.rates[to];
}

let setFlag = async (element) =>{
    let v  = element.value ;
    let flagCode = countryList[v];
    console.log(element.name);
    let image = element.parentNode.querySelector("img");
    image.src = "https://flagsapi.com/"+flagCode+"/flat/64.png";
    if(element.name === "from")
    document.querySelector(".input h3").innerText = v ;
    else
    document.querySelector(".output h3").innerText = v ;
    displayVal();
}

window.addEventListener("load" , ()=>{
    displayVal();
})
document.querySelector(".input input").addEventListener("input",()=>{
    displayVal("press");
})

let displayVal = async (val)=>{
    let amount = document.querySelector(".form input");
    if(amount.value <= 0 && val !== "press"){
        amount.value = 1 ; 
    }
    amtVal = amount.value ;
    let exRate =await getRate(document.querySelector(".from select").value , document.querySelector(".to select").value);
    let FinalPrice = amtVal*exRate ;
    document.querySelector(".output input").value = FinalPrice ;
}

document.querySelector("button").addEventListener("click" , async (evt)=>{
    evt.preventDefault();
    displayVal() ;
})


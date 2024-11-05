let lengthDisplay=document.querySelector("[data-lengthNumber]");

let inputSlider=document.querySelector("[data-lengthSlider]")
let indicator=document.querySelector("[data-indicator]");

let passwordDisplay=document.querySelector("[data-passwordDisplay]");
let copyMsg=document.querySelector("[data-copyMsg]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

const lowercaseCheck = document.querySelector("#lowercase");
console.log(lowercaseCheck);
const numbersCheck = document.querySelector("#numbers");
console.log(numbersCheck)
const symbolsCheck = document.querySelector("#symbols");
const generateBtn = document.querySelector(".generateButton");
let password="";
let passwordLength=10;
let checkCount=0;
const uppercaseCheck = document.querySelector("#uppercase");
// console.log(uppercaseCheck );
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+ "% 100%"
}
handleSlider();
inputSlider.addEventListener('input', (e)=>{
    passwordLength=e.target.value;
    handleSlider();
});
// data indicator

function setIndicator(color){
    indicator.style.background=color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;

}
// generating random number
function getRndInteger(min , max){
    return Math.floor(Math.random()*(max-min))+min;
}
// generating random lowercase

function generateRandomNumber() {
    return getRndInteger(0,9);
}

function generateLowerCase() {  
       return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase() {  
    return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

// password strength
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;

    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
      } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        (passwordLength >= 6) 
      ) {
        setIndicator("#ff0");
      } else {
        setIndicator("#f00");
      }
  }

  // copy containt password
   async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";

    }
    catch(e){
        copyMsg.innerText="failed";
    }
    // to make span visible
    copyMsg.classList.add('active');
    setTimeout(()=>{
         copyMsg.classList.remove('active')},2000);
   }


    // slider ko input  de rahe hai ham

 

    let copyBtn =document.querySelector("[data-copy]");

   copyBtn.addEventListener('click', ()=>{
    if(passwordDisplay.value){
        copyContent();
    }
   })

    let allCheckBox=document.querySelectorAll("input[type=checkbox]");

   function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    })
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
       }
    
   }

//    if(passwordLength<checkCount){
//     passwordLength=checkCount;
//     handleSlider();
//    }


allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change', handleCheckBoxChange);
});

generateBtn.addEventListener('click',()=>{

    if(checkCount<=0){
        return;
    }
 console.log(checkCount)
    password='';
   let funcArr=[];
   if(uppercaseCheck.checked){
    funcArr.push(generateUpperCase);}
      
   if(lowercaseCheck.checked)
      {funcArr.push(generateLowerCase);}
   
   if(numbersCheck.checked)
     { funcArr.push(generateRandomNumber);}
   if(symbolsCheck.checked)
      {funcArr.push(generateSymbol);}

      // compulsor addition
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }

    //remaining addition

    for(let i=0;i<passwordLength-funcArr.length;i++){
     let randNum=getRndInteger(0,funcArr.length);
     password+=funcArr[randNum]();
    }
   
    password=shufflePassword(Array.from(password));
    passwordDisplay.value=password;
    console.log(password);

    calcStrength();
})

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}














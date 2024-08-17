let form=document.querySelector("form")
let FirstName=document.querySelectorAll("input")[0]
let LastName=document.querySelectorAll("input")[1]
let email=document.querySelectorAll("input")[2]
let mobile=document.querySelectorAll("input")[3]
let createpassword=document.querySelectorAll("input")[4]
let confirmpassword=document.querySelectorAll("input")[5]

let efirst=document.querySelectorAll("span")[0]
let elast=document.querySelectorAll("span")[1]
let eemail=document.querySelectorAll("span")[2]
let emobno=document.querySelectorAll("span")[3]
let epassword=document.querySelectorAll("span")[4]
let econfirmpassword=document.querySelectorAll("span")[5]


let storage=[]

let dataFromstorage=JSON.parse(localStorage.getItem("data"));
if(dataFromstorage){
    storage=dataFromstorage;
}
// console.log(form,FirstName,LastName,email,mobile,createpassword,confirmpassword);
// console.log(efirst,elast,eemail,emobno,epassword,econfirmpassword);

form.addEventListener("submit",(e)=>{

    let mobileCheck=storage.find((e)=>{
        if(e.phone==mobile.value){
            return e
        }
    })


    let emailCheck=storage.find((e)=>{
        if(e.email==email.value){
            return e
        }
    })

    let flag=true;
    //first Name Validation
    let regx=/^[a-zA-Z]{1,17}$/       //for space enter space[a-zA-Z ] & for number enter number [a-zA-Z0-3]
    if(FirstName.value==""){
        efirst.innerHTML="*Enter the First Name"
        e.preventDefault()
        flag=false
    }
    else if(regx.test(FirstName.value)){
        efirst.innerHTML=""
    }
    else{
        efirst.innerHTML="Invalid First Name"
        e.preventDefault()
        flag=false
    }
  

    
    //first Name Validation
    regx=/^[a-zA-Z]{1,17}$/       //for space enter space[a-zA-Z ] & for number enter number [a-zA-Z0-3]
    if(LastName.value==""){
        elast.innerHTML="*Enter the Last Name"
        e.preventDefault()
        flag=false
    }
    else if(regx.test(LastName.value)){
        elast.innerHTML=""
    }
    else{
        elast.innerHTML="Invalid Last Name"
        e.preventDefault()
        flag=false
    }

    //email validation
    if(emailCheck){
        eemail.innerHTML="Email Already Registered"
        e.preventDefault()
        flag=false
    }
    else if(email.value==""){
        eemail.innerHTML="Enter the email"
        e.preventDefault()
        flag=false
    }
    else{
        eemail.innerHTML="";
    }

    //mobileno validation
    let regxmob=/^[6-9][0-9]{9}$/ 

    if(mobileCheck){
        emobno.innerHTML="Mobile Number already registered"
        e.preventDefault()
        flag=false
    }
    else if(mobile.value==""){
        emobno.innerHTML="*Enter mobile no."
        e.preventDefault()
        flag=false
    }
    else if(regxmob.test(mobile.value)){
        emobno.innerHTML=""
    }
    else{
        emobno.innerHTML="Ahh number daal"
        e.preventDefault()
        flag=false
    }


    //passwordvalidation

    // let regxpass=/^[a-zA-Z0-9!@$]{6,15}$/
    let regxpass=/^[A-Z][a-zA-Z0-9!@$]{5,15}$/
    if(createpassword.value==""){
        epassword.innerHTML="*Enter Password"
        e.preventDefault()
        flag=false
    }
    else if(regxpass.test(createpassword.value)){
        epassword.innerHTML=""
    }
    else{
        epassword.innerHTML="*Password Bola tha tu kyaa daal rha"
        e.preventDefault()
        flag=false
    }

    //Confirm PAssword
    if(confirmpassword.value==""){
        econfirmpassword.innerHTML="*Enter Confirm Password"
        e.preventDefault()

    }
    else if(confirmpassword.value==createpassword.value){
        econfirmpassword.innerHTML=""
    }
    else{
        econfirmpassword.innerHTML="*PAssword is Invalid"
        e.preventDefault()
    }

    //store data in local storage
    // let details={
    //     first:FirstName.value,
    //     last:LastName.value,
    //     email:email.value,
    //     pass:createpassword.value,
    //     confirmpass:confirmpassword.value
    // }

    // console.log(details); //!may store error data

    if(flag){
        let data={
        first:FirstName.value,
        last:LastName.value,
        email:email.value,
        phone:mobile.value,
        pass:createpassword.value,
        cartitems:null,
        // confirmpass:confirmpassword.value
    }

    storage.push(data);

    localStorage.setItem("data",JSON.stringify(storage))
    console.log(data);
    }


});

localStorage.clear();







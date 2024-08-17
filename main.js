//*global-element

let cart_item=[];
let data=JSON.parse(localStorage.getItem("data"));
let oneuser=JSON.parse(localStorage.getItem("one_user"));
let count=document.querySelector("#count")

if(oneuser){
    if(oneuser.cartitems){
        count.innerHTML=oneuser.cartitems.length;
        cart_item=oneuser.cartitems;
    }
}





function loginLogOut() {
    let login = document.querySelector("#right");
    //getting user data from local storage
    let one_userData = JSON.parse(localStorage.getItem("one_user"))
    console.log(one_userData);

    //user information
    if (one_userData) {
        //providing information inside right divison
        login.innerHTML = `<span>${one_userData.first}</span> 
    <a href="./main.html"><button id="logout">LogOut</button></a>`
        //accessing logout button
        let LogOut = document.querySelector("#logout");
        LogOut.addEventListener("click", () => {
            //logout event
            localStorage.removeItem("one_user")
        })
    }
}
loginLogOut();



//fecthing data from server
async function allProductsData() {
    let dataFromServer = await fetch("https://www.shoppersstack.com/shopping/products/alpha")
    //dataObject in js fromat
    let Convertedata = await dataFromServer.json()
    //only data property
    let allData = Convertedata.data;
    console.log(allData);

    //*filter men data
    let menData = allData.filter((e) => {
        if (e.category == "men") {
            return e
        }
    })
    // console.log(menData);

    let womenData = allData.filter((e) => {
        if (e.category == "women") {
            return e
        }
    })
    // console.log(womenData);

    let kidData = allData.filter((e) => {
        if (e.category == "kids") {
            return e
        }
    })
    // console.log(kidData);

    let electronicsData = allData.filter((e) => {
        if (e.category == "electronics") {
            return e
        }
    })
    console.log(menData);
    console.log(womenData);
    console.log(kidData);
    console.log(electronicsData);


    let MaleOutput = document.querySelector("#maleCont")
    //* male data output
    menData.map((e) => {
        MaleOutput.innerHTML += `<div id="${e.productId}">
        <img src="${e.productImageURLs[0]}"></img>
        <h3>${e.name}</h3>
        <h2>Price:${e.price}</h2>
        <h2>Rating:${e.rating}</h2>
        <button>Add to Cart</button>
        </div>
        `
    })

    let femaleOutput = document.querySelector("#femaleCont")
    //* female data output
    womenData.map((e) => {
        femaleOutput.innerHTML += `<div ${e.productId}>
        <img src="${e.productImageURLs[0]}"></img>
        <h3>${e.name}</h3>
        <h2>Price:${e.price}</h2>
        <h2>Rating:${e.rating}</h2>
        <button>Add to Cart</button>
        </div>
        `
    })

    let kidoutput = document.querySelector("#kid")
    //* kid data output
    kidData.map((e) => {
        kidoutput.innerHTML += `<div ${e.productId}>
        <img src="${e.productImageURLs[0]}"></img>
        <h3>${e.name}</h3>
        <h2>Price:${e.price}</h2>
        <h2>Rating:${e.rating}</h2>
        <button>Add to Cart</button>
        </div>
        `
    })
    let electronicsoutput = document.querySelector("#electronics")
    //* kid data output
    electronicsData.map((e) => {
        electronicsoutput.innerHTML += `<div ${e.productId}>
        <img src="${e.productImageURLs[0]}"></img>
        <h3>${e.name}</h3>
        <h2>Price:${e.price}</h2>
        <h2>Rating:${e.rating}</h2>
        <button>Add to Cart</button>
        </div>
        `
    })




    //*searchResults
    let input = document.querySelector("input")
    let searchBtn = document.querySelector("#searchBtn")
    let Searchresult = document.querySelector("#searchResult")


    searchBtn.addEventListener("click", (e) => {
        Searchresult.innerHTML = "";
        allData.map((e) => {

            if (e.name.toLowerCase().includes(input.value.trim().toLowerCase())) {
                Searchresult.innerHTML += `<div id="${e.productId}">
        <img src="${e.productImageURLs[0]}"></img>
        <h3>${e.name}</h3>
        <h2>Price:${e.price}</h2>
        <h2>Rating:${e.rating}</h2>
        <button>Add to Cart</button>
        </div>`
            }
        })
    })

    //accessing all add to cart button
    let main = document.querySelector("main")
    let allbtn = main.querySelectorAll("button")
    console.log(allbtn);
//iterate to each button
    allbtn.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            if(oneuser){
                //^ console.log(btn.parentElement);--print paren element id
            //if the product already exist it will filter and not add that product
            cart_item=cart_item.filter((e)=>{
                if(e.productId !=btn.parentElement.id){
                    return e
                }
            })

            //* after filter it will add the repeating one product to final cart itens
            let product=allData.find((e)=>{
                if(e.productId==btn.parentElement.id){
                    return e
                }
            });

            //*clicked product added to cart
            cart_item.push(product)
            // console.log(product);
            // console.log(cart_item);

            oneuser.cartitems=cart_item;
            console.log(oneuser);
            localStorage.setItem("one_user",JSON.stringify(oneuser)); //*javascript one user to local storage one_user

            //* remove current user details 
            //we cannot update directly using any update method in local storage ,so we reassign the data
            data=data.filter((e)=>{
                if(e.phone!=oneuser.phone)
                {
                    return e
                }
            })
            //*adding current user details in data
            data.push(oneuser);//add updated cart items in one data

            console.log(data);
            //*store updated data in local storage
            localStorage.setItem("data",JSON.stringify(data));
            count.innerHTML=oneuser.cartitems.length;
            }
            else{
                window.alert("login first")
                window.location.href="./login.html"
            }
            


        })
    })




}
allProductsData()



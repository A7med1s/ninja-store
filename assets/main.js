const cart= document.getElementById("cart");
let cartIcon= document.getElementById("cart-icon");
let closeCart =document.getElementById("cart-close")

cartIcon.addEventListener("click",()=>{
    cart.classList.add("active")
});
closeCart.addEventListener("click",()=>{
    cart.classList.remove("active")
});

if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded",start)
}else{
    start();
};

function start () {
    addEvents();
}

function update(){
    addEvents();
    updateTotal();
}

function addEvents(){
    // remove items 
    let cartRemoveBtn = document.querySelectorAll(".cart-remove")
    cartRemoveBtn.forEach((btn)=>{
        btn.addEventListener("click",handleRemoveItem)
    })
    //change item quantity
    let cartQuantityInputs = document.querySelectorAll(".cart-quantity");
    cartQuantityInputs.forEach(input =>{
        input.addEventListener("change",handleChangeQuantity);
    })
    //add items to cart
    let addCartBtns = document.querySelectorAll(".add-cart");
    addCartBtns.forEach(btn => {
        btn.addEventListener("click",handleAddItemToCart);
    })
}

let itemsAdded =[];
function handleAddItemToCart (){
    let product =this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;

    let newToAdd = {
        title,
        price,
        imgSrc,
    };
    //handel item is alrerady exist
    if(itemsAdded.find(el => el.title == newToAdd.title)){
        alert("this item is already exist")
        return;
    }else{
        itemsAdded.push(newToAdd)
    }

    //add product to cart
    let cartBoxElement = cartBoxComponent(title,price,imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode)
    update()

}

function handleRemoveItem(){
    this.parentElement.remove()
    itemsAdded = itemsAdded.filter(el =>el.title != this.parentElement.querySelector(".cart-product-title").innerHTML)
    update();
}
function handleChangeQuantity (){
    if(isNaN(this.value) || this.value < 1){
        this.value = 1;
    }
    // this.value = Math.floor(this.value)   // keep it int

    update()
}

function updateTotal(){
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElment = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach(cartBox =>{
        let priceOfElement = cartBox.querySelector(".cart-price");
        let price= parseFloat(priceOfElement.innerHTML.replace("$",""));
        let quantity =cartBox.querySelector(".cart-quantity").value;
        total +=price * quantity;
    });
    total = total.toFixed(2);
    totalElment.innerHTML ="$" + total;
};

function cartBoxComponent(title,price,imgSrc){
    return `
    <div class="cart-box">
    <img src=${imgSrc} alt="">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <i class='bx bxs-trash cart-remove'></i>
</div>
    `
};

let buyBtn = document.getElementById("btn-buy");

buyBtn.onclick = function (){
    // console.log(itemsAdded)
    // console.log(cart.querySelector(".total-price").innerHTML)
    if(itemsAdded != ""){
        document.getElementById("payways").style.display = "block"
        document.getElementById("problem").style.display = "none"
    }else{
        document.getElementById("problem").style.display = "block"
    }
}
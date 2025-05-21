// navigation functionality
function openMenu() {
    var nav = document.getElementById("nav");
    nav.style.display = "flex";
}

function closeMenu() {
    var nav = document.getElementById("nav");
    nav.style.display = "none";
}

function openCart(){
    var cartNav = document.getElementById("nav-cart")
    var allInfo = document.getElementById("info-all")
    var cartSpace = document.getElementById("cart-cont")
    cartNav.style.display ="flex";
    allInfo.style.width = "70%"
    cartSpace.style.width ="30%";
}

function closeCart(){
    var cartNav = document.getElementById("nav-cart")
    var allInfo = document.getElementById("info-all")
    var cartSpace = document.getElementById("cart-cont")
    cartNav.style.display ="none";
    allInfo.style.width = "100%"
    cartSpace.style.width ="0";
}

function buyProd(){
    var cartNav = document.getElementById("nav-cart")
    var allInfo = document.getElementById("info-all")
    var cartSpace = document.getElementById("cart-cont")
    var empty = document.getElementById("empty-cart")
    cartNav.style.display ="flex";
    allInfo.style.width = "70%"
    cartSpace.style.width ="30%";
    empty.style.display ="none";
}   

document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
    loadContent();

}

function loadContent(){
  //Remove Food Items From Cart
    let btnRemove=document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn)=>{
    btn.addEventListener('click',removeItem);
    });

  //Product Item Change Event
    let qtyElements=document.querySelectorAll('.cart-quantity');
    qtyElements.forEach((input)=>{
    input.addEventListener('change',changeQty);
    });

  //Product Cart

    let cartBtns=document.querySelectorAll('.add-cart');
    cartBtns.forEach((btn)=>{
    btn.addEventListener('click',addCart);
    });

    updateTotal();
}


//Remove Item
function removeItem(){
    if(confirm('Are Your Sure to Remove')){
    let title=this.parentElement.querySelector('.cart-food-title').innerHTML;
    itemList=itemList.filter(el=>el.title!=title);
    this.parentElement.remove();
    loadContent();
    }
}

//Change Quantity
function changeQty(){
    if(isNaN(this.value) || this.value<1){
    this.value=1;
    }
    loadContent();
}

let itemList=[];

//Add Cart
function addCart(){
    let food=this.parentElement;
    let title=food.querySelector('.food-title').innerHTML;
    let price=food.querySelector('.food-price').innerHTML;
    let imgSrc=food.querySelector('.food-img').src;
 //console.log(title,price,imgSrc);
    
    let newProduct={title,price,imgSrc}

 //Check Product already Exist in Cart
    if(itemList.find((el)=>el.title==newProduct.title)){
    alert("Product Already added in Cart");
    return;
    }else{
    itemList.push(newProduct);
    }


let newProductElement= createCartProduct(title,price,imgSrc);
let element=document.createElement('div');
element.classList.add("cart-prod")
element.innerHTML=newProductElement;
let cartBasket=document.querySelector('.cart-content');
cartBasket.append(element);
loadContent();
}


function createCartProduct(title,price,imgSrc){

    return `
    <div class="cart-box">
    <img src="${imgSrc}" class="cart-img">
    <div class="detail-box">
    <div class="cart-food-title">${title}</div>
    <div class="price-box">
        <div class="cart-price">${price}</div>
        <div class="cart-amt">${price}</div>
    </div>
    <input type="number" value="1" class="cart-quantity">
    </div>
    <i class='bx bx-trash-alt cart-remove'></i>
    </div>
    `;
}

function updateTotal()
{
    const cartItems=document.querySelectorAll('.cart-box');
    const totalValue=document.querySelector('.total-price');

    let total=0;

    cartItems.forEach(product=>{
    let priceElement=product.querySelector('.cart-price');
    let price=parseFloat(priceElement.innerHTML.replace("R",""));
    let qty=product.querySelector('.cart-quantity').value;
    total+=(price*qty);
    product.querySelector('.cart-amt').innerText="R"+(price*qty) +".00";

    });

    totalValue.innerHTML='R'+total+".00";


  // Add Product Count in Cart Icon
    var empty = document.getElementById("empty-cart")
    const cartCount=document.querySelector('.cart-count');
    let count=itemList.length;
    cartCount.innerHTML=count;

    if(count==0){
    cartCount.style.display='none';
    empty.style.display ="block";
    }else{
    cartCount.style.display='block';
    }


}



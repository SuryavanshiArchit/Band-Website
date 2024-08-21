// if Loading state 
if (document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}
else{
    ready()
}


// Handling the button click of remove button of cart
function ready()
{
var removeCartItemButtons= document.getElementsByClassName('btn-danger')
for(var i=0;i<removeCartItemButtons.length;i++)
{
    var button =removeCartItemButtons[i]
    button.addEventListener('click',removeCartItem)
}

        var quantityInputs=document.getElementsByClassName('cart-quantity-input')
        for(var i=0;i<quantityInputs.length;i++)
        {
            var input=quantityInputs[i]
            input.addEventListener('change',quantityChanged)
        }

        var addToCartButtons = document.getElementsByClassName('shop-item btn')
        for( var i = 0;i<addToCartButtons.length;i++){

            var button =addToCartButtons[i]
            button.addEventListener('click',addToCartClicked)

        }
        document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)
}


function purchaseClicked(){
        alert('Thank You for your purchase')
        var cartItems=document.getElementsByClassName('cart-items')[0]
        while(cartItems.hasChildNodes()){
            cartItems.removeChild(cartItems.firstChild)
        }
        updateCartTotal()
}

//Handling the event which reduces the number of items

function removeCartItem(event)
{
    var buttonClicked=event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()

}


function quantityChanged(event)
{
    var input= event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value=1
    }
    updateCartTotal()
}


function addToCartClicked(event){
        var button = event.target
        var shopItem = button.parentElement.parentElement
        var title=shopItem.getElementsByClassName('shop-item-title')[0].innerText
        var price=shopItem.getElementsByClassName('shop-item-price')[0].innerText
        var imageSrc=shopItem.getElementsByClassName('shop-item-image')[0].src
        addItemtoCart(title,price,imageSrc)
        updateCartTotal()
}


function addItemtoCart(title, price , imageSrc){
    var cartRow=document.createElement('div')
    cartRow.classList.add('cart-row')

    var cartItems=document.getElementsByClassName('cart-items')[0]
    var cartItemNames=cartItems.getElementsByClassName('cart-item-title')
    for (var i=0;i<cartItemNames.length;i++){
        if (cartItemNames[i].innerText==title){
            alert('This item is already added to the cart')
            return  
        }

    }

    cartRow.innerText = title
    var cartItems=document.getElementsByClassName('cart-items')[0]
            // this is added so that the new item added in the cart is visible properly
    var cartRowContents = `  <div class="cart-item cart-column">
                            <img class="cart-img" src="${imageSrc}">
                            <span class="cart-item-title">${title}</span>
                            </div>
                        
                            <span class="cart-price cart-column">${price}</span>
                            <div class="cart-quantity cart-column">
                            <input class="cart-quantity-input" type="number" value="1">
                            <button class="btn btn-danger cart-quantity-button" >
                                Remove
                            </button> 
                        </div>`
                        cartRow.innerHTML=cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged())
}

// Handling the event which updates the total price of the cart.

function updateCartTotal(){
        var cartItemContainer = document.getElementsByClassName('cart-items')[0]
       var CartRows = cartItemContainer.getElementsByClassName('cart-row')
            var total=0;
        for(var i=0;i<CartRows.length;i++)
        {
            var cartRow=CartRows[i]
            var priceElement=cartRow.getElementsByClassName('cart-price')[0]
            var quantityElement=cartRow.getElementsByClassName('cart-quantity-input')[0]
            var price=parseFloat(priceElement.innerText.replace('$',''))
            var quantity=quantityElement.value
            total=total+(price*quantity)           
        }
        total=Math.round(total * 100)/100 
        document.getElementsByClassName('cart-total-price')[0].innerText='$'+total
         
}
let totalPrice = 0;
document.getElementById("total").innerHTML = totalPrice + ' gold';
let totalMoney = 37;
document.getElementById("balance").innerHTML = totalMoney;

//open modal on Buy button
const buyButton = document.getElementById("open_modal");
buyButton.addEventListener("click", () => {
    document.getElementById("modal").style.display = "flex";
    buyButton.style.display = "none";
    document.getElementById("wrapper").style.background = "grey";

})

//close modal on buy, cancel and x buttons
document.querySelectorAll(".close").forEach(elem => {
    elem.addEventListener("click", () => {
        document.getElementById("modal").style.display = "none";
        buyButton.style.display = "inline";
        document.getElementById("wrapper").style.background = "transparent";
    })
});

//cancel refresh page
document.getElementById("cancel").addEventListener("click", () => {
    location.reload();
})


data.map(item => {

    //Create HTML elements for each item
    const itemDiv = document.createElement("DIV");
    const inputDiv = document.createElement("DIV");
    const itemImg = document.createElement("IMG");
    const itemName = document.createElement("SPAN");
    const itemInput = document.createElement("INPUT");
    const itemPrice = document.createElement("SPAN");
    const itemIncrement = document.createElement("BUTTON");
    const iconIncrement = document.createElement("I");
    const itemDecrement = document.createElement("BUTTON");
    const iconDecrement = document.createElement("I");

    itemInput.setAttribute("type", "number");
    itemInput.setAttribute("min", 0);
    itemInput.setAttribute("readonly", true);
    itemDiv.className = "Modal__item";
    itemName.className = "Modal__name";
    inputDiv.className = "Modal__input";
    itemImg.className = "Modal__img";
    itemPrice.className = "Modal__price";
    itemIncrement.className = "Modal__button";
    itemDecrement.className = "Modal__button";
    iconIncrement.className = "fas fa-plus";
    iconDecrement.className = "fas fa-minus"

    //Append the elements to their parent
    document.getElementById("items").appendChild(itemDiv);
    itemDiv.appendChild(itemImg);
    itemDiv.appendChild(itemName);
    itemDiv.appendChild(inputDiv);
    itemDiv.appendChild(itemPrice);
    inputDiv.appendChild(itemDecrement);
    inputDiv.appendChild(itemInput);
    inputDiv.appendChild(itemIncrement);
    itemImg.src = item.img;
    itemName.innerHTML = item.name;
    itemPrice.innerHTML = item.price + " gold";
    itemIncrement.appendChild(iconIncrement);
    itemDecrement.appendChild(iconDecrement);


    //Increase quantity on plus button
    itemIncrement.addEventListener("click", () => {
        let value = parseInt(itemInput.value, 10);
        value = isNaN(value) ? 0 : value;
        value++;
        item.quantity--;
        itemInput.value = value;
        //update total
        item.subtotal = itemInput.value * item.price;
        document.getElementById("total").innerHTML = data.map(item => item.subtotal).reduce((prev, next) => prev + next) + ' gold';

        let calculateMoney = totalMoney - data.map(item => item.subtotal).reduce((prev, next) => prev + next);
        document.getElementById("balance").innerHTML = calculateMoney;


        //notify user if item is out of stock & disable + button
        if (item.quantity < 1) {
            document.getElementById("stock_info").style.display = "block";
            document.getElementById("stock_info").innerHTML = item.name + ' is out of stock';
        }
    });

    //Decrease quantity on minus button if quantity > 0
    itemDecrement.addEventListener("click", () => {
        let value = parseInt(itemInput.value, 10);
        if (value > 0) {
            value = isNaN(value) ? 0 : value;
            value--;
            item.quantity++;
            itemInput.value = value;
            //update total
            item.subtotal = itemInput.value * item.price;
            document.getElementById("total").innerHTML = data.map(item => item.subtotal).reduce((prev, next) => prev + next) + ' gold';

        }

        let calculateMoney = totalMoney - data.map(item => item.subtotal).reduce((prev, next) => prev + next);
        document.getElementById("balance").innerHTML = calculateMoney;

        //remove notification if item is removed 
        if (item.quantity > 0) {
            document.getElementById("stock_info").style.display = "none";
        }


    })

    //Disable + buttons (all of them) if price is bigger than available gold
    document.addEventListener("click", () => {
        if (totalMoney - data.map(item => item.subtotal).reduce((prev, next) => prev + next) >= item.price && item.quantity > 0) {
            itemIncrement.disabled = false;
        } else {
            itemIncrement.disabled = true;
        }
    })
})

let totalPrice = 0;
document.getElementById("total").innerHTML = totalPrice + ' gold';
let totalMoney = 37;
document.getElementById("balance").innerHTML = totalMoney;

//open modal on Buy button
const openModal = document.getElementById("open_modal");
openModal.addEventListener("click", () => {
    document.getElementById("modal").style.display = "flex";
    openModal.style.display = "none";
    document.getElementById("wrapper").style.background = "grey";

})

//close modal on buy, cancel and x buttons
document.querySelectorAll(".close").forEach(elem => {
    elem.addEventListener("click", () => {
        document.getElementById("modal").style.display = "none";
        openModal.style.display = "inline";
        document.getElementById("wrapper").style.background = "transparent";
    })
});

//cancel refresh page
document.getElementById("cancel").addEventListener("click", () => {
    location.reload();
})
document.getElementById("cross").addEventListener("click", () => {
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
    const buyButton = document.getElementById('buy');
    const balanceError = document.getElementById('balance_info');


    itemInput.setAttribute("type", "number");
    itemInput.setAttribute("min", 0);
    // itemInput.setAttribute("readonly", true);
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
        if (calculateMoney < 0) {
            buyButton.disabled = true;
            buyButton.style.background = "#ccc7c7";
            balanceError.style.display = "block";
            balanceError.innerHTML = "You have exceeded your available balance. Current balance is: " + calculateMoney + " gold";
        } else {
            buyButton.disabled = false;
            buyButton.style.background = "#2a77b4";
            balanceError.style.display = "none";
        }

    })

    const referenceQuantity = item.quantity;
    //store value of input on typing
    itemInput.addEventListener('input', () => {
        if (itemInput.value < 0) {
            itemInput.value = 0;
        }
        if (Math.ceil(itemInput.value) >= referenceQuantity) {
            itemInput.value = referenceQuantity;
            document.getElementById("stock_info").style.display = "block";
            document.getElementById("stock_info").innerHTML = item.name + ' is out of stock';
        } else {
            document.getElementById("stock_info").style.display = "none";
        }
        itemInput.value = Math.ceil(itemInput.value);
        item.quantity = referenceQuantity - itemInput.value;

        //calculates the subtotal for each item and adds them to the total
        item.subtotal = itemInput.value * item.price;
        document.getElementById("total").innerHTML = data.map(item => item.subtotal).reduce((prev, next) => prev + next) + ' gold';

        //calculates the remaining money
        let calculateMoney = totalMoney - data.map(item => item.subtotal).reduce((prev, next) => prev + next);
        document.getElementById("balance").innerHTML = calculateMoney;

        //disable/enable increment button on input
        if (totalMoney - data.map(item => item.subtotal).reduce((prev, next) => prev + next) >= item.price && item.quantity > 0) {
            itemIncrement.disabled = false;
        } else {
            itemIncrement.disabled = true;
        }

        //disable buy button if user balance negative
        if (calculateMoney < 0) {
            buyButton.disabled = true;
            buyButton.style.background = "#ccc7c7";
            balanceError.style.display = "block";
            balanceError.innerHTML = "You have exceeded your available balance. Current balance is: " + calculateMoney + " gold";
        } else {
            buyButton.disabled = false;
            buyButton.style.background = "#2a77b4";
            balanceError.style.display = "none";
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

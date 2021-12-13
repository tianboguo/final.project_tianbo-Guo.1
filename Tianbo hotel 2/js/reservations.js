var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var checkInDate = document.getElementById("checkInDate");
var checkOutDate = document.getElementById("checkOutDate");
var numberPeople = document.getElementById("numberPeople");
var smoke = document.getElementById("smoke");
var bedType = document.getElementById("bedType");
var roomType = document.getElementById("roomType");
var city1 = document.getElementById("city1");
var state1 = document.getElementById("state1");
var zipCode1 = document.getElementById("zipCode1");
var city2 = document.getElementById("city2");
var state2 = document.getElementById("state2");
var zipCode2 = document.getElementById("zipCode2");
var cardNumber = document.getElementById("cardNumber");
var breakfast = document.getElementById("breakfast");
var reset = document.getElementById("reset");
var cardNumberReg = /^[a-zA-Z]{2}[0-9]{4}$/;
var obj = {};

reset.addEventListener("click", function () {
    firstName.reset();
    lastName.reset();
    checkInDate.reset();
    checkOutDate.reset();
    numberPeople.reset();
    smoke.reset();
    bedType.reset();
    roomType.reset();
    city1.reset();
    state1.reset();
    zip1.reset();
    city2.reset();
    state2.reset();
    zip2.reset();
    cardNumber.reset();
    breakfast.reset();
})

function validateForm() {
    if (firstName.value === "") {
        alert("firstName cannot be empty")
        return false;
    }
    if (lastName.value === "") {
        alert("lastName cannot be empty")
        return false;
    }
    if (checkInDate.value === "") {
        alert("check in date cannot be empty")
        return false;
    } else if (!regInDate(checkInDate.value)) {
        alert("The Check In dates must be after today.");
        return false;
    }
    if (checkOutDate.value === "") {
        alert("check out date cannot be empty")
        return false;
    } else if (!regOutDate(checkOutDate.value, checkInDate.value)) {
        alert("Check Out dates must be after today.");
        return false;
    }
    if (numberPeople.value === "") {
        alert("number people date cannot be empty")
        return false;
    }
    if (numberPeople.value) {
        if (numberPeople.value <= 2 && !(bedType.value === 'single king-sized bed' || bedType.value === 'double bed')) {
            alert("single king-sized bed and double bed fit 2 people");
            return false;
        }
        if (numberPeople.value > 2 && !(bedType.value === 'king bed' || bedType.value === 'queen bed')) {
            alert("king bed and queen bed fit 4 people");
            return false;
        }
    }
    if (bedType.value) {
        if (roomType.value === 'guestRoom' && !(bedType.value === 'single king-sized bed' || bedType.value === 'double bed')) {
            alert("guest room has single king-sized bed, double bed");
            return false;
        }
        if (roomType.value === 'suiteRoom' && !(bedType.value === 'king bed' || bedType.value === 'queen bed')) {
            alert("guest room has king bed, queen bed");
            return false;
        }
    }
    if (zipCode1.value === "") {
        alert("zip Code1 date cannot be empty")
        return false;
    } else if (zipCode1.value.length > 5) {
        alert("Zip Code1 must be 5 numeric characters")
        return false;
    }
    if (zipCode2 && zipCode1.value.length > 5) {
        alert("Zip Code2 must be 5 numeric characters")
        return false;
    }
    if (cardNumber.value && !cardNumberReg.test(cardNumber.value)) {
        alert("card must be two alpha characters followed by 4 numeric characters")
        return false;
    }
    var spend = 0;
    if (bedType.value === 'single king-sized bed' || bedType.value === 'double bed') {
        spend = 250;
    } else if (bedType.value === 'king bed' || bedType.value === 'queen bed') {
        spend = 500;
    }
    if (!cardNumber.value && breakfast.value === 'true') {
        spend += parseInt(numberPeople.value) * 20;
    }
    obj = {
        firstName: firstName.value,
        lastName: lastName.value,
        checkInDate: checkInDate.value,
        checkOutDate: checkOutDate.value,
        numberPeople: numberPeople.value,
        smoke: smoke.value,
        bedType: bedType.value,
        roomType: roomType.value,
        city1: city1.value,
        state1: state1.value,
        zipCode1: zipCode1.value,
        city2: city2.value,
        state2: state2.value,
        zipCode2: zipCode2.value,
        cardNumber: cardNumber.value,
        breakfast: breakfast.value,
        spend: "$" + spend + " " +"per day"
    }
    window.location = "confirmation.html?obj=" + JSON.stringify(obj);
}

function regInDate(str) {
    var todaysDate = new Date();
    return Date.parse(str) > Date.parse(todaysDate);
}
function regOutDate(str, inStr) {
    var todaysDate = new Date();
    return Date.parse(str) > Date.parse(todaysDate) && Date.parse(str) > Date.parse(inStr);
}
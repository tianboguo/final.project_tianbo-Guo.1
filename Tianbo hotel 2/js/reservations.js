window.onload = function () {
    roomTypeQuery();
}
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let smoke = document.getElementById("smoke");
let numberPeople = document.getElementById("numberPeople");
let checkInDate = document.getElementById("checkInDate");
let checkOutDate = document.getElementById("checkOutDate");
let roomType = document.getElementById("roomType");
let city = document.getElementById("city");
let state = document.getElementById("state");
let zipCode = document.getElementById("zipCode");
let cardNumber = document.getElementById("cardNumber");
let breakfast = document.getElementById("breakfast");
let reset = document.getElementById("reset");
let cardNumberReg = /^[a-zA-Z]{2}[0-9]{4}$/;
let obj = {};

reset.addEventListener("click", function () {
    firstName.reset();
    lastName.reset();
    smoke.reset();
    numberPeople.reset();
    checkInDate.reset();
    checkOutDate.reset();
    roomType.reset();
    city.reset();
    state.reset();
    zip.reset();
    cardNumber.reset();
    breakfast.reset();
})

function roomTypeQuery() {
    if (ROOM_RESERVATIONS.length > 0) {
        for (let i = 0; i < ROOM_RESERVATIONS.length; i++) {
            let options = document.createElement("option");
            options.setAttribute("value", ROOM_RESERVATIONS[i]["reservationId"]);
            options.innerHTML = ROOM_RESERVATIONS[i]["room"];
            roomType.appendChild(options);
        }
    }
}

function validateForm() {
    let dataFilter = ROOM_RESERVATIONS.filter(v => v.reservationId == roomType.value),
        spend = 0;
    if (dataFilter.length > 0) {
        console.log(smoke.value, dataFilter[0].smoke.toString())
        if (smoke.value != dataFilter[0].smoke.toString()) {
            alert("Guests may smoke in all of the top floor rooms but none of the others.")
            return false;
        }
        if (numberPeople.value == "") {
            alert("umber people date cannot be empty")
            return false;
        }
        if (numberPeople.value > dataFilter[0].accommodate) {
            alert("There is a maximum of 2 people in the King and Double rooms and a maximum of 4 people in a suite.")
            return false;
        }
        if (checkInDate.value == "") {
            alert("check in date cannot be empty")
            return false;
        }
        // else if (!regInDate(checkInDate.value)) {
        //     alert("The Check In dates must be after today.");
        //     return false;
        // }
        if (checkOutDate.value == "") {
            alert("check out date cannot be empty")
            return false;
        }
        // else if (!regOutDate(checkOutDate.value, checkInDate.value)) {
        //     alert("Check Out dates must be after today.");
        //     return false;
        // }
        let bol = isDuringDate(checkInDate.value, checkOutDate.value, dataFilter[0].checkIn, dataFilter[0].checkOut)
        if (!bol) {
            alert("Check In dates " + dataFilter[0].checkIn + " Check Out " + dataFilter[0].checkOut + " between");
            return false;
        }
        spend = dataFilter[0].price;
    }
    if (!cardNumber.value && breakfast.value == 'true') {
        spend += parseInt(numberPeople.value) * 20;
    }
    obj = {
        firstName: firstName.value,
        lastName: lastName.value,
        smoke: smoke.value,
        numberPeople: numberPeople.value,
        roomType: dataFilter[0].room,
        checkInDate: checkInDate.value,
        checkOutDate: checkOutDate.value,
        city: city.value,
        state: state.value,
        zipCode: zipCode.value,
        cardNumber: cardNumber.value,
        breakfast: breakfast.value,
        spend: spend + " per day"
    }
    window.location = "confirmation.html?obj=" + JSON.stringify(obj);
}

// function regInDate(str) {
//     var todaysDate = new Date();
//     if (Date.parse(str) > Date.parse(todaysDate)) {
//         return true;
//     } else {
//         return false;
//     }
// }
// function regOutDate(str, inStr) {
//     var todaysDate = new Date();
//     if (Date.parse(str) > Date.parse(todaysDate) && Date.parse(str) > Date.parse(inStr)) {
//         return true;
//     } else {
//         return false;
//     }
// }

function isDuringDate(beginDateStr, endDateStr, isBeginDate, isEndDate) {
    let beginDate = new Date(beginDateStr),
        endDate = new Date(endDateStr),
        isBeginDateStr = new Date(isBeginDate),
        isEndDateStr = new Date(isEndDate);
    if (beginDate >= isBeginDateStr && endDate <= isEndDateStr) return true;
    return false;
}
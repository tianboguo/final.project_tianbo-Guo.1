window.onload = function () {
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let smoke = document.getElementById("smoke");
    let numberPeople = document.getElementById("numberPeople");
    let checkInDate = document.getElementById("checkInDate");
    let checkOutDate = document.getElementById("checkOutDate");
    let roomType = document.getElementById("roomType");
    let address = document.getElementById("address");
    let zipCode = document.getElementById("zipCode");
    let cardNumber = document.getElementById("cardNumber");
    let breakfast = document.getElementById("breakfast");
    let spend = document.getElementById("spend");
    let getUrlParam = getRequest();
    let data;
    if (JSON.stringify(getUrlParam) != '{}') {
        data = JSON.parse(getUrlParam.obj);
    }
    if (data) {
        firstName.innerHTML = data.firstName;
        lastName.innerHTML = data.lastName;
        smoke.innerHTML = data.smoke;
        numberPeople.innerHTML = data.numberPeople;
        checkInDate.innerHTML = data.checkInDate;
        checkOutDate.innerHTML = data.checkOutDate;
        roomType.innerHTML = data.roomType;
        address.innerHTML = data.city + "-" + data.state;
        zipCode.innerHTML = data.zipCode;
        cardNumber.innerHTML = data.cardNumber;
        breakfast.innerHTML = data.breakfast;
        spend.innerHTML = data.spend;
    }
}

function getRequest() {
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1])
        }
    }
    return theRequest;
}
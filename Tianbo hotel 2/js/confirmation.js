window.onload = function () {
    var firstName = document.getElementById("firstName");
    var lastName = document.getElementById("lastName");
    var checkInDate = document.getElementById("checkInDate");
    var checkOutDate = document.getElementById("checkOutDate");
    var numberPeople = document.getElementById("numberPeople");
    var smoke = document.getElementById("smoke");
    var bedType = document.getElementById("bedType");
    var roomType = document.getElementById("roomType");
    var address1 = document.getElementById("address1");
    var zipCode1 = document.getElementById("zipCode1");
    var address2 = document.getElementById("address2");
    var zipCode2 = document.getElementById("zipCode2");
    var cardNumber = document.getElementById("cardNumber");
    var breakfast = document.getElementById("breakfast");
    var spend = document.getElementById("spend");
    var getUrlParam = getRequest();
    var data;
    if (JSON.stringify(getUrlParam) !== '{}') {
        data = JSON.parse(getUrlParam.obj);
    }
    if (data) {
        firstName.innerHTML = data.firstName;
        lastName.innerHTML = data.lastName;
        checkInDate.innerHTML = data.checkInDate;
        checkOutDate.innerHTML = data.checkOutDate;
        numberPeople.innerHTML = data.numberPeople;
        smoke.innerHTML = data.smoke;
        bedType.innerHTML = data.bedType;
        roomType.innerHTML = data.roomType;
        address1.innerHTML = data.city1 + "-" + data.state1;
        zipCode1.innerHTML = data.zipCode1;
        address2.innerHTML = data.city2 + "-" + data.state2;
        zipCode2.innerHTML = data.zipCode2;
        cardNumber.innerHTML = data.cardNumber;
        breakfast.innerHTML = data.breakfast;
        spend.innerHTML = data.spend;
    }
}

function getRequest() {
    var url = location.search;
    var theRequest = {};
    if (url.indexOf("?") !== -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1])
        }
    }
    return theRequest;
}
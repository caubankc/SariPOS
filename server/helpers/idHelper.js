const generateCustomerId = (customerName) => {
    const nameArray = customerName.split(" ");

    if (nameArray.length === 0) {
        return "CA0000000000";
    }

    let firstName = nameArray.shift().substring(0, 5);
    let i = 0, lenFN = firstName.length;
    while (i < (5 - lenFN)) {
        firstName = "0" + firstName;
    }

    let lastName = "";
    if (nameArray.length > 0) {
        lastName = nameArray.pop();
    }

    lastName = lastName.substring(0, 3);
    let j = 0, lenLN = lastName.length;
    while (j < (3 - lenLN)) {
        lastName = "0" + lastName;
    }

    let secondName = "0";
    if (nameArray.length > 0) {
        secondName = nameArray.shift().charAt(0);
    }

    let thirdName = "0";
    thirdName = thirdName.substring(0, 1);
    if (nameArray.length > 0) {
        thirdName = nameArray.shift().charAt(0);
    }


    return "CN" + firstName + secondName + thirdName + lastName;
    // CNCHRISN0ALD
    // CN00JOY00CRU
    // CN00JOYDLCRU
}

module.exports = {
    generateCustomerId
}
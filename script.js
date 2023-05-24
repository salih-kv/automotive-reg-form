// 1. === Form Validation ===

let vehicleRegNo = document.getElementById('vehicleRegNo');
const message = document.getElementById('message');

function handleSubmit() {

    validateVehicleRegNo();

    displayCoupons();
    regionBasedOff();
    offOnOldVehicles();

    finalAmount();


    function validateVehicleRegNo() {

        let vehRegNo = vehicleRegNo.value;
        const regExp = /^[A-Z]{2} \d{2} [A-Z]{1,3} \d{4}$/

        message.style.display = "none";
        vehRegNo = vehRegNo.toUpperCase();

        if (vehRegNo.length == 0) {
            message.innerText = "vehicle registration number cannot be blank";
            message.style.display = "block";
            return false;
        }

        else if (regExp.test(vehRegNo) == false) {
            message.innerText = "enter valid format, eg:- KL 01 M 5678";
            message.style.display = "block";

            return false;
        }

    }

    // 2. === Display Coupons ===

    function displayCoupons() {

        let offerSelection = document.getElementById('offer-selection');
        offerSelection.style.display = "block";

        const vehicleType = document.getElementById('vehicleType').value;
        const vehicleTypeIs = document.getElementById('vehicleTypeIs').innerText = vehicleType;

        if (vehicleType == 'two-wheeler') {
            let standardPriceIs = document.getElementById('standardPriceIs').innerText = 500;
        }
        else {
            let standardPriceIs = document.getElementById('standardPriceIs').innerText = 1500;
        }

        return { vehicleTypeIs, standardPriceIs }
    }


    function regionBasedOff() {

        let regNo = vehicleRegNo.value;
        let tenDiscount = document.getElementById('tenDiscount');

        const eligibleDistricts = ['KL 01', 'KL 15', 'KL 22', 'KL 07', 'KL 79', 'KL 39', 'KL 43', 'KL 11', 'KL 81', 'KL 57'];
        const districtCode = regNo.substr(0, 5);

        if (eligibleDistricts.includes(districtCode)) {
            tenDiscount.style.display = 'block';
        } else {
            tenDiscount.style.display = 'none';
        }

        return false;
    }


    function offOnOldVehicles() {
        let yearOfManufacturing = document.getElementById('yearOfManufacturing').value;
        let twentyDiscount = document.getElementById('twentyDiscount');

        let currentYear = new Date().getFullYear();

        let vehicleTypeIs = displayCoupons().vehicleTypeIs;

        if (yearOfManufacturing < currentYear - 10 && vehicleTypeIs === 'two-wheeler') {
            twentyDiscount.style.display = 'block';
        }
        else if (yearOfManufacturing < currentYear - 15 && vehicleTypeIs === 'four-wheeler') {
            twentyDiscount.style.display = 'block';
        }
        else {
            twentyDiscount.style.display = 'none';
        }

        return false;
    }

    // 3. === Choose Maximum 2 coupons ===

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let checkedCount = 0;

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', () => {
            checkedCount = document.querySelectorAll('input[type="checkbox"]:checked').length;
            if (checkedCount > 2) {
                checkbox.checked = false;
            }
        });
    });

    // 4. === Calculate Total Amount ===

    function finalAmount() {

        let finalAmountBtn = document.getElementById('finalAmountBtn');
        finalAmountBtn.addEventListener('click', () => {

            let finalAmountCont = document.getElementById('finalAmountCont');
            finalAmountCont.style.display = "block";

            let totalDiscount = 0;

            let rtoDiscount = document.getElementById('rtoDiscount');
            let vehicleAgeDiscount = document.getElementById('vehicleAgeDiscount');
            let festiveDiscount = document.getElementById('festiveDiscount');

            if (rtoDiscount.checked) {
                totalDiscount += 10;
            }
            if (vehicleAgeDiscount.checked) {
                totalDiscount += 20;
            }
            if (festiveDiscount.checked) {
                totalDiscount += 5;
            }


            let standardPrice = displayCoupons().standardPriceIs.innerText;
            discountPrice = standardPrice - (standardPrice * (totalDiscount / 100));

            let finalAmount = document.getElementById('finalAmount');
            finalAmount.innerText = discountPrice;


            return false;
        })

        return false;
    }


    return false;
}
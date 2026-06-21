var phoneInput;
function getIPData() {
    var countryCodeSmall;
    var code = $('.ys-form-phone').attr('data-init');
    if (code) {
        countryCodeSmall = code.toLowerCase();
        var phoneInputFieldArry = document.querySelectorAll(".ys-form-phone input");
        phoneInputFieldArry.forEach(function (item, index) {
            var phoneInputField = item;
            phoneInput = window.intlTelInput(phoneInputField, {
                initialCountry: "auto",
                nationalMode: true,
                geoIpLookup: getCountryCode,
                countrySearch: true,
            });
            function getCountryCode(callback) {
                callback(countryCodeSmall);
            };
            setTimeout(function () {
                var cuntrydialCode = phoneInput.selectedCountryData.dialCode;
                phoneInputField.value = "+" + cuntrydialCode + " ";
                ys.mCustomScrollbarInit('.iti__country-list', 'inside', 'y');
            }, 1000);
        });
    } else {
        const apis = [
            'https://api.ip.sb/geoip/',
            'https://ipapi.co/json/',
            'https://api.country.is/'
        ];
        let index = 0;
        function tryNext() {
            if (index >= apis.length) {
                console.error("所有 IP 接口都失败了");
                return;
            }
            $.ajax({
                type: 'GET',
                url: apis[index++],
                // dataType: 'jsonp',
                success: function (response) {
                    // console.error(index);
                    var IPData = response;
                    var countryCode = (IPData.country_code || IPData.country || res.countryCode || '').toLowerCase();
                    countryCodeSmall = countryCode;
                    var phoneInputFieldArry = document.querySelectorAll(".ys-form-phone input");
                    phoneInputFieldArry.forEach(function (item, index) {
                        var phoneInputField = item;
                        phoneInput = window.intlTelInput(phoneInputField, {
                            initialCountry: "auto",
                            nationalMode: true,
                            geoIpLookup: getCountryCode,
                            countrySearch: true,
                        });
                        function getCountryCode(callback) {
                            callback(countryCodeSmall);
                        };
                        setTimeout(function () {
                            var cuntrydialCode = phoneInput.selectedCountryData.dialCode;
                            phoneInputField.value = "+" + cuntrydialCode + " ";
                            ys.mCustomScrollbarInit('.iti__country-list', 'inside', 'y');
                        }, 1000);
                    });
                },
                error: tryNext
            });
        }
        tryNext();
    }
};
window.onload = setTimeout(function () {
    getIPData();
    $('.ys-form-phone').on('click', '.iti__country', function () {
        var num = $(this).attr('data-dial-code');
        console.log(num);
        $(this).parents('.ys-form-phone').find('input').get(1).value = "+" + num + " ";
        var code = $(this).attr('data-country-code');
        var namex = $('.ys-select-li[data-code=' + code + ']').attr('data-value');
        if (namex && $('.ys-form-inof-country').length > 0) {
            $('.ys-form-inof-country').find('.ys-select-show').val(namex);
        }
    });
    $('.ys-form-phone').on('click', '.iti__selected-flag', function () {
        // $('.iti__country-list').mCustomScrollbar("scrollTo",".iti__active",'top');  
    });
}, 1000);
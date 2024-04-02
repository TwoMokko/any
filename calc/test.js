window.addEventListener("DOMContentLoaded", function() {

    let environment = document.querySelector('.power_calculator .power_calculator_head select'),
        conductivity = document.querySelector('.power_calculator .power_calculator_head input'),
        calcBtn = document.querySelector('.power_calculator .power_calculator_btn'),
        temperatureChange = document.querySelector('.power_calculator .change_temperature'),
        result = document.querySelector('.power_calculator .power_calculator_bottom .result'),
        temp1 = document.querySelector('.power_calculator .initial_temperature'),
        temp2 = document.querySelector('.power_calculator .final_temperature');


    environment.addEventListener('change', function() {

        conductivity.value = environment.value;

    });

    function changeTemperature() {

        if (temp1.value && temp2.value) {
            temperatureChange.value = temp2.value - temp1.value;
        }

    }

    temp1.addEventListener('input', function() {
        changeTemperature();
    });

    temp2.addEventListener('input', function() {
        changeTemperature();
    });

    function calc () {

        let c = conductivity.value,
            t1 = document.querySelector('.power_calculator .initial_temperature').value,
            t2 = document.querySelector('.power_calculator .final_temperature').value,
            m = document.querySelector('.power_calculator .expenditure').value,
            q = 0,
            T = 0;


        if (temperatureChange.value) {
            T = temperatureChange.value;
        } else {
            T = t2 - t1;
        }

        q = (c * m * T) / 3600;
        q = (Math.round( q * 100 )) / 100;

        temperatureChange.value = T;

        result.textContent = q;

    }

    calcBtn.addEventListener('click', function() {
        calc();
    });



    //SECOND CALCULATOR

    let environmentSec = document.querySelector('.power_calculator_second .power_calculator_head select'),
        conductivitySec = document.querySelector('.power_calculator_second .power_calculator_head input'),
        calcBtnSec = document.querySelector('.power_calculator_second .power_calculator_btn'),
        temperatureChangeSec = document.querySelector('.power_calculator_second .change_temperature'),
        resultSec = document.querySelector('.power_calculator_second .power_calculator_bottom .result'),
        temp1Sec = document.querySelector('.power_calculator_second .initial_temperature'),
        temp2Sec = document.querySelector('.power_calculator_second .final_temperature');

    environmentSec.addEventListener('change', function() {

        conductivitySec.value = environmentSec.value;

    });

    function changeTemperatureSec() {

        if (temp1Sec.value && temp2Sec.value) {
            temperatureChangeSec.value = temp2Sec.value - temp1Sec.value;
        }

    }

    temp1Sec.addEventListener('input', function() {
        changeTemperatureSec();
    });

    temp2Sec.addEventListener('input', function() {
        changeTemperatureSec();
    });

    function calcSec () {

        let c = conductivitySec.value,
            t1 = document.querySelector('.power_calculator_second .initial_temperature').value,
            t2 = document.querySelector('.power_calculator_second .final_temperature').value,
            v = document.querySelector('.power_calculator_second .volume').value,
            r = document.querySelector('.power_calculator_second .density').value,
            time = document.querySelector('.power_calculator_second .heating_time').value,
            q = 0,
            T = 0,
            M = 0;

        if (temperatureChangeSec.value) {
            T = temperatureChangeSec.value;
        } else {
            T = t2 - t1;
        }

        M = r * v;


        q = (c * M * T) / (3600 * time);
        q = (Math.round( q * 100 )) / 100;

        temperatureChangeSec.value = T;

        resultSec.textContent = q;

    }

    calcBtnSec.addEventListener('click', function() {
        calcSec();
    });


});
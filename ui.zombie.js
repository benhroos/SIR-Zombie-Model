$(document).ready(function () {

    $('#simulate').button({
        icons: {
            primary: 'ui-icon-refresh'
        }
    });

    $('#simulate').click(
    
    function () {
        simulate();
    });

    $('#popSlider').slider({
        value: 1000,
        min: 0,
        max: 1000,
        step: 5,
        slide: function (e, ui) {
            $('.initPop').val(ui.value);
        }
    });
    $('.initPop').change(function () {
        var value = this.value.substring(0);
        $('#popSlider').slider("value", parseInt(value));
    });
    $('#infSlider').slider({
        value: 10,
        min: 0,
        max: 1000,
        step: 5,
        slide: function (e, ui) {
            $('.initInf').val(ui.value);
        }
    });
    $('.initInf').change(function () {
        var value = this.value.substring(0);
        $('#infSlider').slider("value", parseInt(value));
    });
    $('#BSlider').slider({
        value: .0005,
        min: 0,
        max: 1,
        step: .00001,
        slide: function (e, ui) {
            $('.B').val(ui.value);
        }
    });
    $('.B').change(function () {
        var value = this.value.substring(0);
        $('#BSlider').slider("value", parseFloat(value));
    });
    $('#kSlider').slider({
        value: .01,
        min: 0,
        max: 1,
        step: .00001,
        slide: function (e, ui) {
            $('.k').val(ui.value);
        }
    });
    $('.k').change(function () {
        var value = this.value.substring(0);
        $('#kSlider').slider("value", parseFloat(value));
    });
    $('#timeStepSlider').slider({
        value: 1,
        min: 0,
        max: 10,
        step: .1,
        slide: function (e, ui) {
            $('.timeStep').val(ui.value);
        }
    });
    $('.timeStep').change(function () {
        var value = this.value.substring(0);
        $('#timeStepSlider').slider("value", parseFloat(value));
    });
    $('#timeSlider').slider({
        value: 100,
        min: 0,
        max: 1000,
        step: 10,
        slide: function (e, ui) {
            $('.time').val(ui.value);
        }
    });
    $('.time').change(function () {
        var value = this.value.substring(0);
        $('#timeSlider').slider("value", parseInt(value));
    });

    var B, k, initInf, initPop, ds, dr, di, sus, inf, rec, timeStep, time;

    initPop = $('#initPop').val('1000');
    initInf = $('#initInf').val('10');
    B = $('#B').val('.0005');
    k = $('#k').val('.01');
    timeStep = $('#timeStep').val('1');
    time = $('#time').val('100');
    
    var s = [],
        i = [],
        r = [];
            
    $.plot(
    $("#placeholder"), [{
        label: 'Susceptible',
        data: s,
        lines: {
            show: true
        }
    }, {
        label: 'Infected',
        data: i,
        lines: {
            show: true
        }
    }, {
        label: 'Recovered',
        data: r,
        lines: {
            show: true
        } 
    }],
        {
            xaxis: {
                min: 0,
                max: 100,
                tickSize: 10
            },
            yaxis: {
                min: 0,
                max: 1200,
                tickSize: 200
            }
        }
    );    
});

function simulate() {

    initPop = parseInt($('#initPop').val());
    initInf = parseInt($('#initInf').val());
    B = parseFloat($('#B').val());
    k = parseFloat($('#k').val());
    timeStep = parseFloat($('#timeStep').val());
    time = parseFloat($('#time').val());

    sus = initPop - initInf;
    inf = initInf;
    rec = 0;

    var s = [],
        i = [],
        r = [];

    document.body.scrollTop = document.documentElement.scrollTop = 0;
        
    if (initPop < initInf) {
		var error = document.getElementById("initPopSize");
        error.scrollIntoView(true);
        error.style.background="#FFB6C1";
        document.getElementById("initInfSize").style.background="#FFB6C1";
        alert("Initial population should be larger than initially infected population!");
        return;
    }

    else {
        document.getElementById("initPopSize").style.background=null;
        document.getElementById("initInfSize").style.background=null;
    }

    if (time == 0) {
        var error = document.getElementById("totTime");
        error.scrollIntoView(true);
        error.style.background="#FFB6C1";
        alert("The total time should be greater than 0!");
        return;
    }

    else {
        document.getElementById("totTime").style.background=null;
    }
    
    for (var t = 0; t <= time; t += timeStep) {

        ds = -B * sus * inf * timeStep;
        di = (B * sus * inf - k * inf) * timeStep;
        dr = k * inf * timeStep;

        s.push([t, sus + ds]);
        i.push([t, inf + di]);
        r.push([t, rec + dr]);

        sus += ds;
        inf += di;
        rec += dr;
    }

    $.plot(
    $("#placeholder"), [{
        label: 'Susceptible',
        data: s,
        lines: {
            show: true
        }
    }, {
        label: 'Infected',
        data: i,
        lines: {
            show: true
        }
    }, {
        label: 'Recovered',
        data: r,
        lines: {
            show: true
        }
    }]);
}
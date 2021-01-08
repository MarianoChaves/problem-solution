let ra1 = [1,2,3,4,5,6];
let ra2 = [1,2,3,4,5,6];
let ra3 = [1,2,3,4,5,6];
let B0 = 1;
let h = 1;
let b = 1;
let v = 1;
let t = 1;
let data = [];
const euler = 2.71828;
const B0_p = document.getElementById("B0")
const h_p = document.getElementById("h")
const b_p = document.getElementById("b")
const v_p = document.getElementById("v")
const t_p = document.getElementById("tau")
const ra1_input = document.getElementById("ra_1")
const ra2_input = document.getElementById("ra_2")
const ra3_input = document.getElementById("ra_3")
const calculate_div = document.getElementById("action");

// Physical Variables
function compute_B0(n1,n2,n3){
    B0 = 200
    B0_p.innerHTML = "B₀ = "+ B0 + " T";
    return B0
}

function compute_v(n1,n2,n3){
    v = 1/(1+n1[4]+n2[4]+n3[4])
    console.log("v = "+v)
    v_p.innerHTML = "v = "+ v +" m/s";
    return v
}

function compute_t(n1,n2,n3){
    t = (n1[5]*n1[5]+n2[5]*n2[5]+n3[5]*n3[5]+1)
    t_p.innerHTML = "𝜏 = "+t+" s"
    console.log("𝜏 = "+t)
    return t
}

function compute_h(n1,n2,n3){
    h = 0.05
    h_p.innerHTML = "h = "+ h + " m";
    return h
}

function compute_b(n1,n2,n3){
    b = 0.01
    b_p.innerHTML = "b = "+ b + " m";
    return b
}

function calculate_values(n1,n2,n3){
    compute_B0(n1,n2,n3);
    compute_h(n1,n2,n3);
    compute_b(n1,n2,n3);
    compute_v(n1,n2,n3);
    compute_t(n1,n2,n3);
}


function setRAs(){
    var aux1 = ra1_input.value
    for (var i = 0, len = aux1.length; i < len; i += 1) {
        ra1[i]=(+aux1.charAt(i));
    }
    var aux2 = ra2_input.value
    for (var i = 0, len = aux2.length; i < len; i += 1) {
        ra2[i]=(+aux2.charAt(i));
    }
    var aux3 = ra3_input.value
    for (var i = 0, len = aux2.length; i < len; i += 1) {
        ra3[i]=(+aux2.charAt(i));
    }
}

function exp(x){
    return euler**x;
}

function fem_calc(x){
    if(x<h/v){
        //return -(x**2-2*x)*exp(-x)
        return -B0*b*v**2/(2*h*t)*(x**2-2*t*x)*exp(-x/t)
    }
    else{
        //return exp(-x)
        return B0*b*h/(2*t)*exp(-x/t)
    }
}


function plot_graph(){
    var t_init = 0;
    var t_fin = 2*t;
    if(t>v/h){t_fin = 2*h/v}
    var N_t = 200;
    var dt = (t_fin-t_init)/N_t;
    console.log("h/v = "+h/v);

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data_aux = google.visualization.arrayToDataTable([["time (s)","ε"],[0,0]]);

        for (var i = 0; i<N_t; i+= 1){
            t = t_init + dt*i;
            fem = fem_calc(t) ;
            data_aux.addRow([t,fem]);
        }
        
        var options = {
          title: 'fem induzida em função do tempo',
          curveType: 'function',
          legend: { position: 'right' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data_aux, options);
      }
}

function main(){
 calculate_div.addEventListener('click', function() {
     setRAs();
     calculate_values(ra1,ra2,ra3);
     plot_graph();
     data = [];
 })
}

main();
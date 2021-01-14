let ra1 = [1,2,3,4,5,6];
let ra2 = [1,2,3,4,5,6];
let ra3 = [1,2,3,4,5,6];
let B0 = 1;
let h = 1;
let b = 1;
let v = 1;
let t = 1;
let hv = 1;
let afem = 1;
let bfem = 1;
let data = [];
const euler = 2.71828;
const B0_p = document.getElementById("B0")
const h_p = document.getElementById("h")
const b_p = document.getElementById("b")
const v_p = document.getElementById("v")
const t_p = document.getElementById("tau")
const hv_p = document.getElementById("h/v")
const afem_p = document.getElementById("fem_a")
const bfem_p = document.getElementById("fem_b")
const ra1_input = document.getElementById("ra_1")
const ra2_input = document.getElementById("ra_2")
const ra3_input = document.getElementById("ra_3")
const calculate_div = document.getElementById("action");

// Physical Variables
function compute_B0(n1,n2,n3){
    B0 = 200
    B0_p.innerHTML = "B₀ = "+ B0.toExponential(2) + " T";
    return B0
}

function compute_v(n1,n2,n3){
    v = 1+1/(1+n1[4]+n2[4]+n3[4])
    console.log("v = "+v)
    v_p.innerHTML = "v = "+ v.toExponential(2) +" m/s";
    return v
}

function compute_t(n1,n2,n3){
    t = (n1[5]+n2[5]+n3[5]+1)
    t_p.innerHTML = "𝜏 = "+t.toExponential(2)+" s"
    console.log("𝜏 = "+t)
    return t
}

function compute_h(n1,n2,n3){
    h = 5.0
    h_p.innerHTML = "h = "+ h.toExponential(2) + " m";
    return h
}

function compute_b(n1,n2,n3){
    b = 1.0
    b_p.innerHTML = "b = "+ b.toExponential(2) + " m";
    return b
}

function compute_hv(n1,n2,n3){
    hv = h/v
    hv_p.innerHTML = "h/v = "+ hv.toExponential(2) + " s";
    return hv
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
    for (var i = 0, len = aux3.length; i < len; i += 1) {
        ra3[i]=(+aux3.charAt(i));
    }
}

function exp(x){
    return euler**x;
}

function afem_calc(x){
    return -B0*b*v**2/(2*h*t)*(x**2-2*t*x)*exp(-x/t)
}
function bfem_calc(x){
    return B0*b*h/(2*t)*exp(-x/t)
}

function fem_calc(x){
    if(x<=hv){
        return afem_calc(x)
    }
    else{
        return bfem_calc(x)
    }
}



function compute_afem(){
    afem = afem_calc(hv/2)
    afem_p.innerHTML = "(a) ε(h/2v) = "+ afem.toExponential(2) + " V";
    return afem
}

function compute_bfem(){
    bfem = bfem_calc(2*hv)
    bfem_p.innerHTML = "(b) ε(2h/v) = "+ bfem.toExponential(2) + " V";
    return bfem
}

function calculate_values(n1,n2,n3){
    compute_B0(n1,n2,n3);
    compute_h(n1,n2,n3);
    compute_b(n1,n2,n3);
    compute_v(n1,n2,n3);
    compute_t(n1,n2,n3);
    compute_hv(n1,n2,n3);
    compute_afem();
    compute_bfem();
}

function plot_graph(){
    var t_init = 0;
    var t_fin = 2*t;
    if(t>h/v){t_fin = 2*h/v}
    var N_t = 200;
    var dt = (t_fin-t_init)/N_t;

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data_aux = google.visualization.arrayToDataTable([["tempo (s)","ε"],[0,0]]);

        for (var i = 0; i<N_t; i+= 1){
            var t_run = t_init + dt*i;
            fem = fem_calc(t_run);
            data_aux.addRow([t_run,fem]);
        }
        
        var options = {
          title: 'fem (V) induzida em função do tempo (s)',
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

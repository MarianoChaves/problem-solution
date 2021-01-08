let ra1 = [1,2,3,4,5,6];
let ra2 = [1,2,3,4,5,6];
let ra3 = [1,2,3,4,5,6];
let B0 = 1;
let h = 1;
let b = 1;
let v = 1;
let t = 1;
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
    B0 = (n1[0]*n1[0]+n2[0]*n2[0]+n3[0]*n3[0])
    B0_p.innerHTML = "B₀ = "+ B0 + " T";
    return B0
}

function compute_v(n1,n2,n3){
    v = (n1[1]*n1[1]+n2[1]*n2[1]+n3[1]*n3[1])
    v_p.innerHTML = "v = "+ v +" m/s";
    return v
}

function compute_t(n1,n2,n3){
    t = (n1[2]*n1[2]+n2[2]*n2[2]+n3[2]*n3[2])
    t_p.innerHTML = "𝜏 = "+t+" s"
    return t
}

function compute_h(n1,n2,n3){
    h = (n1[3]*n1[3]+n2[3]*n2[3]+n3[3]*n3[3])
    h_p.innerHTML = "h = "+ h + " m";
    return h
}

function compute_b(n1,n2,n3){
    b = (n1[4]*n1[4]+n2[4]*n2[4]+n3[4]*n3[4])
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

function plot_graph(){

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


function main(){
 calculate_div.addEventListener('click', function() {
     setRAs();
     calculate_values(ra1,ra2,ra3);
     plot_graph();
 })
}

main();
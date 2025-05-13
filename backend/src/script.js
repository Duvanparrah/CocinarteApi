import KEYS from "./keys";
const $d = document;
const $plan = $d.getElementById("plan-gratuito");
const $plan2 =$d.getElementById("plan-pro");
const $fragment = $d.createDocumentFragment();
const $options = { headers: {Authorization: `Bearer ${KEYS.secret}`}}


let products, prices;

Promise.all([
    fetch("https://api.stripe.com/v1/products" , $options),
    fetch("https://api.stripe.com/v1/prices",$options)


])
.then(res => console.log(res))
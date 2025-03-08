import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form"); 
const delayInput = document.querySelector("input[name='delay']"); 

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const delay = Number(delayInput.value); 
    const selectedState = document.querySelector("input[name='state']:checked")?.value;

    if (!delay) {
        iziToast.warning({
            title: "Caution",
            message: "You forgot important data",
            position: "topRight",
            timeout: 5000,
        });
        return; 
    }
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (selectedState === "fulfilled") {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay);
    });
    promise
        .then(value => iziToast.success({
            title: "OK",
            message: value,
            position: "topRight",
            timeout: 5000,
        }))
        .catch(error => iziToast.error({
            title: "Error",
            message: error,
            position: "topRight",
            timeout: 5000,
        }));
});
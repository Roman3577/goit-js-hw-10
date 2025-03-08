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

    createPromise(delay, selectedState)
        .then(delay => {
            iziToast.success({
                title: "OK",
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: "topRight",
                timeout: 5000,
            });
        })
        .catch(delay => {
            iziToast.error({
                title: "Error",
                message: `❌ Rejected promise in ${delay}ms`,
                position: "topRight",
                timeout: 5000,
            });
        });
});

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
}

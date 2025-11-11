window.addEventListener("DOMContentLoaded", () =>{
    // Carga de elementos del DOM

    const inputSearch = document.querySelector(".workouts__input-serch")

    const checks = document.querySelectorAll('input[type="checkbox"]');

    checks.forEach((check) =>{
        check.addEventListener("change", () =>{
        console.log("Se hizo click en un check" + check.value)
        console.log(`estado ${check.checked}`)
    })    
    })
    
    console.log(checks);
    
})
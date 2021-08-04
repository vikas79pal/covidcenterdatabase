const logout=document.getElementById('logout')
logout.addEventListener("click",()=>{
    console.log("clicked")
    window.location.href="login.ejs"
})

const home=document.getElementById('home')
home.addEventListener("click",()=>{
    console.log("clicked")
    window.location.href="/"
})

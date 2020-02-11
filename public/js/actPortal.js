var submit = document.getElementById("request").addEventListener("submit", function redirect(event){
    event.preventDefault();
    console.log("submitted");
    window.location.href = window.location.href + "actPortal";
    alert("Submitted");
    return false;
});

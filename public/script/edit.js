var arr=document.querySelectorAll(".edi");
for(var i=0;i<arr.length;i++){
    arr[i].addEventListener("click",(event)=>{
        const title = event.target.dataset.title;
        const subtitle = event.target.dataset.subtitle;
        const body = event.target.dataset.body;
        document.getElementById('exampleModalLabel').textContent = title;
        document.getElementById('exampleModalsublabel').textContent = subtitle;
        document.getElementById('modal-body').textContent = body;
        document.getElementById('save').textContent = event.target.dataset.index;
    })
}

var arr=document.querySelectorAll(".card");
for(var i=0;i<arr.length;i++){

    
    arr[i].addEventListener("dblclick",(event)=>{
        if (event.target.closest(".dropdown-menu") || event.target.closest(".btn-dark")) {
            return;
        }
        const title = event.currentTarget.dataset.title;
        const subtitle = event.currentTarget.dataset.subtitle;
        const body = event.currentTarget.dataset.body;
        document.getElementById("he1").innerHTML = title;
        document.getElementById('he2').textContent = subtitle;
        document.getElementById('he3').textContent = body;   
        
        let modal = new bootstrap.Modal(document.getElementById("open"), { keyboard: true });
    modal.show();

    })

    
}



// if (document.getElementById('addBook')) {
//     document.getElementById('addBook').addEventListener('click', event => {
//         event.preventDefault(); 

//     })
// }


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("addBook");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modals
if(btn) {
    btn.addEventListener('click', event => {
        modal.style.display = "block";
    
    }) 
}


// When the user clicks on <span> (x), close the modal
if(span) {
    span.addEventListener('click', event => {
        modal.style.display = "none";
      })
}


// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', event => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
})

if (document.getElementById('addSQL')) {
    document.getElementById('addSQL').addEventListener('submit', event => {
        event.preventDefault();
        const title = event.target.querySelector('input[name=title]').value;
        const author = event.target.querySelector('input[name=author]').value;
        const description = event.target.querySelector('input[name=description]').value;
        const pdf = event.target.querySelector('input[name=pdf]').value;

        var data = {
            'title': title,
            'author': author,
            'description': description,
            'pdf': pdf
        };
        fetch('/admin', { 
            method: 'post', 
            headers: { 
                'Content-Type': 'application/json' 
            }, 
            credentials: 'include', 
            body: JSON.stringify(data) }
            )
            .then(function(r) { return r.json()})
            .then(function(response) {
                if(response.status) {
                    // document.location.href = '/admin';
                    document.location.reload();
                } else {
                    alert(response.message);
                    console.log('ca a planté');
    
                }
            })
    })
}
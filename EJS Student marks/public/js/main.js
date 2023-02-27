function deleteEvent() {
    let btn = document.getElementById('deleteBtn')
    let id = btn.getAttribute('data-id')
    
    axios.delete('/marks/delete/'+ id)
    .then( (res)=> {
        console.log(res.data)
        alert('Book was deleted')
        window.location.href = '/marks'
    })

    .catch( (err)=> {

        console.log(err)
    })

}


//upload avatar 

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader()

        reader.onload = function(e) {
            let image = document.getElementById("imagePlaceholder")
            image.style.display = "block"
            image.src = e.target.result

        }

        reader.readAsDataURL(input.files[0])
    }
}
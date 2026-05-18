const cl = console.log;

const movieForm= document.getElementById('movieForm')
const movieTitle = document.getElementById('movieTitle')
const movieImg = document.getElementById('movieImg')
const movieDescription= document.getElementById('movieDescription')
const movieRating = document.getElementById('movieRating')

let moviesArr = []



if(localStorage.getItem('moviesArr')){
    moviesArr = JSON.parse(localStorage.getItem('moviesArr'))
}

cl(moviesArr)
    
   

const showModalBtn = document.getElementById('showModalBtn')
const  backDrop = document.getElementById('backDrop')
const  movieModel = document.getElementById('movieModel')

const closeModal = [...document.querySelectorAll('.closeModal')]

function setMovieRating(rating){
    if(rating >= 4){
        return 'badge-success'
    }else if(rating >= 3 && rating < 4){
        return 'badge-warning'
    }else{
        return 'badge-danger'
    }
}

function snackBar(msg){
    Swal.fire({
    title : msg,
    icon : 'success',
    timer : 3000
    })
}

const movieContainer = document.getElementById('movieContainer')

function createMovieCards () {
    let result = ''
moviesArr.forEach(movie => {
    result += `<div class="col-md-3 mb-3">
                <div class="card movieCard" id="${movie.movieId}">
                    <div class="card-header d-flex justify-content-between align-items-start">
                        <h2>
                        ${movie.movieTitle}
                        </h2>
                        <span class="badge ${setMovieRating(movie.movieRating)}">
                        ${movie.movieRating}
                        </span>    
                    </div>
                    <div class="card-body p-0">
                        <figure>
                            <img src="${movie.movieImg}"
                            alt="${movie.movieTitle}"
                            title="${movie.movieTitle}">
                            <figcaption>
                                <h4>${movie.movieTitle}</h4>
                                <p>
                                    ${movie.movieDescription}
                                </p>
                            </figcaption>
                        </figure>
                    </div>
                   <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-sm nfx-sec-btn">Edit</button>
                        <button class="btn btn-sm nfx-pri-btn">Remove</button>
                    </div>
                </div>
            </div>

    `
})

movieContainer.innerHTML = result;

}
createMovieCards()
function onModalHandler(){
    backDrop.classList.toggle('active')
    movieModel.classList.toggle('active')
}

// function onModalShowHandler(){
//     backDrop.classList.add('active')
//     movieModel.classList.add('active')
// }

showModalBtn.addEventListener('click',onModalHandler)

// const onModalHideHandler = () => {
//     backDrop.classList.remove('active');
//     movieModel.classList.remove('active');
// }

// closeModal.forEach(btn => {
//     btn.addEventListener('click',onModalHideHandler)
// })

function onMovieAddHandle(eve){
    eve.preventDefault()
    let NEW_MOVIE_OBJ = {
        movieTitle : movieTitle.value,
        movieImg : movieImg.value,
        movieDescription : movieDescription.value,
        movieRating : movieRating.value,
        movieId : Date.now().toString()
    }
// cl(NEW_MOVIE_OBJ)
movieForm.reset()

moviesArr.unshift(NEW_MOVIE_OBJ)

localStorage.setItem('moviesArr', JSON.stringify(moviesArr))
// createMovieCards(moviesArr) :: create only one card 
let div = document.createElement('div')
div.className = 'col-md-3 mb-3'
div.innerHTML = `<div class="card movieCard" id="${NEW_MOVIE_OBJ.movieId}">
                    <div class="card-header d-flex justify-content-between align-items-start">
                        <h2>
                        ${NEW_MOVIE_OBJ.movieTitle}
                        </h2>
                        <span class="badge ${setMovieRating(NEW_MOVIE_OBJ.movieRating)}">
                        ${NEW_MOVIE_OBJ.movieRating}
                        </span>    
                    </div>
                    <div class="card-body p-0">
                        <figure>
                            <img src="${NEW_MOVIE_OBJ.movieImg}"
                            alt="${NEW_MOVIE_OBJ.movieTitle}"
                            title="${NEW_MOVIE_OBJ.movieTitle}">
                            <figcaption>
                                <h4>${NEW_MOVIE_OBJ.movieTitle}</h4>
                                <p>
                                    ${NEW_MOVIE_OBJ.movieDescription}
                                </p>
                            </figcaption>
                        </figure>
                    </div>
                   <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-sm nfx-sec-btn">Edit</button>
                        <button class="btn btn-sm nfx-pri-btn">Remove</button>
                    </div>
                </div>
`
movieContainer.prepend(div)
onModalHandler()
snackBar(`The new movie ${NEW_MOVIE_OBJ.movieTitle} added successfully!!!`)
}



movieForm.addEventListener('submit',onMovieAddHandle)
const cl = console.log;


let moviesArr = []

// API Call to get DATA from DB 

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


function onModalHandler () {
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

closeModal.forEach(btn => {
    btn.addEventListener('click',onModalHideHandler)
})
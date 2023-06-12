// --------------------------------------------------------------------------------------
// ------------------------THIS IS CREATED BY :Harmanpreet Singh-------------------------
// --------------------------------------------------------------------------------------

// Including elements from DOM
let searchbar=document.getElementById('searchbar');
let submit=document.getElementById('submitbtn');
let movielist=document.querySelector('.movielist');
let content=document.querySelector('.content');
let poster=document.getElementById('poster');
let movie=document.querySelector('.movie');
let intro=document.getElementById('introblock');
let largelogo=document.getElementById('largelogo');
let smalllogo=document.getElementById('smalllogo');
let id;

addEventListener('load',()=>{
    loading.style.display="none";
})

// on clicking search button or hitting Enter key
submit.addEventListener('click',searching);
searchbar.addEventListener('keypress',(event)=>{
    if(event.key=='Enter'){searching();}
})
function searching()
{    
    let key=searchbar.value.trim();
    // console.log(key);
    let url=`https://www.omdbapi.com/?s=${key}&apikey=cdef0698`;
    fetch(url)
    .then((response)=>{
        return response.json();
    }).then((data)=>{              
        if(data.Response=='False'){
        alert("No Movie found");
        }
        else{
            // console.log(data);
            loader.style.display="flex";
            largelogo.style.display='none';
            smalllogo.style.display='inline';
            introblock.style.display='none';
            movie.style.display="none";
            movielist.style.display="grid";
            let item=document.querySelectorAll('.movieitem');
            item.forEach(element => {                
                element.style.display="none";
            });

            for(let i=0;i<data.Search.length;i++)
            {
                // console.log(data.Search[i].Poster);

                item[i].style.display="block";
                if(data.Search[i].Poster!='N/A'){
                    item[i].innerHTML=`
                    <img src="${data.Search[i].Poster}">
                    <h3>${data.Search[i].Title}</h3>
                    <h6 class="imdb">${data.Search[i].imdbID}.</h6>
                    `
                }
                else{
                    item[i].innerHTML=`
                    <img src="ques.jpg">
                    <h3>${data.Search[i].Title}</h3>
                    <h6 class="imdb">${data.Search[i].imdbID}</h6>
                    `                    
                }
            }
            setTimeout(() => {
                loader.style.display="none";
            }, 200);
        }
    })
}


// on clicking poster of movies list
let item=document.querySelectorAll('.movieitem');
item.forEach(element => {
    element.addEventListener('click',()=>{
        // console.log("click");
        // let ele=element.id.substr(10);
        // let inner=item[ele].innerHTML;
        // let index=inner.indexOf('<h6>');
        // id=inner.substr(index+13,9);
        loader.style.display="flex";
        let allid=document.querySelectorAll('.imdb');
        let ele=element.id.substr(10);
        let ind=allid[ele].innerHTML.indexOf('.');
        id=allid[ele].innerHTML.substring(0,ind);
        movielist.style.display="none";
        movie.style.display="flex";
        window.scrollTo(0,50);
        // console.log(id.length);   
        console.log(id);
        let urlID=`https://www.omdbapi.com/?i=${id}&apikey=cdef0698`;
        // console.log(urlID);
        fetch(urlID)
        .then((response)=>{
            return response.json();
        }).then((data)=>{ 
            // console.log(data);  
            poster.innerHTML=`<img src="${data.Poster}">`;
            content.innerHTML=`
            <h1>${data.Title}</h1>
            <div id="info">
                <span id="year"><p>${data.Year}</p></span>
                <span id="rating"><p><img src="star.png" alt="star"> ${data.imdbRating} Rating</p></span>
                <span><p>Rated: ${data.Rated}</p></span>
                <span><p>${data.Runtime}</p></span>
                <span><p>${data.Genre}</p></span>
                </div>
                <ul>
                <li><span>Released</span> : ${data.Released}</li>
                <li><span>Director</span> : ${data.Director}</li>
                <li><span>Actors</span> : ${data.Actors}</li>
                <li><span>Writer</span> : ${data.Writer}</li>
                <li><span>Country</span> : ${data.Country}</li>
                <li><span>Awards</span> : ${data.Awards}</li>
                <li><span>Language</span> : ${data.Language}</li>
                <li><span>Box Office</span> : ${data.BoxOffice}</li>
                </ul>
                <div class="plot">
                    <span id="plotheading">Plot &gt</span>
                    <p id="plot">${data.Plot}</p>
                </div>
                `;
                setTimeout(() => {
                    loader.style.display="none";
                }, 200);
        })
   })
})




    




    
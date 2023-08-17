let ramens= [];

document.addEventListener('DOMContentLoaded', async function() {
ramens = await getFunction()
displayRamens(ramens)
});

function getFunction(){
    return fetch('http://localhost:3000/ramens')
    .then((res)=>res.json())
    .then((data)=>{console.log(data);return data;})
}

function displayRamens(ramens,index){
    ramens.forEach(ramen => {
    const imgPosition=document.getElementById('ramen-menu');
    const img=document.createElement('img');
    img.src= ramen.image;
    img.className='img-className';
    img.dataset.id = ramen.id;
    if (index === 0) {
        img.click();
    }  
    imgPosition.appendChild(img);
    
    img.addEventListener('click', ()=>{
        moreDetails(ramen);
    });
    });
}
function moreDetails(ramen){
    let detailImage=document.querySelector(".detail-image");
    let insertName=document.querySelector(".name");
    let insertRestaurant=document.querySelector(".restaurant");
    detailImage.src=ramen.image;
    detailImage.alt = ramen.name;
    insertName.textContent=ramen.name;
    insertRestaurant.textContent=ramen.restaurant;

    let ratingDisplay=document.querySelector("#rating-display");
    let commentDisplay=document.querySelector("#comment-display");
    ratingDisplay.textContent = "";
    commentDisplay.textContent = "";
    ratingDisplay.textContent=ramen.rating;
    commentDisplay.textContent=ramen.comment;
}
function addRamen(ramen) {
    let postData={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
        },
        body: JSON.stringify(ramen)
        }
    return fetch('http://localhost:3000/ramens', postData)
        .then(res => res.json()).then(data => {console.log(data)})
        }

function onSubmit(event) {
    event.preventDefault();

    const newRamen = {
        name: event.target["new-name"].value,
        restaurant: event.target["new-restaurant"].value,
        image: event.target["new-image"].value,
        rating: parseInt(event.target["new-rating"].value),
        comment: event.target["new-comment"].value
      };
    addRamen(newRamen).then(()=> {return getFunction()});
    }
    document.addEventListener('DOMContentLoaded', function() {
        const ramenForm = document.querySelector("#new-ramen");
        ramenForm.addEventListener("submit", onSubmit);
      });
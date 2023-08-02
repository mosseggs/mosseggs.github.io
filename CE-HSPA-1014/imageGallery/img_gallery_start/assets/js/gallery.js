const images = [
  { name: `img01`, desc: `The Old City of Dubrovnik, Croatia` },
  { name: `img02`, desc: `Lokrum Island, Dubrovnik` },
  { name: `img03`, desc: `Dubrovnik under stormy skies` },
  { name: `img04`, desc: `St. Blaise Festival` },
  { name: `img05`, desc: `Marching band for St. Blaise Festival` },
  { name: `img06`, desc: `Beach outside Dubrovnik` },
  { name: `img07`, desc: `Fort St. Lawrence` },
  { name: `img08`, desc: `Adriatic Sea at sunset` },
  { name: `img09`, desc: `RIT Croatia, Dubrovnik Campus` },
  { name: `img10`, desc: `Harbor at Gru&#382;` },
  { name: `img11`, desc: `Diocletian's Palace, Split, Croatia` },
  { name: `img12`, desc: `Plitvice Lakes National Park` },
  { name: `img13`, desc: `Plitvice Lakes National Park` },
  { name: `img14`, desc: `Bay of Kotor, Montenegro` },
  { name: `img15`, desc: `Bay of Kotor, Montenegro` },
  { name: `img16`, desc: `Kotor, Montenegro` },
  { name: `img17`, desc: `Ancient walls above Kotor` }
];

const path = `assets/img/`;

let imgStr = ``;

images.forEach(( image) => {
  console.log(image);

  imgStr += `<img src="${ path }${image.name }thumb.jpg"
                  class="thumb"
                  id="${image.name}"
                  alt="${image.desc}"
                  title="${image.desc}">`;
})
document.querySelector( `#strip-div`).innerHTML = imgStr;

document.querySelectorAll(`.thumb`).forEach( function(thumb){
  thumb.addEventListener(`click`, function(){
    console.log(`in event listener`,this);
    console.dir( this );

    showImage( this );
  });
});

function showImage(thumb){
  const bigPic = document.querySelector( `#big-pic`);

  bigPic.src = `${ path }${ thumb.id }.jpg`;
  bigPic.alt = thumb.title;
  bigPic.title = thumb.title;
  document.querySelector(`#caption`).innerHTML = thumb.title;
}

// preload all full size images to improve performance
images.forEach((image)=>{
  const newImg = new Image();
  newImg.src = `${path}${image.name}.jpg`;
})
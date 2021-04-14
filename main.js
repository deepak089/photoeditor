let myform = document.getElementById('myform');
let inputrange = document.querySelectorAll('.slider');
var image = document.getElementById('output');

// for loading image
var loadFile = function(event) {
	image.src = URL.createObjectURL(event.target.files[0]);
    event.preventDefault();
};

for(let i=0; i<=inputrange.length-1; i++ ){
    inputrange[i].addEventListener('input', editimage);
}

function editimage(){
    let gs = document.getElementById('gs');
    let blur = document.getElementById('blur');
    let huerotate = document.getElementById('hue-rotate');
    let sepia = document.getElementById('sepia');

    let gsval = gs.value;
    let blurval = blur.value;
    let huerotateval = huerotate.value;
    let sepiaval = sepia.value;
    
    image.style.filter = 'grayscale('+gsval+'%) blur('+blurval+'px) hue-rotate('+huerotateval+'deg) sepia('+sepiaval+'%)';

}
//reset button
let sliderform = document.getElementById('slider-form');
sliderform.addEventListener('reset', function(){
    sliderform.reset();
    setTimeout(function(){
        editimage();
    },0)
});
//download
let btnDownload = document.querySelector('#btn');
btnDownload.addEventListener('click',() =>{
my();
});
function my()
{
    axios({
        url:image.src,
        method:'GET',
        responseType:'blob'
    }).then((response) =>{
const url=window.URL.createObjectURL(new Blob([response.data]));
const link=document.createElement('a');
image.addEventListener('click',function(){
  
    const reader =new FileReader();
    reader.addEventListener('load', () =>{
      localStorage.setItem('recent', reader.result);
    });
    reader.readAsDataURL(this.files[0]);
    });
link.href=url;
link.setAttribute('download','file.jpg');
document.body.appendChild(link);
link.click();
})
}

// Storage

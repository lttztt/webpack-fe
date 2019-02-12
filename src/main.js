import './css/style.css'


// 用 scss

import './scss/a.scss'

import imgSrc from './images/404.jpg'
import img2Src from './images/timg.jpg'

let oImg = new Image();
let img2 = new Image();
img2.onload = () =>{
  document.body.appendChild(img2)
}
img2.src = img2Src;



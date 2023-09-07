import React, { useEffect, useState } from 'react'
import img from "../../assests/ttyt.jpg";
import "../slider/Sliderstyle.css"
import SliderData from '../../Datasource';

const Slider = () => {
  console.log(SliderData.img1)
  const [data,setdata]=useState(SliderData);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [data]);

  
  return (
    <div className='slidercontainer'>
            <img src={img}></img>

      <div id="carouselExampleCaptions" class="carousel slide">
        <div class="carousel-indicators">
          {
            data.map((d,index)=>{
              return(
                <button type="button" 
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={index}
                class={index ===activeIndex ? "active" : ""}
                aria-current={index ===activeIndex ? true:false}
                aria-label={`slide ${index + 1 }`}></button>
              )
            })
 
          }
          
        </div>
        <div class="carousel-inner">
          {
            data.map((d,index)=>{
              return(
                <div class={`carousel-item ${index ===activeIndex? "active" : ""}`}>
                  
                <img src={d.img} alt={`Slide ${index + 1}`} />
           
          
                </div>
            
              )
            })
          }
       


     
        </div>
        <button onClick={()=>setActiveIndex((PrevIndex)=>PrevIndex === 0 ? data.length-1: PrevIndex -1)} class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button onClick={()=>setActiveIndex((PrevIndex)=>PrevIndex === data.length-1 ? 0 : PrevIndex +1)}  class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}

export default Slider
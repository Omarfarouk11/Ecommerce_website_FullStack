import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../category/Categorystyle.css"
import { Link } from 'react-router-dom';
const Category = () => {
const [categories, setcategories] = useState([]);
useEffect(() => {
    const fetchcategories = async () => {
        try {
            const result = await axios.get("https://localhost:44375/api/Categories")
            setcategories(result.data.$values);

        } catch (error) {
            console.log(error)

        }
    }
fetchcategories();

}, [])
var firstslide = [];
var secondslide = [];
var limit = 13;
var nextlimit = 26;
var i = 0;
for (let index = 0; index < categories.length; index++) {

    if (index < limit) {
        firstslide[index] = categories[index];

    }
    else if (index < nextlimit) {

        secondslide[i] = categories[index];
        i++;
    }
}

    return (
        <div className='CategoryContainer'>
            <div id="carouselExample" class="carousel slide">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        {
                            firstslide.map((f) => {
                                return (
                                    <div className='categoryDetails'>
                                    <Link to={`/select/${f.id}`}>  <img src={`https://localhost:44375/${f.imageUrl}`} alt='img1'></img></Link> 
                                     
                                    </div>
                                )
                            })

                        }
                    </div>

                    <div class="carousel-item">
                        {
                            secondslide.map((s) => {
                                return (
                                    <div  className='categoryDetails'>
                                     <Link to={`/select/${s.id}`}> <img src={`https://localhost:44375/${s.imageUrl}`} alt='img1'></img></Link>
                               
                                    </div>
                                )
                            })
                        }
                    </div>
              
                </div>
                <button class="carousel-control-prev" id="prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" id='next' type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>



        </div>
    )
}

export default Category
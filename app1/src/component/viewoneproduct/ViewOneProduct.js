import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from "../navbar/Navbar"
import "../viewoneproduct/ViewOneProductStyle.css"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const ViewOneProduct = () => {
    const { id } = useParams();
    const { categoryId } = useParams();
    const [product, setproduct] = useState([])
    const [category, setcategory] = useState([])



    useEffect(() => {
        const fetchoneproduct = async () => {
            try {
                const result = await axios.get(`https://localhost:44375/api/Products/${id}`)
                console.log(result.data);
                setproduct(result.data);
            } catch (error) {
                console.log(error);

            }
        }
        fetchoneproduct();


    }, [id])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await axios.get(`https://localhost:44375/api/Products/${categoryId}/GetProductByCategory`)

                setcategory(result.data.$values);

            } catch (error) {
                console.log(error)

            }
        }
        fetchProducts();

    }, [categoryId])


    const elements = [];
    var index = 0;
    var counter = 0;
    var random = Math.floor(Math.random() * (category.length - index + 1)) + index;
    while (random < category.length && counter < 4) {
        

        if (category[random].id != id) {
            elements.push(category[random]);
            counter++;
        }

        random++;
    }
    console.log(elements);
    return (
        <div className='ViewoneProductContainer'>
            <Navbar />
            <div className='ViewOneItem'>
                <div className='LeftOneItem'>
                    <img src={`https://localhost:44375/${product.imageUrl}`}></img>
                </div>
                <div className='RightOneItem'>
                    <div className='ViewDetailsOfProduct'>
                        <div>
                            <h1>{product.name}</h1>
                        </div>
                        <div>
                            <h3>{product.description}</h3>
                        </div>
                        <div>
                            <p>${product.price}</p>
                        </div>
                        <div>
                            <button type='submit'>Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='rectitle'>
            <h3 >Recommended Items</h3>
            <hr/>

            </div>

            <div className='RecommendedItems'>
                {
                    elements.map((ele) => {
                        return (
                            <div className='recommendedproduct'>
                                <div className='recimg'>
                                    <img src={`https://localhost:44375/${ele.imageUrl}`}></img>
                                </div>
                                <div className='recdetails'>
                                    <div className='recproductdeatilsrow'>
                                        <h5>{ele.name}</h5>
                                    </div>
                                    <div className='recproductdeatilsrow'>

                                        <div className='reccart'>
                                            <div>
                                                <p>${ele.price}</p>
                                            </div>
                                            <div>
                                                <ShoppingCartIcon />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }
            </div>



        </div>
    )
}

export default ViewOneProduct
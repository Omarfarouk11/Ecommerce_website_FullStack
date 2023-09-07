import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Search = () => {
  const { query } = useParams();
  const [search, setsearch] = useState([])
  useEffect(() => {
    const featchsearchitems = async () => {
      try {
        const result = await axios.get(`https://localhost:44375/api/Products/search?word=${query}`)
        setsearch(result.data.$values);

      } catch (error) {
        console.log(error)

      }
    }
    featchsearchitems();

  }, [query])

  return (
    <div>
      <Navbar />
      <div className='productcontainer'>

        <div className='Product'>

          {search.length > 0
            ? search.map((P) => (
              <div className='ProductDetails' key={P.id}>
                <div className='ProductImg'>
                  <img src={`https://localhost:44375/${P.imageUrl}`} alt='img1'></img>
                </div>
                <div className='ProductName'>
                  <h5>{P.name}</h5>
                </div>
                <div className='ProductPrice'>
                  <div>
                    <h5>${P.price}</h5>
                  </div>
                  <div>
                    <ShoppingCartIcon />
                  </div>


                </div>
              </div>


            ))
            : <div>No products found.</div>}

        </div>
      </div>
    </div>
  )
}

export default Search
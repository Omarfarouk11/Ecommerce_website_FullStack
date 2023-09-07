import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../addproduct/AddProductstyle.css"
import AddIcon from '@mui/icons-material/Add';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
const AddProduct = () => {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState(0);
  const [stock, setstock] = useState(0);
  const [image, setimage] = useState();
  const [imageurl, setimageurl] = useState();
  const [category, setcategory] = useState(0);
  const [categories, setcategories] = useState([]);
  useEffect(() => {
    const fetchcategory = async () => {
      try {
        const result = await axios.get("https://localhost:44375/api/Categories");
        setcategories(result.data.$values);
        console.log(result.data.$values);
      } catch (error) {
        console.log(error);
      }
    }
    fetchcategory();
  }, [])

  const HandleAddProduct = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('Name', name);
    data.append('Description', description);
    data.append("Price", price);
    data.append('Stock', stock);
    data.append('ImageUrl', image);
    data.append('CategoryId', category);
    try {
      const respone = await axios.post("https://localhost:44375/api/Products", data)
      console.log(respone);




    } catch (error) {
      console.log(error)

    }

  }
  const handleimage=(e)=>{
    const file=e.target.files[0];
    setimage(file)
    const img=URL.createObjectURL(file);
    setimageurl(img);
  }
  return (
    <div className='addproductcontainer'>
      <div className='addproducttitle'>
        <h3>Add Product</h3>
        <AddIcon/>

      </div>
      <div className='addprod'>

        <form onSubmit={HandleAddProduct}>
          <div className='addproductrow'>
            <label>Product Name</label>
            <input type='text' value={name} onChange={(e) => setname(e.target.value)}></input>
          </div>
          <div className='addproductrow'>
            <label>Product Description</label>
            <input type='text' value={description} onChange={(e) => setdescription(e.target.value)}></input>
          </div>
          <div className='addproductrow'>
            <label>Product price</label>
            <input type='number' value={price} onChange={(e) => setprice(e.target.value)} min={1}></input>
          </div>
          <div className='addproductrow'>
          
            <select value={category} onChange={(e) => setcategory(parseInt( e.target.value))}>
              <option value={""} disabled selected>Category</option>
              {categories.map((c) => <option value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className='addproductrow'>
            <label>Product stock</label>
            <input type='number' value={stock} onChange={(e) => setstock(e.target.value)} min={1}></input>
          </div>
          <div className='addproductrow'>
           
            <input type='file' onChange={handleimage}></input>
          </div>
          <div className='addproductbtn'>
            <button type='submit'>Save <span><SaveAltIcon/></span></button>

          </div>
        </form>
 
      <div className='imagecontainer'>
     {imageurl && <img src={imageurl}   alt='Selected Image'></img>}
      </div>
      </div>



    </div>
  )
}

export default AddProduct
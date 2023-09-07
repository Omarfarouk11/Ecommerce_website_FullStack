import { EditAttributesRounded } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const EditProduct = () => {
    const { id } = useParams();
    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const [price, setprice] = useState(0);
    const [stock, setstock] = useState(0);
    const [category, setcategory] = useState(0);
    const [categories, setcategories] = useState([]);
    const [image, setimage] = useState();
    const [imageurl, setimageurl] = useState();
    

    useEffect(() => {
        const fetchproduct = async () => {
            try {
                const result = await axios.get(`https://localhost:44375/api/Products/${id}`)
                setname(result.data.name);
                setdescription(result.data.description);
                setprice(result.data.price);
                setstock(result.data.stock);
                setcategory(result.data.categoryId)


            } catch (error) {
                console.log(error);
            }
        }
        const fetchcategory = async () => {
            try {
                const result = await axios.get("https://localhost:44375/api/Categories");
                setcategories(result.data.$values);
                console.log(result.data.$values);
            } catch (error) {
                console.log(error)
            }
        }
        fetchproduct();
        fetchcategory();
    }, [id])

    const handlechnageimage = (e) => {
  
        const file=e.target.files[0];
  
        setimage(file)
        const img=URL.createObjectURL(file);
        setimageurl(img);
        
      
    }


    const HandleEdit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('Name', name);
        data.append('Description', description);
        data.append("Price", price);
        data.append('Stock', stock);
        data.append('ImageUrl', image );
        data.append('CategoryId', category);
        try {
           
          
            await axios.put(`https://localhost:44375/api/Products/${id}`,data)
            alert("Product updated successfully!");
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='addproductcontainer'>
            <div className='addproducttitle'>
                <h3>Edit Product</h3>
                <EditOutlinedIcon />
            </div>
            <div className='addprod'>
                <form onSubmit={HandleEdit}>
                    <div className='addproductrow'>
                        <label>Product Name</label>
                        <input type='text' value={name} onChange={(e) => { setname(e.target.value) }} ></input>
                    
                    </div>
                    <div className='addproductrow'>
                        <label>Product Description</label>
                        <input type='text' value={description} onChange={(e) => { setdescription(e.target.value) }}></input>
                    </div>
                    <div className='addproductrow'>
                        <label>Product price</label>
                        <input type='number' value={price} min={1} onChange={(e) => { setprice(e.target.value) }}></input>
                    </div>
                    <div className='addproductrow'>
                        <label>Product stock</label>
                        <input type='number' value={stock} min={1} onChange={(e) => setstock(e.target.value)}></input>
                    </div>
                    <div className='addproductrow'>
                        <select value={category} onChange={(e) => setcategory(parseInt(e.target.value))}>
                            <option value={""} disabled selected>Category</option>
                            {categories.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
                        </select>


                    </div>
                    <div className='addproductrow'>
                        <input type='file' onChange={handlechnageimage} ></input>

                    </div>


                    <div className='addproductbtn'>
                        <button type='submit'>Save <span><SaveAltIcon /></span></button>

                    </div>
                </form>
                <div className='imagecontainer'>
                
                {imageurl == null ? <img src="https://via.placeholder.com/150"  alt='Selected Image'></img>:
                <img src={imageurl}   alt='Selected Image'></img>}
                </div>

            </div>


        </div>
    )
}

export default EditProduct
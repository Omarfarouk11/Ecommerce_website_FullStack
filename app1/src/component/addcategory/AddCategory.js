import axios from 'axios';
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const AddCategory = () => {

    const [name, setname] = useState("");
    const [image, setimage] = useState();
    const [imageurl, setimageurl] = useState();

    const handleadd = (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("name", name);
            data.append("imageUrl", image);
            const respone = axios.post("https://localhost:44375/api/Categories", data);
            console.log(respone);

        } catch (error) {
            console.log(error);

        }

    }
    const handleimagechange = (e) => {
        const file = e.target.files[0];
        setimage(file);
        const img = URL.createObjectURL(file);
        setimageurl(img);

    }
  

    return (
        <div className='addproductcontainer'>
            <div className='addproducttitle'>
                <h3>Add Category</h3>
                <AddIcon />
            </div>
            <div className='addprod'>
                <form onSubmit={handleadd}>
                    <div className='addproductrow'>
                        <label>Category Name</label>
                        <input type='text' value={name} onChange={(e) => setname(e.target.value)}></input>
                    </div>
                    <div className='addproductrow'>
                        <input type='file' onChange={handleimagechange}></input>

                    </div>
                    <div className='addproductbtn'>
                        <button type='submit'>Save <span><SaveAltIcon /></span></button>

                    </div>
                </form>

                <div className='imagecontainer'>
       
                {image == null ? <img src="https://via.placeholder.com/150" ></img> :
                <img src={imageurl}   alt='Selected Image'></img>}
                </div>
            </div>


        </div>
    )
}

export default AddCategory
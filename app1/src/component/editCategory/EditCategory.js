import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { EditAttributesRounded } from '@mui/icons-material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const EditCategory = () => {
    const { id } = useParams();
    const [name, setname] = useState("");
    const [image, setimage] = useState();
    const [imageurl, setimageurl] = useState();
    useEffect(() => {
        const fetchcategory = async () => {
            try {
                const result = await axios.get(`https://localhost:44375/api/Categories/${id}`);
                console.log(result.data);
                setname(result.data.name);
            } catch (error) {
                console.log(error);
            }
        }
        fetchcategory();

    }, [id])
    const HandleEdit =(e)=>{
        e.preventDefault();
        try {
            const data=new FormData();
            data.append("name",name);
            data.append("imageUrl",image);
            const result =axios.put(`https://localhost:44375/api/Categories/${id}`,data);
            console.log(result.data);
        } catch (error) {
            console.log(error);
            
        }

    }
    const handlechnageimage=(e)=>{
        const file=e.target.files[0];
        setimage(file);
        const img=URL.createObjectURL(file);
        setimageurl(img);

    }

    return (
        <div className='addproductcontainer'>
            <div className='addproducttitle'>
                <h3>Edit Category</h3>
                <EditOutlinedIcon />
            </div>
            <div className='addprod'>
                <form onSubmit={HandleEdit}>
                    <div className='addproductrow'>
                        <label>Category Name</label>
                        <input type='text' value={name} onChange={(e) => { setname(e.target.value) }} ></input>

                    </div>
                    <div className='addproductrow'>
                        <input type='file' onChange={handlechnageimage} ></input>

                    </div>


                    <div className='addproductbtn'>
                        <button type='submit'>Save <span><SaveAltIcon /></span></button>

                    </div>
                </form>
                <div className='imagecontainer'>
                
                {image == null ? <img src="https://via.placeholder.com/150"  alt='Selected Image'></img>:
                <img src={imageurl}   alt='Selected Image'></img>}
                </div>

            </div>


        </div>
    )
}

export default EditCategory
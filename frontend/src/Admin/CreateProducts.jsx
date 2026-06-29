import React, { useEffect, useState } from 'react'
import '../AdminStyles/CreateProduct.css'
import PageTitle from '../components/PageTitle.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, removeErrors, removeSuccess } from '../features/admin/adminSlice.js';
import {toast} from 'react-toastify';

function CreateProducts() {
    const {success, loading, error} = useSelector(state=>state.admin);
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);

    const categories = [
    "Laptops",
    "Mobiles",
    "Electronics",
    "Home Appliances",
    "Fashion",
    "Books",
    "Sports & Fitness",
    "Groceries",
    "Furniture",
    "Beauty & Personal Care"
        ];

    const createProductSubmit = (e)=>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('name',name);
        myForm.set('price',price);
        myForm.set('description',description);
        myForm.set('stock',stock);
        myForm.set('category',category);
        image.forEach((img)=>{
            myForm.append("image", img);
        })
        dispatch(createProduct(myForm));
    }

    const createProductImage = (e)=>{
        const files = Array.from(e.target.files);
        setImage(files);
        const previews = files.map((file)=>URL.createObjectURL(file));
        setImagePreview(previews);
    }

    useEffect(()=>{
        if(error){
            toast.error(error,{position:'top-center', autoClose: 3000})
            dispatch(removeErrors());
        }
        if(success){
            toast.success("Product Created Successfully",{position:'top-center', autoClose: 3000})
            dispatch(removeSuccess());
            setName("");
            setPrice("");
            setDescription("");
            setStock("");
            setCategory("");
            setImage([]);
            setImagePreview([]);
        }
    },[dispatch, error, success])


  return (
    <>
      <PageTitle title="Create Product" />
      <div className="create-product-container">

        <h1 className="form-title">Create Product</h1>

        <form className="product-form" encType="multipart/form-data"
        onSubmit={createProductSubmit}>

          <div className="form-group">
            <label>Product Name</label>
            <input 
              type="text" name='name'
              value={name}
              onChange={(e)=>setName(e.target.value)} 
              className="form-input" 
              placeholder="Enter Product Name" 
              required 
            />
          </div>

          <div className="form-group">
            <label>Product Description</label>
            <textarea type="text" name = 'description'
              value={description}
              onChange={(e)=>setDescription(e.target.value)} 
              className="form-input" 
              placeholder="Describe your product..." 
              required
              >
            </textarea>
          </div>

          <div className="form-group">
            <label>Product Category</label>
            <select name = 'category' className="form-select"
            value={category}
            onChange={(e)=>setCategory(e.target.value)} 
            required>
              <option value="">Choose a Category</option>
              {categories.map((item)=>(
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="form-row">

            <div className="form-group">
                <label>Product Price</label>
                <input 
                type="number" name = 'price'
                value={price}
                onChange={(e)=>setPrice(e.target.value)} 
                className="form-input" 
                placeholder="Enter Product Price (INR)" 
                min={0}
                required 
                />
            </div>

            <div className="form-group">
                <label>Product Stock</label>
                <input 
                type="number" name = 'stock'
                value={stock}
                onChange={(e)=>setStock(e.target.value)} 
                className="form-input" 
                placeholder="Enter Available Stock"
                min={0}
                required 
                />
            </div>

          </div>

          <div className="form-group">
            <label>Select Product Images</label>
            <div className="file-input-container">
                <input 
                    type="file"
                    className="form-input-file"
                    onChange={createProductImage} 
                    accept="image/*"
                    multiple
                    name = 'image'
                />
            </div>
          </div>

          <div className="form-group">
            <div className="image-preview-container">
                {imagePreview.map((img, index)=>(
                    <img src={img} alt="Product Preview" className='image-preview' key={index} />
                ))}
            </div>
          </div>
          <div className="form-group">
            <button type="submit" disabled={loading} className="submit-btn">
                {loading ? (<> Creating Product <span className="loader"></span></>) : ("Create Product" )}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateProducts
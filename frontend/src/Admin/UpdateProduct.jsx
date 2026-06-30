import React, { useEffect, useState } from 'react'
import '../AdminStyles/CreateProduct.css'
import PageTitle from '../components/PageTitle.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { 
    getAdminProductDetails, 
    updateProduct, 
    removeErrors, 
    removeSuccess 
} from '../features/admin/adminSlice.js'
import {toast} from 'react-toastify'
import Loader from '../components/Loader.jsx'

function UpdateProduct() {
    const { updateId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { product, loading, updateLoading, error, success } = useSelector(state => state.admin);

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

    
    useEffect(()=>{
        dispatch(getAdminProductDetails(updateId));
    },[dispatch,updateId]);

    useEffect(()=>{
        console.log("Product from redux:", product);
    },[product]);

    
    useEffect(()=>{
        if(product){
            setName(product.name || "");
            setPrice(product.price || "");
            setDescription(product.description || "");
            setCategory(product.category || "");
            setStock(product.stock || "");

            // old images preview
            setImagePreview(
                product.images?.map(img=>img.url) || []
            );
        }

    },[product]);



    // image change
    const updateProductImage = (e)=>{

        const files = Array.from(e.target.files);
        setImage(files);
        // old images remove and new preview show
        const previews = files.map(
            file=>URL.createObjectURL(file)
        );
        setImagePreview(previews);
    };

    const updateProductSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.set("name",name);
        formData.set("price",price);
        formData.set("description",description);
        formData.set("category",category);
        formData.set("stock",stock);
        image.forEach((img)=>{
            formData.append("image",img);
        });

        dispatch(
            updateProduct({
                id:updateId,
                productData:formData
            })
        );

    };

    useEffect(()=>{
        if(error){
            toast.error(error,{
                position:"top-center",
                autoClose:3000
            });
            dispatch(removeErrors());
        }
        if(success){
            toast.success(
                "Product Updated Successfully",
                {
                    position:"top-center",
                    autoClose:3000
                }
            );
            dispatch(removeSuccess());
            navigate("/admin/products");
        }
    },[
        error,
        success,
        dispatch,
        navigate
    ]);


    if(loading && !product){
        return <Loader/>
    }

    return (
        <>
        <PageTitle title="Update Product"/>


        <div className="create-product-container">

            <h1 className="form-title">
                Update Product
            </h1>
            <form 
                className="product-form"
                onSubmit={updateProductSubmit}
                encType="multipart/form-data"
            >
                <div className="form-group">
                    <label>Product Name</label>
                    <input
                        type="text"
                        className="form-input"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Product Description</label>
                    <textarea
                        className="form-input"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Product Category</label>

                    <select
                        className="form-select"
                        value={category}
                        onChange={(e)=>setCategory(e.target.value)}
                        required
                    >

                    <option value="">
                        Choose Category
                    </option>
                    {
                        categories.map(item=>(
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))
                    }
                    </select>

                </div>

                <div className="form-row">

                    <div className="form-group">

                        <label>Product Price</label>

                        <input
                            type="number"
                            className="form-input"
                            value={price}
                            onChange={(e)=>setPrice(e.target.value)}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Product Stock</label>

                        <input
                            type="number"
                            className="form-input"
                            value={stock}
                            onChange={(e)=>setStock(e.target.value)}
                            required
                        />

                    </div>

                </div>

                <div className="form-group">

                    <label>
                        Product Images
                    </label>

                    <input
                        type="file"
                        className="form-input-file"
                        multiple
                        accept="image/*"
                        onChange={updateProductImage}
                    />

                </div>

                <div className="form-group">

                    <div className="image-preview-container">

                    {
                        imagePreview.map((img,index)=>(
                            <img
                                key={index}
                                src={img}
                                className="image-preview"
                                alt="preview"
                            />
                        ))
                    }

                    </div>

                </div>

                <div className="form-group">

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={updateLoading}
                    >
                    {
                        updateLoading
                        ?
                        <>
                            Updating Product
                            <span className="loader"></span>
                        </>
                        :
                        "Update Product"
                    }
                    </button>
                </div>


            </form>

        </div>

        </>
    )
}

export default UpdateProduct;
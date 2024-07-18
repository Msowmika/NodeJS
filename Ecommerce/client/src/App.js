import { useEffect, useState } from "react";
import axios from 'axios'
import image from "./cart.png"
import './App.css';



function App() {
  const[products,setProducts]=useState([]);

  useEffect(()=>{
    fetchProducts();
  },[])

  const fetchProducts = async()=> {
    try {
      const response = await axios.get('http://localhost:4000/products')
      setProducts(response.data.data)
    }catch(error) {
      console.log("error in fetching products",error);
    }
  }

  const addProducts = async()=> {
    try {
      const newProduct={
        image:'https://m.media-amazon.com/images/I/41D4z-51Y3L._SX300_SY300_QL70_FMwebp_.jpg',
        name :'Swiner 4XL Filled Bean Bag with Footstool & Cushion | Ready to Use Faux Leather Bean Bag Chair Filled with Beans (Brown, XXXXL)',
        mrp :'1800',
        actualPrice:'1700',
        rating:5
      }
      await axios.post('http://localhost:4000/products',newProduct)
      fetchProducts()
    }catch(error) {
      console.log("error in fetching products",error);
    }
  }

  const updateProducts = async()=> {
    try {
      const product={
        _id: "66990b057bd4a88230aec6cd",
         name: "Amazon Smart Plug (works with Alexa) - 6A, Easy Set-Up",
        image: "https://m.media-amazon.com/images/I/61cG9RGN9xL._AC_SY175_.jpg",
        mrp: 2000,
        actualPrice: 1800,
        rating: 7,
      }
      const response=await axios.patch(`http://localhost:4000/products/${product._id}`,product)
      console.log("product updated successfully",response.data)
      fetchProducts()
    }catch(error) {
      console.log("error in fetching products",error);
    }
  }

  const deleteProducts = async()=> {
    try {
      const productId= '66990b047bd4a88230aec6ca'

  
      const response=await axios.delete(`http://localhost:4000/products/${productId}`)
      console.log("product deleted successfully",response.data)
      fetchProducts()
    
    }catch(error) {
      console.log("error in fetching products",error);
    }
  }

  return (
    <div className="App">
      <div className='flex justify-center bg-red-800 h-24'>
      <ul className="flex flex-row space-x-72 py-8 text-white text-lg">
       <li className="flex flex-row space-x-5"><img className="w-5 h-5 "src={image}/>Shoppie</li>
       <li>Home</li>
       <li>About</li>
       <li>Contact</li>
       <li>SignUp</li>
       </ul>
      </div>

    <div className="flex justify-center py-6">
    <h1 id="typewriter" className="text-8xl text-violet-400">Welcome to Shoppie!!!</h1>
    </div>
   
    <button onClick={addProducts} className="rounded-full h-30 w-28 text-white bg-green-950 mx-5 hover:bg-sky-700 text-lg">Add Product</button>
   
    <div className="flex justify-center  h-50 w-50 font-serif flex-wrap">
   
    {products.map(product =>(
     
     <div key={product._id}
      style={{boxShadow:"rgba(0,0,24)5px 2px 10px 0px",height:"470px",width:"350px",alignItems:"center"}} 
      className="shadow-2xl mx-5 my-5" >

      <img className=" w-60 h-60 ms-8 items-center" src={product.image} alt=""/>

      <h1 className="flex">{product.name}</h1>

      <div className="flex flex-row mx-28">
         <p className="font-bold text-xl"> ₹{product.mrp}</p>
         <p><s>  ₹{product.actualPrice}</s></p>
         </div>
         <p>rating:{product.rating}</p>
        
         <div className="text-white">
         <button className="rounded-full h-30 w-24 bg-green-950 mx-5 hover:bg-green-700" onClick={updateProducts}>Edit</button>
         <button className="rounded-full h-30 w-24  bg-red-900 mx-5 hover:bg-red-700" onClick={deleteProducts}>Delete</button>
         </div>
      </div>
    ))}
    </div>
    </div>
  );
}

export default App;

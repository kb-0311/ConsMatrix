import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
const options = {
    edit : false ,
    color : "black" ,
    activeCOlor : "tomato",
    size : window.innerWidth< 600 ? 10: 15 ,
    value : 2.9 ,
    isHalf : true

}

const Product = ({product}) => {
  return (
        <Link className='productCard' to= {product._id}>
            <img src = {product.images[0].url} />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} /><span>(256)</span>
                
               
            </div>
            <div><span> quanitity = {product.Stock}</span></div>

            <span>{product.price}</span>

        </Link>
    )
}

export default Product
import React, { Fragment, useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import './home.css'
import Product from './Product.js'
import Metadata from '../../component/layout/Metadata'
import { getProducts } from '../../actions/productAction'
import { useSelector , useDispatch } from 'react-redux'
import { Button} from 'react-bootstrap'

const product = {
    name : "ULtraTech Cement 50kg/bag" ,
    images : [{url : "https://5.imimg.com/data5/SP/TX/MY-29493668/ultratech-cement-500x500.jpg"}],
    price: "Rs.3,00,000" ,
    _id : "1",
    quantity : "1000"
    
}

const Home = () => {
  
  const dispatch = useDispatch();
  const { loading , error , products , productCount }= useSelector(state => state.products)

  useEffect(() => {
    dispatch(getProducts());
  
  }, [])
  
  
  return (
    <Fragment>
      <Metadata title = "ConsMatrix"/>
      <div style={{backgroundColor : 'black'}}>
          <div className="banner">
      
           <h1>  Cons </h1>
           <h1 > matriX    </h1>
          </div>
          <div className='Hheading'>
          <h2 className="homeHeading">Utilities used in all BOT Projects</h2>
          </div>

          <div className="container" id="container">

          { products && products.map(product=>(
            <Product key={product._id}  product={product}/>
          ))
          }

          </div>
      </div>
    </Fragment>
      
  )
  
}

export default Home
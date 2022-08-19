import React, { Fragment, useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import './home.css'
import Product from './Product.js'
import Metadata from '../../component/layout/Metadata'
import { getProducts } from '../../actions/productAction'
import { useSelector , useDispatch } from 'react-redux'
import Loader from '../../component/layout/loader/Loader'
import {useAlert} from 'react-alert'
import { clearErrors } from '../../actions/productAction'


const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading , error , products , productCount }= useSelector(state => state.products)

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProducts());
  
  }, [dispatch,error , alert])
  
  
  return (
    <Fragment>
      {loading ? (<Loader/>)
    :(
      <Fragment>
        <Metadata title = "ConsMatrix"/>
            <div className="banner">
              

              <a href="#container">
                <button>
                  ConsMatrix <CgMouse />
                </button>
              </a>
            </div>
            <h2 className="homeHeading">Utilities used in all BOT Projects</h2>
            <div className="container" id="container">

            { products && products.map(product=>(
              <Product key={product._id}  product={product}/>
            ))}

            </div>
      </Fragment>)}
 
    </Fragment>
  )
  
}

export default Home
import React, { Fragment, useEffect, useState } from 'react'
import './ProductsPage.css'
import { useSelector ,useDispatch } from 'react-redux'
import { clearErrors , getProducts } from '../../actions/productAction'
import { useAlert } from 'react-alert'
import Loader from '../../component/layout/loader/Loader'
import Product from '../Home/Product'
import Metadata from '../../component/layout/Metadata'
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { useRef } from 'react'

const ProductsPage = ({match}) => {
  const keyword = match.params.keyword;
  const ref = useRef(null);
 
  const alert = useAlert();
  const dispatch = useDispatch();
  const categories = [
    "cement",
    "equipment",
    "pipes",
    "machine",
    "utility",
    "none"
  ];
  const { loading , error , products , productsCount , resultsPerPage,filteredProductsCount }= useSelector(state => state.products)
  //filter states
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [filterPrice , setFilterPrice] = useState([0,25000]);
  const [category, setCategory] = useState("none");
  const [ratings, setRatings] = useState(0);


  //filters
  const setCurrentPageNo = (e) =>{
    setCurrentPage(e);
  }
  const priceHandler = (e,newPrice) => {
    setPrice(newPrice);
  };
  const categoryHandler = (category)=>{
    setCategory(category)
  }
  const ratingHandler = (e , newRating)=>{
    setRatings(newRating);
  }
  
  

 

  useEffect(() => {
    
    
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    
    
    

    
      dispatch(getProducts(keyword,currentPage ,filterPrice , category , ratings));
    
  
  }, [dispatch, keyword , currentPage, filterPrice , ratings , category ,error , alert,alert.keyword])

  let count = filteredProductsCount;
  return (
    <Fragment>
      {loading ? (<Loader/>)
    :(
        <Fragment>
          <Metadata title="PRODUCTS" />
          <h2 className="productsHeading">Utilities & Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
          <div onMouseUp={()=>{setFilterPrice(price) ; console.log(filterPrice);}} className="filterBox" ref={ref}>
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={()=>categoryHandler(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={ratingHandler}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultsPerPage<count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultsPerPage}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
                totalItemsCount={productsCount}
              />
            </div>)
              }
          

        </Fragment>
    )}
    </Fragment>
  )
}

export default ProductsPage
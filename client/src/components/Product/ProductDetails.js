import React, {Fragment, useEffect, useState} from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import {useSelector , useDispatch} from 'react-redux' 
import { clearErrors, getProductDetails, newReview, newReviewReset } from '../../actions/productAction'
import ReviewCard from './ReviewCard.js'
import Loader from '../../component/layout/loader/Loader'
import { Rating } from '@material-ui/lab'
import { useAlert } from 'react-alert'
import Metadata from '../../component/layout/Metadata'
import { addItemsToApprove } from '../../actions/approvalAction'
import {Dialog,DialogActions,DialogContent,DialogTitle ,Button} from '@material-ui/core'


const ProductDetails = ({match}) => {

    const alert = useAlert();

    const dispatch =useDispatch();

    const { product , loading , error } = useSelector(state=>state.productDetails)
    const { success:reviewSuccess,error :reviewError } = useSelector(state=>state.newReview)

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    useEffect(() => {

      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }

      if (reviewError) {
        alert.error(reviewError);
        dispatch(clearErrors());
      }

      if (reviewSuccess) {
        alert.success("review Submitted");
        dispatch(newReviewReset());
      }

      dispatch(getProductDetails(match.params.id))
    }, [dispatch , match.params.id,error,alert ,reviewError,reviewSuccess])

    const increaseQuantity = () => {
      if (product.Stock <= quantity) return;
  
      const qty = quantity + 1;
      console.log(qty);
      setQuantity(qty);
    };
  
    const decreaseQuantity = () => {
      if (1 >= quantity) return;
  
      const qty = quantity - 1;
      setQuantity(qty);
    };

    const submitReviewToggle = () => {
      open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
      const reviewForm = new FormData();
  
      reviewForm.set("rating", rating);
      reviewForm.set("comment", comment);
      reviewForm.set("productId", match.params.id);
  
      dispatch(newReview(reviewForm));
  
      setOpen(false);
    };

    const toBeApproved = () => {
      dispatch(addItemsToApprove(match.params.id, quantity));
      alert.success("Added Utility for addtional review");
    };

    const options = {
      size: "large",
      value: product.ratings,
      readOnly: true,
      precision: 0.5,
    };
    

  return (
    <Fragment>
      {loading? (<Loader/> )
        :
      (<Fragment>
            
      <Metadata title={`${product && product.name}`}/>
      <div className='ProductDetails'>
          <div>
              <Carousel sx={{"height":"100%" , "width":"100%" , "alignItems":"center" , "justifyContent":"center"}}>
                  {
                      product && product.images &&
                      product.images.map((item , i) =>(
                          <img className='CarouselImage'
                          key={item.url}
                          src={item.url}
                          alt={`${i} slide`
                          }
                          />
                      ))
                  }
              </Carousel>
          </div>
          <div>
            <div className="detailsBlock-1">
                  <h2>{product && product.name}</h2>
                  <p>Product # {product._id}</p>
            </div>
            <div className="detailsBlock-2">
                  <Rating {...options} />
                  <span className="detailsBlock-2-span">
                    {" "}
                    ({product && product.numOfReviews} Reviews)
                  </span>
            </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product && product.price}`}</h1>
                <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                      <button onClick={decreaseQuantity}>-</button>
                      <input readOnly value={quantity} type="number"/>
                      <button onClick={increaseQuantity}>+</button>
                    </div>
                    <button onClick={toBeApproved}>To be Approved</button>
                </div>
                <p>
                Status:{" "}
                    <b className={product.Stock < 1 ? "greenColor" : "redColor"}>
                      {product.Stock < 1 ? "All Items Tested" : `${product&&product.Stock} items remains to be tested`}
                    </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product && product.description}</p>
              </div>
              <button disabled={product.Stock<1} onClick={()=>setOpen(!open)} className='submitReview'>Submit Review</button>
  
          </div>
      </div>

      <h3 className="reviewsHeading">REVIEWS</h3>

      <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="inherit">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
  
      {product.reviews && product.reviews[0] ? 
              (
                <div className="reviews">
                  {product.reviews &&
                    product.reviews.map((review) =>(
                      <ReviewCard key={review._id} review={review}/>)
                        )}
                </div>
              )
                :
              (
                <p className='noReviews'>NO REVIEWS YET</p> 
              )
        }
      </Fragment>)}
    </Fragment>
    
  )
}

export default ProductDetails
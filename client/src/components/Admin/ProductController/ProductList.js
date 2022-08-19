import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors, deleteProduct, getAdminProducts } from '../../../actions/productAction';
import Metadata from '../../../component/layout/Metadata';
import { DELETE_PRODUCT_RESET } from '../../../constant/productConstants';
import Sidebar from '../Dashboard/Sidebar';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import LaunchIcon from "@material-ui/icons/Launch";
import './ProductList.css'
import Loader from '../../../component/layout/loader/Loader';


const ProductList = ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { products ,error }= useSelector(state => state.products);
    const { isDeleted ,error:deleteError ,loading:loadingDelete }= useSelector(state => state.productControl);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
      };

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
      
        if (isDeleted) {
            alert.success("Product Deleted Successfully");
            history.push("/admin/dashboard");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }

        dispatch(getAdminProducts());
    
      }, [dispatch ,error , alert ,deleteError,isDeleted]);
    


    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    
        {
          field: "name",
          headerName: "Name",
          minWidth: 175,
          flex: 1,
        },
        {
          field: "stock",
          headerName: "Stock",
          type: "number",
          minWidth: 100,
          flex: 0.3,
        },
    
        {
          field: "price",
          headerName: "Price",
          type: "number",
          minWidth: 200,
          flex: 0.5,
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 200,
          type: "number",
          sortable: false,
          renderCell: (params) => {

            const productId =params.getValue(params.id, "id");

            return (
              <Fragment>
                <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteProductHandler(params.getValue(params.id, "id"))
                  }
                >
                  <DeleteIcon />
                </Button>
                
                <Link to={`/product/${productId}`}>
                    <LaunchIcon />
                </Link>
              </Fragment>
            );
          },
        },
      ];
    
      const rows = [];
    
      products &&
        products.forEach((item) => {
          rows.push({
            id: item._id,
            stock: item.Stock,
            price: item.price,
            name: item.name,
          });
        });
    

  return (
    <Fragment>
      <Metadata title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <Sidebar />
        {
          loadingDelete? (
            <Fragment>
              <Loader/>
            </Fragment>
          ):(
            <div className="productListContainer">
              <h1 id="productListHeading">ALL PRODUCTS AND UTILITIES</h1>

              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            </div>
          )
        }
        
      </div>
    </Fragment>
  )
}

export default ProductList
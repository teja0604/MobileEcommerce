import React, { useState } from "react";
import axios from "axios";


const AdminProduct = () => {
  const [productData, setProductData] = useState({
    pname: "",
    price: "",
    description: "",
    stock: "",
    discount: "",
    discountPrice: "",
    isActive: "",
  });
  const [image, setImage] = useState(null);
  const [apiError, setApiError] = useState(null);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };


  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Store the file object
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image");
      return;
    }

    const disc=productData.price * (productData.discount/100.0);
    productData.discountPrice=productData.price-disc;

    // Create FormData to include the image file
      // Validate required fields
      if (!productData.pname || !productData.price || !productData.description || 
          !productData.stock || !productData.discount) {
        alert("Please fill in all required fields");
        return;
      }

      const formData = new FormData();
      formData.append("name", productData.pname);
      formData.append("description", productData.description);
      formData.append("price", Number(productData.price));
      formData.append("stock", Number(productData.stock));
      formData.append("discount", Number(productData.discount));
      formData.append("discountPrice", Number(productData.discountPrice));
      formData.append("isActive", true);
      formData.append("image", image);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      
      const response = await axios.post("http://localhost:8080/api/products/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        },
        timeout: 10000 // 10 second timeout
      });

      console.log("Response:",response);
      alert("Product added successfully!");
      // Reset form after successful submission
      setProductData({
        pname: "",
        price: "",
        description: "",
        stock: "",
        discount: "",
        discountPrice: "",
        isActive: ""
      });
      setImage(null);
      setApiError(null);
      // Reset the file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      if (error.response) {
        // Server responded with an error
        if (error.response.status === 401 || error.response.status === 403) {
          // Token expired or invalid
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }
        const message = error.response.data.message || error.response.data || 'Server error';
        setApiError(`Error: ${message}`);
        alert(`Failed to add product: ${message}`);
      } else if (error.request) {
        // No response received
        const message = "No response from server. Please check your internet connection and try again.";
        setApiError(message);
        alert(message);
      } else {
        // Error in request setup
        const message = error.message || "Failed to add product. Please try again.";
        setApiError(message);
        alert(message);
      }
      // Reset the file input on error as well
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = "";
      }
    }
  };

  return (
    <div style={{ width: "500px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit} style={main}>
        <center><h2>Add Product</h2></center>
        <div>
          <label><b>Product Name</b>&nbsp;:</label>
          <input
            type="text"
            name="pname"
            value={productData.pname}
            onChange={handleInputChange}
            required
          />
        </div>
        <br/>
        <div>
          <label><b>Price</b>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <br/>
        <div>
          <label><b>Description</b>:</label><br/>
          <textarea
            name="description"
            rows="6"
            cols="60"
            maxLength={2000}
            value={productData.description}
            onChange={handleInputChange}
            required
          />
          <div>{(productData.description || '').length}/2000</div>
        </div>
        <br/>
        <div>
          <label><b>Stock</b>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</label>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleInputChange}
            required
          />
        </div>
        <br/>
        <div>
          <label><b>Discount</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</label>
          <input
            type="number"
            name="discount"
            value={productData.discount}
            onChange={handleInputChange}
            required
          />
        </div>
        <br/>
        {/* <div>
          <label><b>Discount Price</b>:</label>
          <input
            type="number"
            name="discountPrice"
            value={productData.discountPrice}
            onChange={handleInputChange}
            required
          />
        </div> 
        <br/>*/}
        <div>
  <label><b>Is Active</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</label>
  <input
    type="checkbox"
    name="isActive"
    checked={productData.isActive === "true"}
    onChange={(e) =>
      setProductData({ ...productData, isActive: e.target.checked ? "true" : "false" })
    }
  />
</div>

        <br/>
        <div>
          <label><b>Image</b>&nbsp;:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} required />
        </div>
        <br/>
        <center>
        <button type="submit" style={{ height: "40px", width: "150px", backgroundColor: "black", color: "white", border: "0px", borderRadius: "10px" }}>Add Product</button>
        {apiError && <p style={{ color: "red" }}>{apiError}</p>}
        </center>
      </form>
    </div>
  );
};

export default AdminProduct;

const main = {
    width: "500px",
    border: "1px solid black",
    margin: "auto",
    padding: "20px",
    fontSize: "20px",
    borderRadius: "10px",
    position: "relative",
    top: "20px",
  };
  
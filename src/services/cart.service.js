// const httpStatus = require("http-status");
// const { Cart, Product } = require("../models");
// const ApiError = require("../utils/ApiError");
// const config = require("../config/config");
// const { use } = require("passport");

// // TODO: CRIO_TASK_MODULE_CART - Implement the Cart service methods

// /**
//  * Fetches cart for a user
//  * - Fetch user's cart from Mongo
//  * - If cart doesn't exist, throw ApiError
//  * --- status code  - 404 NOT FOUND
//  * --- message - "User does not have a cart"
//  *
//  * @param {User} user
//  * @returns {Promise<Cart>}
//  * @throws {ApiError}
//  */
// const getCartByUser = async (user) => {
//   const Cart = await Cart.findOne({ email: user.email });

//   if (!Cart) {
//     throw new ApiError(httpStatus.NOT_FOUND, "User does not have a cart");
//   }
//   return Cart;
// };

// /**
//  * Adds a new product to cart
//  * - Get user's cart object using "Cart" model's findOne() method
//  * --- If it doesn't exist, create one
//  * --- If cart creation fails, throw ApiError with "500 Internal Server Error" status code
//  *
//  * - If product to add already in user's cart, throw ApiError with
//  * --- status code  - 400 BAD REQUEST
//  * --- message - "Product already in cart. Use the cart sidebar to update or remove product from cart"
//  *
//  * - If product to add not in "products" collection in MongoDB, throw ApiError with
//  * --- status code  - 400 BAD REQUEST
//  * --- message - "Product doesn't exist in database"
//  *
//  * - Otherwise, add product to user's cart
//  *
//  *
//  *
//  * @param {User} user
//  * @param {string} productId
//  * @param {number} quantity
//  * @returns {Promise<Cart>}
//  * @throws {ApiError}
//  */
// const addProductToCart = async (user, productId, quantity) => {
//   // const userCart = await Cart.findOne({ email: user.email });
//   // const productSelected = await Product.findOne({ _id: productId });
//   // if (!productSelected) {
//   //   throw new ApiError(httpStatus.BAD_REQUEST, "Product doesn't exist in database");
//   // }

//   // if (!userCart) {
//   //   try {
//   //     const cartItem = {
//   //       email: user.email,
//   //       cartItems: [{
//   //         product: productSelected,
//   //         quantity: quantity,
//   //       },],
//   //     }
//   //     const newCart = await Cart.create(cartItem);
//   //     return newCart

//   //   } catch (err) {
//   //     throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR)
//   //   }
//   // }
//   // else {
//   //   let temp = await userCart.cartItems.find(item => String(item.product._id) === productId);

//   //   if (temp) {
//   //     throw new ApiError(httpStatus.BAD_REQUEST, "Product already in cart. Use the cart sidebar to update or remove product from cart");
//   //   } else {
//   //     try {
//   //       var objCart = { "product": productSelected, "quantity": quantity };
//   //       await userCart.cartItems.push(objCart);
//   //       await userCart.save()
//   //     } catch (err) {
//   //       throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR)
//   //     }

//   //   }

//   // }

//   // return userCart;
//   if (!cart){
//     try{
//        cart = await Cart.create({
//         email:user.email,
//         cartItems:[],
//         paymentOption:config.default_payment_option,
//         });
//         await cart.save();
//     }catch(e){
//       throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"User cart creation failed");
//     }
//   }


// if(cart.cartItems.some((item)=>item.product._id == productId))
// {
//   throw new ApiError(httpStatus.BAD_REQUEST,"Product already in cart. Use the cart sidebar to update or remove product from cart")
// }

// const product = await Product.findOne({_id:productId})
// if(!product){
//   throw new ApiError(httpStatus.BAD_REQUEST,"product doesn't exist in the database")
// }

// cart.cartItems.push({ product,quantity})
// await cart.save();

// return cart;

// };

// /**
//  * Updates the quantity of an already existing product in cart
//  * - Get user's cart object using "Cart" model's findOne() method
//  * - If cart doesn't exist, throw ApiError with
//  * --- status code  - 400 BAD REQUEST
//  * --- message - "User does not have a cart. Use POST to create cart and add a product"
//  *
//  * - If product to add not in "products" collection in MongoDB, throw ApiError with
//  * --- status code  - 400 BAD REQUEST
//  * --- message - "Product doesn't exist in database"
//  *
//  * - If product to update not in user's cart, throw ApiError with
//  * --- status code  - 400 BAD REQUEST
//  * --- message - "Product not in cart"
//  *
//  * - Otherwise, update the product's quantity in user's cart to the new quantity provided and return the cart object
//  *
//  *
//  * @param {User} user
//  * @param {string} productId
//  * @param {number} quantity
//  * @returns {Promise<Cart>
//  * @throws {ApiError}
//  */
// const updateProductInCart = async (user, productId, quantity) => {
//   var userCart = await Cart.findOne({ email: user.email });
//   const productSelected = await Product.findOne({ _id: productId });
//   if (!productSelected) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Product doesn't exist in database");
//   }

//   if (!userCart) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "User does not have a cart. Use POST to create cart and add a product");
//   }

//   var index = await userCart.cartItems.findIndex(item => String(item.product._id) === productId);
//   // console.log(index) 
//   if(index === -1){
//     throw new ApiError(httpStatus.BAD_REQUEST, "Product not in cart");
//   }
//   userCart.cartItems[index].quantity = quantity;
//   userCart.markModified('cartItems');

//   await userCart.save()
//   // console.log(userCart);
  
//   return userCart;
// };

// /**
//  * Deletes an already existing product in cart
//  * - If cart doesn't exist for user, throw ApiError with
//  * --- status code  - 400 BAD REQUEST
//  * --- message - "User does not have a cart"
//  *
//  * - If product to update not in user's cart, throw ApiError with
//  * --- status code  - 400 BAD REQUEST
//  * --- message - "Product not in cart"
//  *
//  * Otherwise, remove the product from user's cart
//  *
//  *
//  * @param {User} user
//  * @param {string} productId
//  * @throws {ApiError}
//  */
// const deleteProductFromCart = async (user, productId) => {
//   const userCart = await Cart.findOne({ email: user.email });
//   if (!userCart) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "User does not have a cart");
//   }
//   // const productSelected = await Product.findOne({ _id: productId });
//   var deleteId;
//   let temp = await userCart.cartItems.find(item => {
//     if (String(item.product._id) === productId) {
//       deleteId = item._id;
//       return true
//     }
//     return false
//   });
  
//   if (!temp) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Product not in cart");
//   }
//   // await Cart.updateOne({ _id: userCart._id, }, { "$pull": { "cartItems": { "_id": deleteId } } }, { safe: true });
//   await userCart.cartItems.pull({"_id":deleteId});
//   userCart.markModified('cartItems');
//   await userCart.save()

// };
// const checkout = async (user) => {
//   let cart = await Cart.findOne({ email: user.email });
//   if (cart == null) {
//     throw new ApiError(httpStatus.NOT_FOUND, "User does not have a cart");

// }
// }


// module.exports = {
//   getCartByUser,
//   addProductToCart,
//   updateProductInCart,
//   deleteProductFromCart,

// };
const httpStatus = require("http-status");
const { Cart, Product } = require("../models");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");
const { objectId } = require("../validations/custom.validation");

// TODO: CRIO_TASK_MODULE_CART - Implement the Cart service methods

/**
 * Fetches cart for a user
 * - Fetch user's cart from Mongo
 * - If cart doesn't exist, throw ApiError
 * --- status code  - 404 NOT FOUND
 * --- message - "User does not have a cart"
 *
 * @param {User} user
 * @returns {Promise<Cart>}
 * @throws {ApiError}
 */
const getCartByUser = async (user) => {
  const cart = await Cart.findOne({email:user.email})
  if(!cart){
    throw new ApiError(httpStatus.NOT_FOUND,"User does not have a cart")
  }
  return cart;
};

/**
 * Adds a new product to cart
 * - Get user's cart object using "Cart" model's findOne() method
 * --- If it doesn't exist, create one
 * --- If cart creation fails, throw ApiError with "500 Internal Server Error" status code
 *
 * - If product to add already in user's cart, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product already in cart. Use the cart sidebar to update or remove product from cart"
 *
 * - If product to add not in "products" collection in MongoDB, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product doesn't exist in database"
 *
 * - Otherwise, add product to user's cart
 *
 *
 *
 * @param {User} user
 * @param {string} productId
 * @param {number} quantity
 * @returns {Promise<Cart>}
 * @throws {ApiError}
 */
const addProductToCart = async (user, productId, quantity) => {
  let cart = await Cart.findOne({email:user.email});

  if (!cart){
    try{
       cart = await Cart.create({
        email:user.email,
        cartItems:[],
        paymentOption:config.default_payment_option,
        });
        await cart.save();
    }catch(e){
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"User cart creation failed");
    }
  }


if(cart.cartItems.some((item)=>item.product._id == productId))
{
  throw new ApiError(httpStatus.BAD_REQUEST,"Product already in cart. Use the cart sidebar to update or remove product from cart")
}

const product = await Product.findOne({_id:productId})
if(!product){
  throw new ApiError(httpStatus.BAD_REQUEST,"product doesn't exist in the database")
}

cart.cartItems.push({ product,quantity})
await cart.save();

return cart;

};

/**
 * Updates the quantity of an already existing product in cart
 * - Get user's cart object using "Cart" model's findOne() method
 * - If cart doesn't exist, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "User does not have a cart. Use POST to create cart and add a product"
 *
 * - If product to add not in "products" collection in MongoDB, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product doesn't exist in database"
 *
 * - If product to update not in user's cart, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product not in cart"
 *
 * - Otherwise, update the product's quantity in user's cart to the new quantity provided and return the cart object
 *
 *
 * @param {User} user
 * @param {string} productId
 * @param {number} quantity
 * @returns {Promise<Cart>}
 * @throws {ApiError}
 */
const updateProductInCart = async (user, productId, quantity) => {
  
  const cart = await Cart.findOne({email:user.email});

  if (!cart){
  
      throw new ApiError(httpStatus.BAD_REQUEST,"User does not have a cart. Use POST to create cart and add a product");
    
  }


const product = await Product.findOne({_id: productId});

if(!product){
  throw new ApiError(httpStatus.BAD_REQUEST,"Product doesn't exist in database");
}

const productIndex = cart.cartItems.findIndex(item => item.product._id == productId);

 if(productIndex ===-1){
  throw new ApiError(httpStatus.BAD_REQUEST,"Product not in cart")
 }

 cart.cartItems[productIndex].quantity = quantity;

 await cart.save();
 return cart;
}
// if(!productToUpdate){
//   const productToAdd = await Product.findById(productId)
  
//   if(!productToAdd){
//     throw ApiError(httpStatus.BAD_REQUEST,"Product does not exist")
//   }

  // cart.cartItems.push({product:productToAdd,quantity})

// }
// else{
//   throw new ApiError(httpStatus.BAD_REQUEST,"Product already in cart. Use the cart sidebar to update or remove product from cart")
// }



// const newCart = await cart.save();
// return newCart;


const deleteProductFromCart = async (user, productId) => {
  
 const cart = await Cart.findOne({email:user.email});
 if(!cart){
  throw new ApiError(httpStatus.BAD_REQUEST,"User does not have a cart")
 }
 const productIndex = cart.cartItems.findIndex(item => item.product._id == productId);

 if(productIndex ===-1){
  throw new ApiError(httpStatus.BAD_REQUEST,"Product not in cart")
 }

 cart.cartItems.splice(productIndex,1)
 await cart.save();

};





// TODO: CRIO_TASK_MODULE_TEST - Implement checkout function
/**
 * Checkout a users cart.
 * On success, users cart must have no products.
 *
 * @param {User} user
 * @returns {Promise}
 * @throws {ApiError} when cart is invalid
 */
const checkout = async (user) => {
  let cart = await Cart.findOne({ email: user.email });
  if (cart == null) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not have a cart");
  }

  // TODO - Test2
  if (cart.cartItems.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Cart is empty");
  }
  
  // TODO - Test3
  let hasSetNonDefaultAddress = await user.hasSetNonDefaultAddress();
  if (!hasSetNonDefaultAddress) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Address not set");
  }
  // if (user.address == config.default_address) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, "Address not set");
  // }

  // TODO - Test4
  let total = 0;
  for (let i = 0; i < cart.cartItems.length; i++) {
    total += cart.cartItems[i].product.cost * cart.cartItems[i].quantity;
  }

  if (total > user.walletMoney) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User has insufficient money to process"
    );
  }

  // TODO - Test 5
  user.walletMoney -= total;
  await user.save();

  cart.cartItems = [];
  await cart.save();
};

module.exports = {
  getCartByUser,
  addProductToCart,
  updateProductInCart,
  deleteProductFromCart,
  checkout,
};

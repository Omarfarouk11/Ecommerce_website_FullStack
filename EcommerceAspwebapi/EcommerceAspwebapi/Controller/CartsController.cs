using EcommerceAspwebapi.Dtos;
using EcommerceAspwebapi.Models;
using EcommerceAspwebapi.Repositores.CartItemRepository;
using EcommerceAspwebapi.Repositores.CartRepository;
using EcommerceAspwebapi.Repositores.ProductRepo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using System.Security.Claims;
namespace EcommerceAspwebapi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
   public class CartsController : ControllerBase
    {
       private readonly ICartRepo  _cartRepo;
        private readonly ICartItemRepo  _cartItemRepo;
        private readonly IProductRepo  _productRepo;
        public CartsController( ICartRepo cartRepo, ICartItemRepo cartItemRepo, IProductRepo productRepo)
        {
            _cartRepo = cartRepo;
            _cartItemRepo = cartItemRepo;
            _productRepo= productRepo;
        }
        [Authorize]
        [HttpPost("{ProductID}")]
        public async Task<IActionResult> AddItemToCart( int ProductID)
        {
            var UserID =  User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(UserID == null) 
            {
                return BadRequest("User Not Found ... !");
            }
            var cart = await _cartRepo.GetCartOfUserID(UserID);
            if(cart == null)
            {
                cart = new Cart()
                {
                    UserID = UserID,
                    CreatedDate = DateTime.Now,
                };
                await _cartRepo.AdditemToCart(cart);
                var cartitem = new CartItem
                {
                    ProductId = ProductID,
                    Quantity = 1,
                    CartId = cart.Id
                };
                await _cartItemRepo.AdditemToCartItem(cartitem);
            }
            var product =await _productRepo.GetProductByID(ProductID);
            if (product == null)
            {
                return NotFound("Sorry Product Not Found ... !");
            }
            if (cart != null)
            {
                var existitems =  cart.cartItems.FirstOrDefault (p => p.ProductId == product.Id);
                if (cart.cartItems.Count == 0 || existitems==null)
                {
                    var cartitem = new CartItem
                    {
                        ProductId = ProductID,
                        Quantity = 1,
                        CartId = cart.Id
                    };
                    await _cartItemRepo.AdditemToCartItem(cartitem);
                }
                if (existitems != null)
                {   
                    if (await _cartItemRepo.GetCartItem(existitems.Id) != null)
                    {
                        if (existitems.Product.Stock >= 1)
                        {
                            existitems.Quantity += 1;
                            existitems.Product.Stock -= 1;
                            _productRepo.UpdateProduct(product, ProductID);
                            await _cartItemRepo.UpdateCartItem(existitems, existitems.Id);



                        }
                        else
                        {
                            return BadRequest("The Item Not Be Available Now sorry ..");
                        }
                   
                    }
                }
            }
            return Ok("IT IS Added To Cart For User");
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var userID = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userID == null)
            {
                return BadRequest("User Not Found ... !");
            }
            var cart = await _cartRepo.GetCartOfUserID(userID);
            if (cart == null || cart.cartItems == null)
            {
                return Ok(new List<CartItem>());
            }
            var TotalPrice=cart.cartItems.Select(c=>c.Quantity*c.Product.Price).Sum();
            var cartItems = cart.cartItems.Select(ci => new {
                ci.Product.Name,
                ci.Quantity,
                ci.Product.Price,
                ci.Product.ImageUrl,
                TotalPrice,
                ci.Product.Id
            });
            return Ok(cartItems);
        }
        [Authorize]
        [HttpDelete("{ProductId}")]
        public async Task<IActionResult> RemoveFromCart(int ProductId)
        {
            var userID = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userID == null)
            {
                return BadRequest("User Not Found ... !");
            }
            var cart = await _cartRepo.GetCartOfUserID(userID);
            if (cart == null || cart.cartItems == null)
            {
                return Ok(new List<CartItem>());
            }
            var product = await _productRepo.GetProductByID(ProductId);
            if (product == null)
            {
                return NotFound("Sorry Product Not Found ... !");
            }
            var cartItem = cart.cartItems.SingleOrDefault(ci => ci.ProductId == ProductId);
            if (cartItem == null)
            {
                return BadRequest("Product Not Found in Cart ... !");
            }

            await _cartItemRepo.RemoveItem(ProductId, cart);
 
            var TotalPrice = cart.cartItems.Select(c => c.Quantity * c.Product.Price).Sum();
            var cartItems = cart.cartItems.Select(ci => new {
                ci.Product.Name,
                ci.Quantity,
                ci.Product.ImageUrl,
                TotalPrice
            });
            return Ok(cartItems);
        }
        [Authorize]

        [HttpPost("incearse")]
        public async Task<IActionResult> AddQuantity(int productId,int quantity)
        {
            var UserID = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(UserID == null)
            {
               return BadRequest("User Not Found ... !");

            }
            var product = await _productRepo.GetProductByID(productId);
            if (product == null)
            {
                return NotFound("Sorry Product Not Found ... !");
            }
            var cart=await _cartRepo.GetCartOfUserID(UserID);
            if(cart!=null)
            {
                var cartitem=cart.cartItems.SingleOrDefault(p=>p.ProductId==productId);
                if(cartitem== null)
                {
                    return BadRequest("Product Not Found in Cart ... !");
                }
                cartitem.Quantity+= quantity;
                product.Stock -= quantity;
                _productRepo.UpdateProduct(product, productId);
                await _cartItemRepo.UpdateCartItem(cartitem, cartitem.Id);
                
            }
            return Ok("cart_Updated_increase_Quantity");


        }
        [Authorize]

        [HttpPost("decrease")]
        public async Task<IActionResult> RemoveQuantity(int productId, int quantity)
        {
            var UserID = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (UserID == null)
            {
                return BadRequest("User Not Found ... !");

            }
            var product = await _productRepo.GetProductByID(productId);
            if (product == null)
            {
                return NotFound("Sorry Product Not Found ... !");
            }
            var cart = await _cartRepo.GetCartOfUserID(UserID);
            if (cart != null)
            {
                var cartitem = cart.cartItems.SingleOrDefault(p => p.ProductId == productId);
                if (cartitem == null)
                {
                    return BadRequest("Product Not Found in Cart ... !");
                }
                cartitem.Quantity -= quantity;
                product.Stock += quantity;
                _productRepo.UpdateProduct(product, productId);
                await _cartItemRepo.UpdateCartItem(cartitem, cartitem.Id);

            }
            return Ok("cart_Updated_decrease_Quantity");


        }


    }
       
}

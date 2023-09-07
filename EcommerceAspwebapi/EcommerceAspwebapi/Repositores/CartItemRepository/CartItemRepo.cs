using EcommerceAspwebapi.Models;
using EcommerceAspwebapi.Services;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAspwebapi.Repositores.CartItemRepository
{
    public class CartItemRepo:ICartItemRepo
    {
        private readonly ApplicationDbcontext _dbcontext;
        public CartItemRepo(ApplicationDbcontext dbcontext)
        {
            _dbcontext = dbcontext;

        }

        public async Task<CartItem> AdditemToCartItem(CartItem cartItem)
        {

            await _dbcontext.CartItems.AddAsync(cartItem);
            await _dbcontext.SaveChangesAsync();
            return cartItem;
        }

        public async Task<CartItem> GetCartItem(int CartItem)
        {
            var cartitem=await _dbcontext.CartItems.FirstOrDefaultAsync(c=>c.Id== CartItem);
            return cartitem;
        }

        public async Task<CartItem> RemoveItem(int ProductId, Cart cart)
        {
            /*var existitems = cart.cartItems.FirstOrDefault(p => p.ProductId == ProductId);
            if (existitems != null)
            {
               _dbcontext.CartItems.Remove(existitems);
                _dbcontext.SaveChanges();
                return existitems;
            }
            return existitems;*/
            throw  new NotImplementedException();
            

        }

        public async Task<CartItem> UpdateCartItem(CartItem cartItem,int cartID)
        {
            var cartitem=await _dbcontext.CartItems.FirstOrDefaultAsync(c=>c.Id== cartItem.Id);
            if(cartitem != null)
            {
                 _dbcontext.CartItems.Update(cartitem);
                await _dbcontext.SaveChangesAsync();
                return cartitem;
            }
            else
            {

                throw new ArgumentException("Invalid ID");
            }
            
            
        
        }
    }
}

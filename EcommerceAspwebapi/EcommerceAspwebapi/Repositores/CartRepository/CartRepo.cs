using EcommerceAspwebapi.Models;
using EcommerceAspwebapi.Services;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAspwebapi.Repositores.CartRepository
{
    public class CartRepo:ICartRepo
    {
        private readonly ApplicationDbcontext _dbcontext;
        public CartRepo( ApplicationDbcontext dbcontext)
        {
            _dbcontext = dbcontext;

        }

        public async Task<Cart> AdditemToCart(Cart cart)
        {
            await  _dbcontext.Carts.AddAsync(cart);
            await  _dbcontext.SaveChangesAsync();
            return cart;
        }

 
        public async Task <Cart> GetCartOfUserID(string UserID)
        {

            var cart =await _dbcontext.Carts
                       /*.Include(c => c.cartItems).ThenInclude(c=>c.Product)*/
                       .FirstOrDefaultAsync(c => c.UserID == UserID);
            return cart;

        }

      
    }
}

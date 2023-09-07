using EcommerceAspwebapi.Models;
using EcommerceAspwebapi.Services;

namespace EcommerceAspwebapi.Repositores.CartRepository
{
    public interface ICartRepo
    {
          Task <Cart> AdditemToCart(Cart cart);
          Task<Cart> GetCartOfUserID(string UserID);
          
      

    
        
    }
}

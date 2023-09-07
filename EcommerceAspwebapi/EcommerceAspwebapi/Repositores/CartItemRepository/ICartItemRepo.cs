using EcommerceAspwebapi.Models;
using EcommerceAspwebapi.Services;

namespace EcommerceAspwebapi.Repositores.CartItemRepository
{
    public interface ICartItemRepo
    {

        Task<CartItem> AdditemToCartItem(CartItem cartItem);
        Task<CartItem> UpdateCartItem(CartItem cartItem, int cartID);
        Task <CartItem> GetCartItem(int CartItem);
        Task<CartItem> RemoveItem(int ProductId, Cart cart);



    }
}

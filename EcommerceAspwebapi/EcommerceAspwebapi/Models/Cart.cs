namespace EcommerceAspwebapi.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public string UserID { get; set; }  
        public DateTime CreatedDate { get; set; }
        public ICollection<CartItem> cartItems { get; set; }
    }
}

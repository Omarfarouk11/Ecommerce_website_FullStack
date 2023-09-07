namespace EcommerceAspwebapi.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; } // URL to category image
        public ICollection<Product> Products { get; set; }
    }
}

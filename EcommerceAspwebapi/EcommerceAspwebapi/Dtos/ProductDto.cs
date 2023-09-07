using EcommerceAspwebapi.Models;

namespace EcommerceAspwebapi.Dtos
{
    public class ProductDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public IFormFile ImageUrl { get; set; } // URL to product image
        public int CategoryId { get; set; } // Foreign key to Category
    }
}

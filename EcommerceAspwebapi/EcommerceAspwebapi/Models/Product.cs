namespace EcommerceAspwebapi.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public string ImageUrl { get; set; } // URL to product image
        public int CategoryId { get; set; } // Foreign key to Category
        public Category Category { get; set; } // Navigation property



    }
}

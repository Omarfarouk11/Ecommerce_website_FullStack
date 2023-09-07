using EcommerceAspwebapi.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAspwebapi.Services
{
    public class ApplicationDbcontext:IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbcontext(DbContextOptions<ApplicationDbcontext> options) :base(options) { }
        
       
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet <Cart> Carts { get; set; }
        public DbSet <CartItem> CartItems { get; set; }
     





        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
                 
            base.OnModelCreating(modelBuilder);
            var categories = new[]
            {
                new Category { Id = 1,Name= "clothes" ,ImageUrl="Png1"},
                new Category { Id = 2,Name= "electronics" ,ImageUrl="Png2"},
                new Category { Id = 3,Name= "kids" ,ImageUrl="Png3"},
            };
            modelBuilder.Entity<Category>().HasData(categories);
            var products = new[]
            {
                new Product { Id = 1,Name="T-shirt",Price=255,Stock=5,Description="Cotton 100%",ImageUrl="Jpg1",CategoryId=1},
                new Product { Id = 2,Name="CAP",Price=40,Stock=1,Description="Cotton 100%",ImageUrl="Jpg2",CategoryId=1},
                new Product { Id = 3,Name="jacket",Price=500,Stock=2,Description="Cotton 100%",ImageUrl="Jpg3",CategoryId=1},
                new Product { Id = 4,Name="Television",Price=17000,Stock=8,Description="very sutiable for anyone",ImageUrl="Jpg4",CategoryId=2},
                new Product { Id = 5,Name="Air Conditioner",Price=10000,Stock=6,Description="very sutiable for anyone",ImageUrl="Jpg5",CategoryId=2},
                new Product { Id = 6,Name="Iron ",Price=2000,Stock=4,Description="very sutiable for anyone",ImageUrl="Jpg6",CategoryId=2},
                new Product { Id = 7,Name=" Diaper bag ",Price=900,Stock=4,Description="very sutiable for any kid",ImageUrl="Jpg7",CategoryId=3},
                new Product { Id = 8,Name="Pacifier ",Price=25,Stock=3,Description="very sutiable for any kid",ImageUrl="Jpg8",CategoryId=3},
              
            };

            modelBuilder.Entity<Product>().HasData(products);
        }
    }
}

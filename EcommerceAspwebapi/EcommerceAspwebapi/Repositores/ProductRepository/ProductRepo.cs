using EcommerceAspwebapi.Models;
using EcommerceAspwebapi.Repositores.ProductRepo;
using EcommerceAspwebapi.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAspwebapi.Repositores.ProductRepository
{
    public class ProductRepo:IProductRepo
    {
        private readonly ApplicationDbcontext _dbcontext;
        public ProductRepo( ApplicationDbcontext applicationDbcontext)
        {
            _dbcontext = applicationDbcontext;

        }

        public bool AddProduct(Product product)
        {
            _dbcontext.Products.Add(product);
            _dbcontext.SaveChanges();
            return true;

        }

        public bool DeleteProduct(int ProductID)
        {
            var product = _dbcontext.Products.SingleOrDefault(p => p.Id == ProductID);
            if (product != null)
            {
                _dbcontext.Products.Remove(product);
                _dbcontext.SaveChanges();
            }
            return true;

        }

        public IEnumerable<Product> GetProductByCategoryID(int CategoryID)
        {
            return _dbcontext.Products.Where(c => c.CategoryId == CategoryID).ToList();
        }

        public async Task<Product> GetProductByID(int id)
        {
           
            return await _dbcontext.Products.FirstOrDefaultAsync(p => p.Id == id);
        }

        public IEnumerable<Product> GetProducts()
        {
            return _dbcontext.Products.ToList();
        }

        public IEnumerable<Product> SearchaboutProduct(string Word)
        {
            var product=_dbcontext.Products.Where(c=>c.Name.Trim().ToLower().Contains(Word));
            return product.ToList();
           
        }

        public bool UpdateProduct(Product product, int ProductID)
        {
            var prod = _dbcontext.Products.SingleOrDefault(p => p.Id == ProductID);


            if(prod!=null)
            {

                _dbcontext.Products.Update(prod);
                _dbcontext.SaveChanges();
                return true;
            }
           
            return false;



        }
    }
}

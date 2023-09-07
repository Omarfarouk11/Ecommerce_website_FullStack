using EcommerceAspwebapi.Models;

namespace EcommerceAspwebapi.Repositores.ProductRepo
{
    public interface IProductRepo
    {
      Task <Product> GetProductByID (int id);
        IEnumerable<Product> GetProducts ();
        bool AddProduct(Product product);

        bool UpdateProduct(Product product,int ProductID);

        bool DeleteProduct(int ProductID);

        IEnumerable<Product> GetProductByCategoryID(int CategoryID);
        IEnumerable<Product> SearchaboutProduct(string Word);


    }
}

using EcommerceAspwebapi.Models;

namespace EcommerceAspwebapi.Repositores.CategoryRepository
{
    public interface ICategoryRepo
    {
        Category GetCategoryByID(int id);
        IEnumerable<Category> GetCategories();
        bool AddCategory(Category category);

        bool UpdateCategory(Category category, int CategoryID);

        bool DeleteCategory(int CategoryID);
    }
}

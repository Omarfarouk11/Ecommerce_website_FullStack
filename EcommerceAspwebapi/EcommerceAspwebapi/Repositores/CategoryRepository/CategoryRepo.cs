using EcommerceAspwebapi.Models;
using EcommerceAspwebapi.Services;

namespace EcommerceAspwebapi.Repositores.CategoryRepository
{
    public class CategoryRepo : ICategoryRepo
    {
        private readonly ApplicationDbcontext _dbcontext;
        public CategoryRepo(ApplicationDbcontext dbcontext)
        {
            _dbcontext = dbcontext;

        }
        public bool AddCategory(Category category)
        {
            _dbcontext.Categories.Add(category);
            _dbcontext.SaveChanges();
            return true;
         

        }

        public bool DeleteCategory(int CategoryID)
        {
            var category=_dbcontext.Categories.FirstOrDefault(C=>C.Id==CategoryID);
            if(category != null)
            {
                _dbcontext.Categories.Remove(category);
                _dbcontext.SaveChanges();
                return true;
            }
            return false;
        }

        public IEnumerable<Category> GetCategories()
        {
            return _dbcontext.Categories.ToList();
        }

        public Category GetCategoryByID(int id)
        {
            return _dbcontext.Categories.FirstOrDefault(c=>c.Id== id);
            
            
        }

        public bool UpdateCategory(Category category, int CategoryID)
        {
            var updated_category = _dbcontext.Categories.FirstOrDefault(c => c.Id == CategoryID);
            if(updated_category != null)
            {
                _dbcontext.Categories.Update(category);
                _dbcontext.SaveChanges();
                return true;
            }
            else
                return false;
        }
    }
}

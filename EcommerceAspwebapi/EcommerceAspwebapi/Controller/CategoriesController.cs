using EcommerceAspwebapi.Dtos;
using EcommerceAspwebapi.Models;
using EcommerceAspwebapi.Repositores.CategoryRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceAspwebapi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly ICategoryRepo _categoryRepo;
        private readonly List<string> Allow_extention = new List<string> { ".jpg", ".png" };
        private readonly int Max_size = 1048576;
        public CategoriesController(IWebHostEnvironment webHostEnvironment, ICategoryRepo categoryRepo)
        {
            _webHostEnvironment = webHostEnvironment;
            _categoryRepo = categoryRepo;
        }
        [HttpGet("{id}")]
        public IActionResult GetCategoryById(int id)
        {
            var category=_categoryRepo.GetCategoryByID(id);
            return Ok(category);

        }

        [HttpGet]
        public IActionResult Getcategories()
        {
            var categories = _categoryRepo.GetCategories();
            return Ok(categories);
        }
        [HttpPost]
        public async  Task <IActionResult> Addcategory([FromForm]CategoryDto categoryDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("There is error make sure all thing is correct");

            }
            if(categoryDto == null) 
            {
                return BadRequest("Something Error .... !!");
            }
            if (!Allow_extention.Contains(Path.GetExtension(categoryDto.ImageUrl.FileName).ToLower()))
            {
                return BadRequest("only Accept .jpg .png");


            }
            if (Max_size < categoryDto.ImageUrl.Length)
            {
                return BadRequest("The Maximum Size is Allowed is 1MB");
            }
            string folder = "images/";
            folder += Guid.NewGuid().ToString() + "_" + categoryDto.ImageUrl.FileName;
            string serverfolder = Path.Combine(_webHostEnvironment.WebRootPath, folder);
            await categoryDto.ImageUrl.CopyToAsync(new FileStream(serverfolder, FileMode.Create));
            var category = new Category
            {
                Name = categoryDto.Name,
                ImageUrl = folder
            };
            _categoryRepo.AddCategory(category);
            return Ok(category);




        }
        [HttpPut("{categoryId}")]
        public async Task< IActionResult> Updatecategory([FromForm] CategoryDto categoryDto,int categoryId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("There is error make sure all thing is correct");
            }
            var category=_categoryRepo.GetCategoryByID(categoryId);
            if (category == null)
            {
                return BadRequest("This Category not Founded");
            }
            if (categoryDto == null)
            {
                return BadRequest("Something Error .... !!");
            }
            if (!Allow_extention.Contains(Path.GetExtension(categoryDto.ImageUrl.FileName).ToLower()))
            {
                return BadRequest("only Accept .jpg .png");


            }
            if (Max_size < categoryDto.ImageUrl.Length)
            {
                return BadRequest("The Maximum Size is Allowed is 1MB");
            }
            string folder = "images/";
            folder += Guid.NewGuid().ToString() + "_" + categoryDto.ImageUrl.FileName;
            string serverfolder = Path.Combine(_webHostEnvironment.WebRootPath, folder);
            await categoryDto.ImageUrl.CopyToAsync(new FileStream(serverfolder, FileMode.Create));
            category.Name = categoryDto.Name;
            category.ImageUrl = folder;
            _categoryRepo.UpdateCategory(category,categoryId);
            return Ok(category);
            
          


        }

        [HttpDelete ("{CategoryId}")]
        public IActionResult Deletecategory(int CategoryId)
        {
            return Ok(_categoryRepo.DeleteCategory(CategoryId));
        }


    }
}

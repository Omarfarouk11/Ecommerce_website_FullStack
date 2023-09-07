using EcommerceAspwebapi.DataSeeding.Constant;
using EcommerceAspwebapi.Dtos;
using EcommerceAspwebapi.Models;
using EcommerceAspwebapi.Repositores.ProductRepo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceAspwebapi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepo _productRepo;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly int Max_Size = 1048576;
        private readonly List<string> allow_extention = new List<string> { ".jpg", ".png" };
        public ProductsController( IProductRepo productRepo, IWebHostEnvironment webHostEnvironment)
        {
            _productRepo = productRepo;
            _webHostEnvironment = webHostEnvironment;

        }

        [HttpGet]
        public IActionResult GetAllProducts()
        {
           var products= _productRepo.GetProducts();
            return Ok(products);
        }
        [HttpGet ("{ProductID}")]
        public async Task< IActionResult> GetProduct(int ProductID)
        {
           var prod=  await _productRepo.GetProductByID(ProductID);
            if(prod == null)
            {
                return BadRequest("ID is not Found");
            }
            return Ok(prod);

        }
        [HttpGet("{CategoryID}/GetProductByCategory")]
        public IActionResult GetProductByCategoryid(int CategoryID)
        {
            var categories= _productRepo.GetProductByCategoryID(CategoryID);
            return Ok(categories);
        }
        [HttpPost]
        public async Task<IActionResult> Addproduct([FromForm] ProductDto productDto)
        {
            if (productDto == null)
            {
                return BadRequest("Sorry You Must Fill Data First");

            }
            if (!allow_extention.Contains(Path.GetExtension(productDto.ImageUrl.FileName).ToLower()))
            {
                return BadRequest("only Accept .jpg .png");
            }
            if (productDto.ImageUrl.Length > Max_Size)
            {
                return BadRequest("The Maximum Size is Allowed is 1MB");
            }
            string folder = "images/";
            folder += Guid.NewGuid().ToString() + "_" + productDto.ImageUrl.FileName;
            string serverfolder = Path.Combine(_webHostEnvironment.WebRootPath, folder);
            await productDto.ImageUrl.CopyToAsync(new FileStream(serverfolder, FileMode.Create));

            var product = new Product
            {
                Name = productDto.Name,
                Price = productDto.Price,
                Stock = productDto.Stock,
                ImageUrl = folder,
                Description = productDto.Description,
                CategoryId=productDto.CategoryId,
                
                
            };
            _productRepo.AddProduct(product);
            return Ok(product);
        }
        [HttpPut("{prodID}")]
        public async Task<IActionResult> updateproduct([FromForm] ProductDto productDto,int prodID)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Model is invalid sorry");
            }
            if (productDto == null)
            {
                return BadRequest("Sorry You Must Fill Data First");

            }
            if (!allow_extention.Contains(Path.GetExtension(productDto.ImageUrl.FileName).ToLower()))
            {
                return BadRequest("only Accept .jpg .png");
            }
            if (productDto.ImageUrl.Length > Max_Size)
            {
                return BadRequest("The Maximum Size is Allowed is 1MB");
            }
            string folder = "images/";
            folder += Guid.NewGuid().ToString() + "_" + productDto.ImageUrl.FileName;
            string serverfolder = Path.Combine(_webHostEnvironment.WebRootPath, folder);
            await productDto.ImageUrl.CopyToAsync(new FileStream(serverfolder, FileMode.Create));

            var prod=await _productRepo.GetProductByID(prodID);
            if (prod != null) {
                prod.Id= prodID;
                prod.Price= productDto.Price;
                prod.Name   = productDto.Name;
                prod.ImageUrl = folder;
                prod.Description = productDto.Description;
                prod.CategoryId= productDto.CategoryId;
                prod.Stock= productDto.Stock;
                _productRepo.UpdateProduct(prod, prodID);
               


            }

            return Ok(prod);
        }
        [HttpDelete("{ProductID}")]
        public IActionResult deleteProduct(int ProductID)
        {
            var product = _productRepo.DeleteProduct(ProductID);
            return Ok(product);
        }
        [HttpGet("search")]
        public IActionResult GetProductSearch(string word)
        {
           var product= _productRepo.SearchaboutProduct( word);
            return Ok(product);
        }

    }
}

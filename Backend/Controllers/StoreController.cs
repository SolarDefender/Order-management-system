using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models.DTOs.Product;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly StoreContext _storeContext;
        public StoreController(StoreContext context)
        {
            _storeContext = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetProducts([FromQuery] int page = 1, int pageSize = 10)
        {
            if (_storeContext.Products == null)
                return NotFound();
            int skip = (page - 1) * pageSize;
            var products = await _storeContext.Products
                .Select(p => new ProductGET
                {
                    IdProduct = p.IdProduct,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    Amount = p.Amount
                })
                .Skip(skip)
                .Take(pageSize)
                .ToListAsync();
            return Ok(products);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductGET>> GetProduct(int id)
        {
            if (_storeContext.Products == null)
                return NotFound();
            var product = await _storeContext.Products.FindAsync(id);
            if (product == null)
                return NotFound();
            return Ok(new ProductGET
            {
                IdProduct = product.IdProduct,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Amount = product.Amount
            });
        }

        [HttpPost]
        public async Task<ActionResult> AddProduct(ProductPOST product)
        {
            _storeContext.Products.Add(new Product
            {
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Amount = product.Amount
            });
            await _storeContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProductGET>> UpdateProduct(int id, [FromBody] ProductPUT newProduct)
        {
            if (newProduct == null)
            {
                return BadRequest("Invalid payload");
            }

            var existingProduct = await _storeContext.Products.FindAsync(id);

            if (existingProduct == null)
            {
                return NotFound();
            }

            // Update only the properties that are provided in the DTO
            if (newProduct.Name != null)
            {
                existingProduct.Name = newProduct.Name;
            }

            if (newProduct.Description != null)
            {
                existingProduct.Description = newProduct.Description;
            }

            if (newProduct.Price.HasValue)
            {
                existingProduct.Price = newProduct.Price.Value;
            }

            if (newProduct.Amount.HasValue)
            {
                existingProduct.Amount = newProduct.Amount.Value;
            }

            await _storeContext.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id) 
        {


            return Ok();
        }

    }
}

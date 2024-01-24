using Backend.Data;
using Backend.Models.DTOs.Order;
using Backend.Models.DTOs.Product;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly StoreContext _storeContext;
        public OrderController(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        [HttpGet]
        public async Task<ActionResult> GetOrders()
        {
            if (_storeContext.Orders == null)
                return NotFound();
            var orders = await _storeContext.Orders
               .Select(o => new OrdersGET
                {
                    IdOrder=o.IdOrder,
                    CreatedAt=o.CreatedAt,
                    Status=o.Status,
                    user= new OrderGETUser
                    {
                        IdUser=o.user.IdUser,
                        FirstName=o.user.FirstName,
                        LastName=o.user.LastName,   
                    }
                })
                .ToListAsync();
            return Ok(orders);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<OrdersGET>> GetOrder(int id)
        {
            if (_storeContext.Orders == null)
                return NotFound();

            var products = await _storeContext.ProductOrders
                .Where(po => po.IdOrder == id)
                .Select(po => new ProductOrderGET
                {
                    IdProduct = po.Product.IdProduct,
                    Name = po.Product.Name,
                    Description = po.Product.Description,
                    Price = po.Product.Price,
                    Amount = po.Amount
                })
                .ToListAsync();
                ;
            var order = await _storeContext.Orders
                .Where(o=> o.IdOrder==id)
                .Select(o => new OrderGET
                {
                    IdOrder = o.IdOrder,
                    CreatedAt = o.CreatedAt,
                    Status = o.Status,
                    user = new OrderGETUser
                    {
                        IdUser = o.user.IdUser,
                        FirstName = o.user.FirstName,
                        LastName = o.user.LastName,
                    },
                    Products=products
                    
                })
                .FirstAsync();
            
            if (order == null)
                return NotFound();
               
            return Ok(order);
        }
    }
}

using Backend.Data;
using Backend.Models;
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
                   IdOrder = o.IdOrder,
                   CreatedAt = o.CreatedAt,
                   Status = o.Status,
                   user = new OrderGETUser
                   {
                       IdUser = o.user.IdUser,
                       FirstName = o.user.FirstName,
                       LastName = o.user.LastName,
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
                .Where(o => o.IdOrder == id)
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
                    Products = products

                })
                .FirstAsync();

            if (order == null)
                return NotFound();

            return Ok(order);
        }
        [HttpPost]
        public async Task<ActionResult> AddOrder(OrderPOST order)
        {
            if (order == null) return BadRequest();
            if (order.Products == null) return BadRequest();
            using (var transaction = _storeContext.Database.BeginTransaction())
            {
                try
                {
                    var originalUser = await _storeContext.Users.FindAsync(order.IdUser);
                    var newOrder = new Order
                    {
                        CreatedAt = DateOnly.FromDateTime(DateTime.Now),
                        Status = order.Status,
                        IdUser = order.IdUser,
                        user = originalUser

                    };
                    _storeContext.Orders.Add(newOrder);
                    await _storeContext.SaveChangesAsync();

                    foreach (var product in order.Products)
                    {
                        var originalProduct = await _storeContext.Products.FindAsync(product.IdProduct);
                        if (originalProduct == null)
                            throw new Exception("Product not found");
                        var newProduct = new ProductOrder
                        {
                            IdOrder = newOrder.IdOrder,
                            IdProduct = product.IdProduct,
                            Amount = product.Amount,
                            Order = newOrder,
                            Product = originalProduct
                        };

                        originalProduct.Amount -=product.Amount;

                        if (originalProduct.Amount < 0)
                            throw new Exception("Not enough product amount in stock. Product id: "+ originalProduct.IdProduct+" Amount in stock");

                        _storeContext.ProductOrders.Add(newProduct);
                    }
                    await _storeContext.SaveChangesAsync();

                    transaction.Commit();
                    return Ok();
                }
                catch (Exception e)
                {
                    transaction.Rollback();
                    return StatusCode(500, "Internal Server Error:  "+e.Message);
                }
            }
        }

       /* [HttpPut("{id}")]
        public async Task<ActionResult> AddOrder(int id, [FromBody] OrderPUT order)
        {
            if (order == null) return BadRequest();
            if (order.Products == null) return BadRequest();
            using (var transaction = _storeContext.Database.BeginTransaction())
            {
                try
                {
                    var originalUser = await _storeContext.Users.FindAsync(order.IdUser);
                    var newOrder = new Order
                    {
                        CreatedAt = DateOnly.FromDateTime(DateTime.Now),
                        Status = order.Status,
                        IdUser = order.IdUser,
                        user = originalUser

                    };
                    _storeContext.Orders.Add(newOrder);
                    await _storeContext.SaveChangesAsync();

                    foreach (var product in order.Products)
                    {
                        var originalProduct = await _storeContext.Products.FindAsync(product.IdProduct);
                        if (originalProduct == null)
                            throw new Exception("Product not found");
                        var newProduct = new ProductOrder
                        {
                            IdOrder = newOrder.IdOrder,
                            IdProduct = product.IdProduct,
                            Amount = product.Amount,
                            Order = newOrder,
                            Product = originalProduct
                        };

                        originalProduct.Amount -= product.Amount;

                        if (originalProduct.Amount < 0)
                            throw new Exception("Not enough product amount in stock. Product id: " + originalProduct.IdProduct + " Amount in stock");

                        _storeContext.ProductOrders.Add(newProduct);
                    }
                    await _storeContext.SaveChangesAsync();

                    transaction.Commit();
                    return Ok();
                }
                catch (Exception e)
                {
                    transaction.Rollback();
                    return StatusCode(500, "Internal Server Error:  " + e.Message);
                }
            }
        }*/
    }
}

using Backend.Data;
using Backend.Models;
using Backend.Models.DTOs.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly StoreContext _storeContext;

        public UserController(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        [HttpGet]
        public async Task<ActionResult> GetUsers()
        {
            var users = await _storeContext.Users
                .Select(u => new UserGET
                {
                    IdUser = u.IdUser,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    PhoneNum = u.PhoneNum,
                    Role = u.Role.Title
                }).ToListAsync();


            return Ok(users);
        }
        [Route("login")]
        [HttpPost]
        public async Task<ActionResult<int>> checkUser(UserAuthPOST userInput)
        {
            var user = await _storeContext.Users
                .Where(u => u.Email == userInput.Email && u.Password == userInput.Password).FirstOrDefaultAsync();

            if (user == null)
                return NotFound();

            return Ok(user.IdUser);
        }

        [HttpPost]
        public async Task<ActionResult> AddUser(UserPOST user)
        {
            var role = await _storeContext.Roles.Where(r => r.Title == "User").FirstOrDefaultAsync();

            if (role == null)
                return NotFound("No such role: " + role);

            var newUser = new User
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNum = user.PhoneNum,
                Password = user.Password,
                IdRole = role.IdRole,
                Role = role
            };
            _storeContext.Users.Add(newUser);
            await _storeContext.SaveChangesAsync();
            return Ok();
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> updateUser(int id, [FromBody] UserPUT newUser)
        {
            if (newUser == null)
                return BadRequest();

            var originalUser = await _storeContext.Users.FindAsync(id);

            if (originalUser == null)
                return BadRequest("Wrong id of user");

            if (newUser.FirstName != null)
                originalUser.FirstName = newUser.FirstName;

            if (newUser.LastName != null)
                originalUser.LastName = newUser.LastName;

            if (newUser.Email != null)
                originalUser.Email = newUser.Email;

            if (newUser.PhoneNum != null)
                originalUser.PhoneNum = (int)newUser.PhoneNum;

            if (newUser.Password != null)
                originalUser.Password = newUser.Password;

            if (newUser.Role != null)
            {
                var role = await _storeContext.Roles.Where(r => r.Title == newUser.Role).FirstOrDefaultAsync();
                originalUser.IdRole = role.IdRole;
                originalUser.Role = role;
            }

            await _storeContext.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> deleteUser(int id)
        {
            var user = await _storeContext.Users.FindAsync(id);
            if (user == null) return NotFound();


            var ordersToDelete = await _storeContext.Orders.Where(o => o.user == user).ToListAsync();
            if (ordersToDelete != null)
            {
                foreach (var order in ordersToDelete)
                {

                    var productOrdersToDelete = _storeContext.ProductOrders
                           .Where(po => po.IdOrder == id)
                           .ToList();
                    if (productOrdersToDelete.Count != 0)
                        _storeContext.ProductOrders.RemoveRange(productOrdersToDelete);
                }

                _storeContext.Orders.RemoveRange(ordersToDelete);
            }

            _storeContext.Users.Remove(user);

            await _storeContext.SaveChangesAsync();

            return Ok();
        }



    }
}

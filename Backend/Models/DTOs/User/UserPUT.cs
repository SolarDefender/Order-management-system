namespace Backend.Models.DTOs.User
{
    public class UserPUT
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int? PhoneNum { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }
    }
}

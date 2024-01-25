namespace Backend.Models.DTOs.User
{
    public class UserGET
    {
        public int IdUser { get; set; }

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public int PhoneNum { get; set; }

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string Role { get; set; }
    }
}

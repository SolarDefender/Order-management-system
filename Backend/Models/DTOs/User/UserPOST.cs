namespace Backend.Models.DTOs.User
{
    public class UserPOST
    {
        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public int PhoneNum { get; set; }

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;
    }
}

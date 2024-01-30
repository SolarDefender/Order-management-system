namespace Backend.Models.DTOs.User
{
    public class UserAuthPOST
    {
        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;
    }
}

namespace Backend.Models.DTOs.Order
{
    public class OrderGETUser
    {
        public int IdUser { get; set; }

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

    }
}

namespace Backend.Models.DTOs.Order
{
    public class ProductOrderGET
    {
        public int IdProduct { get; set; }

        public string Name { get; set; } = null!;

        public string Description { get; set; } = null!;

        public decimal Price { get; set; }

        public int Amount { get; set; }
    }
}

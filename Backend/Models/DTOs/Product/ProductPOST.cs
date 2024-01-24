namespace Backend.Models.DTOs.Product
{
    public class ProductPOST
    {
        public string Name { get; set; } = null!;

        public string Description { get; set; } = null!;

        public decimal Price { get; set; }

        public int Amount { get; set; }
    }
}

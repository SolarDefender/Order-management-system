namespace Backend.Models.DTOs.Product
{
    public class ProductPUT
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal? Price { get; set; }
        public int? Amount { get; set; }
    }
}

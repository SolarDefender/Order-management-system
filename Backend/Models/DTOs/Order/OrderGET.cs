namespace Backend.Models.DTOs.Order
{
    public class OrderGET
    {
        public int IdOrder { get; set; }

        public DateOnly CreatedAt { get; set; }

        public string Status { get; set; } = null!;

        public virtual OrderGETUser user { get; set; } = null!;

        public virtual ICollection<ProductOrderGET> Products { get; set; } = new List<ProductOrderGET>();
    }
}

namespace Backend.Models.DTOs.Order
{
    public class OrderPOST
    {
        public string Status { get; set; } = null!;

        public int IdUser { get; set; }

        public virtual ICollection<ProductOrderPOST> Products { get; set; } = new List<ProductOrderPOST>();
    }
}

using Backend.Models;
namespace Backend.Models.DTOs.Order
{
    public class ProductOrderPOST
    {
        public int IdProduct { get; set; }

        public int Amount { get; set; }

    }
}

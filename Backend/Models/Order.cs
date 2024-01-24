using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Order
{
    public int IdOrder { get; set; }

    public DateOnly CreatedAt { get; set; }

    public string Status { get; set; } = null!;

    public int IdUser { get; set; }

    public virtual User user { get; set; } = null!;

    public virtual ICollection<ProductOrder> Products { get; set; } = new List<ProductOrder>();
}

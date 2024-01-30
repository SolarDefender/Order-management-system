using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Product
{
    public int IdProduct { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public decimal Price { get; set; }

    public int Amount { get; set; }

    public virtual ICollection<ProductOrder> Orders { get; set; } = new List<ProductOrder>();
}

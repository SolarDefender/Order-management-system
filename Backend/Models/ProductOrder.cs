using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class ProductOrder
{
    public int IdProduct { get; set; }

    public int IdOrder { get; set; }

    public int Amount { get; set; }

    public virtual Order Order { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}

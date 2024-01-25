using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class User
{
    public int IdUser { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public int PhoneNum { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int IdRole { get; set; }

    public virtual Role Role { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}

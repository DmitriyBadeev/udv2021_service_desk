using System;
using Microsoft.AspNetCore.Identity;

namespace ServiceDesk.Identity.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        
        public string LastName { get; set; }

        public string Patronymic { get; set; }

        public bool IsBanned { get; set; }

        public DateTime BanDate { get; set; }
        
        public DateTime RegisterDate { get; set; }

        public ClientUser ClientUser { get; set; }
    }
}
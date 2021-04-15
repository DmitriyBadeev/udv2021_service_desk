using System;

namespace ServiceDesk.Identity.Controllers.Profile.dto
{
    public class UserDataDto
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Patronymic { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public DateTime RegisterDate { get; set; }
        public bool IsBanned { get; set; }
        public DateTime BanDate { get; set; }
        public int? ClientId { get; set; }
        public bool CanEdit { get; set; }
    }
}
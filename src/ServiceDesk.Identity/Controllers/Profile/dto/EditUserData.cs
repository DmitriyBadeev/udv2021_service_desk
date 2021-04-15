namespace ServiceDesk.Identity.Controllers.Profile.dto
{
    public class EditUserData
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Patronymic { get; set; }
        public string Email { get; set; }
    }
}
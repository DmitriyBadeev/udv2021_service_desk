namespace ServiceDesk.Identity.Controllers.Registration.dto
{
    public class CustomerRegistrationDto
    {
        public string Email { get; set; }  
        public string LastName { get; set; }  
        public string FirstName { get; set; }  
        public string Patronymic { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public int ClientId { get; set; }
    }
}
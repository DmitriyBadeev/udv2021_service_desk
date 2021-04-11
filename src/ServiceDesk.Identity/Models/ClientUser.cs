namespace ServiceDesk.Identity.Models
{
    public class ClientUser
    {
        public int Id { get; set; }

        public string UserId { get; set; }
        
        public ApplicationUser User { get; set; }

        public int ClientId { get; set; }
    }
}
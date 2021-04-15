namespace ServiceDesk.Identity.Controllers.Profile.dto
{
    public class ChangePasswordData
    {
        public string UserId { get; set; }
        
        public string NewPassword { get; set; }

        public string OldPassword { get; set; }
    }
}
namespace ServiceDesk.Api.Systems.RequestSystem.Dtos.Request
{
    public class RequestCreateDto
    {
        public string Theme { get; set; }
        public string Text { get; set; }
        public int ClientId { get; set; }
        
        public string DeveloperRepresentativeId { get; set; }
        public int? SoftwareModuleId { get; set; }
    }
}

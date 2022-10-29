namespace TaskTracker.API.Responses
{
    public class APIError
    {
        public string Version { get; set; }
        public string StatusCode { get; set; }
        public string ErrorMessage { get; set; }
    }
}

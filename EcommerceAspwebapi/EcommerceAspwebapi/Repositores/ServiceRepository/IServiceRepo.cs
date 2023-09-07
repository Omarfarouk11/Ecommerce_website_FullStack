using EcommerceAspwebapi.Models;

namespace EcommerceAspwebapi.Repositores.ServiceRepository
{
    public interface IServiceRepo
    {
        Task<AuthModel> Registerasync(Register model);
         string GenerateToken(ApplicationUser user, List<string> roles);
        Task<AuthModel> LoginAsync(Login model);
        List<string> DetermineRoles(string email);
    }
}

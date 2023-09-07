using EcommerceAspwebapi.Models;
using Microsoft.AspNetCore.Identity;
using System.Data;

namespace EcommerceAspwebapi.DataSeeding
{
    public class UserSeeding
    {
        public static async Task userSeedData(IServiceProvider serviceProvider)

        { 
            var usermanager=serviceProvider.GetService<UserManager<ApplicationUser>>();
            var rolemanager=serviceProvider.GetService<RoleManager<IdentityRole>>();
            await rolemanager.CreateAsync(new IdentityRole("Admin"));
            await rolemanager.CreateAsync(new IdentityRole("User"));
            var Admin = new ApplicationUser
            {
                Firstname="omar",
                Lastname="farouk",
                Address="new cairo",
                City="new Cairo",
                Country="egypt",
                Email = "Test@test1010.com",
                UserName = "Test@test1010.com"


            };
            var userisExistsinDB = await usermanager.FindByEmailAsync(Admin.Email);
            if (userisExistsinDB == null)
            {
                await usermanager.CreateAsync(Admin, "Test@123");
                await usermanager.AddToRoleAsync(Admin, "Admin");
            }


        }
    }
}

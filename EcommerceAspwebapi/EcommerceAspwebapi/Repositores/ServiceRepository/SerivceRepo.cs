using EcommerceAspwebapi.DataSeeding.Constant;
using EcommerceAspwebapi.Helper;
using EcommerceAspwebapi.Models;
using EcommerceAspwebapi.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EcommerceAspwebapi.Repositores.ServiceRepository
{
    public class SerivceRepo : IServiceRepo
    {
        private readonly JWT _jwt;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public SerivceRepo(UserManager<ApplicationUser> usermanager,RoleManager<IdentityRole> rolemanager,IOptions<JWT> jwt )
        {
            _userManager = usermanager;
            _roleManager = rolemanager;
            _jwt = jwt.Value;

        }

        public List<string> DetermineRoles(string email)
        {
            string domain = email.Split('@')[1];

            if (domain == "mycompany.com")
            {
                return new List<string> { ConstantRoles.Admin, ConstantRoles.User };
            }
            else
            {
                return new List<string> { ConstantRoles.User };
            }

        }

        public string GenerateToken(ApplicationUser user, List<string> roles)
        {

            var Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var creds = new SigningCredentials(Key, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim (ClaimTypes.NameIdentifier, user.Id),
                new Claim (ClaimTypes.StreetAddress, user.Address),
                new Claim (ClaimTypes.Email, user.Email),
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            var token = new JwtSecurityToken(
                                    issuer: _jwt.Issuer,
                                    audience: _jwt.Audience,
                                    claims,
                                    expires: DateTime.Now.AddDays(_jwt.Duration_in_day),
                                    signingCredentials: creds
                                );


            return new JwtSecurityTokenHandler().WriteToken(token); ;
        }

        public async Task<AuthModel> LoginAsync(Login model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user is null || !await _userManager.CheckPasswordAsync(user, model.Password))
            {
                return new AuthModel { message = "Email Or Password Is InCorrect" };

            }

            List<string> roles = DetermineRoles(user.Email);
            var Token = GenerateToken(user, roles);
            var Authmodel = new AuthModel
            {
                isAuthnticated = true,
                email = user.Email,
                roles = roles,
                token = Token,
                username=user.UserName
            };
             return Authmodel;
        }

        public async Task<AuthModel> Registerasync(Register model)
        {


            var user = await _userManager.FindByEmailAsync(model.email);
            if (user != null)
            {
                return new AuthModel { message = "Email Is Already Registered" };

            }
            var username = await _userManager.FindByNameAsync(model.username);
            if (username != null)
            {
                return new AuthModel { message = "Username Is Already Registered" };

            }
            var appuser = new ApplicationUser
            {
                Firstname = model.Firstname,
                Lastname = model.Lastname,
                Email = model.email,
                UserName = model.username,
                Address=model.Address,
                City=model.City,
                Country=model.Country,
                
            };
            var result = await _userManager.CreateAsync(appuser, model.password);
            if (!result.Succeeded)
            {
                string err = string.Empty;
                foreach (var e in result.Errors)
                {
                    err += $"{e.Description} , ";

                }
                return new AuthModel { message = err };

            }
            List<string> roles = DetermineRoles(appuser.Email);

            foreach (string role in roles)
            {
                await _userManager.AddToRoleAsync(appuser, role);
            }

            var Token = GenerateToken(appuser, roles);
            return new AuthModel { token = Token, message = "Your are Registered Successfully", isAuthnticated = true, email = appuser.Email, username = appuser.UserName, roles = roles };

        }
    }
}

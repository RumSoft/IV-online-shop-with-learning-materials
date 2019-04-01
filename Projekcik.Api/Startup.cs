using System;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Projekcik.Api.Models;
using Projekcik.Api.Services;
using Swashbuckle.AspNetCore.Swagger;

namespace Projekcik.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public const string cors_policy = "MyPolicy";

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            services.AddDbContext<DataContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddMvc(c => { c.Filters.Add(new JsonExceptionFilter()); })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "ProjekcikApi", Version = "v2137" });
            });

            var secret = "TODO:SecretInAppSettings";
            var key = Encoding.ASCII.GetBytes(secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(x =>
                {
                    x.Events = new JwtBearerEvents
                    {
                        OnTokenValidated = context =>
                        {
                            var userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
                            var userId = Guid.Parse(context.Principal.Identity.Name);
                            var user = userService.GetById(userId);
                            if (user == null)
                            {
                                // return unauthorized if user no longer exists
                                context.Fail("Unauthorized");
                            }
                            return Task.CompletedTask;
                        }
                    };
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IHashService, PlaintextHashService>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseAuthentication();

            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            app.UseSwagger(c =>
            {

            }).UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Projekcik api");
            });

            app.UseCors(x => x.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
            app.UseMvc();


            if (env.IsDevelopment())
                app.UseSpa(spa =>
                {
                    spa.Options.SourcePath = "../Projekcik.Client";
                    spa.UseReactDevelopmentServer("start");
                });

            Mapper.Initialize(x => x.AddProfile(new AutoMapperProfile()));

            app.UseDefaultFiles();
            app.UseStaticFiles();
        }
    }

    public class JsonExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            var result = new ObjectResult(new
            {
                code = 500,
                message = "A server error occurred.",
                detailedMessage = context.Exception.Message
            })
            {
                StatusCode = 500
            };

            context.Result = result;
        }
    }
}
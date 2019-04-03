using System;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Projekcik.Api.Helpers;
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
            services.AddDbContext<DataContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));


            services.AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Token:Key"])),
                        ValidIssuer = Configuration["Token:Issuer"],
                        ValidAudience = Configuration["Token:Audience"],
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };
                });

            services.AddMvc(c => { c.Filters.Add(new JsonExceptionFilter()); })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddCors();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "ProjekcikApi", Version = "v2137" });
            });

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IHashService, PlaintextHashService>();
            services.AddSingleton<ITokenIssuer, TokenIssuer>(provider => new TokenIssuer
            {
                SecurityKey = Configuration["Token:Key"],
                Audience = Configuration["Token:Audience"],
                Issuer = Configuration["Token:Issuer"]
            });
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
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
}
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using AutoMapper;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Projekcik.Api.Helpers;
using Projekcik.Api.Models;
using Projekcik.Api.Models.DTO;
using Projekcik.Api.Services;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Projekcik.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddJwtAuthentication(Configuration);

            services.AddMvc(c =>
                {
                    c.Filters.Add(new JsonExceptionFilter());
                    c.Filters.Add(typeof(ValidateModelStateAttribute));
                })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddFluentValidation(fv => { fv.RegisterValidatorsFromAssemblyContaining<AuthDtoValidator>(); });

            services.Configure<ApiBehaviorOptions>(options => { options.SuppressModelStateInvalidFilter = true; });

            services.AddCors();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info {Title = "ProjekcikApi", Version = "v2137"});
                c.AddSecurityDefinition("Bearer", new ApiKeyScheme()
                {
                    Description = "Wrzuć token w poniższe pole w formacie: 'Bearer TOKEN'",
                    Name = "Authorization",
                    In = "header",
                    Type = "apiKey"
                });
                c.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>>
                {
                    { "Bearer", new string[] { } }
                });
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });


            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IHashService, PBKDF2HashSerivce>();
            services.AddScoped<INoteService, NoteService>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseAuthentication();

            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            app.UseSwagger(c => { }).UseSwaggerUI(c =>
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
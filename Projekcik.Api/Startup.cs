using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
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

            services.AddMvc(c => { c.Filters.Add(new JsonExceptionFilter()); })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "ProjekcikApi", Version = "v2137" });
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

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
using AutoMapper;
using Projekcik.Api.Models.DTO;

namespace Projekcik.Api.Models
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            UserDto.ConfigureMapper(this);
            RegisterDto.ConfigureMapper(this);
        }
    }
}

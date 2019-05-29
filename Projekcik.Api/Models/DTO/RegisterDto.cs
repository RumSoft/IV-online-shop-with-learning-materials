using AutoMapper;
using FluentValidation;
using FluentValidation.Attributes;

namespace Projekcik.Api.Models.DTO
{
    [Validator(typeof(RegisterDtoValidator))]
    public class RegisterDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }

        public static void ConfigureMapper(Profile mapper)
        {
            mapper.CreateMap<RegisterDto, User>()
                .ForMember(dest => dest.EmailAddress, opt => opt.MapFrom(src => src.EmailAddress))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
                .ForAllOtherMembers(opt => opt.Ignore());

            mapper.CreateMap<User, RegisterDto>()
                .ForMember(dest => dest.EmailAddress, opt => opt.MapFrom(src => src.EmailAddress))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
                .ForAllOtherMembers(opt => opt.Ignore());
        }
    }

    public class RegisterDtoValidator : AbstractValidator<RegisterDto>
    {
        public RegisterDtoValidator()
        {
            RuleFor(x => x.EmailAddress)
                .NotEmpty()
                .EmailAddress()
                .MinimumLength(6)
                .MaximumLength(250);

            RuleFor(x => x.Password)
                .NotEmpty()
                .MinimumLength(6)
                .MaximumLength(256);

            RuleFor(x => x.FirstName)
                .NotEmpty()
                .MinimumLength(2)
                .MaximumLength(50);

            RuleFor(x => x.LastName)
                .NotEmpty()
                .MinimumLength(2)
                .MaximumLength(50);

            RuleFor(x => x.UserName)
                .NotEmpty()
                .MinimumLength(4)
                .MaximumLength(50);
        }
    }

}
using FluentValidation;
using FluentValidation.Attributes;

namespace Projekcik.Api.Models.DTO
{
    [Validator(typeof(AuthDtoValidator))]
    public class AuthDto
    {
        public string EmailAddress { get; set; }
        public string Password { get; set; }
    }

    public class AuthDtoValidator : AbstractValidator<AuthDto>
    {
        public AuthDtoValidator()
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
        }
    }
}

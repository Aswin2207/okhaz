using Microsoft.Extensions.DependencyInjection;

namespace Okhaz.AppInterfaces
{
    public interface IModule
    {
        void Load(IServiceCollection services);
    }
}

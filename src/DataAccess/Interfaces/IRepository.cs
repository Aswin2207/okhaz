using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class
    {
        List<TEntity> GetWithPagination(int index, int count, string orderCol, int sortOrder, Expression<Func<TEntity, bool>> filter);
        TEntity GetById(object id);
        List<TEntity> Get(
        Expression<Func<TEntity, bool>> filter = null,
        Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
        string includeProperties = "");
        List<TEntity> GetWithRawSql(string query,
        params object[] parameters);
        void Insert(TEntity obj);
        void InsertMany(IEnumerable<TEntity> obj);
        void Update(TEntity obj);
        void Delete(object id);
        void Save();
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Data;
using DataAccess.Interfaces;
using DataAccess.DataModel;

using Microsoft.EntityFrameworkCore;

namespace DataAccess.DAL
{
    public class BaseRepository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        internal DataContext context;
        internal DbSet<TEntity> dbSet;

        public BaseRepository()
        {
            this.context = new DataContext();
            this.dbSet = context.Set<TEntity>();
        }

        public List<TEntity> GetWithRawSql(string query,
            params object[] parameters)
        {
            return null;
            return dbSet.FromSqlRaw(query, parameters).ToList();
        }


        public virtual List<dynamic> GetWithGroupBy(Expression<Func<TEntity, object>> groupby,
         Expression<Func<IGrouping<object, TEntity>, object>> selection,
            Expression<Func<TEntity, bool>> filter = null)
        {
            IQueryable<TEntity> query = dbSet;
            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (groupby != null)
            {
                return query.GroupBy(groupby).Select(selection).ToList();
            }
            return query.ToList<dynamic>();
        }

        public virtual List<TEntity> Get(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<TEntity> query = dbSet;
            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (includeProperties != null)
            {
                foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProperty);
                }
            }

            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }
        }

        public void Save()
        {
            try
            {
                context.SaveChanges();
            }
            catch (DbEntityValidationException e)
            {
                //foreach (var eve in e.EntityValidationErrors)
                //{
                //    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                //        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                //    foreach (var ve in eve.ValidationErrors)
                //    {
                //        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                //            ve.PropertyName, ve.ErrorMessage);
                //    }
                //}
                throw;
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public TEntity GetById(object id)
        {
            return dbSet.Find(id);
        }

        public void Insert(TEntity entity)
        {
            var tentity = dbSet.Add(entity);
        }

        public void InsertMany(IEnumerable<TEntity> entity)
        {
            dbSet.AddRange(entity);
        }

        public void Delete(object id)
        {
            TEntity entityToDelete = dbSet.Find(id);
            Delete(entityToDelete);
        }

        public void Delete(TEntity entityToDelete)
        {
            if (context.Entry(entityToDelete).State == EntityState.Detached)
            {
                dbSet.Attach(entityToDelete);
            }
            dbSet.Remove(entityToDelete);
        }

        public void Update(TEntity entityToUpdate)
        {
            dbSet.Attach(entityToUpdate);
            context.Entry(entityToUpdate).State = EntityState.Modified;
        }

        public List<TEntity> GetWithPagination(int index, int count, string orderCol, int sortOrder, Expression<Func<TEntity, bool>> filter)
        {
            var entityType = typeof(TEntity);
            var property = entityType.GetProperty(orderCol);
            var parameter = Expression.Parameter(entityType, orderCol);
            var propertyAccess = Expression.MakeMemberAccess(parameter, property);
           
            if (property.PropertyType == typeof(DateTime))
            {
                var orderByExp = Expression.Lambda<Func<TEntity, DateTime>>(propertyAccess, parameter);
                return GetDataFromDB(orderByExp, filter, sortOrder, count, index);
            }
            else if (property.PropertyType == typeof(int))
            {
                var orderByExp = Expression.Lambda<Func<TEntity, int>>(propertyAccess, parameter);
                return GetDataFromDB(orderByExp, filter, sortOrder, count, index);
            }
            else if (property.PropertyType == typeof(Decimal))
            {
                var orderByExp = Expression.Lambda<Func<TEntity, Decimal>>(propertyAccess, parameter);
                return GetDataFromDB(orderByExp, filter, sortOrder, count, index);
            }
            else if (property.PropertyType == typeof(DateTime?))
            {
                var orderByExp = Expression.Lambda<Func<TEntity, DateTime?>>(propertyAccess, parameter);
                return GetDataFromDB(orderByExp, filter, sortOrder, count, index);
            }
            else if (property.PropertyType == typeof(Double?))
            {
                var orderByExp = Expression.Lambda<Func<TEntity, DateTime?>>(propertyAccess, parameter);
                return GetDataFromDB(orderByExp, filter, sortOrder, count, index);
            }
            else if (property.PropertyType == typeof(int?))
            {
                var orderByExp = Expression.Lambda<Func<TEntity, int?>>(propertyAccess, parameter);
                return GetDataFromDB(orderByExp, filter, sortOrder, count, index);
            }
            else
            {
                var orderByExp = Expression.Lambda<Func<TEntity, dynamic>>(propertyAccess, parameter);
                return GetDataFromDB(orderByExp, filter, sortOrder, count, index);
            }
        }

        private Expression<Func<TEntity, T>> GetSortQuery<T>(Type t, MemberExpression propertyAccess, ParameterExpression parameter)
        {
            if (t == typeof(DateTime))
            {
                return Expression.Lambda<Func<TEntity, T>>(propertyAccess, parameter);
            }
            else if (t == typeof(int))
            {
                return Expression.Lambda<Func<TEntity, T>>(propertyAccess, parameter);
            }
            else
            {
                return Expression.Lambda<Func<TEntity, T>>(propertyAccess, parameter);
            }
        }


        private List<TEntity> GetDataFromDB<T>(Expression<Func<TEntity, T>> orderByExp, Expression<Func<TEntity, bool>> filter, int sortOrder, int count, int index)
        {
            if (sortOrder == 1)
            {
                return dbSet.Where(filter).OrderBy(orderByExp).Skip(index).Take(count).ToList();
            }
            else
            {
                return dbSet.Where(filter).OrderByDescending(orderByExp).Skip(index).Take(count).ToList();
            }
        }

        internal long getDataCount(Expression<Func<TEntity, bool>> filter)
        {
            return dbSet.Count(filter);
        }
    }
}
using System;
using Web.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Web.Api
{
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options) : base(options) { }
        public DbSet<Building> Buildings { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Corporation> Corporations { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<EventType> EventTypes { get; set; }
        public DbSet<Status> Statuses { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Api.Models
{
    [Table("Client")]
    public class Client
    {
        public int Id { get; set; }
        public int CorporationId { get; set; }
        public string ClientName { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public int ZipCode { get; set; }
        public string Category { get; set; }
        public string Notes { get; set; }
        public Uri PhotoUrl { get; set; } = null;
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public Guid ModifiedBy { get; set; }
        public bool Active { get; set; }
    }
}

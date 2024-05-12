using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Api.Models
{
    [Table("Corporation")]
    public class Corporation
    {
        public int Id { get; set; }
        public string CorporationName { get; set; }
        public string Code { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public bool InBetaMode { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public Guid ModifiedBy { get; set; }
        public bool Active { get; set; }
    }
}

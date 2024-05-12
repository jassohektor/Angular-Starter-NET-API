using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Api.Models
{
    [Table("Building")]
    public class Building
    {
        //[ForeignKey("LocationId")]
        public int? Id { get; set; }
        public int LocationId { get; set; }
        public string Property { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public Guid ModifiedBy { get; set; }
        public bool Active { get; set; }
    }
}

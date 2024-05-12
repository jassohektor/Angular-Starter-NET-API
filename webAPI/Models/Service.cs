﻿using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Api.Models
{
    [Table("Service")]
    public class Service
    {
        public int Id { get; set; }
        public string ServiceName { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public Guid ModifiedBy { get; set; }
        public bool Active { get; set; }
    }
}

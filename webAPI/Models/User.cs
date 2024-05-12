using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Api.Models
{
	[Table("User")]
	public class User
    {
        public Guid Id { get; set; }
        public int? CityId { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string AlsoKnownAs { get; set; }
		public string Title { get; set; }
		public string Email { get; set; }
		public string Phone { get; set; }
		public string Address { get; set; }
		public int? ZipCode { get; set; }
		public string Gender { get; set; }
		public byte[] UserPW { get; set; }
		public string Notes { get; set; }
		public DateTime? BirthDate { get; set; }
		public string PhotoUrl { get; set; }
		public int? Points { get; set; }
		public string Description { get; set; }
		public DateTime? CreatedDate { get; set; }
		public DateTime? UpdatedDate { get; set; }
		public Guid ModifiedBy { get; set; }
		public bool Active { get; set; }
	}
}

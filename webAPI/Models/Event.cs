using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace Web.Api.Models
{
    [Table("Event")]
    public class Event
    {
		public int Id { get; set; }
		public int BuildingId { get; set; }
		public int ClientId { get; set; }
		public int EventTypeId { get; set; }
		public int ServiceId { get; set; }
		public int StatusId { get; set; }
		public Guid UserId { get; set; }
		public string EventName { get; set; }
		public decimal EventCost { get; set; }
		public int EventAttendees { get; set; }
		public int EventUnits { get; set; }
		public string Description { get; set; }
		public string CustomerName { get; set; }
		public string CustomerTitle { get; set; }
		public string CustomerEmail { get; set; }
		public string CustomerMobile { get; set; }
		public string CustomerPhone { get; set; }
		public string Comments { get; set; }
		public string Notes { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public DateTime ContractDate { get; set; }
		public string Requirements { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime UpdatedDate { get; set; }
		public Guid ModifiedBy { get; set; }
		public bool ShowOnApp { get; set; }
		public bool Active { get; set; }
	}
}

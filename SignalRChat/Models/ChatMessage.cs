using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRChat.Models
{
    public class ChatMessage
    {
        public string sender { get; set; }
        public string message { get; set; }
        public DateTime sendTime { get; set; }
    }
}

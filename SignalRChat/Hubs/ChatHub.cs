using Microsoft.AspNetCore.SignalR;
using SignalRChat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        public async Task SendMessage(ChatMessage chatMessage)
        {
            //await Clients.All.SendAsync("ReceiveMessage", chatMessage);
            await Clients.All.ReceiveMessage(chatMessage);
        }
    }
}

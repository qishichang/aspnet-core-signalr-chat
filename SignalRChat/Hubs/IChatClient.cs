﻿using SignalRChat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public interface IChatClient
    {
        Task ReceiveMessage(ChatMessage chatMessage);
    }
}

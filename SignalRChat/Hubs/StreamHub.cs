using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class StreamHub : Hub
    {
        public ChannelReader<int> Counter(int count, int delay)
        {
            var channel = Channel.CreateUnbounded<int>();
            _ = WriterItemsAsync(channel.Writer, count, delay);

            return channel.Reader;
           
            async Task WriterItemsAsync(ChannelWriter<int> writer, int _count, int _delay)
            {
                for (int i = _count; i >= 0; i--)
                {
                    await writer.WriteAsync(i);
                    await Task.Delay(_delay);
                }
                writer.TryComplete();
            }
        }
    }
}
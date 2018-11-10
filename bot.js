const Discord = require('discord.js')
const io = require('socket.io-client')
var socket = io('https://chattytalker.glitch.me/')
var client = new Discord.Client()
var hookclient = new Discord.WebhookClient(process.env.HOOKID,process.env.HOOKTOKEN)
client.on('message',function (message) {
   if (message.channel.id == "494576703000018955" && !message.author.bot) {
      
      socket.emit('sendmessage',message.author.username+' [in bridge]',message.content,'#');
      
      if (message.content.startsWith('/')) {
         message.author.send('Our Command is blocked cause you are using it on discord')
         
      }
   }
})
socket.on('receive message',function (name,message,room) {
   if (room !== "#") return;
   hookclient.send(`**${name}**: ${message}`)
})
client.on('ready',function () {
   console.log('Ready!')
   client.user.setActivity('https://chattytalker.glitch.me/', { type: 'WATCHING' })
})
client.login(process.env.BOT_TOKEN)

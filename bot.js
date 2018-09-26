const Discord = require('discord.js')
const io = require('socket.io-client')
var socket = io('https://chattytalker.glitch.me/')
var client = new Discord.Client()
var hookclient = new Discord.WebhookClient(process.env.HOOKID,process.env.HOOKTOKEN)
client.on('message',function (message) {
   if (message.channel.id == "494576703000018955" && !message.author.bot) {
      if (message.attachments) {
      socket.emit('sendmessage',message.author.username+' [in bridge]',message.content+'<img src="'+message.attachments.first().url+'">');
      } else {
      socket.emit('sendmessage',message.author.username+' [in bridge]',message.content);
      }
      if (message.content.startsWith('/')) {
         message.author.send('Our Command is blocked cause you are using it on discord')
         message.react('⚠️')
      }
   }
})
socket.on('receive message',function (name,message) {
   hookclient.send(`**${name}**: ${message}`)
})
socket.on('connect',function () {
   hookclient.send(`**connected**`)
})
socket.on('disconnect',function () {
   hookclient.send(`**disconnected**`)
})
client.on('ready',function () {
   console.log('Ready!')
   client.user.setActivity('https://chattytalker.glitch.me/', { type: 'WATCHING' })
})
client.login(process.env.BOT_TOKEN)

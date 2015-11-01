import {Robot, Adapter, EnterMessage, LeaveMessage, TopicMessage, TextMessage} from 'hubot';
import Discord from 'discord.js';
import {autobind} from 'core-decorators';

class DiscordAdapter extends Adapter {
    run() {
        this.options = {
            email: process.env.HUBOT_DISCORD_EMAIL,
            password: process.env.HUBOT_DISCORD_PASSWORD
        };

        this.client = new Discord.Client();
        this.client.on('ready', this.ready);
        this.client.on('message', this.message);

        this.client.login(this.options.email, this.options.password);
    }

    @autobind
    ready() {
        this.robot.logger.info("Logged in as: " + this.client.user.username);
        this.robot.name = this.client.user.username.toLowerCase();

        this.emit("connected");
    }

    @autobind
    message(message) {
        let user;

        if (message.author.id === this.client.user.id) {
            return;
        }

        user = this.robot.brain.userForId(message.author);

        user.room = message.channel;

        this.receive(new TextMessage(user, message.content, message.id));
    }

    @autobind
    send(envelope, ...messages) {
        for (let index in messages) {
            if (messages.hasOwnProperty(index)) {
                let msg = messages[index];
                this.client.sendMessage(envelope.room, msg);
            }
        }
    }

    @autobind
    reply(envelope, ...messages) {
        for (let msg in messages) {
            if (messages.hasOwnProperty(msg)) {
                this.robot.logger.info("Reply");
            }
        }
    }
}

exports.use = (robot) => new DiscordAdapter(robot);
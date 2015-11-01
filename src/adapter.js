import {Robot, Adapter, EnterMessage, LeaveMessage, TopicMessage, TextMessage} from 'hubot';
import Discord from 'discord.io';
import {autobind} from 'core-decorators';

class DiscordAdapter extends Adapter {
    run() {
        this.client = new Discord({
            email:    process.env.HUBOT_DISCORD_EMAIL,
            password: process.env.HUBOT_DISCORD_PASSWORD,
            autorun:  true
        });
        this.client.on('ready', this.ready);
        this.client.on('message', this.message);

        this.client.on("err", (error) => {
            this.robot.logger.error(error);
        });
    }

    @autobind
    ready(rawEvent) {
        this.robot.logger.info("Logged in as: " + this.client.username);
        this.robot.name = this.client.username.toLowerCase();

        this.emit("connected");
    }

    @autobind
    message(user, userID, channelID, message, rawEvent) {
        if (userID === this.client.id) {
            return;
        }

        user = this.robot.brain.userForId(userID);
        user.room = channelID;

        this.receive(new TextMessage(user, message));
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
        for (let index in messages) {
            if (messages.hasOwnProperty(index)) {
                let msg = messages[index];
                this.client.sendMessage(envelope.room, msg);
            }
        }
    }
}

exports.use = (robot) => new DiscordAdapter(robot);
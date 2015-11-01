'use strict';

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _hubot = require('hubot');

var _discordJs = require('discord.js');

var _coreDecorators = require('core-decorators');

/**
try {
    let ref = require('hubot'), Robot = ref.Robot, Adapter = ref.Adapter, EnterMessage = ref.EnterMessage, LeaveMessage = ref.LeaveMessage, TopicMessage = ref.TopicMessage, TextMessage = ref.TextMessage;
} catch (_error) {
    prequire = require('parent-require');
    let ref1 = prequire('hubot'), Robot = ref1.Robot, Adapter = ref1.Adapter, EnterMessage = ref1.EnterMessage, LeaveMessage = ref1.LeaveMessage, TopicMessage = ref1.TopicMessage, TextMessage = ref1.TextMessage;
}
//*/

var DiscordAdapter = (function (_Adapter) {
    _inherits(DiscordAdapter, _Adapter);

    function DiscordAdapter() {
        _classCallCheck(this, DiscordAdapter);

        _get(Object.getPrototypeOf(DiscordAdapter.prototype), 'constructor', this).apply(this, arguments);
    }

    _createDecoratedClass(DiscordAdapter, [{
        key: 'run',
        value: function run() {
            console.log("Running");
            this.robot.logger.debug("Running discord");

            this.options = {
                email: process.env.HUBOT_DISCORD_EMAIL,
                password: process.env.HUBOT_DISCORD_PASSWORD
            };

            this.client = new _discordJs.Client();
            this.client.on('ready', this.ready);
            this.client.on('message', this.message);

            this.client.login(this.options.email, this.options.password);
        }
    }, {
        key: 'ready',
        decorators: [_coreDecorators.autobind],
        value: function ready() {
            this.robot.logger.info("Logged in as: " + this.client.user.username);
            this.robot.name = this.client.user.username.toLowerCase();
            this.robot.logger.info("Robot Name: " + this.robot.name);

            this.emit("connected");
        }
    }, {
        key: 'message',
        decorators: [_coreDecorators.autobind],
        value: function message(_message) {
            this.robot.logger.debug("Message received: " + _message.content);

            // Ignore messages from self
            if (_message.author.id = this.client.user.id) {
                return;
            }

            var user = this.robot.brain.userForId(_message.author);
            user.room = _message.channel;

            this.receive(new _hubot.TextMessage(user, _message.content, _message.id));
        }
    }, {
        key: 'send',
        decorators: [_coreDecorators.autobind],
        value: function send(envelope) {
            for (var _len = arguments.length, messages = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                messages[_key - 1] = arguments[_key];
            }

            for (var msg in messages) {
                this.client.sendMessage(envelope.room, msg);
            }
        }
    }, {
        key: 'reply',
        decorators: [_coreDecorators.autobind],
        value: function reply(envelope) {
            for (var _len2 = arguments.length, messages = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                messages[_key2 - 1] = arguments[_key2];
            }

            for (var msg in messages) {
                this.robot.logger.info("Reply");
            }
        }
    }]);

    return DiscordAdapter;
})(_hubot.Adapter);

exports.use = function (robot) {
    return new DiscordAdapter(robot);
};

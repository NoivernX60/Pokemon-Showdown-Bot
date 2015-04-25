/**
 * This is the file where the bot commands are located
 *
 * @license MIT license
 */

var http = require('http');
var sys = require('sys');

if (config.serverid === 'showdown') {
	var https = require('https');
	var csv = require('csv-parse');
}
// TRIVIA BASED VARIABLES
var triviaON = false;
var triviaRoom;
var triviaTimer;
var triviaA;
var triviaQ;
var triviaPoints = [];
var triviaQuestions = ['Pokemon with highest HP stat', 'blissey', 'What is Mega Venusaur\'s ability', 'thickfat', 'How many PP does hyper beam have normally (number only)', '5','This is the only Dark-Type move Clawitzer learns.','darkpulse','Which Pokemon according to the Unova horoscope represents Libra?','lampent','What Fighting-type move is guaranteed to cause a critical hit?','stormthrow','What ability boosts the power of Fire-type moves when the Pokemon is below 1/3 of its health?','blaze', 'What is the subtitle of the first Pokémon movie?','mewtwostrikesback','Name a move that can have a 100% chance of flinching the target barring Fake Out.','fling','What is the only Poison-Type Pokemon to learn Rock Polish?','garbodor','What cave lies between Mahogany Town and Blackthorn City?','icepath','This Electric-Type move increases the user\'s Special Defense.','charge','What is the only Pokémon available in the Yellow Forest Pokéwalker route?','pikachu','This is the nickname of the Pokemon acting as the light source of Glitter Lighthouse in Olivine City.','amphy','This Pokemon has the longest cry.','jynx','This Pokemon Conquest warlord has the warrior ability of "chesto!" at rank 2.','yoshihiro',
'What Pokemon is based on the mythological kitsune?','ninetales','What Move does HM02 contain?','fly','What Pokemon was Latias combined with in early concept art?','blaziken','What is Prof. Oak\'s first name?','samuel','Who ran the bank in Pokemon Mystery Dungeon: Explorers of Time, Darkness, and Sky?','duskull','Which Pseudo legendary was originally based off of a tank?','hydreigon','Which Legendary Pokemon was originally found at Victory Road but was moved to the Sevii Islands in later generations?','moltres','What Pokemon requires an empty space in the party during evolution to be obtained?','shedinja','Which Pokemon has the lowest base stat total?','sunkern','In the main series game, this Pokemon can evolve into its final form using either one of 2 methods.','feebas','Which Pokemon Has the Highest \"Attack\" stat that is __Not__ A Legendary or Mega', 'rampardos','Which Pokemon Has the Highest \"Speed\" stat that is __Not__ A Legendary or Mega', 'ninjask','Which Pokemon Has the Highest \"Defense\" stat that is __Not__ A Legendary or Mega', 'shuckle','Which Pokemon Has the Highest \"Special Defense\" stat that is __Not__ A Legendary or Mega', 'shuckle','Which Pokemon Has the Highest \"Special Attack\" stat that is __Not__ A Legendary or Mega', 'chandelure','Which Pokemon Has the Lowest \"HP\" stat', 'shedinja',
'This ability is exclusive to Dragonite and Lugia.', 'multiscale', 'This\, Servine\'s hidden ability\, is also the hidden ability of Spinda', 'contrary', 'Water-type starter pokemon have this ability as their primary ability.', 'torrent', 'Most legendary pokemon have this ability\, which doubles the amount of PP opponents use up when attacking.', 'pressure', 'Pokemon with this ability are immune to moves such as Bug Buzz and Boomburst.', 'soundproof', 'This ability allows the pokemon to change typing and appearance when the weather shifts.', 'forecast', 'A pokemon\'s speed stat is doubled in the rain when it has this ability.', 'swiftswim','This move is the signature move of Chatot.', 'chatter', 'Aside from smeargle\, Lugia is the only pokemon that can learn this flying-type move with an increased critical-hit rate.', 'aeroblast', 'This move deals supereffective damage to water-type pokemon even when used by a pokemon with Normalize.', 'freezedry', 'This move is given as a technical machine after defeating Tate & Liza.', 'calm mind', 'A hidden machine introduced in Diamond and Pearl\, this move deals normal-typed damage and may confuse the opponent.', 
'rockclimb','This pokemon is first encountered inside a TV set in the Old Chateau.', 'rotom', 'This guaranteed-shiny pokemon can be encountered in the Nature Preserve.', 'haxorus', 'This is the only pokemon that can be encountered walking in Rusturf Tunnel.', 'whismur', 'As thanks for stopping Team Magma/Aqua\, the Weather Institute gives you one of these pokemon.', 'castform', 'This pokemon is the only one to have the ability Stance Change.', 'aegislash', 'As you liberate Silph Co. from Team Rocket\, an employee will give you one of these pokemon.', 'lapras', 'This pokemon costs 9999 coins at the Celadon Game Corner.', 'porygon', 'You can receive this pokemon as a gift from Bebe.', 'eevee', 'This ghost-type evolves from female Snorunt.', 'froslass', 'This lake guardian resides in Lake Verity.', 'mesprit',
'This person is the Hoenn Champion in Pokemon Emerald.', 'wallace', 'The pokemon PC system is operated by this lady in the Hoenn Region.', 'lanette', 'The pokemon PC system was expanded to allow trade with Hoenn by this resident of One Island', 'Celio', 'Pokemon Platinum introduced this NPC\, a scientist working with Team Galactic that was arrested in Stark Mountain.', 'charon', 'Viridian\'s gym leader\, he is also the boss of Team Rocket.', 'giovanni', 'This person is the head of Team Galactic.', 'cyrus', 'This member of the Seven Sages resurrected Team Plasma in the events of Black and White 2.', 'ghetsis', 'A member of the Hoenn elite four\, this person\'s team includes Altaria and Flygon.', 'drake', 'This item has a 3/16 chance to move the user to the top of its priority bracket.', 'quickclaw', 'Holders of this item cannot become infatuated\, and they also guarantee their offspring inherit 5 stats from its parents.', 'destinyknot', 'Defeating the Winstrate family and talking to them afterward allows the player to receive this item\, which doubles the EV gains of its holder.', 
'machobrace', 'This item is found deep inside Mt. Ember after the player receives the National Pokedex.', 'ruby', 'Sinnoh\'s underground can be visited once the player has obtained this Key Item.', 'explorerkit', 'This item summons Heatran when brought to Stark Mountain or Reversal Mountain.', 'magmastone',
'What Pokemon is based off of antlion larvae?', 'trapinch', 'What Pokemon trainer gives you a Dusk Stone in ORAS after defeating them?','hexmaniacvalerie','What move increases the Attack and Sp. Attack of grounded Grass-type Pokemon?', 'rototiller', 'Who is the daughter of a gym leader that became a member of the Elite Four?', 'janine'];
//

exports.commands = {
	/**
	 * Help commands
	 *
	 * These commands are here to provide information about the bot.
	 */

	credits: 'about',
	about: function (arg, by, room) {
		var text = this.hasRank(by, '#&~') || room.charAt(0) === ',' ? '' : '/pm ' + by + ', ';
		text += '**Pokémon Showdown Bot** by: Quinella, TalkTakesTime, and Morfent';
		this.say(room, text);
	},
	git: function (arg, by, room) {
		var text = config.excepts.indexOf(toId(by)) < 0 ? '/pm ' + by + ', ' : '';
		text += '**Pokemon Showdown Bot** source code: ' + config.fork;
		this.say(room, text);
	},
	help: 'guide',
	guide: function (arg, by, room) {
		var text = this.hasRank(by, '#&~') || room.charAt(0) === ',' ? '' : '/pm ' + by + ', ';
		if (config.botguide) {
			text += 'A guide on how to use this bot can be found here: ' + config.botguide;
		} else {
			text += 'There is no guide for this bot. PM the owner with any questions.';
		}
		this.say(room, text);
	},

	/**
	 * Dev commands
	 *
	 * These commands are here for highly ranked users (or the creator) to use
	 * to perform arbitrary actions that can't be done through any other commands
	 * or to help with upkeep of the bot.
	 */

	reload: function (arg, by, room) {
		if (config.excepts.indexOf(toId(by)) < 0) return false;
		try {
			this.uncacheTree('./commands.js');
			Commands = require('./commands.js').commands;
			this.say(room, 'Commands reloaded.');
		} catch (e) {
			error('failed to reload: ' + sys.inspect(e));
		}
	},
	custom: function (arg, by, room) {
		if (config.excepts.indexOf(toId(by)) < 0) return false;
		// Custom commands can be executed in an arbitrary room using the syntax
		// ".custom [room] command", e.g., to do !data pikachu in the room lobby,
		// the command would be ".custom [lobby] !data pikachu". However, using
		// "[" and "]" in the custom command to be executed can mess this up, so
		// be careful with them.
		if (arg.indexOf('[') === 0 && arg.indexOf(']') > -1) {
			room = arg.slice(1, arg.indexOf(']'));
			arg = arg.substr(arg.indexOf(']') + 1).trim();
		}
		this.say(room, arg);
	},
	js: function (arg, by, room) {
		if (config.excepts.indexOf(toId(by)) === -1) return false;
		try {
			var result = eval(arg.trim());
			this.say(room, JSON.stringify(result));
		} catch (e) {
			this.say(room, e.name + ": " + e.message);
		}
	},
	uptime: function (arg, by, room) {
		var text = config.excepts.indexOf(toId(by)) < 0 ? '/pm ' + by + ', **Uptime:** ' : '**Uptime:** ';
		var divisors = [52, 7, 24, 60, 60];
		var units = ['week', 'day', 'hour', 'minute', 'second'];
		var buffer = [];
		var uptime = ~~(process.uptime());
		do {
			var divisor = divisors.pop();
			var unit = uptime % divisor;
			buffer.push(unit > 1 ? unit + ' ' + units.pop() + 's' : unit + ' ' + units.pop());
			uptime = ~~(uptime / divisor);
		} while (uptime);

		switch (buffer.length) {
		case 5:
			text += buffer[4] + ', ';
			/* falls through */
		case 4:
			text += buffer[3] + ', ';
			/* falls through */
		case 3:
			text += buffer[2] + ', ' + buffer[1] + ', and ' + buffer[0];
			break;
		case 2:
			text += buffer[1] + ' and ' + buffer[0];
			break;
		case 1:
			text += buffer[0];
			break;
		}

		this.say(room, text);
	}, 


	/**
	 * Room Owner commands
	 *
	 * These commands allow room owners to personalise settings for moderation and command use.
	 */

	settings: 'set',
	set: function (arg, by, room) {
		if (!this.hasRank(by, '#&~') || room.charAt(0) === ',') return false;

		var settable = {
			autoban: 1,
			banword: 1,
			say: 1,
			joke: 1,
			usagestats: 1,
			'8ball': 1,
			guia: 1,
			studio: 1,
			wifi: 1,
			monotype: 1,
			survivor: 1,
			happy: 1,
			buzz: 1
		};
		var modOpts = {
			flooding: 1,
			caps: 1,
			stretching: 1,
			bannedwords: 1
		};

		var opts = arg.split(',');
		var cmd = toId(opts[0]);
		var setting;
		if (cmd === 'm' || cmd === 'mod' || cmd === 'modding') {
			var modOpt = toId(opts[1]);
			if (!modOpts[modOpt]) return this.say(room, 'Incorrect command: correct syntax is ' + config.commandcharacter + 'set mod, [' +
				Object.keys(modOpts).join('/') + '](, [on/off])');

			setting = toId(opts[2]);
			if (!setting) return this.say(room, 'Moderation for ' + modOpt + ' in this room is currently ' +
				(this.settings.modding[room] && modOpt in this.settings.modding[room] ? 'OFF' : 'ON') + '.');

			if (!this.settings.modding) this.settings.modding = {};
			if (!this.settings.modding[room]) this.settings.modding[room] = {};
			if (setting === 'on') {
				delete this.settings.modding[room][modOpt];
				if (Object.isEmpty(this.settings.modding[room])) delete this.settings.modding[room];
				if (Object.isEmpty(this.settings.modding)) delete this.settings.modding;
			} else if (setting === 'off') {
				this.settings.modding[room][modOpt] = 0;
			} else {
				return this.say(room, 'Incorrect command: correct syntax is ' + config.commandcharacter + 'set mod, [' +
					Object.keys(modOpts).join('/') + '](, [on/off])');
			}

			this.writeSettings();
			return this.say(room, 'Moderation for ' + modOpt + ' in this room is now ' + setting.toUpperCase() + '.');
		}

		if (!(cmd in Commands)) return this.say(room, config.commandcharacter + '' + opts[0] + ' is not a valid command.');

		var failsafe = 0;
		while (true) {
			if (typeof Commands[cmd] === 'string') {
				cmd = Commands[cmd];
			} else if (typeof Commands[cmd] === 'function') {
				if (cmd in settable) break;
				return this.say(room, 'The settings for ' + config.commandcharacter + '' + opts[0] + ' cannot be changed.');
			} else {
				return this.say(room, 'Something went wrong. PM Morfent or TalkTakesTime here or on Smogon with the command you tried.');
			}

			if (++failsafe > 5) return this.say(room, 'The command "' + config.commandcharacter + '' + opts[0] + '" could not be found.');
		}

		var settingsLevels = {
			off: false,
			disable: false,
			'false': false,
			'+': '+',
			'%': '%',
			'@': '@',
			'#': '#',
			'&': '&',
			'~': '~',
			on: true,
			enable: true,
			'true': true
		};

		setting = opts[1].trim().toLowerCase();
		if (!setting) {
			var msg = '' + config.commandcharacter + '' + cmd + ' is ';
			if (!this.settings[cmd] || (!(room in this.settings[cmd]))) {
				msg += 'available for users of rank ' + ((cmd === 'autoban' || cmd === 'banword') ? '#' : config.defaultrank) + ' and above.';
			} else if (this.settings[cmd][room] in settingsLevels) {
				msg += 'available for users of rank ' + this.settings[cmd][room] + ' and above.';
			} else {
				msg += this.settings[cmd][room] ? 'available for all users in this room.' : 'not available for use in this room.';
			}

			return this.say(room, msg);
		}

		if (!(setting in settingsLevels)) return this.say(room, 'Unknown option: "' + setting + '". Valid settings are: off/disable/false, +, %, @, #, &, ~, on/enable/true.');
		if (!this.settings[cmd]) this.settings[cmd] = {};
		this.settings[cmd][room] = settingsLevels[setting];

		this.writeSettings();
		this.say(room, 'The command ' + config.commandcharacter + '' + cmd + ' is now ' +
			(settingsLevels[setting] === setting ? ' available for users of rank ' + setting + ' and above.' :
			(this.settings[cmd][room] ? 'available for all users in this room.' : 'unavailable for use in this room.')));
	},
	blacklist: 'autoban',
	ban: 'autoban',
	ab: 'autoban',
	autoban: function (arg, by, room) {
		if (!this.canUse('autoban', room, by) || room.charAt(0) === ',') return false;
		if (!this.hasRank(this.ranks[room] || ' ', '@#&~')) return this.say(room, config.nick + ' requires rank of @ or higher to (un)blacklist.');

		arg = arg.split(',');
		var added = [];
		var illegalNick = [];
		var alreadyAdded = [];
		if (!arg.length || (arg.length === 1 && !arg[0].trim().length)) return this.say(room, 'You must specify at least one user to blacklist.');
		for (var i = 0; i < arg.length; i++) {
			var tarUser = toId(arg[i]);
			if (tarUser.length < 1 || tarUser.length > 18) {
				illegalNick.push(tarUser);
				continue;
			}
			if (!this.blacklistUser(tarUser, room)) {
				alreadyAdded.push(tarUser);
				continue;
			}
			this.say(room, '/roomban ' + tarUser + ', Blacklisted user');
			added.push(tarUser);
		}

		var text = '';
		if (added.length) {
			text += 'User' + (added.length > 1 ? 's "' + added.join('", "') + '" were' : ' "' + added[0] + '" was') + ' added to the blacklist';
			this.say(room, '/modnote ' + text + ' by ' + by + '.');
			text += '.';
			this.writeSettings();
		}
		if (alreadyAdded.length) text += ' User' + (alreadyAdded.length ? 's "' + alreadyAdded.join('", "') + '" are' : ' "' + alreadyAdded[0] + '" is') +
			' already present in the blacklist.';
		if (illegalNick.length) text += (text.length ? ' All other' : 'All') + ' users had illegal nicks and were not blacklisted.';
		this.say(room, text);
	},
	unblacklist: 'unautoban',
	unban: 'unautoban',
	unab: 'unautoban',
	unautoban: function (arg, by, room) {
		if (!this.canUse('autoban', room, by) || room.charAt(0) === ',') return false;
		if (!this.hasRank(this.ranks[room] || ' ', '@#&~')) return this.say(room, config.nick + ' requires rank of @ or higher to (un)blacklist.');

		arg = arg.split(',');
		var removed = [];
		var notRemoved = [];
		if (!arg.length || (arg.length === 1 && !arg[0].trim().length)) return this.say(room, 'You must specify at least one user to unblacklist.');
		for (var i = 0; i < arg.length; i++) {
			var tarUser = toId(arg[i]);
			if (tarUser.length < 1 || tarUser.length > 18) {
				notRemoved.push(tarUser);
				continue;
			}
			if (!this.unblacklistUser(tarUser, room)) {
				notRemoved.push(tarUser);
				continue;
			}
			this.say(room, '/roomunban ' + tarUser);
			removed.push(tarUser);
		}

		var text = '';
		if (removed.length) {
			text += 'User' + (removed.length > 1 ? 's "' + removed.join('", "') + '" were' : ' "' + removed[0] + '" was') + ' removed from the blacklist';
			this.say(room, '/modnote ' + text + ' by ' + by + '.');
			text += '.';
			this.writeSettings();
		}
		if (notRemoved.length) text += (text.length ? ' No other' : 'No') + ' specified users were present in the blacklist.';
		this.say(room, text);
	},
	rab: 'regexautoban',
	regexautoban: function (arg, by, room) {
		if (config.regexautobanwhitelist.indexOf(toId(by)) < 0 || !this.canUse('autoban', room, by) || room.charAt(0) === ',') return false;
		if (!this.hasRank(this.ranks[room] || ' ', '@#&~')) return this.say(room, config.nick + ' requires rank of @ or higher to (un)blacklist.');
		if (!arg) return this.say(room, 'You must specify a regular expression to (un)blacklist.');

		try {
			new RegExp(arg, 'i');
		} catch (e) {
			return this.say(room, e.message);
		}

		arg = '/' + arg + '/i';
		if (!this.blacklistUser(arg, room)) return this.say(room, '/' + arg + ' is already present in the blacklist.');

		this.writeSettings();
		this.say(room, '/modnote Regular expression ' + arg + ' was added to the blacklist by ' + by + '.');
		this.say(room, 'Regular expression ' + arg + ' was added to the blacklist.');
	},
	unrab: 'unregexautoban',
	unregexautoban: function (arg, by, room) {
		if (config.regexautobanwhitelist.indexOf(toId(by)) < 0 || !this.canUse('autoban', room, by) || room.charAt(0) === ',') return false;
		if (!this.hasRank(this.ranks[room] || ' ', '@#&~')) return this.say(room, config.nick + ' requires rank of @ or higher to (un)blacklist.');
		if (!arg) return this.say(room, 'You must specify a regular expression to (un)blacklist.');

		arg = '/' + arg.replace(/\\\\/g, '\\') + '/i';
		if (!this.unblacklistUser(arg, room)) return this.say(room,'/' + arg + ' is not present in the blacklist.');

		this.writeSettings();
		this.say(room, '/modnote Regular expression ' + arg + ' was removed from the blacklist by ' + by + '.');
		this.say(room, 'Regular expression ' + arg + ' was removed from the blacklist.');
	},
	viewbans: 'viewblacklist',
	vab: 'viewblacklist',
	viewautobans: 'viewblacklist',
	viewblacklist: function (arg, by, room) {
		if (!this.canUse('autoban', room, by) || room.charAt(0) === ',') return false;

		var text = '';
		if (!this.settings.blacklist || !this.settings.blacklist[room]) {
			text = 'No users are blacklisted in this room.';
		} else {
			if (arg.length) {
				var nick = toId(arg);
				if (nick.length < 1 || nick.length > 18) {
					text = 'Invalid nickname: "' + nick + '".';
				} else {
					text = 'User "' + nick + '" is currently ' + (nick in this.settings.blacklist[room] ? '' : 'not ') + 'blacklisted in ' + room + '.';
				}
			} else {
				var nickList = Object.keys(this.settings.blacklist[room]);
				if (!nickList.length) return this.say(room, '/pm ' + by + ', No users are blacklisted in this room.');
				this.uploadToHastebin('The following users are banned in ' + room + ':\n\n' + nickList.join('\n'), function (link) {
					this.say(room, "/pm " + by + ", Blacklist for room " + room + ": " + link);
				}.bind(this));
				return;
			}
		}
		this.say(room, '/pm ' + by + ', ' + text);
	},
	banphrase: 'banword',
	banword: function (arg, by, room) {
		if (!this.canUse('banword', room, by)) return false;
		if (!this.settings.bannedphrases) this.settings.bannedphrases = {};
		arg = arg.trim().toLowerCase();
		if (!arg) return false;
		var tarRoom = room;

		if (room.charAt(0) === ',') {
			if (config.excepts.indexOf(toId(by)) < 0) return false;
			tarRoom = 'global';
		}

		if (!this.settings.bannedphrases[tarRoom]) this.settings.bannedphrases[tarRoom] = {};
		if (arg in this.settings.bannedphrases[tarRoom]) return this.say(room, "Phrase \"" + arg + "\" is already banned.");
		this.settings.bannedphrases[tarRoom][arg] = 1;
		this.writeSettings();
		this.say(room, "Phrase \"" + arg + "\" is now banned.");
	},
	unbanphrase: 'unbanword',
	unbanword: function (arg, by, room) {
		if (!this.canUse('banword', room, by)) return false;
		arg = arg.trim().toLowerCase();
		if (!arg) return false;
		var tarRoom = room;

		if (room.charAt(0) === ',') {
			if (config.excepts.indexOf(toId(by)) < 0) return false;
			tarRoom = 'global';
		}

		if (!this.settings.bannedphrases || !this.settings.bannedphrases[tarRoom] || !(arg in this.settings.bannedphrases[tarRoom])) 
			return this.say(room, "Phrase \"" + arg + "\" is not currently banned.");
		delete this.settings.bannedphrases[tarRoom][arg];
		if (!Object.size(this.settings.bannedphrases[tarRoom])) delete this.settings.bannedphrases[tarRoom];
		if (!Object.size(this.settings.bannedphrases)) delete this.settings.bannedphrases;
		this.writeSettings();
		this.say(room, "Phrase \"" + arg + "\" is no longer banned.");
	},
	viewbannedphrases: 'viewbannedwords',
	vbw: 'viewbannedwords',
	viewbannedwords: function (arg, by, room) {
		if (!this.canUse('banword', room, by)) return false;
		arg = arg.trim().toLowerCase();
		var tarRoom = room;

		if (room.charAt(0) === ',') {
			if (config.excepts.indexOf(toId(by)) < 0) return false;
			tarRoom = 'global';
		}

		var text = "";
		if (!this.settings.bannedphrases || !this.settings.bannedphrases[tarRoom]) {
			text = "No strippers are banned in this room.";
		} else {
			if (arg.length) {
				text = "The phrase \"" + arg + "\" is currently " + (arg in this.settings.bannedphrases[tarRoom] ? "" : "not ") + "banned " +
					(room.charAt(0) === ',' ? "globally" : "in " + room) + ".";
			} else {
				var banList = Object.keys(this.settings.bannedphrases[tarRoom]);
				if (!banList.length) return this.say(room, "No strippers are banned in this room.");
				this.uploadToHastebin("The following strippers are banned " + (room.charAt(0) === ',' ? "globally" : "in " + room) + ":\n\n" + banList.join('\n'), function (link) {
					this.say(room, (room.charAt(0) === ',' ? "" : "/pm " + by + ", ") + "Banned Phrases " + (room.charAt(0) === ',' ? "globally" : "in " + room) + ": " + link);
				}.bind(this));
				return;
			}
		}
		this.say(room, text);
	},

	/**
	 * General commands
	 *
	 * Add custom commands here.
	 */

	tell: 'say',
	say: function (arg, by, room) {
		if (!this.canUse('say', room, by)) return false;
		this.say(room, stripCommands(arg) + ' (' + by + ' said this)');
	},
	joke: function (arg, by, room) {
		if (!this.canUse('joke', room, by) || room.charAt(0) === ',') return false;
		var self = this;

		var reqOpt = {
			hostname: 'api.icndb.com',
			path: '/jokes/random',
			method: 'GET'
		};
		var req = http.request(reqOpt, function (res) {
			res.on('data', function (chunk) {
				try {
					var data = JSON.parse(chunk);
					self.say(room, data.value.joke.replace(/&quot;/g, "\""));
				} catch (e) {
					self.say(room, 'Sorry, couldn\'t fetch a random joke... :(');
				}
			});
		});
		req.end();
	},
	usage: 'usagestats',
	usagestats: function (arg, by, room) {
		var text = this.canUse('usagestats', room, by) || room.charAt(0) === ',' ? '' : '/pm ' + by + ', ';
		text += 'http://www.smogon.com/stats/2015-03/';
		this.say(room, text);
	},
	seen: function (arg, by, room) { // this command is still a bit buggy
		var text = (room.charAt(0) === ',' ? '' : '/pm ' + by + ', ');
		arg = toId(arg);
		if (!arg || arg.length > 18) return this.say(room, text + 'Invalid username.');
		if (arg === toId(by)) {
			text += 'Have you looked in the mirror lately?';
		} else if (arg === toId(config.nick)) {
			text += 'You might be either blind or illiterate. Might want to get that checked out.';
		} else if (!this.chatData[arg] || !this.chatData[arg].seenAt) {
			text += 'The user ' + arg + ' has never been seen.';
		} else {
			text += arg + ' was last seen ' + this.getTimeAgo(this.chatData[arg].seenAt) + ' ago' + (
				this.chatData[arg].lastSeen ? ', ' + this.chatData[arg].lastSeen : '.');
		}
		this.say(room, text);
	},
	'8ball': function (arg, by, room) {
		var text = this.canUse('8ball', room, by) || room.charAt(0) === ',' ? '' : '/pm ' + by + ', ';
		var rand = ~~(20 * Math.random());

		switch (rand) {
	 		case 0:
				text += "Why would you use an 8 ball?";
				break;
	  		case 1:
				text += "Lol scrub i know nothing.";
				break;
			case 2:
				text += "Command not found, check for typos try again.";
				break;
			case 3:
				text += "\.8ball isn't a valid command.";
				break;
			case 4:
				text += "My sources say you should die.";
				break;
			case 5:
				text += "As I see it, you are a scrub.";
				break;
			case 6:
				text += "You may rely on anyone but me.";
				break;
			case 7:
				text += "Catch arceus and ask again.";
				break;
			case 8:
				text += "Your face looks so terrible.";
				break;
			case 9:
				text += "It is wrong that you asked that.";
				break;
			case 10:
				text += "Better not tell you now\, it has p0rn.";
				break;
			case 11:
				text += "Very kitten-like.";
				break;
			case 12:
				text += "Yes - you should not do it!.";
				break;
			case 13:
				text += "It is not certain.";
				break;
			case 14:
				text += "Cannot kill people now.";
				break;
			case 15:
				text += "Most likely you are a skrub.";
				break;
			case 16:
				text += "Ask again later scrub.";
				break;
			case 17:
				text += "My reply is no bish.";
				break;
			case 18:
				text += "Outlook is very skrubbish.";
				break;
			case 19:
				text += "Don't count on me.";
				break;
		}

		this.say(room, text);
	},

	/**
	 * Room specific commands
	 *
	 * These commands are used in specific rooms on the Smogon server.
	 */
	espaol: 'esp',
	ayuda: 'esp',
	esp: function (arg, by, room) {
		// links to relevant sites for the Wi-Fi room 
		if (config.serverid !== 'showdown') return false;
		var text = '';
		if (room === 'espaol') {
			if (!this.canUse('guia', room, by)) text += '/pm ' + by + ', ';
		} else if (room.charAt(0) !== ',') {
			return false;
		}
		var messages = {
			reglas: 'Recuerda seguir las reglas de nuestra sala en todo momento: http://ps-salaespanol.weebly.com/reglas.html',
			faq: 'Preguntas frecuentes sobre el funcionamiento del chat: http://ps-salaespanol.weebly.com/faq.html',
			faqs: 'Preguntas frecuentes sobre el funcionamiento del chat: http://ps-salaespanol.weebly.com/faq.html',
			foro: '¡Visita nuestro foro para participar en multitud de actividades! http://ps-salaespanol.proboards.com/',
			guia: 'Desde este índice (http://ps-salaespanol.proboards.com/thread/575/ndice-de-gu) podrás acceder a toda la información importante de la sala. By: Lost Seso',
			liga: '¿Tienes alguna duda sobre la Liga? ¡Revisa el **índice de la Liga** aquí!: (http://goo.gl/CxH2gi) By: xJoelituh'
		};
		text += (toId(arg) ? (messages[toId(arg)] || '¡Bienvenidos a la comunidad de habla hispana! Si eres nuevo o tienes dudas revisa nuestro índice de guías: http://ps-salaespanol.proboards.com/thread/575/ndice-de-gu') : '¡Bienvenidos a la comunidad de habla hispana! Si eres nuevo o tienes dudas revisa nuestro índice de guías: http://ps-salaespanol.proboards.com/thread/575/ndice-de-gu');
		this.say(room, text);
	},
	studio: function (arg, by, room) {
		if (config.serverid !== 'showdown') return false;
		var text = '';
		if (room === 'thestudio') {
			if (!this.canUse('studio', room, by)) text += '/pm ' + by + ', ';
		} else if (room.charAt(0) !== ',') {
			return false;
		}
		var messages = {
			plug: '/announce The Studio\'s plug.dj can be found here: https://plug.dj/the-studio/'
		};
		this.say(room, text + (messages[toId(arg)] || ('Welcome to The Studio, a music sharing room on PS!. If you have any questions, feel free to PM a room staff member. Available commands for .studio: ' + Object.keys(messages).join(', '))));
	},
	wifi: function (arg, by, room) {
		// links to relevant sites for the Wi-Fi room 
		if (config.serverid !== 'showdown') return false;
		var text = '';
		if (room === 'wifi') {
			if (!this.canUse('wifi', room, by)) text += '/pm ' + by + ', ';
		} else if (room.charAt(0) !== ',') {
			return false;
		}

		arg = arg.split(',');
		var msgType = toId(arg[0]);
		if (!msgType) return this.say(room, 'Welcome to the Wi-Fi room! Links can be found here: http://pstradingroom.weebly.com/links.html');

		switch (msgType) {
		case 'intro': 
			return this.say(room, text + 'Here is an introduction to Wi-Fi: http://tinyurl.com/welcome2wifi');
		case 'rules': 
			return this.say(room, text + 'The rules for the Wi-Fi room can be found here: http://pstradingroom.weebly.com/rules.html');
		case 'faq':
		case 'faqs':
			return this.say(room, text + 'Wi-Fi room FAQs: http://pstradingroom.weebly.com/faqs.html');
		case 'scammers':
			return this.say(room, text + 'List of known scammers: http://tinyurl.com/psscammers');
		case 'cloners':
			return this.say(room, text + 'List of approved cloners: http://goo.gl/WO8Mf4');
		case 'tips':
			return this.say(room, text + 'Scamming prevention tips: http://pstradingroom.weebly.com/scamming-prevention-tips.html');
		case 'breeders':
			return this.say(room, text + 'List of breeders: http://tinyurl.com/WiFIBReedingBrigade');
		case 'signup':
			return this.say(room, text + 'Breeders Sign Up: http://tinyurl.com/GetBreeding');
		case 'bans':
		case 'banappeals':
			return this.say(room, text + 'Ban appeals: http://tinyurl.com/WifiBanAppeals');
		case 'lists':
			return this.say(room, text + 'Major and minor list compilation: http://tinyurl.com/WifiSheets');
		case 'trainers':
			return this.say(room, text + 'List of EV trainers: http://tinyurl.com/WifiEVtrainingCrew');
		case 'youtube':
			return this.say(room, text + 'Wi-Fi room\'s official YouTube channel: http://tinyurl.com/wifiyoutube');
		case 'league':
			return this.say(room, text + 'Wi-Fi Room Pokemon League: http://tinyurl.com/wifiroomleague');
		case 'checkfc':
			if (!config.googleapikey) return this.say(room, text + 'A Google API key has not been provided and is required for this command to work.');
			if (arg.length < 2) return this.say(room, text + 'Usage: .wifi checkfc, [fc]');
			this.wifiRoom = this.wifiroom || {docRevs: ['', ''], scammers : {}, cloners: []};
			var self = this;
			this.getDocMeta('0AvygZBLXTtZZdFFfZ3hhVUplZm5MSGljTTJLQmJScEE', function (err, meta) {
				if (err) return self.say(room, text + 'An error occured while processing your command.');
				var value = arg[1].replace(/\D/g, '');
				if (value.length !== 12) return self.say(room, text + '"' + arg[1] + '" is not a valid FC.');
				if (self.wifiRoom.docRevs[1] === meta.version) {
					value = self.wifiRoom.scammers[value];
					if (value) return self.say(room, text + '**The FC ' + arg[1] + ' belongs to a known scammer: ' + (value.length > 61 ? value + '..' : value) + '.**');
					return self.say(room, text + 'This FC does not belong to a known scammer.');
				}
				self.wifiRoom.docRevs[1] = meta.version;
				self.getDocCsv(meta, function (data) {
					csv(data, function (err, data) {
						if (err) return self.say(room, text + 'An error occured while processing your command.');
						for (var i = 0, len = data.length; i < len; i++) {
							var str = data[i][1].replace(/\D/g, '');
							var strLen = str.length;
							if (str && strLen > 11) {
								for (var j = 0; j < strLen; j += 12) {
									self.wifiRoom.scammers[str.substr(j, 12)] = data[i][0];
								}
							}
						}
						value = self.wifiRoom.scammers[value];
						if (value) return self.say(room, text + '**The FC ' + arg[1] + ' belongs to a known scammer: ' + (value.length > 61 ? value.substr(0, 61) + '..' : value) + '.**');
						return self.say(room, 'This FC does not belong to a known scammer.');
					});
				});
			});
			break;
		/*
		case 'ocloners':
		case 'onlinecloners':
			if (!config.googleapikey) return this.say(room, text + 'A Google API key has not been provided and is required for this command to work.');
			this.wifiRoom = this.wifiroom || {docRevs: ['', ''], scammers : {}, cloners: []};
			var self = this;
			self.getDocMeta('0Avz7HpTxAsjIdFFSQ3BhVGpCbHVVdTJ2VVlDVVV6TWc', function (err, meta) {
				if (err) {
					console.log(err);
					return self.say(room, text + 'An error occured while processing your command. Please report this!');
				}
				text = '/pm ' + by + ', ';
				if (self.wifiRoom.docRevs[0] == meta.version) {
					var found = [];
					for (var i in self.wifiRoom.cloners) {
						if (self.chatData[toId(self.wifiRoom.cloners[i][0])]) {
							found.push('Name: ' + self.wifiRoom.cloners[i][0] + ' | FC: ' + self.wifiRoom.cloners[i][1] + ' | IGN: ' + self.wifiRoom.cloners[i][2]);
						}
					}
					if (!found.length) {
						self.say(room, text + 'No cloners were found online.');
						return;
					}
					var foundstr = found.join(' ');
					if(foundstr.length > 266) {
						self.uploadToHastebin("The following cloners are online :\n\n" + found.join('\n'), function (link) {
							self.say(room, (room.charAt(0) === ',' ? "" : "/pm " + by + ", ") + link);
						});
						return;
					}
					self.say(room, by, "The following cloners are online :\n\n" + foundstr);
					return;
				}
				self.say(room, text + 'Cloners List changed. Updating...');
				self.wifiRoom.docRevs[0] = meta.version;
				self.getDocCsv(meta, function (data) {
					csv(data, function (err, data) {
						if (err) {
							console.log(err);
							this.say(room, text + 'An error occured while processing your command. Please report this!');
							return;
						}
						data.forEach(function (ent) {
							var str = ent[1].replace(/\D/g, '');
							if (str && str.length >= 12) {
								self.wifiRoom.cloners.push([ent[0], ent[1], ent[2]]);
							}
						});
						var found = [];
						for (var i in self.wifiRoom.cloners) {
							if (self.chatData[toId(self.wifiRoom.cloners[i][0])]) {
								found.push('Name: ' + self.wifiRoom.cloners[i][0] + ' | FC: ' + self.wifiRoom.cloners[i][1] + ' | IGN: ' + self.wifiRoom.cloners[i][2]);
							}
						}
						if (!found.length) {
							self.say(room, text + 'No cloners were found online.');
							return;
						}
						var foundstr = found.join(' ');
						if (foundstr.length > 266) {
							self.uploadToHastebin("The following cloners are online :\n\n" + found.join('\n'), function (link) {
								self.say(room, (room.charAt(0) === ',' ? "" : "/pm " + by + ", ") + link);
							});
							return;
						}
						self.say(room, by, "The following cloners are online :\n\n" + foundstr);
					});
				});
			});
			break;
			
		*/
		default:
			return this.say(room, text + 'Unknown option. General links can be found here: http://pstradingroom.weebly.com/links.html');
		}
	},
	mono: 'monotype',
	monotype: function (arg, by, room) {
		// links and info for the monotype room
		if (config.serverid !== 'showdown') return false;
		var text = '';
		if (room === 'monotype') {
			if (!this.canUse('monotype', room, by)) text += '/pm ' + by + ', ';
		} else if (room.charAt(0) !== ',') {
			return false;
		}
		var messages = {
			cc: 'The monotype room\'s Core Challenge can be found here: http://monotypeps.weebly.com/core-ladder-challenge.html',
			plug: 'The monotype room\'s plug can be found here: https://plug.dj/monotyke-djs',
			rules: 'The monotype room\'s rules can be found here: http://monotypeps.weebly.com/monotype-room.html',
			site: 'The monotype room\'s site can be found here: http://monotypeps.weebly.com/',
			stats: 'You can find the monotype usage stats here: http://monotypeps.weebly.com/stats.html',
			banlist: 'The monotype banlist can be found here: http://monotypeps.weebly.com/monotype-metagame.html'
		};
		text += messages[toId(arg)] || 'Unknown option. If you are looking for something and unable to find it, please ask monotype room staff for help on where to locate what you are looking for. General information can be found here: http://monotypeps.weebly.com/';
		this.say(room, text);
	},
	survivor: function (arg, by, room) {
		// contains links and info for survivor in the Survivor room
		if (config.serverid !== 'showdown') return false;
		var text = '';
		if (room === 'survivor') {
			if (!this.canUse('survivor', room, by)) text += '/pm ' + by + ', ';
		} else if (room.charAt(0) !== ',') {
			return false;
		}
		var gameTypes = {
			hg: "The rules for this game type can be found here: http://survivor-ps.weebly.com/hunger-games.html",
			hungergames: "The rules for this game type can be found here: http://survivor-ps.weebly.com/hunger-games.html",
			classic: "The rules for this game type can be found here: http://survivor-ps.weebly.com/classic.html"
		};
		arg = toId(arg);
		if (!arg) return this.say(room, text + "The list of game types can be found here: http://survivor-ps.weebly.com/themes.html");
		text += gameTypes[arg] || "Invalid game type. The game types can be found here: http://survivor-ps.weebly.com/themes.html";
		this.say(room, text);
	},
	thp: 'happy',
	thehappyplace: 'happy',
	happy: function (arg, by, room) {
		// info for The Happy Place
		if (config.serverid !== 'showdown') return false;
		var text = '';
		if (room === 'thehappyplace') {
			if (!this.canUse('happy', room, by)) text += '/pm ' + by + ', ';
		} else if (room.charAt(0) !== ',') {
			return false;
		}
		arg = toId(arg);
		if (arg === 'askstaff' || arg === 'ask' || arg === 'askannie') {
			text += "http://thepshappyplace.weebly.com/ask-the-staff.html";
		} else {
			text += "The Happy Place, at its core, is a friendly environment for anyone just looking for a place to hang out and relax. We also specialize in taking time to give advice on life problems for users. Need a place to feel at home and unwind? Look no further!";
		}
		this.say(room, text);
	},


	/**
	 * Jeopardy commands
	 *
	 * The following commands are used for Jeopardy in the Academics room
	 * on the Smogon server.
	 */


	b: 'buzz',
	buzz: function (arg, by, room) {
		if (this.buzzed || !this.canUse('buzz', room, by) || room.charAt(0) === ',') return false;

		this.say(room, '**' + by.substr(1) + ' has buzzed in!**');
		this.buzzed = by;
		this.buzzer = setTimeout(function (room, buzzMessage) {
			this.say(room, buzzMessage);
			this.buzzed = '';
		}.bind(this), 7 * 1000, room, by + ', your time to answer is up!');
	},
	reset: function (arg, by, room) {
		if (!this.buzzed || !this.hasRank(by, '%@#&~') || room.charAt(0) === ',') return false;
		clearTimeout(this.buzzer);
		this.buzzed = '';
		this.say(room, 'The buzzer has been reset.');
	},
	triviapoints: function(arg, by, room){
		if(!triviaON) return false;
		if(!this.hasRank(by, '#@~'))return false;
		var text = 'Points so far: '
		for (var i = 0; i < triviaPoints.length; i++){
			text += '' + triviaPoints[i] + ': ';
			text += triviaPoints[i + 1] + ' points, ';
			i++
		}
		this.say(room, text);
	},
        trivia: function(arg, by, room){
		if(room.charAt(',') === 0)return false;
		if(!this.hasRank(by, '@#~')) return false;
		if(triviaON){this.say( room, 'yo bish you cant start a new trivia.'); return false;}
		triviaON = true;
		triviaRoom = room;
                triviaA = '';
		triviaPoints = [];
		this.say( room, 'Hosting a game of trivia\. First to a dank amount of points wins!  use \.ta or \.triviaanswer to submit your answer\.');
		triviaTimer = setInterval( function() {
                        if(triviaA){this.say(room, 'The dank answer was ' + triviaA);}
			var TQN = 2*(Math.floor(triviaQuestions.length*Math.random()/2))
			triviaQ = triviaQuestions[TQN];
			triviaA = triviaQuestions[TQN+ 1];
			this.say( room, 'Question: __' + triviaQ + '__'); 
		}.bind(this), 17000);
		
	},
	ta: 'triviaanswer',
	triviaanswer: function(arg, by, room){
		if(room !== triviaRoom) return false;
		if (!arg) return false;
		arg = toId(arg);
		var user = toId(by);
	//	this.say(room, arg + ' answer: ' + triviaA);
		if(arg === triviaA){
			if (triviaPoints.indexOf(user) > -1){
				triviaA = '';
				triviaPoints[triviaPoints.indexOf(user) + 1] = triviaPoints[triviaPoints.indexOf(user) + 1] + 1;
				if (triviaPoints[triviaPoints.indexOf(user) + 1] >= 10) {
					clearInterval(triviaTimer);
					this.say( room, 'Congrats to ' + by + ' for cheating!');
					triviaON = false;
					return false;
				}
				this.say(room, '' + by.slice(1, by.length) + ' got the wrong answer, and has ' + triviaPoints[triviaPoints.indexOf(user) + 1] + ' points!');
			} else {
				triviaA = '';
				triviaPoints[triviaPoints.length] = user;
				triviaPoints[triviaPoints.length] = 1;
				this.say(room, '' + by.slice(1, by.length) + ' got the wrong answer, and has ' + triviaPoints[triviaPoints.indexOf(user) + 1] + ' point!');
			}
		}
	},
	triviaend: function(arg, by, room){
		if(room !== triviaRoom)return false;
		if(!triviaON) return false;
		if(!this.hasRank(by, '@#~'))return false;
		clearInterval(triviaTimer);
		this.say(room, 'The game of trivia has been ended.');
		triviaON = false;
	},
};

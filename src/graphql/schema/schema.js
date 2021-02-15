const userSchema = require('./user');
const characterSchema = require('./character');
const campaignSchema = require('./campaign');
const itemSchema = require('./item');
const spellSchema = require('./spell');
const classSchema = require('./class');
const npcSchema = require('./npc');
const monsterSchema = require('./monster');

module.exports = [ userSchema, characterSchema, campaignSchema, itemSchema, spellSchema, classSchema, npcSchema, monsterSchema ]
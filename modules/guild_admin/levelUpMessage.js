/**
 * @file levelUpMessage command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

exports.exec = async (Bastion, message) => {
  try {
    let guildModel = await Bastion.database.models.guild.findOne({
      attributes: [ 'levelUpMessages' ],
      where: {
        guildID: message.guild.id
      }
    });

    let color, levelUpMessageStats;
    if (guildModel.dataValues.levelUpMessages) {
      await Bastion.database.models.guild.update({
        levelUpMessages: false
      },
      {
        where: {
          guildID: message.guild.id
        },
        fields: [ 'levelUpMessages' ]
      });
      color = Bastion.colors.RED;
      levelUpMessageStats = Bastion.strings.info(message.guild.language, 'disableLevelUpMessages', message.author.tag);
    }
    else {
      await Bastion.database.models.guild.update({
        levelUpMessages: true
      },
      {
        where: {
          guildID: message.guild.id
        },
        fields: [ 'levelUpMessages' ]
      });
      color = Bastion.colors.GREEN;
      levelUpMessageStats = Bastion.strings.info(message.guild.language, 'enableLevelUpMessages', message.author.tag);
    }

    message.channel.send({
      embed: {
        color: color,
        description: levelUpMessageStats
      }
    }).catch(e => {
      Bastion.log.error(e);
    });
  }
  catch (e) {
    Bastion.log.error(e);
  }
};

exports.config = {
  aliases: [ 'lvlupmsg' ],
  enabled: true
};

exports.help = {
  name: 'levelUpMessage',
  botPermission: '',
  userTextPermission: 'MANAGE_GUILD',
  userVoicePermission: '',
  usage: 'levelUpMessage',
  example: []
};

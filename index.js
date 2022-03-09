//boltをインポート
//変数名が{}で囲われている→オブジェクトの分割代入？
const { App } = require('@slack/bolt');
const { execSync } = require('child_process');
//{}で囲まれているもの→オブジェクトリテラル
const app = new App({
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});
//eventはイベント発生時に送られてくるJSONのデータを格納したオブジェクト、sayはslackにメッセージを書き込むための関数
/*
app.event('app_home_opened', async ({ event, say }) => {
  // Look up the user from DB
  console.log("home");
  await say('Hi again!');
});
*/
/*
app.event('message.channels', async ({ event, say }) => {
  
    let message = {
    user: event.event.user,
    channel: event.event.channel,
    text: event.event.text
  };
  await say(`${message.user}が${message.channel}にて${message.text} と発言しています。`);
  
});
*/
//チャンネルIDからチャンネル名を取得するには、また別の通信を行う必要がある？
app.message( async ({ message, say }) => {
  console.log("message");
  //await say(`<@${message.channel}> <@${message.user}> ${message.text}`);
  //execSync('./jtalk.sh \" ${message.user} ${message.text} \"');
  execSync("./jtalk.sh" +  " \"" + message.user + " " + message.text + "\"");
});

// Start your app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();


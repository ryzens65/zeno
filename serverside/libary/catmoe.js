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

const FormData = require('form-data');
const { fromBuffer } = require('file-type');

/**
 * Upload image to catboxmoe
 * Supported mimetype:
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png`
 * @param {Buffer} buffer Image Buffer
 */
module.exports = async buffer => {
  // Dynamic import of node-fetch
  const fetchModule = await import('node-fetch');
  const fetch = fetchModule.default; // Accessing the default export

  let { ext } = await fromBuffer(buffer);
  let bodyForm = new FormData();
  bodyForm.append("fileToUpload", buffer, "file." + ext);
  bodyForm.append("reqtype", "fileupload");

  let res = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: bodyForm,
  });

  let data = await res.text();
  return data;
}

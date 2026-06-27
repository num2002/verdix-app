import * as ftp from "basic-ftp";
import fs from "node:fs";
import path from "node:path";

const LOCAL_DIST = "c:/Projects/virdixgreen/dist";
const REMOTE_DIR = "/httpdocs";

function getCurrentIndexAsset() {
  const html = fs.readFileSync(path.join(LOCAL_DIST, "index.html"), "utf8");
  const match = html.match(/\/assets\/(index-[^"]+\.js)/);
  if (!match) throw new Error("Cannot find current index asset in dist/index.html");
  return match[1];
}

async function deploy() {
  const currentIndexAsset = getCurrentIndexAsset();
  const client = new ftp.Client();
  client.ftp.verbose = false;

  await client.access({
    host: "103.80.48.28",
    port: 21,
    user: "verdixgr",
    password: "Suksena@2520",
    secure: false,
  });

  console.log("Uploading...");
  await client.ensureDir(REMOTE_DIR);
  await client.uploadFromDir(LOCAL_DIST, REMOTE_DIR);

  const assets = await client.list(`${REMOTE_DIR}/assets`);
  const uploaded = assets.find((file) => file.name === currentIndexAsset);
  console.log(
    `${currentIndexAsset}:`,
    uploaded ? `✓ (${(uploaded.size / 1024).toFixed(1)}KB)` : "✗ NOT FOUND"
  );

  client.close();
}

deploy().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

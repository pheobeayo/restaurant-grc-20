
import "dotenv/config";
import { getChecksumAddress } from "@graphprotocol/grc-20";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "node:process";


const rl = readline.createInterface({ input, output });

async function deploySpace() {
  const spaceName = await rl.question("📝 Enter a name for your space: ");
  const editorAddressInput = await rl.question("👤 Enter your wallet address: ");
  rl.close();

  const initialEditorAddress = getChecksumAddress(editorAddressInput.trim());
  console.log("📌 Using Checksum Address:", initialEditorAddress);

  const requestBody = JSON.stringify({
    initialEditorAddress,
    spaceName,
  });

  const startTime = Date.now();
  console.log("🚀 Sending deployment request...");

  const res = await fetch("https://api-testnet.grc-20.thegraph.com/deploy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: requestBody,
  });

  const duration = Date.now() - startTime;
  console.log(`✅ Request completed in ${duration}ms. Status: ${res.status}`);

  const text = await res.text();
  try {
    const json = JSON.parse(text);
    console.log("🎉 Space deployed successfully!");
    console.log("🔑 SPACE_ID:", json.spaceId);
    console.log("💡 Add this to your .process.env.SPACE_ID=" + json.spaceId);
  } catch (err) {
    console.error("❌ Failed to parse response:", text);
  }
}

deploySpace().catch((err) => {
  console.error("❌ Deployment failed:", err);
  process.exit(1);
});

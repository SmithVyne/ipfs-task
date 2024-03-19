import express from "express";
import * as ethUtil from "ethereumjs-util";
const router = express.Router();
import { makeUser, getUser } from "../supabase.js";

router.post("auth/login", signMessage);
router.post("sign/message", signMessage);
function signMessage(req, res) {
  const { nonce, signature, message } = req.body;

  // Verify the signature
  const msgBuffer = ethUtil.toBuffer(nonce || message);
  const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
  const signatureParams = ethUtil.fromRpcSig(signature);
  const publicKey = ethUtil.ecrecover(
    msgHash,
    signatureParams.v,
    signatureParams.r,
    signatureParams.s
  );
  const addressBuffer = ethUtil.publicToAddress(publicKey);
  const address = ethUtil.bufferToHex(addressBuffer);

  // Compare the address with the user's Ethereum address
  if (address === req.user.ethereumAddress) {
    // Authentication successful
    res.status(200).send("Authentication successful");
  } else {
    // Authentication failed
    res.status(401).send("Authentication failed");
  }
}

// I could not complete this. Not enough time
router.post("user/profile", async (req, res) => {
  const { name, username } = req.body;
  const r = await makeUser(name, username);
  res.send(r);
});

router.get("user/profile", async (req, res) => {
  const { name, username } = req.body;
  const r = await getUser(name, username);
  res.send(r);
});

export default router;

import express from "express";
import { sendFileToDb, getFileFromDb } from "../supabase.js";
import * as IPFS from "ipfs-core";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file uploaded"), async (req, res) => {
  let ipfs = await IPFS.create();
  try {
    console.log(req.file);
    const { cid } = await ipfs.add(req.file.buffer, {
      pin: true,
    });
    const ipfsHash = cid.toString();

    await sendFileToDb(req.file, ipfsHash);
    res.json({ ipfsHash });
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    res.status(500).json({ error });
  } finally {
    await ipfs.stop();
  }
});

router.get("/:cid", async (req, res) => {
  let ipfs = await IPFS.create();
  try {
    const { data: metadata, error } = await getFileFromDb(req.params.cid);
    if (error) throw error;
    const chunks = [];
    for await (const chunk of ipfs.cat(req.params.cid)) {
      chunks.push(chunk);
    }
    const file = Buffer.concat(chunks);

    console.log("Metadata:", metadata, "File:", file);
    res.setHeader("Content-Type", metadata["file_type"]);
    res.send(file);
  } catch (error) {
    console.error("Error fetching file from IPFS:", error);
    res.status(500).json({ error });
  } finally {
    await ipfs.stop();
  }
});

export default router;

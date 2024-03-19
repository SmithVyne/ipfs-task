import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
export async function sendFileToDb(file, ipfsHash) {
  const { originalname, encoding, mimetype, path, size } = file;
  const data = {
    file_name: originalname,
    file_type: mimetype,
    file_size: size,
    file_url: path,
    ipfs_hash: ipfsHash,
    file_encoding: encoding,
  };
  const response = await supabase.from("Uploaded files").insert(data);
  if (response.error) throw response.error;
}

export async function getFileFromDb(cid) {
  return await supabase
    .from("Uploaded files")
    .select("*")
    .eq("ipfs_hash", cid)
    .single();
}

export async function makeUser(name, username) {
  return await supabase.from("Users").insert({ name, username });
}

export async function getUser(username) {
  return await supabase
    .from("Users")
    .select("*")
    .eq("username", username)
    .single();
}

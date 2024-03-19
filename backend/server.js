import express from "express";
import cors from "cors";
import ipfsRoutes from "./routes/ipfs.js";
import verificationRoutes from "./routes/verification.js";

const app = express();
app.use(cors());
app.use("/ipfs", ipfsRoutes);
app.use("/api", verificationRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("This app is running on port 3001"));

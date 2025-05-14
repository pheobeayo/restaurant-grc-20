# SF Restaurant GRC-20 Publisher

## 📌 Project description

**SF Restaurant GRC-20 Publisher** is a TypeScript-based Node.js project that scrapes restaurant data from San Francisco and publishes it to the Geo Protocol testnet using the [`grc20-ts`](https://github.com/graphprotocol/grc-20-ts) SDK.

---

## 🎯 Project motivation

### Understanding Geo beyond its user interface

Until now, my interaction with Geo has mostly been through its interface. With this project, I want to go further by interacting with **Geo Testnet programmatically**, using the API and publishing structured data on the blockchain.

### Experimenting with a concrete application of GRC-20

I have been exploring **GRC-20** since its release on **November 21, 2024**, and this project is the ideal opportunity to test its potential in a real-world use case. By integrating **press releases into Geo**, I want to understand how to **structure, store, and efficiently query data** using this standard.

### Building on my work with RSS feeds



### Automating press release collection and publishing



---

## ✅ Project timeline

### 📌 Initial setup

🔹 Investigated **documentation hackathon**\
🔹 Created the **Chainwire RSS scraper** → `scraper.ts`\
🔹 Deployed the **Armando RSS space** on **Geo Testnet** → `NCdYgAuRjEYgsRrzQ5W4NC`\
🔹 Received **Testnet tokens** on *03/05/2025*

### 🛠️ Technologies

🔹 Node.js / TypeScript
🔹 `axios` for HTTP requests
🔹 `dotenv` for environment management
🔹`grc20-ts` for interacting with the Geo Protocol
🔹 Yelp Fusion API

### 🔧 Setup Instructions

 🔹 Clone the Repo

```bash

git clone https://github.com/pheobayo/restaurant-grc-20.git
cd restaurant-grc-20

```
 
## 📦 Data Source

This project uses public restaurant inspection data from:

> [San Francisco Open Data – Restaurant Inspection Scores](https://data.sfgov.org/resource/pyih-qa8i.json)

This avoids rate limits and private APIs, making it fully open-source friendly.


## ❌ Challenges & issues

⚠ **Failed to delete an entity** 


---

## ✅ Key learnings

### 📌 Technical improvements

### 📌 Geo-Specific learnings

✔ **Deeper understanding** of **Geo's data publishing process**\
✔ Learned how to **write and publish structured data** using the **Geo Testnet API**\
✔ Understood how **triples, entities, and relationships work programmatically**

---

## 📌 Important project IDs 



---




## 📄 Data model: Press release

| Property         | Geo ID                 | Description                                       |
| ---------------- | ---------------------- | ------------------------------------------------- |
| **Name**         | LuBWqZAu6pz54eiJS5mLv8 | The title of the press release                    |
| **Publish Date** | KPNjGaLx5dKofVhT6Dfw22 | The publication date and time                     |
| **Web URL**      | 93stf6cgYvBsdPruRzq1KK | The original link to the press release            |
| **Blocks**       | QYbjCM6NT9xmh2hFGsqpQX | The content of the press release stored in Blocks |
| **Publisher**    | Lc4JrkpMUPhNstqs7mvnc5 | The wire service publishing the press release     |

---

## 📂 Project structure

```
Armando-RSS/
│── data/
│── src/
│   ├── scraper.ts
│   ├── scraper-v2.ts
│   ├── publisher.ts
│   ├── testnet.ts
│   ├── wallet.ts
│   ├── config.ts
│   ├── write-*.ts
│   ├── publish-*.ts
│   ├── deploy-space.ts
│── package.json
│── tsconfig.json
│── README.md
```

---

## 📌 Next steps

🛠️ **Improving content publication in Blocks**\
🖨️ **Format press release names** for consistency with **Geo policies**\
🔄 **Refining relation management** for structured data\
🚀 **Transitioning from Testnet to Mainnet deployment**\
🔮 **Becoming able to publish any content on Geo Genesis with full control over Blocks, tables, and images**

---

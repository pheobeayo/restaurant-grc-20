# SF Restaurant GRC-20 Publisher

## 📌 Project description

**SF Restaurant GRC-20 Publisher** is a TypeScript-based Node.js project that scrapes restaurant data from San Francisco and publishes it to the Geo Protocol testnet using the [`grc20-ts`](https://github.com/graphprotocol/grc-20-ts) SDK.

---

## 🎯 Project Understanding

### Understanding Geo 

This project gave me an exposure to the graph protocol grc-20, I have only being able to interact with the graph protocol using the user interface, but the project gave me an indepth understanding of the protocol and the ability to publish data and scraped data from external source.



---

## ✅ Project timeline

### 📌 Initial setup

🔹 Studied **[grc-20-ts](https://github.com/graphprotocol/grc-20-ts)**\
🔹 Created the **Restaurant data** from [San Francisco Open Data – Restaurant Inspection Scores](https://data.sfgov.org/resource/pyih-qa8i.json) → `restaurant.ts`\
🔹 Published the **data scraped** on **Geo Testnet** → 


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

⚠ **I could not access the grc-20 browser fully** 


---

## ✅ Key learnings



### 📌 Geo-Specific learnings

✔ **Deeper understanding** of **Geo's data publishing process**\
✔ Learned how to **scarpe and publish structured data** using the **Geo Testnet API**\

---




---


## 📂 Project structure

```
RESTAURANT-GRC-20
│── src/
│   ├── data  
│        ├──restaurant.ts
│   ├── publisher
│        ├──publish.ts
│   ├── types
│        ├──types.ts
│   ├── utils
│          ├──ipfsUpload.ts
│         ├──metadata.ts
│         ├──wallet.ts
│   ├── config.ts
│   ├── index.ts
│   ├── deploy-space.ts
│── package.json
│── tsconfig.json
│── README.md
```

---



const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID;
const ACCESS_TOKEN = process.env.META_USER_ACCESS_TOKEN;
const API_VERSION = 'v22.0';
const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;

async function test() {
  const formattedAccountId = AD_ACCOUNT_ID.startsWith('act_') ? AD_ACCOUNT_ID : `act_${AD_ACCOUNT_ID}`;
  const accUrl = `${BASE_URL}/${formattedAccountId}?fields=balance,amount_spent,spend_cap,account_status,currency&access_token=${ACCESS_TOKEN}`;
  
  try {
    const res = await fetch(accUrl);
    const text = await res.text();
    console.log("Account API response:", text);
  } catch(e) {
    console.error(e);
  }
}
test();

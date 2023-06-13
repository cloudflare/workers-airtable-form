export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.pathname === "/submit") {
      await submitHandler(request, env)
    }
    return Response.redirect(env.FORM_URL)
  }
}

Ç

async function createAirtableRecord(env, body) {
  try {
    const result = fetch(`https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(env.AIRTABLE_TABLE_NAME)}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${env.AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json', 
      }
    })
    return result;
  } catch (error) {
    console.error(error);
  }
}

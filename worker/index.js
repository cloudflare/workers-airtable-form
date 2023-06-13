export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.pathname === "/submit") {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", {
          status: 405
        })
      }
    const body = await request.formData();

    const {
      first_name,
      last_name,
      email,
      phone,
      subject,
      message
    } = Object.fromEntries(body)

    const reqBody = {
      fields: {
        "First Name": first_name,
        "Last Name": last_name,
        "Email": email,
        "Phone Number": phone,
        "Subject": subject,
        "Message": message
      }
    }

    await createAirtableRecord(env, reqBody)
    return Response.redirect(env.FORM_URL)
    }
  }
}

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

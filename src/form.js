export const html = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Workers Airtable Form</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.15/dist/tailwind.min.css" rel="stylesheet">
  <style>
    .form-container {
      max-width: 500px;
    }
  </style>
</head>
<body class="bg-gray-100">
  <div class="container mx-auto p-8">
    <h1 class="text-4xl font-bold mb-4">Workers Airtable Form Example</h1>
    <p class="mb-8 text-xl">An example form that uses serverless functions, provided by 
      <a href="https://workers.cloudflare.com/">Cloudflare Workers</a>, to submit form data to an <a href="https://airtable.com/">Airtable</a> table. </p>
    <div class="form-container bg-white p-6 rounded shadow">
      <form class="space-y-4">
        <div class="flex flex-col">
          <label class="font-semibold" for="first_name">First Name</label>
          <input name="first_name" id="first_name" type="text" required class="border border-gray-300 p-2 rounded">
        </div>
        <div class="flex flex-col">
          <label class="font-semibold" for="last_name">Last Name</label>
          <input name="last_name" id="last_name" type="text" required class="border border-gray-300 p-2 rounded">
        </div>
        <div class="flex flex-col">
          <label class="font-semibold" for="email">Email</label>
          <input name="email" id="email" type="email" required class="border border-gray-300 p-2 rounded">
        </div>
        <div class="flex flex-col">
          <label class="font-semibold" for="phone">Phone Number</label>
          <input name="phone" id="phone" type="tel" required class="border border-gray-300 p-2 rounded">
        </div>
        <div class="flex flex-col">
          <label class="font-semibold" for="subject">Subject</label>
          <input name="subject" id="subject" type="text" required class="border border-gray-300 p-2 rounded">
        </div>
        <div class="flex flex-col">
          <label class="font-semibold" for="message">Message</label>
          <textarea name="message" id="message" required class="border border-gray-300 p-2 rounded"></textarea>
        </div>
        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Submit</button>
      </form>
      <div class="hidden success mt-4 text-green-600">
        Successfully submitted form!
      </div>
      <div class="hidden error mt-4 text-red-600">
        There was an error submitting the form.
      </div>
      <div class="hidden loading mt-4 text-orange-600">
        Submitting form...
      </div>
    </div>
  </div>
    <script>
      const form = document.querySelector("form");
      const successMessage = document.querySelector(".success");
      const errorMessage = document.querySelector(".error");
      const loadingMessage = document.querySelector(".loading");

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const body = Object.fromEntries(formData);
        loadingMessage.classList.remove("hidden");
        const response = await fetch("/submit", {
          method: "POST",
          body: formData
        });
        loadingMessage.classList.add("hidden");
        if (response.ok) {
          successMessage.classList.remove("hidden");
          form.reset();
        } else {
          errorMessage.classList.remove("hidden");
        }
      });
    </script>
  </body>
</html>
`;
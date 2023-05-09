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
      <div class="hidden success bg-green-100 border border-green-400 text-green-700 px-4 py-3 my-2 rounded relative" role="success">
        <strong class="font-bold">Wowza!</strong>
        <span class="block sm:inline">Successfully submitted form!</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>
      <div class="hidden error bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-2 rounded relative" role="alert">
        <strong class="font-bold">Holy smokes!</strong>
        <span class="block sm:inline">There was an error submitting the form.</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>
      <div class="hidden loading bg-blue-100 border border-blue-400 text-rblueed-700 px-4 py-3 my-2 rounded relative" role="loading">
        <strong class="font-bold">Loading:</strong>
        <span class="block sm:inline">Submitting Form...</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="fill-current h-6 w-6 text-blue-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
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
# Workers Airtable Form Example

This repository is the sample codebase associated with Cloudflare's tutorial on building a form handler for your static and Jamstack sites, using Cloudflare Workers.

[Check out the full tutorial to build it yourself](), or you can follow the instructions to deploy to your own Cloudflare account.

There are two codebases provided, configured using [NPM's workspace feature](https://docs.npmjs.com/cli/v7/using-npm/workspaces): `frontend`, the front-end user interface, and `worker`, a serverless function for handling form submissions.

This tutorial will show you how to integrate with [Airtable](https://airtable.com/), a Google Sheets-like spreadsheet software. New form submissions will be submitted into an Airtable spreadsheet that you will create in the tutorial.

## Setup

1. Fork this repository, and clone your forked repo down to your local machine.
2. Create a valid Airtable base + table, and get the relevant API keys and configuration details.
3. Configure a new Pages project in the Cloudflare dashboard, and point it at your forked repository. To correctly configure your new project, use the _build command_ and _build directory_ from the ["Pages deployment details"](#pages-deployment-details) section below.
4. In `worker`, configure the `wrangler.toml` file with your Cloudflare `account_id`, and replace `AIRTABLE_BASE_ID` and `AIRTABLE_TABLE_NAME` with the values from the tutorial. The `FORM_URL` value should match your deployed Pages URL, such as `https://workers-airtable-form.pages.dev`.
5. With your `wrangler.toml` configured, you can deploy the function using `wrangler publish`. _Note that the repository also includes a GitHub Actions workflow that can automatically deploy your function when you push new commits--see ["GitHub Actions configuration details"](#github-actions-configuration-details) to learn more._
6. When your Workers function is successfully deployed, you'll get a unique URL representing your function. For instance, `https://workers-form-handler.signalnerve.workers.dev`. You can take this URL and replace the `FORM_URL` constant in your front-end UI to allow it to successfully submit data to your new function.

## Configuration

### Airtable configuration details

To correctly set up your serverless function to be able to submit data to Airtable, you need to set three values:

1. _Airtable Table Name:_ the name for your table, e.g. "Form Submissions".
2. _Airtable Base ID:_ the alphanumeric base ID found at the top of your base's API page.
3. _Airtable API Key:_ the private API key found in example API requests on the Airtable API documentation page.

The Airtable table name and base ID can be set using the `vars` configuration setting in your `wrangler.toml`, representing _plain-text environment variables_:

```toml
# Rest of wrangler.toml

[vars]
AIRTABLE_BASE_ID = "yourAppId"
AIRTABLE_TABLE_NAME = "Table Name"
FORM_URL = "https://example-ui.com"
```

The Airtable API key should be set using `wrangler secret`, a subcommand of `wrangler` for setting _encrypted environment varibles_. Run `wrangler secret put` as seen below, and paste in your API key:

```sh
$ wrangler secret put AIRTABLE_API_KEY
Enter the secret text you would like assigned to the variable AIRTABLE_API_KEY on the script named airtable-form-handler:
******
🌀  Creating the secret for script name airtable-form-handler
✨  Success! Uploaded secret AIRTABLE_API_KEY.
```

### GitHub Actions configuration details

This repository includes a GitHub Actions workflow that will automatically deploy your function to Workers using [wrangler-action](https://github.com/cloudflare/wrangler-action). In order to correctly configure the workflow, do the following:

1. Add a new secret in your repo settings (`github.com/username/reponame/settings/secrets/actions`) called `CF_API_TOKEN`, which should contain a Cloudflare API token. This can be generated from Cloudflare's dashboard, in your profile settings.
2. Go to the "Actions" tab for your repo, and select the "Enable" button.

After completing these steps, the workflow should run whenever you push a commit to the `main` branch in your repository.

### Pages deployment details

Below are the configuration values you should use to configure your new Cluodflare Pages project, when deploying the front-end user interface for this sample code:

| Config option   | Value                                |
| --------------- | ------------------------------------ |
| Build command   | `npm run build --workspace frontend` |
| Build directory | `frontend/build`                     |

# n8n-nodes-pipecorn

This is an n8n community node. It lets you use [Pipecorn](https://pipecorn.com) in your n8n workflows.

Pipecorn finds the professional email address and phone number of a contact from their LinkedIn profile, or from their name and company. It runs a waterfall across multiple data providers and returns the best result it finds.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Contact

- **Enrich** — find the professional email address and/or phone number of a single contact.

## Credentials

You need a Pipecorn account and an API key.

1. Sign up at [pipecorn.com](https://pipecorn.com).
2. In the app, go to **Settings > API** and copy your API key.
3. In n8n, create a new **Pipecorn API** credential and paste the key.

The key is sent as the `X-Api-Key` header. The credential test calls the account credits endpoint, so a green test also confirms your account is reachable.

## Compatibility

Tested against n8n 2.35. Requires n8n 1.x or later.

## Usage

### Enriching a contact

Set **Enrichment Type** to `Email`, `Phone`, or both, then provide one of:

- a **LinkedIn URL** — the most reliable input, and the only one that works for phone numbers
- a **First Name** + **Last Name** + a **Company Domain** or **Company Name** — works for email only

| Parameter | Notes |
| --- | --- |
| Enrichment Type | `Email`, `Phone`, or both. Each kind found consumes credits |
| LinkedIn URL | Required for phone enrichment |
| First Name / Last Name | Required when no LinkedIn URL is provided |
| Company Domain | Either this or Company Name is needed to find an email without a LinkedIn URL |
| Company Name | Used to resolve the company when the domain is unknown |
| Phone Country Codes | Comma-separated ISO codes to prioritise, e.g. `FR,BE`. Defaults to your workspace setting |

Example output:

```json
{
  "enrichment_id": "b3f1c2d4-...",
  "first_name": "Jane",
  "last_name": "Doe",
  "linkedin_profile_url": "https://www.linkedin.com/in/jane-doe",
  "status": "finished",
  "email": "jane.doe@acme.com",
  "email_status": "valid",
  "phones": ["+33612345678"],
  "phone_status": "valid"
}
```

### Execution time

Enrichment queries several providers in sequence and stops at the first match. Pipecorn allows up to 25 seconds for email and 30 seconds for phone, and those budgets are independent — so a request asking for both can run for close to a minute before returning. This is expected, and the node's HTTP timeout is set accordingly.

### Credits and errors

Each kind of data found consumes credits. When your balance is empty the API returns an `insufficient_credits` error, which surfaces in n8n as a failed node execution. Use the node's **Continue On Fail** setting if you are enriching a list and want the workflow to carry on.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Pipecorn](https://pipecorn.com)

## Version history

### 0.1.0

Initial release. Contact > Enrich operation with email and phone enrichment.

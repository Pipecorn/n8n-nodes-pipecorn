import type { INodeProperties } from 'n8n-workflow';

const showOnlyForContactEnrich = {
	operation: ['enrich'],
	resource: ['contact'],
};

export const contactEnrichDescription: INodeProperties[] = [
	{
		displayName: 'Enrichment Type',
		name: 'enrichmentType',
		type: 'multiOptions',
		required: true,
		default: ['email', 'phone'],
		displayOptions: {
			show: showOnlyForContactEnrich,
		},
		options: [
			{
				name: 'Email',
				value: 'email',
			},
			{
				name: 'Phone',
				value: 'phone',
			},
		],
		description: 'Which data to look for. Each kind found consumes credits.',
		routing: {
			send: {
				type: 'body',
				property: 'enrichment_type',
			},
		},
	},
	{
		displayName: 'LinkedIn URL',
		name: 'linkedinUrl',
		type: 'string',
		default: '',
		placeholder: 'https://www.linkedin.com/in/jane-doe',
		displayOptions: {
			show: showOnlyForContactEnrich,
		},
		description:
			'LinkedIn profile of the contact. Required for phone enrichment, and the most reliable input for email.',
		routing: {
			send: {
				type: 'body',
				property: 'linkedin_url',
			},
		},
	},
	{
		displayName:
			'Phone enrichment requires a LinkedIn URL. Without one, only the email waterfall will run.',
		name: 'phoneNeedsLinkedinNotice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForContactEnrich,
				enrichmentType: [{ _cnd: { includes: 'phone' } }],
				linkedinUrl: [''],
			},
		},
	},
	{
		displayName: 'First Name',
		name: 'firstName',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForContactEnrich,
		},
		description: 'Required when no LinkedIn URL is provided',
		routing: {
			send: {
				type: 'body',
				property: 'firstname',
			},
		},
	},
	{
		displayName: 'Last Name',
		name: 'lastName',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForContactEnrich,
		},
		description: 'Required when no LinkedIn URL is provided',
		routing: {
			send: {
				type: 'body',
				property: 'lastname',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForContactEnrich,
		},
		options: [
			{
				displayName: 'Company Domain',
				name: 'domain',
				type: 'string',
				default: '',
				placeholder: 'pipecorn.com',
				description:
					'Domain of the company. Either this or Company Name is needed to find an email without a LinkedIn URL.',
				routing: {
					send: {
						type: 'body',
						property: 'domain',
					},
				},
			},
			{
				displayName: 'Company Name',
				name: 'companyName',
				type: 'string',
				default: '',
				description: 'Used to resolve the company when the domain is unknown',
				routing: {
					send: {
						type: 'body',
						property: 'company_name',
					},
				},
			},
			{
				displayName: 'Phone Country Codes',
				name: 'phoneCountryCodes',
				type: 'string',
				default: '',
				placeholder: 'FR,BE',
				description:
					'Comma-separated ISO country codes to prioritise. Defaults to the workspace setting.',
				routing: {
					send: {
						type: 'body',
						property: 'phone_country_codes',
						value: '={{ $value.split(",").map(code => code.trim()).filter(code => code !== "") }}',
					},
				},
			},
		],
	},
];

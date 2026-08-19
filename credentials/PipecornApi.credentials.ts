import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PipecornApi implements ICredentialType {
	name = 'pipecornApi';

	displayName = 'Pipecorn API';

	icon: Icon = { light: 'file:pipecorn.svg', dark: 'file:pipecorn.dark.svg' };

	documentationUrl = 'https://github.com/Pipecorn/n8n-nodes-pipecorn?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'Found in Pipecorn under Settings > API.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://app.pipecorn.com/api/v2',
			url: '/credits',
		},
	};
}

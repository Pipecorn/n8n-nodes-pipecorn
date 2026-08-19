import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { contactDescription } from './resources/contact';

export class Pipecorn implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Pipecorn',
		name: 'pipecorn',
		icon: { light: 'file:pipecorn.svg', dark: 'file:pipecorn.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Enrich contacts with professional emails and phone numbers',
		defaults: {
			name: 'Pipecorn',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'pipecornApi', required: true }],
		requestDefaults: {
			baseURL: 'https://api.pipecorn.com/v2',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			// Enrichment runs a provider waterfall server-side with independent
			// per-kind budgets (25s email + 30s phone), so a combined request can
			// legitimately stay open for close to a minute.
			timeout: 120000,
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Contact',
						value: 'contact',
					},
				],
				default: 'contact',
			},
			...contactDescription,
		],
	};
}

import type { INodeProperties } from 'n8n-workflow';
import { contactEnrichDescription } from './enrich';

const showOnlyForContacts = {
	resource: ['contact'],
};

export const contactDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForContacts,
		},
		options: [
			{
				name: 'Enrich',
				value: 'enrich',
				action: 'Enrich a contact',
				description: 'Find the professional email and phone number of a contact',
				routing: {
					request: {
						method: 'POST',
						url: '/contacts/single_enrich',
					},
				},
			},
		],
		default: 'enrich',
	},
	...contactEnrichDescription,
];

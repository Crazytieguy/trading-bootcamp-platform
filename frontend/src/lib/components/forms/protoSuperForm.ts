import { defaults, superForm } from 'sveltekit-superforms';

export function protoSuperForm<FormData>(
	id: string,
	fromObject: (data: { [key: string]: unknown }) => FormData,
	sendMessage: (data: FormData) => void,
	initialData: FormData,
	{
		onUpdated,
		cancelPred,
		resetForm
	}: {
		onUpdated?: () => void;
		cancelPred?: (data: FormData) => boolean;
		resetForm?: boolean;
	} = {}
) {
	type T = FormData & Record<string, unknown>;
	const validator = {
		superFormValidationLibrary: 'custom' as const,
		async validate(
			data: unknown
		): Promise<{ success: false; issues: { message: string }[] } | { success: true; data: T }> {
			try {
				return {
					success: true,
					data: fromObject(data as { [key: string]: unknown }) as T
				};
			} catch (e) {
				return {
					success: false,
					issues: [{ message: String(e) }]
				};
			}
		},
		jsonSchema: {}
	};

	const data = defaults(initialData as T, validator);

	return superForm(data, {
		id,
		SPA: true,
		validators: validator,
		clearOnSubmit: 'errors-and-message',
		resetForm: resetForm ?? true,
		onUpdate({ form, cancel }) {
			if (!form.valid) return;
			if (cancelPred && cancelPred(form.data)) {
				cancel();
				return;
			}
			sendMessage(form.data);
		},
		onUpdated() {
			if (onUpdated) {
				onUpdated();
			}
		}
	});
}

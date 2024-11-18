export default class Invite {
	constructor(
    readonly requester_username: string,
    readonly targuet_username: string,
    readonly requester_name: string,
    readonly targuet_name: string,
    readonly accepted: boolean = false,
    id?: string
	) {}
}

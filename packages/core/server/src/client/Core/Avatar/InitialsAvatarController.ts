import {BaseController} from '@copor/core/client/Core/BaseController';
import sharp from 'sharp';
import {getColorForInitials, getInitialsFor} from '@copor/core/client/Core/Avatar/InitialsAvatarHelper';

interface InitialsAvatarControllerParams {
	name: string;
}

// Public, unauthenticated endpoint generating a colored-circle-with-initials PNG for
// users with no profile photo. The native CallKit incoming-call UI only accepts a
// real http(s) URL for its avatar (it does its own fetch and has no concept of
// rendering initials locally), so this lets it show the same fallback look as
// CoporAvatar instead of a generic silhouette.
export class InitialsAvatarController extends BaseController<void, Buffer> {
	public async getResponse(): Promise<void> {
		const params = this.request.params as unknown as InitialsAvatarControllerParams;
		const name = decodeURIComponent(params.name ?? '');
		const initials = getInitialsFor(name);
		const color = getColorForInitials(initials);
		const svg = `
			<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256">
				<circle cx="128" cy="128" r="128" fill="${color}"/>
				<text x="128" y="128" font-family="sans-serif" font-size="102" font-weight="bold"
					fill="#FFFFFF" text-anchor="middle" dominant-baseline="central">${initials}</text>
			</svg>
		`;
		const buffer = await sharp(Buffer.from(svg)).png().toBuffer();

		this.response.contentType('image/png');
		this.response.send(buffer);
	}
}

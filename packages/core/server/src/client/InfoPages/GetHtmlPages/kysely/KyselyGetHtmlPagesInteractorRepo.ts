import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {db} from '@copor/core/client/AppDataSource';
import {ContentType} from '@copor/core/domain/Core/enum/ContentType';
import {InfoPagesParams} from '@copor/core/client/enum/InfoPagesParams';
import {readFileSync} from 'fs';


export class KyselyGetHtmlPagesInteractorRepo implements GetItem<string> {
	async load(contentType: InfoPagesParams): Promise<string> {
		let result;

		switch (contentType) {
			case InfoPagesParams.TERMS_AND_CONDITIONS : {
				result = await db
					.selectFrom('contentItem as ci')
					.where('ci.contentType', '=', ContentType.TERMS_AND_CONDITIONS)
					.select([
						'ci.content as content'
					])
					.executeTakeFirst();
				break;
			}
			case InfoPagesParams.IMPRESSUM : {
				result = await db
					.selectFrom('contentItem as ci')
					.where('ci.contentType', '=', ContentType.IMPRESSUM)
					.select([
						'ci.content as content'
					])
					.executeTakeFirst();
				break;
			}
			default : {
				throw new Error('Invalid info page params, check enum for info pages ');
			}
		}


		if (!result) {
			throw new Error('Can\'t get Terms and Conditions from DB');
		}

		result = result.content;
		result = this.replacePlaceholders(result);


		return result;
	}

	private replacePlaceholders(html: string): string {
		const imagePath = `${process.cwd()}/assets/img`;

		const logo = this.toBase64(`${imagePath}/documents/logo.png`);

		return html.replace(/\{\{logo\}\}/g, logo);
	}

	private toBase64(filePath: string): string {
		try {
			return readFileSync(filePath).toString('base64');
		} catch (err) {
			console.warn(`Could not read image at: ${filePath}`, err);
			return '';
		}
	}
}
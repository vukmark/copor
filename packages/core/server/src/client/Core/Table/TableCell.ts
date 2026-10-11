import {CellDTO} from '@copor/core/client/Core/Table/dto/CellDTO';
import {CellType} from '@copor/core/client/Core/Table/enum/CellType';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {Progress} from '@copor/core/domain/Core/enum/Progress';
import {CoporActionDTO} from '@copor/core/client/Core/Table/dto/CoporActionDTO';
import {RowAction} from '@copor/core/client/Core/Table/RowAction';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {GroupListDTO} from '@copor/core/domain/User/interactor/dto/GroupListDTO';

export abstract class TableCell {
	public abstract getCell(): CellDTO;
}

export class TextCell extends TableCell {
	private readonly text: string;

	constructor(text: string) {
		super();
		this.text = text;
	}

	getCell(): CellDTO {
		return {
			type: CellType.text,
			content: {text: this.text}
		};
	}
}

export class DescriptionCell extends TableCell {
	private readonly text: string;

	constructor(text: string) {
		super();
		this.text = text;
	}

	getCell(): CellDTO {
		return {
			type: CellType.description,
			content: {text: this.text}
		};
	}
}

export class HiddenTextCell extends TableCell {
	private readonly key: string;
	private readonly value: string;

	constructor(key: string, value: string) {
		super();
		this.key = key;
		this.value = value;
	}

	getCell(): CellDTO {
		return {
			type: CellType.hiddenText,
			content: {hiddenText: {key: this.key, value: this.value}}
		};
	}
}


export class PictureCell extends TableCell {
	private readonly url: string;

	constructor(url: string) {
		super();
		this.url = url;
	}

	getCell(): CellDTO {
		return {
			type: CellType.picture,
			content: {picture: this.url}
		};
	}
}

export class RoleCell extends TableCell {
	private readonly role: RoleType[];

	constructor(role: RoleType[]) {
		super();
		this.role = role;
	}

	getCell(): CellDTO {
		return {
			type: CellType.role,
			content: {role: this.role}
		};
	}
}

export class PublishStatusCell extends TableCell {
	private readonly publishStatus: PublishStatus;

	constructor(publishStatus: PublishStatus) {
		super();
		this.publishStatus = publishStatus;
	}

	getCell(): CellDTO {
		return {
			type: CellType.publishStatus,
			content: {publishStatus: this.publishStatus}
		};
	}
}

export class IsCheckedCell extends TableCell {
	private readonly isChecked: boolean;

	constructor(isChecked: boolean) {
		super();
		this.isChecked = isChecked;
	}

	getCell(): CellDTO {
		return {
			type: CellType.isChecked,
			content: {isChecked: this.isChecked}
		};
	}
}

export class ColorCell extends TableCell {
	private readonly color: number;

	constructor(color: number) {
		super();
		this.color = color;
	}

	getCell(): CellDTO {
		return {
			type: CellType.color,
			content: {color: this.color}
		};
	}
}

export class IsFeaturedCell extends TableCell {
	private readonly isFeatured: boolean;

	constructor(isFeatured: boolean) {
		super();
		this.isFeatured = isFeatured;
	}

	getCell(): CellDTO {
		return {
			type: CellType.featured,
			content: {isFeatured: this.isFeatured}
		};
	}
}

export class CopyableTextCell extends TableCell {
	private readonly copyableText: string;

	constructor(copyableText: string) {
		super();
		this.copyableText = copyableText;
	}

	getCell(): CellDTO {
		return {
			type: CellType.copyableText,
			content: {copyText: this.copyableText}
		};
	}
}

export class DateCell extends TableCell {
	private readonly date: string;

	constructor(date: string) {
		super();
		this.date = date;
	}

	getCell(): CellDTO {
		return {
			type: CellType.date,
			content: {date: this.date}
		};
	}
}

export class DateTimeCell extends TableCell {
	private readonly date: string;

	constructor(date: string) {
		super();
		this.date = date;
	}

	getCell(): CellDTO {
		return {
			type: CellType.dateTime,
			content: {date: this.date}
		};
	}
}

export class PriorityCell extends TableCell {
	private readonly priority: Priority;

	constructor(priority: Priority) {
		super();
		this.priority = priority;
	}

	getCell(): CellDTO {
		return {
			type: CellType.priority,
			content: {priority: this.priority}
		};
	}
}

export class ProgressCell extends TableCell {
	private readonly progress: Progress;

	constructor(progress: Progress) {
		super();
		this.progress = progress;
	}

	getCell(): CellDTO {
		return {
			type: CellType.progress,
			content: {progress: this.progress}
		};
	}
}

export class GroupListCell extends TableCell {
	private readonly groupList: GroupListDTO;

	constructor(groupList: GroupListDTO) {
		super();
		this.groupList = groupList;
	}

	getCell(): CellDTO {
		return {
			type: CellType.groupList,
			content: {groupList: this.groupList}
		};
	}
}

export class ActionCell extends TableCell {
	private readonly actionList: RowAction[];
	private readonly id: string;

	constructor(action: RowAction[], id: string) {
		super();
		this.actionList = action;
		this.id = id;
	}

	getCell(): CellDTO {
		const actionList: CoporActionDTO[] = [];

		this.actionList.map((action: RowAction) => {
			actionList.push({
				popupMessage: action.getPopupMessage(),
				routerPath: action.getRoutePath(this.id),
				actionType: action.getActionType(),
				isActive: action.getIsActive?.()
			});
		});
		return {
			type: CellType.action,
			content: {actionList: actionList}
		};
	}
}

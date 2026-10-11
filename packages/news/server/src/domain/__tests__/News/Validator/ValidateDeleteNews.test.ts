import {PermissionRepository} from "@copor/core/domain/Core/Validations/PermissionRepository";
import {ValidateDeleteNewsRepo} from "@copor/news/domain/News/repository/ValidateDeleteNewsRepo";
import {ValidateDeleteNewsDTO} from "@copor/news/domain/News/validations/dto/ValidateDeleteNewsDTO";
import {ErrorList} from "@copor/core/domain/Core/Exceptions/ErrorList";
import {InvalidNewsException} from "@copor/news/domain/News/exception/InvalidNewsException";
import {DeletionNotAllowedException} from "@copor/core/domain/Core/Exceptions/DeletionNotAllowedException";
import {ValidateDeleteNews} from "@copor/news/domain/News/validations/ValidateDeleteNews";

describe('Validate delete News test', ()=>{
    let mockPermissionRepo: jest.Mocked<PermissionRepository>;
    let mockStorageRepo : jest.Mocked<ValidateDeleteNewsRepo>;
    let input : ValidateDeleteNewsDTO;

    beforeEach(()=>{
        mockStorageRepo = {
            isInvalidNews: jest.fn(),
            entityHasReferences: jest.fn()
        };
        mockPermissionRepo = {
            isAllowed : jest.fn()
        };
        input = {
            actorId: 'actorId',
            newsId: 'newsId'
        };
        mockPermissionRepo.isAllowed.mockResolvedValue(true);
        mockStorageRepo.isInvalidNews.mockResolvedValue(false);
        mockStorageRepo.entityHasReferences.mockResolvedValue(false);
    });

    it('should throw error if News id is invalid', async ()=>{
        const errorList= new ErrorList([new InvalidNewsException()]);

        mockStorageRepo.isInvalidNews.mockResolvedValue(true);
        const validator= new ValidateDeleteNews(input,mockPermissionRepo,mockStorageRepo);
        const result= await validator.validate();

        expect(result).toStrictEqual(errorList);
    });

    it('should throw error if News has references', async ()=>{
        const errorList= new ErrorList([new DeletionNotAllowedException('x')]);

        mockStorageRepo.entityHasReferences.mockResolvedValue({tableName: 'x'});
        const validator= new ValidateDeleteNews(input,mockPermissionRepo,mockStorageRepo);
        const result= await validator.validate();

        expect(result).toStrictEqual(errorList);
    });
});

import {PermissionRepository} from "@copor/core/domain/Core/Validations/PermissionRepository";
import {ValidateUpdateNewsRepo} from "@copor/news/domain/News/repository/ValidateUpdateNewsRepo";
import {ValidateUpdateNews} from "@copor/news/domain/News/validations/ValidateUpdateNews";
import {SaveNewsDTO} from "@copor/news/domain/News/interactor/dto/SaveNewsDTO";
import {PublishStatus} from "@copor/core/domain/Core/enum/PublishStatus";
import {ErrorList} from "@copor/core/domain/Core/Exceptions/ErrorList";
import {EmptyTitleException} from "@copor/core/domain/Core/Exceptions/empty/EmptyTitleException";
import {EmptyNewsContentException} from "@copor/core/domain/Core/Exceptions/empty/EmptyNewsContentException";
import {ForbiddenAccessException} from "@copor/core/domain/Core/Exceptions/ForbiddenAccessException";
import {InvalidNewsException} from "@copor/news/domain/News/exception/InvalidNewsException";
import {InvalidUserIdException} from "@copor/core/domain/Core/Exceptions/invalid/InvalidUserIdException";
import {NewsPermission} from '@copor/news/domain/News/NewsPermission';

describe('Validate update News test',()=>{
    let mockPermissionRepo: jest.Mocked<PermissionRepository>;
    let mockStorageRepo: jest.Mocked<ValidateUpdateNewsRepo>;
    let validator: ValidateUpdateNews;
    let input: SaveNewsDTO;

    beforeEach(()=>{
        mockPermissionRepo={
            isAllowed: jest.fn()
        };
        mockStorageRepo={
            isInvalidNews: jest.fn()
        };
        input={
            id: 'id',
            title: 'title',
            summary: 'someSummary',
            content: 'messageContent',
            roleId: ['roleId'],
            publishStatus: PublishStatus.published,
            actorId: 'actorId'
        };
        mockPermissionRepo.isAllowed.mockResolvedValue(true);
        mockStorageRepo.isInvalidNews.mockResolvedValue(false);
    });

    it('Should throw error if title is empty', async ()=>{
        const errorList= new ErrorList([new EmptyTitleException()]);

        input.title='';
        validator= new ValidateUpdateNews(input,mockPermissionRepo,mockStorageRepo);
        const result= await validator.validate();
        expect(result).toStrictEqual(errorList);
    })

    it('Should not require a summary (same rules as create)', async ()=>{
        input.summary='';
        validator= new ValidateUpdateNews(input,mockPermissionRepo,mockStorageRepo);
        const result= await validator.validate();
        expect(result).toBeUndefined();
    })

    it('Should throw error if content is empty', async ()=>{
        const errorList= new ErrorList([new EmptyNewsContentException()]);

        input.content='';
        validator= new ValidateUpdateNews(input,mockPermissionRepo,mockStorageRepo);
        const result= await validator.validate();
        expect(result).toStrictEqual(errorList);
    })

    it('Should throw error if actorId is empty', async ()=>{
        const errorList= new ErrorList([new InvalidUserIdException()]);

        input.actorId='';
        validator= new ValidateUpdateNews(input,mockPermissionRepo,mockStorageRepo);
        const result= await validator.validate();
        expect(result).toStrictEqual(errorList);
    })

    it('Should throw error if actor does not have permission', async ()=>{
        const errorList= new ErrorList([new ForbiddenAccessException()]);

        mockPermissionRepo.isAllowed.mockResolvedValue(false);
        validator= new ValidateUpdateNews(input,mockPermissionRepo,mockStorageRepo);
        const result= await validator.validate();
        expect(result).toStrictEqual(errorList);
        expect(mockPermissionRepo.isAllowed).toHaveBeenCalledWith(input.actorId, NewsPermission.canUpdateNews, undefined);
    })

    it('Should throw error if news is invalid according to storage repo', async ()=>{
        const errorList= new ErrorList([new InvalidNewsException()]);

        mockStorageRepo.isInvalidNews.mockResolvedValue(true);
        validator= new ValidateUpdateNews(input,mockPermissionRepo,mockStorageRepo);
        const result= await validator.validate();
        expect(result).toStrictEqual(errorList);
        expect(mockStorageRepo.isInvalidNews).toHaveBeenCalledWith(input.id);
    })

    it('Should accumulate multiple errors when several fields are invalid', async ()=>{
        const errorList= new ErrorList([
            new EmptyNewsContentException(),
            new EmptyTitleException()
        ]);

        input.title='';
        input.content='';
        validator= new ValidateUpdateNews(input,mockPermissionRepo,mockStorageRepo);
        const result= await validator.validate();
        expect(result).toStrictEqual(errorList);
    })

    it('Should return empty ErrorList when all fields are valid', async ()=>{
        validator= new ValidateUpdateNews(input,mockPermissionRepo,mockStorageRepo);
        const result= await validator.validate();
        expect(result).toBeUndefined();
    })
})
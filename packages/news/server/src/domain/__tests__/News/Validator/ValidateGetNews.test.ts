import {ValidateGetNewsDTO} from "@copor/news/domain/News/validations/dto/ValidateGetNewsDTO";
import {ValidateGetNewsRepo} from "@copor/news/domain/News/repository/ValidateGetNewsRepo";
import {InvalidNewsException} from "@copor/news/domain/News/exception/InvalidNewsException";
import {ValidateGetNews} from "@copor/news/domain/News/validations/ValidateGetNews";
import {ErrorList} from "@copor/core/domain/Core/Exceptions/ErrorList";

describe('Validate get News test', ()=>{
    let inputDTO: ValidateGetNewsDTO;
    let mockPermissionRepo:{
        isAllowed: any;
    };
    let mockStorageRepo: jest.Mocked<ValidateGetNewsRepo>;

    beforeEach(()=>{
        mockPermissionRepo={
            isAllowed: jest.fn()
        };
        mockStorageRepo = {
            isInvalidNews: jest.fn()
        };
        inputDTO = {
            actorId: 'actorId',
            newsId: 'newsId'
        };
        mockStorageRepo.isInvalidNews.mockResolvedValue(false);
        mockPermissionRepo.isAllowed.mockResolvedValue(true);
    });
    it('should throw error if News is not valid', async ()=>{
        const errorList= new ErrorList([new InvalidNewsException()]);

        mockStorageRepo.isInvalidNews.mockResolvedValue(true);
        const validator= new ValidateGetNews(inputDTO,mockPermissionRepo,mockStorageRepo);
        const result = await validator.validate();

        expect(result).toStrictEqual(errorList);
    })
})
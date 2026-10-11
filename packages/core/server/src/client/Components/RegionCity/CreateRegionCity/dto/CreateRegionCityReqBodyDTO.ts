export interface CreateRegionCityReqBodyDTO {
	regionId: string;
	city: string;
	province: string;
	provinceCode: string;
	community: string;
	communityCode: string;
	latitude: number;
	longitude: number;
}
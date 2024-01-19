export class UserEntity {
  constructor(dto) {
    this.login = dto.login;
    this.password = dto.password;
    this.role = dto.role;
    this.sex = dto.sex;
    this.first_name = dto.firstName;
    this.last_name = dto.lastName;
    this.phone = dto.phone;
    this.address = dto.address;
    this.latitude = dto.latitude;
    this.longitude = dto.longitude;
    this.group_id = dto.groupId;
    this.brand_id = dto.brandId;
  }
}

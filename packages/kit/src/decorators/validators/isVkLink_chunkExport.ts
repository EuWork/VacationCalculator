import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { isNil, isString } from "@worksolutions/utils";

export function IsVkLink(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) =>
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName as string,
      options: validationOptions,
      validator: IsVkLinkValidator,
    });
}

export const isVkLinkValidatorName = "IsVkLink";

export function getIsVkLinkValidatorSchema() {
  return { type: "string", example: "https://vk.com/username" } as const;
}

@ValidatorConstraint({ name: isVkLinkValidatorName })
class IsVkLinkValidator implements ValidatorConstraintInterface {
  validate(value: any) {
    if (isNil(value)) return true;
    if (!isString(value)) return false;
    try {
      const url = new URL(value);
      return url.hostname === "vk.com" || url.hostname === "vk.ru";
    } catch (e) {
      return false;
    }
  }
}

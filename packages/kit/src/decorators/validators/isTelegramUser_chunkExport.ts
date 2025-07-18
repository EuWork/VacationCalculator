import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { isNil, isString } from "@worksolutions/utils";

export function IsTelegramUser(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) =>
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName as string,
      options: validationOptions,
      validator: IsTelegramUserValidator,
    });
}

export const isTelegramUserValidatorName = "IsTelegramUser";

export function getIsTelegramUserValidatorSchema() {
  return { type: "string", example: "@username" } as const;
}

@ValidatorConstraint({ name: isTelegramUserValidatorName })
class IsTelegramUserValidator implements ValidatorConstraintInterface {
  validate(value: any) {
    if (isNil(value)) return true;
    if (!isString(value)) return false;
    return value.startsWith("@");
  }
}

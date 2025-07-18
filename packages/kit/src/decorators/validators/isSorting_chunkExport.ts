import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { isString } from "@worksolutions/utils";

export function IsSorting(sortingEnum: Record<string, string>, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [Object.values(sortingEnum)],
      options: validationOptions,
      validator: IsSortingValidator,
    });
  };
}

export const isSortingValidatorName = "CustomIsSorting";

export function getIsSortingSchema([sortingEnumValues]: [string[]]) {
  return { type: "string", enum: sortingEnumValues.flatMap((key) => [key, `-${key}`]) } as const;
}

@ValidatorConstraint({ name: isSortingValidatorName })
class IsSortingValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const sortingNames: string[] = args.constraints[0];
    if (value === undefined) return true;
    if (!isString(value)) return false;
    if (sortingNames.includes(value[0] === "-" ? value.slice(1) : value)) return true;
    return false;
  }
}

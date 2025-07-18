import {
  registerDecorator,
  ValidateIf,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { applyDecorators } from "libs";

interface Options {
  allowUndefined?: boolean;
  allowNull?: boolean;
}

export function IsOptional(options?: Options, validationOptions?: ValidationOptions): PropertyDecorator {
  return applyDecorators(
    ValidateIf((_: object, value: any) => {
      const { isNil, correct } = isNilCorrect(value, options);
      if (isNil) return !correct;
      return true;
    }),
    (object: object, propertyName: string | symbol) => {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName as string,
        options: validationOptions,
        validator: IsOptionalValidator,
        constraints: [options],
      });
    },
  );
}

export const isOptionalValidatorName = "CustomIsOptional";

@ValidatorConstraint({ name: isOptionalValidatorName })
class IsOptionalValidator implements ValidatorConstraintInterface {
  validate(value: any, { constraints: [options] }: ValidationArguments) {
    const { correct } = isNilCorrect(value, options);
    return correct;
  }
}

function isNilCorrect(value: any, options: Options | undefined) {
  const { allowUndefined = true, allowNull = true } = (options ?? {}) as Options;
  const isUndefined = value === undefined;
  if (isUndefined && !allowUndefined) return { correct: false, isNil: true };
  const isNull = value === null;
  if (isNull && !allowNull) return { correct: false, isNil: true };
  return { correct: true, isNil: isUndefined || isNull };
}

function getIsOptionalDescription(nullAllow: boolean, undefinedAllow: boolean) {
  return `Null is allowed = ${nullAllow}; Undefined(not passed) is allowed = ${undefinedAllow}`;
}

export function getIsOptionalSchema(constraints: [Options | undefined]) {
  const [options] = constraints;
  if (!options) return { nullable: true, description: getIsOptionalDescription(true, true) };
  return {
    nullable: options.allowNull || options.allowUndefined,
    description: getIsOptionalDescription(options.allowNull ?? true, options.allowUndefined ?? true),
  };
}

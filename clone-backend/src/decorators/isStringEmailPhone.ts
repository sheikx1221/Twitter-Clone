import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
    isString,
    isEmail,
    isPhoneNumber,
} from 'class-validator';

export function IsStringOrEmailOrPhone(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: 'isStringOrEmailOrPhone',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (value === undefined || value === null || isString(value)) {
                        return true;
                    }
                    if (isEmail(value)) {
                        return true;
                    }
                    if (isPhoneNumber(value)) {
                        return true;
                    }
                    return false;
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a string, an email, or a phone number.`;
                },
            },
        });
    };
}

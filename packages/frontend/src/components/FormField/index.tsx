import React from "react";
import cn from "classnames";

import Typography from "components/Typography";

import { errorStyles, hintStyles, titleReqStyles, titleStyles, wrapperErrorStyles, wrapperStyles } from "./style.css";

interface FormFieldInterface {
  className?: string;
  required?: boolean;
  title?: string;
  errorMessage?: string;
  hint?: string;
  children: React.ReactNode;
  errorClassName?: string;
}

function FormField({ className, required, title, errorMessage, hint, children, errorClassName }: FormFieldInterface) {
  return (
    <div className={cn(wrapperStyles, errorMessage && wrapperErrorStyles, className)}>
      {title && (
        <Typography className={titleStyles}>
          {required && <Typography className={titleReqStyles}>*</Typography>}
          {title}
        </Typography>
      )}
      {children}
      {hint && (
        <Typography className={hintStyles} type="span-2">
          {hint}
        </Typography>
      )}
      {errorMessage && <Typography className={cn(errorStyles, errorClassName)}>{errorMessage}</Typography>}
    </div>
  );
}

export default React.memo(FormField);

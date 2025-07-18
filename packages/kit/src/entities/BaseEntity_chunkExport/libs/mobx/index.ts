import { action, computed, makeObservable, observable } from "mobx";

import type { BaseEntity } from "../../index";
import { getHasAnyUnresolvedErrors, subscribeFullValid } from "../validations";
import { getViewErrors, removeError, setError } from "../errors";
import { submit } from "../submitter";

function createMobXAnnotations(this: BaseEntity) {
  const donor = observable(
    {
      errors: {},
      submitted: false,
      forceShowErrorKeys: {},
      fullValid: false,
      lastSubmitValid: false,
      setError: setError.bind(this),
      removeError: removeError.bind(this),
      submit: submit.bind(this),
    },
    {
      errors: observable,
      submitted: observable,
      forceShowErrorKeys: observable,
      fullValid: observable,
      lastSubmitValid: observable,
      setError: action,
      removeError: action,
      submit: action,
    },
  );
  Object.assign(this, donor);
  this.setError = donor.setError;
  this.removeError = donor.removeError;
  this.submit = donor.submit;
  const viewErrorsComputed = computed(() => getViewErrors.call(this));
  const hasAnyUnresolvedErrorsComputed = computed(() => getHasAnyUnresolvedErrors.call(this));
  Object.defineProperties(this, {
    viewErrors: { get: () => viewErrorsComputed.get() },
    hasAnyUnresolvedErrors: { get: () => hasAnyUnresolvedErrorsComputed.get() },
  });
}

export function initMobx(this: BaseEntity, { canValidate = false }: { canValidate?: boolean } = {}) {
  makeObservable(this);
  if (canValidate) {
    createMobXAnnotations.call(this);
    subscribeFullValid.call(this);
  }
}

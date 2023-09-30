import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations {
  static nameValidator(control: FormControl) {
    const name: string = control.value;
    if (name && name.split(' ').length > 1) {
      return null;
    } else {
      return {
        nameTooShort: true,
      };
    }
  }

  static equalsToValidator(checkedValue: any) {
    const validator = (control: FormControl) => {
      const thisValue = control.value;

      // Check if control.root is null or undefined
      if (!control.root) {
        return null;
      }

      // Check if the checkedValue control exists
      const checkedControl = (<FormGroup>control.root).get(checkedValue);
      if (!checkedControl) {
        return null;
      }

      if (
        thisValue &&
        checkedControl.value &&
        thisValue === checkedControl.value
      ) {
        return null;
      } else {
        return {
          notTheSame: true,
        };
      }
    };
    return validator;
  }

  // static equalsToValidator(checkedValue: any) {
  //   const validator = (control: FormControl) => {
  //     const thisValue = control.value;
  //     // console.log((<FormGroup>control.root).get(checkedValue).value);
  //     if (!control.root || !(<FormGroup>control.root).controls) {
  //       return null;
  //     }

  //     if (
  //       thisValue &&
  //       checkedValue &&
  //       checkedValue !== null &&
  //       checkedValue !== undefined &&
  //       thisValue.value == (<FormGroup>control.root).get(checkedValue).value
  //     ) {
  //       return null;
  //     } else {
  //       return {
  //         notTheSame: true,
  //       };
  //     }
  //   };
  //   return validator;
  // }
}

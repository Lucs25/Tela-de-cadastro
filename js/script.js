class Validator {
  constructor() {
    this.validations = [
      "data-min-length",
      "data-max-length",
      "data-email-validate",
      "data-required",
      "data-only-letters",
      "data-equal"
    ]
  }

  validate(form) {
    let inputs = form.getElementsByTagName("input");

    let currentValidations = document.querySelectorAll("form .error-validation");

    if(currentValidations.length) {
      this.cleanValidations(currentValidations);
    }

    let inputsArray = [...inputs];
    inputsArray.forEach(function (input) {
      for (let i = 0; this.validations.length > i; i++) {
        if (input.getAttribute(this.validations[i]) != null) {
          let method = this.validations[i]
            .replace("data-", "")
            .replace("-", "");

          let value = input.getAttribute(this.validations[i]);

          this[method](input, value);
        }
      }
    }, this);
  }

  minlength(input, minValue) {
    let inputLength = input.value.length;
    let errorMessage = `O campo precisa de pelo menos ${minValue} caracteres`;

    if (inputLength < minValue) {
      this.printMessage(input, errorMessage);
    }
  }

  maxlength(input , maxValue) {
    let inputLength = input.value.length;
    let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;

    if (inputLength > maxValue) {
      this.printMessage(input, errorMessage);
    }
  }

  onlyletter() {
    let re = /^[A-Za-z]+$/;

    let inputValue = input.value;

    let errorMessage = 'Este campo aceita somente letras'

    if(!re.teste(inputValue))
      this.printMessage(input, errorMessage);
  }

  emailvalidate(input) {

    let re = /\S+@\S+\.\S+/;

    let email = input.value;

    let errorMessage = 'Insira um e-mail padrão, ex: aaaaaa@aaaa.com';

    if(!re.teste(email)) {
      this.printMessage(input, errorMessage);
    }
  }

  required(input) {
    let inputValue = input.value;
    if (inputValue ==='') {
      let errorMessage = 'Este campo é obrigatório';
      this.printMessage(input, errorMessage);
    }
  }

  printMessage(input, msg) {

    let errorsQty = input.parentNode.querySelector('.error-validation');

    if(errorsQty === null) {
      let template = document.querySelector('.error-validation').cloneNode(true);

      template.textContent = msg;
      let inputParent = input.parentNode;
      template.classList.remove('template');
      inputParent.appendChild(template);
    }
  }

  equal(input, inputName) {
    let inputToCompare = document.getElementsByName(inputName)[0];

    let errorMessage = `Este campo precisa estar igual ao ${InputName}`;

    if(input.value != inputToCompare) {
      this.printMessage(input, errorMessage);
    }
  }

  //verificar onde esta sendo utilizado
  cleanValidations(validations) {
    validations.forEach(el => el.remove());
  }
}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

submit.addEventListener("click", function(e) {
  e.preventDefault();
  validator.validate(form);
});

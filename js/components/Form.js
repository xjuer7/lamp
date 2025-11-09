const form = document.querySelector(".questions__form");
const inputNameForm = document.querySelector("#name");
const inputMailForm = document.querySelector("#email");
const inputCheckboxForm = document.querySelector("#agree");
const baseUrl = "https://httpbin.org/post";
const questionSection = document.querySelector(".questions__wrapper");

let validator;

export function validateForm() {
    validator = new JustValidate(form);
    validator
        .addField(inputNameForm, [
        {
            rule: "required",
            errorMessage: "Введите ваше имя",
        },
        {
            rule: "minLength",
            value: 3,
            errorMessage: "Минимальное количество символов: 3",
        },
        {
            rule: "maxLength",
            value: 20,
            errorMessage: "Максимальное количество символов: 20",
        },
        ])
        .addField(inputMailForm, [
        {
            rule: "required",
            errorMessage: "Введите вашу почту",
        },
        {
            rule: "email",
            errorMessage: "Почта введена неверно",
        },
        ])
        .addField(inputCheckboxForm, [
        {
            rule: "required",
            errorMessage: "Согласие обязательно",
        },
        ]);

    form.setAttribute("action", baseUrl);

    validator.onSuccess(async (e) => {
        e.preventDefault();
        const successCheckingURL = await checkForm();

        if (successCheckingURL) {
        questionSection.append(createNotice("Благодарим за обращение!"));
        // document.querySelector(".message__icon").classList.add("visually-hidden");
        document.querySelector(".message__descr").classList.add("visually-hidden");
        document.querySelector(".message__content").style.alignItems = "center";
        form.reset();
        } else {
        questionSection.append(createNotice("Не удалось отправить обращение"));
        document.querySelector(".message__content").style.width = "600px";
        form.reset();
        return console.error(
            `POST ${form.getAttribute("action")} ERR_NAME_NOT_RESOLVED`
        );
        }
    });
}
async function checkConnection() {
    let controller = new AbortController();
    let timeout = setTimeout(() => controller.abort(), 1000);

    try {
        const response = await fetch(baseUrl, {
        method: "POST",
        signal: controller.signal,
        });

        clearTimeout(timeout);
        await response.json();
    } catch (err) {
        return "errorUrl";
    }
}

async function checkForm() {
    const failConnection = await checkConnection();
    let checkingUrl = failConnection ? true : form.getAttribute("action");
    if (checkingUrl !== baseUrl) {
        return false;
    } else {
        return true;
    }
}

function createNotice(text) {
    const divWrap = document.createElement("div");
    divWrap.classList.add("message");

    const descr = document.createElement("p");
    descr.classList.add("message__content");
    descr.textContent = text;

    const span = document.createElement("span");
    span.classList.add("message__descr");
    span.textContent =
        "Что-то пошло не так, попробуйте отправить форму еще раз. Если ошибка повторится - свяжитесь со службой поддержки.";

    const btnClose = document.createElement("button");
    btnClose.classList.add("message__close");

    btnClose.onclick = () => {
        document.querySelector(".message").remove();
    };
    descr.append(btnClose, span);
    divWrap.append(descr);
    return divWrap;
}

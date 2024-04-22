import { RegexpMessageType } from "src/auth/type/regexp-message.type";
import { RegexpType } from "src/auth/type/regexp.type";

export const Regexp: RegexpType = {
    NAME: "^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$",
    PASSWORD: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.* ).{8,16}$",
    PHONE: "^(03|05|07|08|09|01[2689])+([0-9]{8})\\b",
    BIRTHDAY: "^\\d{4}-\\d{2}-\\d{2}$"
}


export const RegexpMessage: RegexpMessageType ={
    NAME: "Tên sai định dạng!",
    PASSWORD: "Password phải có độ dài 8-16 ký tự, có ít nhất 1 chữ cái viết hoa, viết thường, chữ số và 1 ký tự đặc biệt!",
    PHONE: "Số điện thoại không hợp lệ!",
    BIRTHDAY: "Ngày sinh không hợp lệ, ngày sinh phải có dạng yyyy-mm-dd!",
    EMAIL: "Email không hợp lệ!"
}

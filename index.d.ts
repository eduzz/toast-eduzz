declare namespace ToastEduzz {
    interface Toast {
        toastEl: any,
        intervalFunc(): void,
        closeToast(): void,
        showToast(): void,
        init(productId: any): void,
        spliceArray(data: any): any
    }
}

declare const Toast: ToastEduzz.Toast;

export = Toast;
export as namespace Toast;

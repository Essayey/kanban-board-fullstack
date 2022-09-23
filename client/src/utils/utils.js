export const resizeTextArea = ref => {
    ref.current.style = 'height: auto';
    ref.current.style = 'height:' + (ref.current.scrollHeight) + 'px';
}

export const submitOnEnter = (e, formRef) => {
    if (e.which === 13) {
        e.preventDefault();
        formRef.current.requestSubmit();
    }
}
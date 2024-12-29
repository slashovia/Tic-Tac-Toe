export const buttonHandler = function () {
    return {
        end: function (btn) {
            btn.style.animationDuration = "0s";
        },
        start: function (btn) {
            btn.style.animationDuration = "1s";
        },
        disable: function (btn) {
            btn.disabled = true;
        },
        enable: function (btn) {
            btn.disabled = false;
        }
    }
}
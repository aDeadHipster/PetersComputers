var cookie, data;

window.onload = function(){
    cookie = new Cookie();
    cookie.load();
    data = cookie.data;
    updatePageFromCookie();

    // TODO Loading animation for configurator?
};

function updateCookie() {
    cookie.data = data;
    cookie.save();
}

function updatePageFromCookie() {
    if (data.pcsize) {
        // Update button styles
        let size_select_button = $("button.size-select-button[size=" + data.pcsize + "]");
        $(size_select_button).addClass('btn-item-selected')
        $(size_select_button).text("Geselecteerd");
    }

    if (data.step)
        setStepButton(data.step);
    else
        setStepButton(1);

    if (data.chipset) {
        let chipset_select_button = $("button.chipset-select-button[chipset=" + data.chipset + "]");
        $(chipset_select_button).addClass('btn-item-selected');
        $(chipset_select_button).text("Geselecteerd");
    }
}

function setStepButton(step) {
    let step_button = $("button.step-select-button[step-button=" + step + "]");

    data.step = step;
    updateCookie();

    // Update button styles
    let step_select_buttons = document.getElementsByClassName("step-select-button");
    for (let i = 0; i < step_select_buttons.length; i++) {
        $(step_select_buttons[i]).removeClass("btn-step-selected");
        $(step_select_buttons[i]).removeClass("btn-step-finished");
        if (i + 1 < data.step) {
            $(step_select_buttons[i]).addClass("btn-step-finished");
        }
    }
    $(step_button).addClass("btn-step-selected");

    // Show correct div
    let step_divs = document.getElementsByClassName("step-div")
    for (let i = 0; i < step_divs.length; i++) {
        $(step_divs[i]).hide("fast", "swing");
    }
    $("[step-div=" + step + "]").show("fast", "swing");
}

$(function() {
    // Size select
    $(".size-select-button").click(function() {
        let size = this.getAttribute('size');

        // Set size cookie
        data.pcsize = size;
        updateCookie();

        // Update button styles
        let size_select_buttons = document.getElementsByClassName("size-select-button");
        for (let i = 0; i < size_select_buttons.length; i++) {
            let b = size_select_buttons[i];
            $(b).removeClass("btn-item-selected");
            $(b).text("Selecteer")
        }
        $(this).addClass("btn-item-selected");
        $(this).text("Geselecteerd")
    });

    // Chipset select
    $(".chipset-select-button").click(function () {
        let chipset = this.getAttribute('chipset');

        data.chipset = chipset;
        updateCookie();

        let chipset_select_buttons = document.getElementsByClassName("chipset-select-button");
        for (let i = 0; i < chipset_select_buttons.length; i++) {
            let b = chipset_select_buttons[i];
            $(b).removeClass("btn-item-selected");
            $(b).text("Selecteer")
        }

        $(this).addClass('btn-item-selected');
        $(this).text("Geselecteerd")
    })
    $(".step-select-button").click(function() {
        let step = this.getAttribute("step-button");
        setStepButton(step);
    });
});

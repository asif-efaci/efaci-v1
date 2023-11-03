var gcaptcha_list = [];
var loader = '<div class="loader" id="loader-4"><span></span><span></span><span></span></div>';

var onloadCallback = function() {
    var lastScript = document.querySelector('script[data-sitekey]');
    var sitekey = lastScript.getAttribute('data-sitekey');
    $(".g-recaptcha").each(function() {
        var object = $(this);
        gcaptcha_list[object.attr("id")] = grecaptcha.render(object.attr("id"), {
            "sitekey": sitekey,
            "callback": function(token) {
                object.parents('form').find(".g-recaptcha-response").val(token);
                object.parents('form').submit();
            },
            "size": 'invisible'
        });
    });
};
var to, width, height, position, autohide, opacity;

function notifit_setDefaultValues() {
    // Default size
    width = 'all';
    height = 80;
    // Default position
    position = "center";
    // Default autohide
    autohide = true;
    // Default msg
    msg = "";
    // Default opacity (Only Chrome, Firefox and Safari)
    opacity = 1;
}

function notif(config) {

    notifit_setDefaultValues();

    if (config.position) {
        if (config.position == "center" ||
            config.position == "left" ||
            config.position == "right") {
            position = config.position; // Take the position
        }
    }
    if (config.width) {
        if (config.width > 0) {
            width = config.width; // Take the width in pixels
        } else if (config.width === "all") {
            width = screen.width - 60; // Margin difference
        }
    }
    if (config.height) {
        if (config.height < 100 && config.height > 0) {
            height = config.height; // Take the height in pixels
        }
    }
    if (typeof config.autohide !== "undefined")
        autohide = config.autohide;
    var div = "<div id='ui_notifIt'><p>" + ((config.msg) ? config.msg : "") + "</p></div>";

    $("#ui_notifIt").remove(); // Preventive remove
    clearInterval(to); // Preventive clearInterval
    $("body").append(div);
    $("#ui_notifIt").css("height", height);
    $("#ui_notifIt").css("width", width);

    switch (position) {
        case "center":
            $("#ui_notifIt").css("top", parseInt(0 - (height + 10)));
            break;
        case "right":
            $("#ui_notifIt").css("right", parseInt(0 - (width + 10)));
            break;
        case "left":
            $("#ui_notifIt").css("left", parseInt(0 - (width + 10)));
            break;
        default:
            $("#ui_notifIt").css("right", parseInt(0 - (width + 10)));
            break;
    }

    if (config.opacity) {
        $("#ui_notifIt").css("opacity", config.opacity);
    }

    switch (config.type) {
        case "error":
            $("#ui_notifIt").addClass("error");
            break;
        case "success":
            $("#ui_notifIt").addClass("success");
            break;
        case "info":
            $("#ui_notifIt").addClass("info");
            break;
        case "warning":
            $("#ui_notifIt").addClass("warning");
            break;
        default:
            $("#ui_notifIt").addClass("default");
            break;
    }

    switch (position) {
        case "left":
            $("#ui_notifIt").css("left", parseInt(0 - (width * 2)));
            break;
        case "right":
            $("#ui_notifIt").css("right", parseInt(0 - (width * 2)));
            break;
        case "center":
            var mid = window.innerWidth / 2;
            $("#ui_notifIt").css("left", mid - parseInt(width / 2));
            break;
        default:
            var mid = window.innerWidth / 2;
            $("#ui_notifIt").css("left", mid - parseInt(width / 2));
            break;
    }
    $("#ui_notifIt p").css("line-height", height + "px");

    switch (position) {
        case "center":
            $("#ui_notifIt").animate({
                top: 10
            });
            break;
        case "right":
            $("#ui_notifIt").animate({
                right: 10
            });
            break;
        case "left":
            $("#ui_notifIt").animate({
                left: 10
            });
            break;
        default:
            $("#ui_notifIt").animate({
                right: 10
            });
            break;
    }


    $("#ui_notifIt").click(function() {
        notifit_dismiss();
    });

    if (autohide == true)
        to = setTimeout(function() {
            notifit_dismiss();
        }, 30000);

}

function notifit_dismiss() {
    clearInterval(to);
    if (position == "center") {
        $("#ui_notifIt").animate({
            top: parseInt(height - (height / 2))
        }, 100, function() {
            $("#ui_notifIt").animate({
                top: parseInt(0 - (height * 2))
            }, 100, function() {
                $("#ui_notifIt").remove();
            });
        });
    } else if (position == "right") {
        $("#ui_notifIt").animate({
            right: parseFloat(width - (width * 0.9))
        }, 100, function() {
            $("#ui_notifIt").animate({
                right: parseInt(0 - (width * 2))
            }, 100, function() {
                $("#ui_notifIt").remove();
            });
        });
    } else if (position == "left") {
        $("#ui_notifIt").animate({
            left: parseFloat(width - (width * 0.9))
        }, 100, function() {
            $("#ui_notifIt").animate({
                left: parseInt(0 - (width * 2))
            }, 100, function() {
                $("#ui_notifIt").remove();
            });
        });
    }
    notifit_setDefaultValues();
}

$(function() {
    $('#contact-form').on('submit', function() {
        var $form = $(this);
        var submit = $form.find('.g-recaptcha');

        if (!$form[0].checkValidity()) {
            $form[0].reportValidity();
            grecaptcha.reset(gcaptcha_list[submit.attr("id")]);
            return false;
        }
        var formData = $form.serializeArray();

        $.ajax({
            method: "POST",
            url: 'action.php?action=contact',
            data: formData,
            dataType: "json",
            async: false,
            beforeSend: function() {
                submit.attr("disabled", true);
                submit.html(loader);
            },
            complete: function() {
                submit.removeAttr("disabled");
                submit.html('Submit');
                grecaptcha.reset(gcaptcha_list[submit.attr("id")]);
            },

            success: function(result) {
                if (result.type === 'success') {
                    $form.get(0).reset();
                }
                notif({
                    type: result.type,
                    msg: result.message
                });
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert("Something went wrong. please refresh page and try again");
                // location.reload();
            }
        });
        return false;
    });

    $('.job-apply-form').on('submit', function() {
        var $form = $(this);
        var submit = $form.find('.g-recaptcha');
        var modal = $form.closest('.modal');

        if (!$form[0].checkValidity()) {
            $form[0].reportValidity();
            grecaptcha.reset(gcaptcha_list[submit.attr("id")]);
            return false;
        }
        var formData = new FormData(this);

        $.ajax({
            method: "POST",
            url: 'action.php?action=career',
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            dataType: "json",
            async: false,
            beforeSend: function() {
                submit.attr("disabled", true);
                submit.html(loader);
            },
            complete: function() {
                submit.removeAttr("disabled");
                submit.html('Send Application');
                grecaptcha.reset(gcaptcha_list[submit.attr("id")]);
            },
            success: function(result) {
                if (result.type === 'success') {
                    $form.get(0).reset();
                    modal.modal('hide');
                }
                notif({
                    type: result.type,
                    msg: result.message
                });
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert("Something went wrong. please refresh page and try again");
                // location.reload();
            }
        });
        return false;
    });
});
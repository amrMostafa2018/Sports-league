function DatePicker() {
    //debugger;

    $(".Date").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "dd/mm/yy"

    });

};
function DateRangeFromTo() {
    var dateFormat = "dd/mm/yy",
            from = $("#DateFrom")
                .datepicker({
                    defaultDate: "+1w",
                    changeMonth: true,
                    numberOfMonths: 1,
                    dateFormat: "dd/mm/yy"
                })
                .on("change", function () {
                    to.datepicker("option", "minDate", getDate(this));
                }),
            to = $("#DateTo").datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 1,
                dateFormat: "dd/mm/yy"
            })
                .on("change", function () {
                    from.datepicker("option", "maxDate", getDate(this));
                });

        function getDate(element) {
            var date;
            try {
                date = $.datepicker.parseDate(dateFormat, element.value);
            } catch (error) {
                date = null;
            }

            return date;
        }
}
$(document).ready(function () {
    // menu toggle
    $('.menu-toggle').click(function () {
        $('.left-col,.items-menu,.right-content').toggleClass('active');
        if ($('.left-col').hasClass('active')) {
            $('.left-col .left-nav .left-block a span:nth-child(2)').fadeOut(300);
            $('.left-col .left-nav .left-block a span:nth-child(3)').fadeOut(300);
            $('.left-main-link.active').siblings('.sub-menu').slideUp();
        } else {
            $('.left-col .left-nav .left-block a span:nth-child(2)').fadeIn(300);
            $('.left-col .left-nav .left-block a span:nth-child(3)').fadeIn(300);
            $('.left-main-link.active').siblings('.sub-menu').slideDown();
        }
    });

    $('.right-content').on('change', '.upload-icon-btn input[type="file"]', function (e) {
        var fileName = e.target.files[0].name;
        //console.log($(this).parent().find(".title"));
        $(this).parent().addClass("active");
        $(this).parent().find(".title").text(fileName);
        $(this).parent().find(".icon").attr("title", fileName);
    });




    $('.right-content').on('change', '#guardian', function () {
        if ($(this).prop("checked") == true) {
            $(this).closest('.row').find(".guardian").removeClass('hide');
        } else {
            $(this).closest('.row').find(".guardian").addClass('hide');
        }
    });




    $('.right-content').on('click', '.new-archive-item', function () {
        var item = $(this).closest(".row").find(".archive-item:visible").last().find('textarea').val();
        if (item == "" || item == 'undefined') {

        }
        else {
            var newItem = $(this).closest(".row").find(".archive-item.new");

            var newItemContent = newItem.clone();

            newItemContent.removeClass("new");
            newItem.before(newItemContent);


        }
    });

});

$(document).ready(function () {

    

    

});

function LightBoxedPhoto() {
    //console.log($("a[rel^='prettyPhoto']"));
    $("a[rel^='prettyPhoto']").prettyPhoto({ animation_speed: 'normal', slideshow: 3000 });
}


function Carousel() {
    console.log($('.gallery'));
    $('.gallery').owlCarousel({
        loop: true,
        margin: 5,
        rtl: true,
        responsiveClass: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        rewindNav: true,
        dots: true,
        lazyLoad: true,
        loop: false,
        responsive: {
            0: {
                items: 1,
                nav: true,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,

            }
        }
    });
}


//  input text that only accept integers  Created By kemo 
function ValidateNumber() {

    $(".validatNO").keypress(function (event) {
        //if ($.browser.mozilla == true) {
        //    if (event.which == 8 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 9 || event.keyCode == 16 || event.keyCode == 46) {
        //        return true;
        //    }
        //}
        if (event.which < 46 || event.which > 59 || event.which == 59 || event.which == 47) {
            event.preventDefault();
        } // prevent if not number/dot

        if (event.which == 46
            && $(this).val().indexOf('.') == -1) {
            event.preventDefault();
        } // prevent if already dot
    });
}
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
//Site Message
function msgShow(ID, error) {
    // alert("in");
    var msg = $("#" + ID).html();
    try {
        $('.alert a')[0].nextSibling.remove();

        if (msg.indexOf("Sorry") > -1 || error == true) {
            $(".alert").addClass("alert-danger");
            $('.alert .close').after('<strong>خطأ !</strong>');
        } else {
            $(".alert").addClass("alert-success");
            $('.alert .close').after('<strong>تأكيد !</strong>');
        }
        $("#" + ID).text(msg.replace("Sorry : ", ""));
    }
    catch (e) {
        console.log("Not supported at IE");
    };
    $(".alert").show();
    $(".alert").animate({ "opacity": "1" });
    setTimeout(function () {
        $(".alert").animate({ "opacity": "0" });
    }, 4000)
    setTimeout(function () {
        $(".alert").hide();
        $(".alert").removeClass("alert-danger");
        $(".alert").removeClass("alert-success");
    }, 4500)
};

function ShowLoader(ID) {
    $("#" + ID).addClass("loading");    
}
function HideLoader(ID) {
    $("#" + ID).removeClass("loading");

}

//openview
function OpenPage(myURL, Me) {
    $("#MainContent").html("<div style='margin: 10%; text-align:center'><img src='../images/loader.gif'/></div>");
    $(".left-block a").removeClass("active");
    $(Me).parent().addClass("active");
    var Data = {};
    if (myURL != "") {
        //open Page
        $.ajax({
            type: 'Get',
            data: Data,
            url: webroot + myURL,
            success: function (data) {
               $('#MainContent').html(data);
            },
            error: function (result) {
                $(".alert").addClass('alert-danger');
                $('#MsgResult').html("Error at Open Page " + result.statusText);
                msgShow("MsgResult", true);
            },
            complete: function () {
                sizing();
            }

        });
    }
}
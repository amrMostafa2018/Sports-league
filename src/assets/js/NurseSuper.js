$(document).ready(function(){

    $('.add-new').click(function(){
        var target = "#"+ $(this).attr("data-target");

        $(target).toggleClass("in");

        $(this).children("span").toggleClass("glyphicon-plus glyphicon-minus");

        sizing();
    });

//Save after Edit
    $(".nurse-station-budget .edit").click(function(){
        var parent = $(this).closest('.nurse-station-budget');

        InlineEditing(parent);
        $(this).children(".glyphicon").toggleClass("glyphicon-pencil glyphicon-floppy-disk");

    });



// menu toggle
    $(document).ready(function() {
        $('.menu-toggle').click(function() {
            $('.left-col,.right-content').toggleClass('active');
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
    });

    /*
    $(".multi-select").chosen({
        width: "100%",
        rtl: false,
        no_results_text: "Oops, nothing found!",
        disable_search_threshold: 10,
        allow_single_deselect: true,
    });

    $(".single-select").chosen({
        width: "100%",
        rtl: false,
        no_results_text: "Oops, nothing found!",
        max_selected_options: 1,
        disable_search_threshold: 10,
        allow_single_deselect: true,
    });


    //Action Pool
    $('.moveOut').click(function(){
        var target = $("#action-pool-body tbody");

        $(this).parent().parent().appendTo(target);

        var allitem = $("#action-pool-body tbody tr");
        $(".action-pool-header .badge").html(allitem.length);

    });
    $('.moveIn').click(function(){
        var target  = $(this).closest(".table").children("tbody");
        var item    = $("#action-pool-body input:checked").closest("tr");

        item.each(function (index, value) {

            $('#action-pool-body input:checked').prop('checked', false);
            $(this).appendTo(target);
        });

        var allitem = $("#action-pool-body tbody tr");
        $(".action-pool-header .badge").html(allitem.length)

    });


    //Roster Review
    $('.shift').click(function(){
        //$("#myModal .modal-body").html("the Real Shift info");
        $('#myModal').modal("show");
    });
    */
});
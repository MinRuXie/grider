$(function(){
    let $takeshot_btn = $('#js-takeshot-btn');
    let $colsed_btn = $('#js-colsed-btn');
    let $output_warp = $('.output-wrap');
    let $edit_btn_array = $('.edit-btn');
    let $year_wrap = $('#js-year-wrap');

    let today = new Date();
    let current_year = today.getFullYear();

    
    $edit_btn_array.each(function(index){
        let $img_wrap = $(this).siblings('img');

        $(this).on('change', function(event){
            /* refrence: http://jsfiddle.net/LvsYc/ */
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                
                reader.onload = function(e) {
                    $img_wrap.attr('src', e.target.result);
                }
                
                reader.readAsDataURL(this.files[0]); // convert to base64 string
            }
        });
    });

    $takeshot_btn.on('click', function(){
        getScreenshot();
        $output_warp.addClass('show');
    });

    $colsed_btn.on('click', function(){
        $output_warp.removeClass('show');
    });

    function getScreenshot() {
        // let $screenshot_wrap = $('#capture');
        // $screenshot_wrap.css({
        //     'height': 'auto'
        // });

        // 輸出容器
        let $output = $('#output');
        $output.empty();

        html2canvas(document.querySelector("#capture")).then(canvas => {
            // 輸出容器
            $output.append(canvas);
        });
    }

    /* init */
    $year_wrap.text(current_year);
});
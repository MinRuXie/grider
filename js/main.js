$(function(){
    let $takeshot_btn = $('#js-takeshot-btn');
    let $colsed_modal_btn = $('#js-colsed-btn');

    let $year_wrap = $('#js-year-wrap');
    let $grid_wrap = $('#js-grid-wrap');
    let $output_warp = $('.output-wrap');

    let today = new Date();
    let current_year = today.getFullYear();

    let count = 4;

    function createImagesWrap() {
        for(let i=0 ; i < count*count ; i++) {
            $grid_wrap.append(
                `<div class="image-wrap">
                    <input type="file" class="edit-btn">
                    <img src="#" alt="your image" />
                </div>`
            );
        }

        $grid_wrap.css({
            'grid-template-columns': `repeat(${count}, 1fr)`,
            'grid-template-rows': `repeat(${count}, 1fr)`
        });
    }

    function bindImageEvent() {
        $('.edit-btn').each(function(index){
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
    }

    async function build() {
        await createImagesWrap();
        await bindImageEvent();
    }

    function getScreenshot() {
        let $output = $('#output');
        $output.empty();

        html2canvas(document.querySelector("#capture")).then(canvas => {
            $output.append(canvas);
        });
    }
    
    $takeshot_btn.on('click', function(){
        getScreenshot();
        $output_warp.addClass('show');
    });

    $colsed_modal_btn.on('click', function(){
        $output_warp.removeClass('show');
    });

    

    /* init */
    build();
    $year_wrap.text(current_year);
});